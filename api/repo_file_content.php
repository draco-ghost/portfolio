<?php

declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
// Do not allow browser or proxies to cache API responses indefinitely.
// The server-side JSON file is our cache.
header("Cache-Control: no-store");

require_once __DIR__ . '/../services/GithubService.php';
require_once __DIR__ . '/repo_cache.php';

$allowlist = require __DIR__ . '/repo_allowlist.php';

$repo = $_GET['repo'] ?? '';
$path = $_GET['path'] ?? '';

if (
    !is_string($repo) || $repo === '' ||
    !is_string($path) || $path === ''
    ) {
    repoError(400, 'Repository and file path are required.');
}

if (!repoIsAllowed($repo, $allowlist)) {
    repoError(404, 'Repository not found.');
}

// Reject malformed or ambigious paths.
$segments = explode('/', $path);

foreach($segments as $segment) {
    if (
        $segment === '' || $segment === '.' ||
        $segment === '..' || str_contains($segment, '\0')
    ) {
        repoError(400, 'Invalid file path.');
    }
}

$treeKey = hash('sha256', strtolower($repo));
$treeCacheFile = repoCachePath('tree-' . $treeKey);

if ($treeCacheFile === null) {
    repoError(503, 'Repository cache is unavailable.');
}

$lockHandle = null;
$hasLock = false;

try {
    // Obtain a fresh tree, using the same cache as the tree endpoint.
    $treeData = repoFreshCache($treeCacheFile);

    if ($treeData === null) {
        $lockFile = dirname($treeCacheFile)
            . '/repo-tree-' . $treeKey . '.lock';
        
            $lockHandle = @fopen($lockFile, 'c');

            if (!is_resource($lockHandle)) {
                repoError(503, 'Unable to access repository cache.');
            }

            $hasLock = flock($lockHandle, LOCK_EX);

            if (!$hasLock) {
                repoError(503, 'Unable to lock repository cache.');
            }

            // Another request may have refreshed the tree.
            $treeData = repoFreshCache($treeCacheFile);

            if ($treeData === null) {
                $github = new GithubService();
                $treeData = $github->fetchRepoTree($repo);

                if (!repoWriteCache($treeCacheFile, $treeData)) {
                    error_log('Unable to cache repository tree.' . $repo);
                }
            }

            flock($lockHandle, LOCK_UN);
            fclose($lockHandle);

            $lockHandle = null;
            $hasLock = false;
    }

    $commitSha = $treeData['commit_sha'] ?? null;
    $entries = $treeData['tree'] ?? null;

    if (
        !is_string($commitSha) || !is_array($entries)
    ) {
        repoError(503, 'Repository tree cache is invalid.');
    }

    // Only allow files present in the tree we are serving.
    $foundFile = false;

    foreach($entries as $entry) {
        if (
            ($entry['path'] ?? null) === $path
            && ($entry['type'] ?? null) === 'blob'
        ) {
            $foundFile = true;
            break;
        }
    }

    if (!$foundFile) {
        repoError(404, 'File not found in this repository tree.');
    }

    // The commit SHA prevents files from different versions
    // from sharing the same cache entry.
    $fileKey = hash('sha256', strtolower($repo) . "\0" . $commitSha . "\0" . $path);

    $fileCache = repoCachePath('file-' . $fileKey);

    if ($fileCache !== null) {
        $cachedFile = repoFreshCache($fileCache);

        if ($cachedFile !== null) {
            repoRespond($cachedFile, 'HIT');
        }
    }

    $fileLock = null;
    $hasFileLock = false;

    if ($fileCache !== null) {
        $fileLock = @fopen(
            dirname($fileCache) . '/repo-file-' . $fileKey . '.lock', 'c'
        );

        if (is_resource($fileLock)) {
            $hasFileLock = flock($fileLock, LOCK_EX);
        }
    }

    try {
        // Recheck after acquiring the file lock.
        if ($hasFileLock && $fileCache !== null) {
            $cachedFile = repoFreshCache($fileCache);

            if ($cachedFile !== null) {
                repoRespond($cachedFile, 'HIT');
            }
        }

        $github = new GithubService();
        $file = $github->fetchFileContentAtCommit(
            $repo, $path, $commitSha
        );

        $cacheStatus = 'BYPASS';

        if ($fileCache !== null && $hasFileLock) {
        $saved = repoWriteCache($fileCache, $file);
        $cacheStatus = $saved ? 'MISS' : 'BYPASS';
    }

    repoRespond($file, $cacheStatus);
    } finally {
        if (is_resource($fileLock)) {
            if ($hasFileLock) {
                flock($fileLock, LOCK_UN);
            }

            fclose($fileLock);
        }
    }
} catch (Throwable $e) {
    error_log(
        'Repository file API error: ' .
            $e->getMessage()
    );

    repoError(502, 'File content is temporarily unavailable.');
} finally {
    if (is_resource($lockHandle)) {
        if ($hasLock) {
            flock($lockHandle, LOCK_UN);
        }

        fclose($lockHandle);
    }
}
