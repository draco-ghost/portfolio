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

if (!is_string($repo) || $repo === '') {
    repoError(400, 'A repository name is required.');
}

if (!repoIsAllowed($repo, $allowlist)) {
    repoError(404, 'Repository not found.');
}

$key = hash('sha256', strtolower($repo));
$cacheFile = repoCachePath('tree-' . $key);

if ($cacheFile === null) {
    header('X-Repo_Cache: BYPASS');
}

if ($cacheFile !== null) {
    $cached = repoFreshCache($cacheFile);

    if ($cached !== null) {
        repoRespond($cached, 'HIT');
    }
}

$lockHandle = null;
$hasLock = false;

if ($cacheFile !== null) {
    $lockHandle = @fopen(
        dirname($cacheFile) . '/repo-tree-' . $key . '.lock',
        'c'
    );

    if (is_resource($lockHandle)) {
        $hasLock = flock($lockHandle, LOCK_EX);
    }
}

// Recheck after acquiring the lock.
if ($hasLock && $cacheFile !== null) {
    $cached = repoFreshCache($cacheFile);

    if ($cached !== null) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);

        repoRespond($cached, 'HIT');
    }
}

// 5. Cache is missing or expired. Query MySQL.
try {
    $github = new GithubService();
    $tree = $github->fetchRepoTree($repo);

    if (!empty($tree['truncated'])) {
        error_log('Github returned an truncated tree for repository: ' . $repo);
    }

    $cacheStatus = 'BYPASS';

    if ($cacheFile !== null && $hasLock) {
        $saved = repoWriteCache($cacheFile, $tree);
        $cacheStatus = $saved ? 'MISS' : 'BYPASS';
    }

    repoRespond($tree, $cacheStatus);
} catch (Throwable $e) {
    error_log(
        'Repository tree API error: ' .
            $e->getMessage()
    );

    // Serve stale data if Github is temporarily unavailable
    if ($cacheFile !== null) {
        $stale = repoReadCache($cacheFile);

        if ($stale !== null) {
            repoRespond($stale['data'], 'STALE');
        }
    }

    repoError(502, 'Repository files are temporarily unavailable.');
} finally {
    if (is_resource($lockHandle)) {
        if ($hasLock) {
            flock($lockHandle, LOCK_UN);
        }

        fclose($lockHandle);
    }
}
