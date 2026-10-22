<?php

header("Content-Type: application/json; charset=UTF-8");

// Do not allow browser or proxies to cache API responses indefinitely.
// The server-side JSON file is our cache.
header("Cache-Control: no-store");

require_once "../DataBase.php";

const PROJECTS_CACHE_TTL = 86400; // 24 hrs

$cacheDir = dirname(__DIR__) . '/cache';
$cacheFile = $cacheDir . '/projects.json';
$lockFile = $cacheDir . '/projects.lock';

/**
 * Read and validate the cached data.
 * Returns null when the cache is missing or invalid.
 */

function readProjectsCache(string $file): ?array {
    if (!is_file($file)) return null;

    $json = file_get_contents($file);

    if ($json === false) return null;

    $data = json_decode($json, true);

    if (
        !is_array($data) ||
        !isset($data['cached_at']) ||
        !is_numeric($data['cached_at']) ||
        !isset($data['projects']) ||
        !is_array($data['projects'])
    ) {
        return null;
    }

    return $data;
};

// Return projects from a fresh cache, if available.
function getFreshProjectsCache(string $file): ?array {
    $cache = readProjectsCache($file);

    if ($cache === null) return null;

    if (time() - (int) $cache['cached_at'] >= PROJECTS_CACHE_TTL) return null;

    return $cache['projects'];
}

// Send a consostent API response
function respond(array $projects, string $cacheStatus): void {
    header("X-Projects-Cache: " . $cacheStatus);

    echo json_encode([
        'success' => true,
        'projects' => $projects
    ], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);

    exit;
}

// Serve stale data if it exists; otherwise return an error.
function respondWithDatabaseError(string $cacheFile): void {
    $stale = readProjectsCache($cacheFile);

    if ($stale !== null) {
        // Preserve portfolio availability during a database outage.
        respond($stale['projects'], 'STALE');
    }

    http_response_code(503);

    echo json_encode([
        'success' => false,
        'message' => 'Projects are temporarily unavailable.',
        'projects' => []
    ]);

    exit;
}

// 1. Create the cache dir if neccessary.
if (!is_dir($cacheDir)) {
    if (!mkdir($cacheDir, 0755, true) && !is_dir($cacheDir)) {
        // without writable cache storage, continue without caching.
        $cacheDir = null;
    }
}

// 2. Fast path: return fresh cached data.
// No database connection is made on this path.
if ($cacheDir !== null) {
    $cachedProjects = getFreshProjectsCache($cacheFile);

    if ($cachedProjects !== null) {
        respond($cachedProjects, 'HIT');
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
    $cachedProjects = getFreshProjectsCache($cacheFile);

    if ($cachedProjects !== null) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);

        respond($cachedProjects, 'HIT');
    }
}

// 5. Cache is missing or expired. Query MySQL.
try {
    $db = new DataBase();

    // Connect to db
    if (!$db->dbConnect()) {
        respondWithDatabaseError($cacheFile);
    }

    // Fetch projects
    $projects = $db->projectsFetch();

    // Database quer failed
    if ($projects === false || !is_array($projects)) {
        respondWithDatabaseError($cacheFile);
    }

    // 6. Save the new cache atomically.
    // If caching fails, still return the database results.
    if ($cacheDir !== null && $hasLock) {
        $cacheData = json_encode([
            'cached_at' => time(),
            'projects' => $projects
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);

        if ($cacheData !== false) {
            $tempFile = tempnam($cacheDir, 'projects-');

            if ($tempFile !== false) {
                $written = file_put_contents(
                    $tempFile, $cacheData, LOCK_EX
                );

                if ($written !== false && rename($tempFile, $cacheFile)) {
                    header('X-Projects-Cache: MISS');
                } else {
                    @unlink($tempFile);
                    header('X-Projects-Cache: BYPASS');
                }
            } else {
                header('X-Projects-Cache: BYPASS');
            }
        } else {
            header('X-Projects-Cache: BYPASS');
        }
    } else {
        header('X-Projects-Cache: BYPASS');
    }

    // 7. Return the same response shape expected b project.js
    echo json_encode([
        "success" => true,
        "projects" => $projects
    ], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
} catch (Throwable $e) {
    // Log details privately; do not expose data errors to visitors.
    error_log('Project API error: ' . $e->getMessage());

    respondWithDatabaseError($cacheFile);
} finally {
    if (is_resource($lockHandle)) {
        if ($hasLock) {
            flock($lockHandle, LOCK_UN);
        }

        fclose($lockHandle);
    }
}