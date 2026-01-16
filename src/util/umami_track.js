export function trackOutbound(url) {
    try {
        // Only track if Umami is loaded
        if (!window.umami) return;

        // Only track external URLs
        const isExternal = !url.startsWith(window.location.origin) && url.startsWith('http');
        if (isExternal) {
            window.umami('outbound-link-click', { url });
        }
    } catch (err) {
        console.error('tracking error: ', err);
    }
}
