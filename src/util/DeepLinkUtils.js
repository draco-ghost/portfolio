import React from 'react'

export function OpenDeepLink(appUrl, webUrl, { timeout = 2000 } = {}) {
  return new Promise((resolve, reject) => {
    let didOpenApp = false;

    // Listen for page visibility change (user leaves the page)
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            didOpenApp = true;
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try opening the app
    window.location.href = appUrl;

    // After timeout, if app didn't open, fallback to web URL
    setTimeout(() => {
       document.removeEventListener('visibilitychange', handleVisibilityChange);
       if (!didOpenApp) {
        // Fallback to web
        window.open(webUrl, '_blank');
        resolve('web');
       } else {
        resolve('app');
       }
    }, timeout);

  })
}

export default DeepLinkUtils
