const routes = {
    "/": {
        page: "/pages/home.php",
        script: "/assets/js/home.js"
    },
    "/about": {
        page: "/pages/about.php",
        script: "/assets/js/about.js"
    },
    "/projects": {
        page: "/pages/project.php",
        script: "/assets/js/project.js"
    },
    "/contact": {
        page: "/pages/contact.php",
        script: "/assets/js/contact.js"
    },
};

const app = document.getElementById("app");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar_overlay");

function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');

    sidebarOverlay.classList.remove('hidden');
    menuBtn.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');

    sidebarOverlay.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
}

function toggleSidebar() {
    const isOpen = sidebar.classList.contains('translate-x-0');

    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

menuBtn?.addEventListener('click', toggleSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

async function fetchPage(url) {
    const response = await fetch(url);
    const html = await response.text();

    // Detect InfinityFree's browser veri response
    const isSecurityChallange =
        /This site requires Javascript to work/i.test(html) ||
        /This site requires Javascript to work/i.test(html) ||
        html.includes("/aes.js");

    if (isSecurityChallange) {
        console.warn("Possible Infinite security challenge detected.");

        // Avoid repeated reloads if the problem persists.
        const key = "infinityfree-reload-time";
        const lastReload = Number(sessionStorage.getItem(key) || 0);
        const now = Date.now();

        if (now - lastReload > 15000) {
            sessionStorage.setItem(key, String(now));
            window.location.reload();
            // Stop processing the current SPA navigation.
            return null;
        }

        throw new Error("Security verification response received. Reload cooldown is active.");
    }

    if (!response.ok) {
        throw new Error(
            `Failed to load ${url}: ${response.status}`
        );
    }

    return html;
}

async function router() {
    if (!app) {
        console.error("App container not found");
        return;
    }

    const path = window.location.pathname;

    let route = routes[path];
    let projectId = null;

    // Dynamic route: /123/source
    // Also supports a trailing slash: /123/source/
    const sourceMatch = path.match(/^\/([^/]+)\/source\/?$/);

    if (sourceMatch) {
        projectId = decodeURIComponent(sourceMatch[1]);

        route = {
            page: "/pages/source.php",
            script: "/assets/js/source.js"
        };
    }

    try {
        if (route) {
            const html = await fetchPage(route.page);
            if (html === null) return;
            // Insert php page into #app
            app.innerHTML = html;
            // load page specific javascript
            await loadPageScript(route.script, projectId);
        } else {
            const html = await fetchPage("/pages/404.php");
            if (html === null) return;
            app.innerHTML = html;
        }
    } catch (error) {
        console.error(error);

        app.innerHTML = `
            <div class="flex min-h-full items-center justify-center">
                <div class="text-center">
                    <h1 class="text-2xl font-bold text-red-500">
                        Something went wrong
                    </h1>

                    <p class="mt-2 text-green-300">
                        We couldn't load this page.
                    </p>
                </div>
            </div>
        `;
    }
}

function navigate(path) {
    window.history.pushState({}, "", path);
    // Clos sidebar if open
    closeSidebar();
    router();
}

// Make navigate available to other javascript modules
window.navigate = navigate;

async function loadPageScript(scriptSrc, projectId = null) {
    try {
        const module = await import(scriptSrc);

        if (typeof module.init === "function") {
            // Static pages receive null.
            // Source pages receive the project ID.
            await module.init(projectId);
        }
    } catch (error) {
        console.error(
            `Failed to load page script: ${scriptSrc}`, error
        );
    }
    // // Remove previously loaded script
    // const oldScript = document.querySelector("[data-page-script]");

    // if (oldScript) {
    //     oldScript.remove();
    // }

    // // Create new script
    // const script = document.createElement("script");

    // script.type = "module";
    // script.src = scriptSrc;

    // script.dataset.pageScript = "true";

    // document.body.appendChild(script);
}

document.addEventListener("click", function (e) {
    const target = e.target;

    if (!(target instanceof Element)) return;

    const link = e.target.closest("[data-link]");

    if (!link) return;

    // Only intercept normal left-clicks
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
    }

    // Ignore links that open in another tab or window
    if (link.target && link.target !== "_self") return;

    // Ignore download links
    if (link.hasAttribute("download")) return;

    const href = link.getAttribute("href");

    if (!href) return;

    // Only handle same-origin links
    const url = new URL(href, window.location.origin);

    if (url.origin !== window.location.origin) return;

    e.preventDefault();

    navigate(url.pathname + url.search + url.hash);
});

window.addEventListener("popstate", router);

// Initial page load
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", router);
} else {
    router();
}