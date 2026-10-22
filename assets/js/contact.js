export function init() {
    const {
        linkedinUrl: LINKED_IN_URL,
        linkedinAppUrl: LINKEDIN_APP_URL,
        githubUrl: GITHUB_URL,
        facebookUrl: FACEBOOK_URL,
        facebookAppUrl: FACEBOOK_APP_URL,
        kofiUrl: KOFI,
    } = window.APP_CONFIG;

    // ELEMENTS
    const linkedinBtn = document.getElementById('linkedIn_btn');
    const facebookBtn = document.getElementById('facebook_btn');
    const GithubBtn = document.getElementById('github_btn');
    const KofiBtn = document.getElementById('kofi_btn');

    const linkedinDialog = document.getElementById('linkedin_dialog');
    const facebookDialog = document.getElementById('facebook_dialog');

    // LinkedIn buttons
    const linkedinCancelBtn = document.getElementById('linkedin_cancel_btn');

    const linkedinAppBtn = document.getElementById('linkedin_app_btn');

    const linkedinWebBtn = document.getElementById('linkedin_web_btn');

    // Facebook buttons
    const facebookCancelBtn = document.getElementById('facebook_cancel_btn');

    const facebookAppBtn = document.getElementById('facebook_app_btn');

    const facebookWebBtn = document.getElementById('facebook_web_btn');

    // DEVICE
    const isMobi = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // DIALOG
    function openDialog(dialog) {
        if (!dialog) return;
        dialog.hidden = false;
    }

    function closeDialog(dialog) {
        if (!dialog) return;
        dialog.hidden = true;
    }

    // DEEP LINK
    function OpenDeepLink(appUrl, webUrl, timeout = 2000) {
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

    // LINKEDIN
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', () => {
            console.log("linkedin clicked");

            if (isMobi) {
                OpenDeepLink(LINKEDIN_APP_URL, LINKED_IN_URL);
            } else {
                openDialog(linkedinDialog);
            }
        });
    }

    if (linkedinAppBtn) {
        linkedinAppBtn.addEventListener('click', () => {
            closeDialog(linkedinDialog);
            OpenDeepLink(LINKEDIN_APP_URL, LINKED_IN_URL);
        });
    }

    if (linkedinWebBtn) {
        linkedinWebBtn.addEventListener('click', () => {
            closeDialog(linkedinDialog);
            window.open(LINKED_IN_URL, "_blank")
        });
    }

    if (linkedinCancelBtn) {
        linkedinCancelBtn.addEventListener('click', () => {
            closeDialog(linkedinDialog)
        });
    }

    // FACEBOOK
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            if (isMobi) {
                OpenDeepLink(FACEBOOK_APP_URL, FACEBOOK_URL);
            } else {
                openDialog(facebookDialog);
            }
        });
    }

    if (facebookAppBtn) {
        facebookAppBtn.addEventListener('click', () => {
            closeDialog(facebookDialog);

            if (isMobi) {
                OpenDeepLink(FACEBOOK_APP_URL, FACEBOOK_URL);
            } else {
                window.open(FACEBOOK_URL, "_blank");
            }
        });
    }

    if (facebookWebBtn) {
        facebookWebBtn.addEventListener('click', () => {
            closeDialog(facebookDialog);
            window.open(FACEBOOK_URL, "_blank");
        });
    }

    if (facebookCancelBtn) {
        facebookCancelBtn.addEventListener('click', () => {
            closeDialog(facebookDialog);
        });
    }

    if (GithubBtn) {
        GithubBtn.addEventListener('click', () => {
            window.open(GITHUB_URL, "_blank");
        })
    }

    if (KofiBtn) {
        KofiBtn.addEventListener('click', () => {
            window.open(KOFI, "_blank");
        })
    }
}