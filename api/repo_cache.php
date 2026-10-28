<?php

declare(strict_types=1);

const REPO_CACHE_TTL = 86400; // 24 hrs

function repoCacheDirectory(): ?string
{
    $directory = dirname(__DIR__) . '/cache';

    if (
        !is_dir($directory) &&
        !mkdir($directory, 0755, true) &&
        !is_dir($directory)
    ) {
        return null;
    }

    if (!is_writable($directory)) {
        return null;
    }

    return $directory;
}

function repoCachePath(string $key): ?string
{
    $directory = repoCacheDirectory();

    if ($directory === null) return null;

    // Only generate hexadecimal kes are used in filenames.
    return $directory . '/repo-' . $key . '.json';
}

function repoReadCache(string $file): ?array
{
    if (!is_file($file)) return null;

    $json = file_get_contents($file);

    if ($json === false) return null;

    $data = json_decode($json, true);

    if (
        !is_array($data) ||
        !isset($data['cached_at']) ||
        !is_numeric($data['cached_at']) ||
        !isset($data['data']) ||
        !is_array($data['data'])
    ) {
        return null;
    }

    return $data;
};

// Return projects from a fresh cache, if available.
function repoFreshCache(string $file): ?array
{
    $cache = repoReadCache($file);

    if ($cache === null) return null;

    if (time() - (int) $cache['cached_at'] >= REPO_CACHE_TTL) return null;

    return $cache['data'];
}

function repoWriteCache(string $file, array $data): bool
{
    $directory = dirname($file);

    $json = json_encode(
        [
            'cached_at' => time(),
            'data' => $data,
        ],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE
    );

    if ($json === false) return false;

    $tempFile = @tempnam($directory, 'repo-');

    if ($tempFile === false) return false;

    $written = file_put_contents(
        $tempFile,
        $json,
        LOCK_EX
    );

    if ($written === false) {
        @unlink($tempFile);
        return false;
    }

    if (!@rename($tempFile, $file)) {
        @unlink($tempFile);
        return false;
    }

    return true;
}

// Send a consostent API response
function repoRespond(array $data, string $cacheStatus): never
{
    header("X-Repo-Cache: " . $cacheStatus);

    echo json_encode(
        [
            'success' => true,
        ] + $data,
        JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE
    );

    exit;
}

function repoError(int $status, string $message): never
{
    http_response_code($status);

    echo json_encode([
        'success' => false,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES);

    exit;
}

/**
 * Accept only repositories explicitly approved for public display.
 */
function repoIsAllowed(string $repo, array $allowlist): bool
{
    return in_array($repo, $allowlist, true);
}
