export function OpenDeepLink(appUrl, webUrl, timeout = 2000) {
    let didOpenApp = false;

    // Listen for page visibility change (user leaves the page)
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            didOpenApp = true;
        }
    };


    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try opening the app link immediately (direct user gesture)
    window.location.href = appUrl;

    // After timeout, if app didn't open, fallback to web URL
    setTimeout(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (!didOpenApp) {
            // Fallback to web
            window.open(webUrl, '_blank');
        }
    }, timeout);
}
