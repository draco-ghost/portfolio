<?php

header("Content-Type: application/json; charset=UTF-8");
// Do not allow browser or proxies to cache API responses indefinitely.
// The server-side JSON file is our cache.
header("Cache-Control: no-store");

require_once __DIR__ . '/../services/GithubService.php';

const RELEASES_CACHE_TTL = 86400; // 24 hrs

$cacheDir = dirname(__DIR__) . '/cache/repo_releases';

// Accept POST requests only.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "POST requests only"
    ]);

    exit;
}

// Read the repository name from the JSON req body
$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON request"
    ]);

    exit;
}

$repo = trim($input['repo'] ?? '');

// Validate the repo name
if (
    $repo === '' || strlen($repo) > 100 ||
    !preg_match('/^[A-Za-z0-9._-]+$/', $repo) ||
    $repo === '.' || $repo === '..'
) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid repository name"
    ]);

    exit;
}

// One JSON cache file and lock file per repository.
$cacheFile = $cacheDir . '/' . $repo . '.json';
$lockFile = $cacheDir . '/' . $repo . '.lock';

/**
 * Read and validate the cached data.
 * Returns null when the cache is missing or invalid.
 */

function readReleasesCache(string $file): ?array {
    if (!is_file($file)) return null;

    $json = file_get_contents($file);

    if ($json === false) return null;

    $data = json_decode($json, true);

    if (
        !is_array($data) ||
        !isset($data['cached_at']) ||
        !is_numeric($data['cached_at']) ||
        !array_key_exists('releases', $data) ||
        !is_array($data['releases'])
    ) {
        return null;
    }

    return $data;
};

// Return releases from a fresh cache, if available.
function getFreshReleasesCache(string $file): ?array {
    $cache = readReleasesCache($file);

    if ($cache === null) return null;

    if (time() - (int) $cache['cached_at'] >= RELEASES_CACHE_TTL) return null;

    return $cache['releases'];
}

// Send a consostent API response
function respondReleases(array $releases, string $cacheStatus): void {
    header("X-Releases-Cache: " . $cacheStatus);

    echo json_encode([
        'success' => true,
        'message' => 'Github releases retrieved successfully',
        'releases_fetched' => count($releases),
        'releases' => $releases,
        'cacheStatus' => $cacheStatus
    ], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);

    exit;
}

// 1. Create the cache dir if neccessary.
if (
    !is_dir($cacheDir) &&
    !@mkdir($cacheDir, 0755, true) &&
    !is_dir($cacheDir)
) {
    // without writable cache storage, continue without caching.
    $cacheDir = null;
    $cacheFile = '';
    $lockFile = '';
}

// 2. Fast path: return fresh cached data.
if ($cacheDir !== null) {
    $cachedReleases = getFreshReleasesCache($cacheFile);

    if ($cachedReleases !== null) {
        respondReleases($cachedReleases, 'HIT');
    }
}

// 3. Open a lock file to cordinate cache refreshes.
$lockHandle = null;
$hasLock = false;

if ($cacheDir !== null) {
    $lockHandle = @fopen($lockFile, 'c');

    if ($lockHandle !== false && $lockHandle !== null) {
        $hasLock = flock($lockHandle, LOCK_EX);
    }
}

// 4. Another req may have refreshed the cache while
// this req was waiting for the lock. check again.
if ($hasLock) {
    $cachedReleases = getFreshReleasesCache($cacheFile);

    if ($cachedReleases !== null) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);

        respondReleases($cachedReleases, 'HIT');
    }
}

try {
    // Fetch repo before starting the DB transaction.
    $github = new GithubService();
    $releases = $github->fetchReleases($repo);

    if (!is_array($releases)) {
        throw new RuntimeException(
            "Github returned an invalid releases response"
        );
    }

    $cacheStatus = "BYPASS";

    // 6. Save the new cache atomically.
    if ($cacheDir !== null && $hasLock) {
        $cacheData = json_encode([
            'cached_at' => time(),
            'releases' => $releases
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);

        if ($cacheData !== false) {
            $tempFile = tempnam($cacheDir, 'releases-');

            if ($tempFile !== false) {
                $written = file_put_contents(
                    $tempFile, $cacheData, LOCK_EX
                );

                if ($written !== false && rename($tempFile, $cacheFile)) {
                    $cacheStatus = 'MISS';
                } else {
                    @unlink($tempFile);
                }
            } 
        }
    }

    // Release the lock before returning the response
    if ($hasLock) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);
        $hasLock = false;
    } elseif (is_resource($lockHandle)) {
        fclose($lockHandle);
    }

    respondReleases($releases, $cacheStatus);
} catch (Throwable $e) {
    error_log('Github releases req failed: ' . $e->getMessage());

    // 7. Github failed: release the lock and try stale cache.
    if ($hasLock) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);
        $hasLock = false;
    } elseif (is_resource($lockHandle)) {
        fclose($lockHandle);
    }

    if ($cacheDir !== null) {
        $staleCache = readReleasesCache($cacheFile);

        if ($staleCache !== null) {
            respondReleases($staleCache['releases'], 'STALE');
        }
    }

    http_response_code(502);

    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch Github releases",
        "releases" => [],
    ], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
}
