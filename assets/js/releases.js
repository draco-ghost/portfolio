export async function init(projectId, projectName) {
    let releases = [];
    let loading = true;

    const noReleases = document.getElementById("noReleases");

    const loadingAllReleases = document.getElementById("loadingAllReleases");
    const allReleases = document.getElementById("allReleases");

    const releaseBack = document.getElementById("releaseBack");

    if (!projectName || !allReleases) {
        if (allReleases) {
            allReleases.textContent = `Invalid project URL. ${projectName}`;
        }
        return;
    }

    if (!noReleases) {
        console.error("noReleases element not found");
        return;
    }

    if (!releaseBack) {
        console.error("releaseBack element not found");
        return;
    }

    releaseBack.addEventListener("click", () => {
        window.history.back();
    });

    allReleases.addEventListener("click", (e) => {
        const btn = e.target.closest('[data-action="asset_top"]');

        if (!btn || !allReleases.contains(btn)) return;

        // Find only the release card that was clicked
        const card = btn.closest("[data-project-id]");
        if (!card) return;
        // Find the assets layout inside this card onlyy
        const assetCont = card.querySelector('[data-action="asset_cont"]');
        const arrow = btn.querySelector(".asset_arrow");
        if (!assetCont || !arrow) return;
        // Toggle visibility
        assetCont.classList.toggle('is_collapsed');
        arrow.classList.toggle("is_rotated");
    });

    function showLoading() {
        noReleases.classList.add("hidden");
        allReleases.classList.add("hidden");
        loadingAllReleases.classList.remove("hidden");

        loadingAllReleases.innerHTML = Array.from(
            { length: 3 },
            () => `
                <div class="flex flex-col gap-2 md:rounded-2xl p-4">

                    <div class='flex items-center gap-2'>
                        <div class='bg-green-500/20 w-full animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                        <div class='bg-green-500/20 w-full max-w-50 animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                    </div>

                    <div class='bg-green-500/20 animate-pulse h-6 p-[0px_20px] rounded-2xl'></div>

                    <div class='w-full h-50 relative'>
                        <div class='bg-green-500/20 animate-pulse h-full p-[0px_20px]'></div>
                    </div>

                    <div class="w-full flex flex-col gap-2">
                        <div class='flex items-center gap-2'>
                            <div class='w-full h-8 p-[0px_20px] rounded-2xl'></div>
                            <div class='bg-green-500/20 w-full max-w-50 animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                        </div>
                        
                        <div class='flex items-center gap-2'>
                            <div class='w-full h-8 p-[0px_20px] rounded-2xl'></div>
                            <div class='bg-green-500/20 w-full max-w-50 animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                        </div>
                    </div>

                </div>
            `
        ).join("");
    };

    function showReleases() {
        noReleases.classList.add("hidden");
        loadingAllReleases.classList.add("hidden");
        allReleases.classList.remove("hidden");
    }

    function showNoReleases() {
        loading = false;
        allReleases.classList.add("hidden");
        loadingAllReleases.classList.add("hidden");
        noReleases.classList.remove("hidden");
    }

    function showError() {
        noReleases.classList.add("hidden");
        loadingAllReleases.classList.add("hidden");
        allReleases.classList.remove("hidden");

        allReleases.textContent = "Unable to load releases. Please try again later.";
    }

    // Fetch Releases from php api
    async function fetchReleases() {
        const maxRetries = 3;

        loading = true;

        showLoading();

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            let timeout;

            try {
                console.log(`Fetching releases... attempt ${attempt}/${maxRetries}`);

                const controller = new AbortController();

                timeout = setTimeout(() => {
                    controller.abort();
                }, 5000);

                const res = await fetch("/api/repo_releases.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ repo: projectName }),
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch releases");
                }

                releases = Array.isArray(data.releases) ? data.releases : [];

                loading = false;

                renderReleases();

                return;
            } catch (error) {
                console.error(
                    `Request failed. Attempt ${attempt}/${maxRetries}`, error
                );

                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            } finally {
                clearTimeout(timeout);
            }
        }

        // All attempts failed
        loading = false;

        showError();
    }

    // Render releases
    function renderReleases() {
        // no project
        if (releases.length === 0) {
            allReleases.replaceChildren();
            showNoReleases();
            return;
        }

        // Show releases
        showReleases();

        // build releases cards
        allReleases.innerHTML = releases.map(release => {
            const name = escapeHtml(release.name || release.tag_name || "Untitled release");
            const tag = escapeHtml(release.tag_name || "No tag");
            const date = release.published_at
                ? new Date(release.published_at).toDateString() : "Date unavailable";
            const body = release.body_html || "No release note available";
            const assets = Array.isArray(release.assets)
                ? release.assets : [];
            // Build download links
            const assetsHtml = assets.map(asset => {
                const assetName = escapeHtml(asset.name || "Download");
                const downloadCount = Number(asset.download_count) || 0;
                // Github release assets normally use browser_download_url
                const downloadUrl = getSafeHttpUrl(asset.download_url);

                return `
                    <div class="flex flex-wrap items-center gap-2">
                        ${downloadUrl ? `
                            <a href="${escapeHtml(downloadUrl)}"
                                class="releases_btn flex gap-2 w-fit rounded-2xl p-[4px_20px]"
                                target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                                        viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                                    </svg>
                                    ${assetName}
                            </a>
                        ` : `
                            <span>${assetName}</span>
                        `}
                    </div>
                `;
            }).join("");
            // Build download count
            const assetsHtmlCount = assets.map(asset => {
                const downloadCount = Number(asset.download_count) || 0;

                return `
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-sm text-gray-400">
                            ${downloadCount} downloads
                        </span>
                    </div>
                `;
            }).join("");

            // Validate Github release URL
            const releaseUrl = getSafeHttpUrl(release.html_url);

            return `
                <div class='r_card md:rounded-2xl p-4'
                    data-project-id="${tag}">

                    <div class='releases_top flex items-center justify-between gap-2'>
                        <h2 class='font-bold font-serif'>${name}</h2>
                        ${assetsHtmlCount}
                    </div>

                    <div class="flex gap-2 items-center">
                        <p class="text-xs text-gray-400 mt-2">
                            Published at
                        </p>
                        <p class="published_date text-xs text-gray-400 mt-2">
                            ${escapeHtml(date)}
                        </p>
                    </div>

                    <div class="release_markdown mt-1 text-sm wrap-break-word">
                        ${body}
                    </div>

                    <div class="w-full">
                        <div data-action="asset_top" 
                            class="w-full">
                            <div class="asset_top w-full mt-1 flex gap-2 items-center">
                                <svg class="asset_arrow"
                                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" fill="currentColor">
                                    <path d="M480-360 280-560h400L480-360Z"/>
                                </svg>
                                <p>Assets</p>
                            </div>
                        </div>

                        <div data-action="asset_cont" class="asset_cont p-2 w-full">
                            <div class="asset_items flex flex-col gap-3">
                                <div class="assts mt-1 border text-white flex flex-col gap-2">
                                    ${assetsHtml || `
                                        <p class="text-sm text-gray-400">
                                            No downloadable assets.
                                        </p>
                                    `}
                                </div>

                                <div>
                                    ${releaseUrl ? `
                                        <a
                                            href="${escapeHtml(releaseUrl)}"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <div class='releases_btn flex w-fit items-center text-white rounded-2xl gap-2 p-[4px_20px]'>
                                                View release on Github
                                            </div>
                                        </a>
                                    ` : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        }).join("");
    }

    // Html escape
    // prevent project data from being inserted as raw HTML
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Validate external URLs
    function getSafeHttpUrl(value) {
        if (!value) return "";

        try {
            const url = new URL(value);
            if (url.protocol !== "https:") return "";
            return url.href;
        } catch {
            return "";
        }
    }

    // Init state
    await fetchReleases();
}