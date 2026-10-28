export async function init(projectId, projectName) {
    let tree = [];
    let loading = true;
    let expandedFolders = new Set([""]);
    let selectedFile = null;
    let activeFileController = null;

    const sourceContent = document.getElementById("sourceContent");

    const kofiBtn = document.getElementById("kofiBtn");
    const contactBtn = document.getElementById("contactBtn");
    const noSourcesAllowed = document.getElementById("noSourcesAllowed");
    const noSources = document.getElementById("noSources");
    const allSources = document.getElementById("allSources");
    const loadingAllSources = document.getElementById("loadingAllSources");

    const requiredElements = [
        ["kofiBtn", kofiBtn],
        ["contactBtn", contactBtn],
        ["noSourcesAllowed", noSourcesAllowed],
        ["noSources", noSources],
        ["allSources", allSources],
        ["loadingAllSources", loadingAllSources],
    ];

    if (!projectId || !projectName || !sourceContent) {
        if (sourceContent) {
            sourceContent.textContent = "Invalid project URL.";
        }
        return;
    }

    for (const [id, element] of requiredElements) {
        if (!element) console.error(`#${id} element not found`)
    }

    if (requiredElements.some(([, element]) => !element)) {
        return;
    }

    kofiBtn.addEventListener("click", () => {
        let url = "https://ko-fi.com/draco_ghost";

        try {
            const parsedUrl = new URL(url);
            if (
                parsedUrl.protocol !== "https:" ||
                parsedUrl.host !== "ko-fi.com"
            ) {
                console.error("Invalid project URL");
                return;
            }

            window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
        } catch {
            console.error("Invalid URL:", url);
        }
    });

    contactBtn.addEventListener("click", () => {
        let url = "/contact";
        window.location.href = url;
    });
    function showLoading() {
        noSourcesAllowed.classList.add("hidden");
        noSources.classList.add("hidden");
        allSources.classList.add("hidden");
        loadingAllSources.classList.remove("hidden");
    };

    function showSource() {
        noSourcesAllowed.classList.add("hidden");
        noSources.classList.add("hidden");
        loadingAllSources.classList.add("hidden");
        allSources.classList.remove("hidden");
    }

    function showNoSource() {
        loading = false;
        allSources.classList.add("hidden");
        noSources.classList.add("hidden");
        loadingAllSources.classList.add("hidden");
        noSourcesAllowed.classList.remove("hidden");
    }

    function showNoSourceAllowed() {
        loading = false;
        allSources.classList.add("hidden");
        loadingAllSources.classList.add("hidden");
        noSourcesAllowed.classList.add("hidden");
        noSources.classList.remove("hidden");
    }

    function showError() {
        noSourcesAllowed.classList.add("hidden");
        loadingAllSources.classList.add("hidden");
        noSources.classList.add("hidden");
        allSources.classList.remove("hidden");

        allSources.textContent = "Unable to load sources. Please try again later.";
    }

    async function fetchSourceTree() {
        const maxRetries = 3;

        loading = true;

        showLoading();

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            let timeout;

            try {
                console.log(`Fetching sources... attempt ${attempt}/${maxRetries}`);

                const controller = new AbortController();

                timeout = setTimeout(() => {
                    controller.abort();
                }, 5000);

                const res = await fetch(
                    `/api/repo_tree_files.php?repo=${encodeURIComponent(projectName)}`,
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        signal: controller.signal,
                    });

                const data = await res.json();

                // Repository is not in the allowlist (or does not exist).
                if (
                    res.status === 404 &&
                    data.success === false &&
                    data.message === "Repository not found."
                ) {
                    loading = false;
                    showNoSource();
                    return;
                }

                // Handle other HTTP errors.
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch sources");
                }

                tree = Array.isArray(data.tree) ? data.tree : [];

                loading = false;

                renderSources();

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

    function buildFileTree(items) {
        const root = {
            name: "portfolio",
            path: "",
            type: "tree",
            children: {}
        };

        for (const item of items) {
            const parts = item.path.split("/");
            let current = root;

            parts.forEach((part, index) => {
                const isFile = index === parts.length - 1;

                if (!current.children[part]) {
                    current.children[part] = {
                        name: part,
                        path: parts.slice(0, index + 1).join("/"),
                        type: isFile ? item.type : "tree",
                        sha: isFile ? item.sha : null,
                        size: isFile ? item.size : null,
                        children: {}
                    };
                } else if (isFile) {
                    // Use the API's actual metadata for this item.
                    Object.assign(current.children[part], item, {
                        name: part,
                        children: current.children[part].children
                    });
                }

                current = current.children[part];
            });
        }

        return root;
    }

    function formatFileSize(bytes) {
        if (bytes == null || !Number.isFinite(Number(bytes)) || Number(bytes) < 0) {
            return "";
        }

        bytes = Number(bytes);
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        const units = ["KB", "MB", "GB", "TB"];
        let size = bytes / 1024;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    function renderTreeNode(node, depth = 0) {
        const isFolder = node.type === "tree";
        const isExpanded = expandedFolders.has(node.path);
        const isSelected = selectedFile?.path === node.path;

        const icon = isFolder
            ? (isExpanded ? "📂" : "🗂️") : "📄";

        const arrow = isFolder
            ? `<span class="tree_arrow" style="font-size: 20px;">
                    ${isExpanded ? "👇" : "👉"}
                </span>`
            : `<span class="tree_arrow-placeholder"></span>`;

        const sizeHtml = !isFolder && node != null
            ? `<span class="tree_size">${formatFileSize(node.size)}</span>`
            : "";

        const row = `
            <button type="button"
                class="tree_row ${isSelected ? "selected" : ""}"
                style="padding-left: ${depth * 20 + 8}px"
                data-path="${escapeHtml(node.path)}"
                data-type="${node.type}"
                title="${node.name}">

                    <div class="flex items-center gap-2 justify-between w-full min-w-0">
                        <div class="flex items-center gap-2 min-w-0">
                            ${arrow}
                            <span class="text-xl">${icon}</span>
                            <span class="tree_name">${escapeHtml(node.name)}</span>
                        </div>
                        
                        ${sizeHtml}
                    </div>
            </button>
        `;

        if (!isFolder || !isExpanded) {
            return row;
        }

        const children = Object.values(node.children || {})
            .sort((a, b) => {
                if (a.type !== b.type) {
                    return a.type === "tree" ? -1 : 1;
                }

                return a.name.localeCompare(b.name);
            }).map(child => renderTreeNode(child, depth + 1))
            .join("");

        return row + children;
    }
    // Html escape
    // prevent project data from being inserted as raw HTML
    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    // Render sources
    function renderSources() {
        // no sources
        if (tree.length === 0) {
            showNoSourceAllowed();
            return;
        }

        // Show releases
        showSource();

        const fileTree = buildFileTree(tree);

        // build releases cards
        allSources.innerHTML = `
            <div class="source_explorer">
                <aside class="source_sidebar">
                    <div class="source_heading">Explorer</div>
                    <div class="source_root">
                        ${renderTreeNode(fileTree)}
                    </div>
                </aside>

                <section class="source_preview" id="sourcePreview">
                    <div class="source_empty">
                        <div class='w-full flex flex-col gap-2 items-center md:rounded-2xl'>
                            Select a file to view its contents.
                        </div>
                    </div>
                </section>
            </div>
        `;

        // console.log(
        //     "RENDERED BUTTONS:",
        //     [...allSources.querySelectorAll(".tree_row")].map(button => ({
        //         name: button.querySelector(".tree_name")?.textContent,
        //         inlineStyle: button.getAttribute("style"),
        //         computedPadding: getComputedStyle(button).paddingLeft,
        //         className: button.className
        //     }))
        // );

        const explorer = allSources.querySelector(".source_explorer");
        const rootElement = allSources.querySelector(".source_root");

        rootElement.addEventListener('click', event => {
            const button = event.target.closest(".tree_row");

            if (!button || !rootElement.contains(button)) return;

            const path = button.dataset.path;
            const type = button.dataset.type;

            if (type === "tree") {
                if (expandedFolders.has(path)) {
                    expandedFolders.delete(path);
                } else {
                    expandedFolders.add(path);
                }

                // Update only the tree, preserving the current preview.
                rootElement.innerHTML = renderTreeNode(fileTree);
                return;
            }

            const file = tree.find(item => item.path === path);
            if (!file) return;

            selectedFile = file;
            // Update the selected row without rebuilding the whole explorer.
            rootElement.innerHTML = renderTreeNode(fileTree);
            // Switch to the preview only on mobi.
            if (window.matchMedia("(max-width: 1023px)").matches) {
                explorer.classList.add("mobile_file_view");
            }
            loadFileContent(file, explorer);

        });

        if (selectedFile) {
            const currentFile = tree.find(item => item.path === selectedFile.path);

            if (currentFile) {
                loadFileContent(currentFile, explorer);
            }
        }
    }

    async function loadFileContent(file, explorer) {
        const preview = allSources.querySelector("#sourcePreview");
        if (!preview) return;
        // Cancel the previous file request if one is running.
        if (activeFileController) {
            activeFileController.abort();
        }

        const controller = new AbortController();
        activeFileController = controller;

        // Show a loding state.
        preview.innerHTML = `
            <div class="source_empty">
                <div class='d_card w-full flex flex-col gap-4 items-center md:rounded-2xl'>
                    <div class="h-8 w-8 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin"></div>
                    <p>Loading ${escapeHtml(file.path)}...</p>
                </div>
            </div>
        `;

        try {
            const params = new URLSearchParams({
                repo: projectName,
                path: file.path
            });
            const res = await fetch(
                `/api/repo_file_content.php?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    },
                    signal: controller.signal,
                });

            const data = await res.json();
            // Ignore a response if the user selected another file.
            if (controller.signal.aborted || activeFileController !== controller) {
                return;
            }
            // Repository is not in the allowlist (or does not exist).
            if (!res.ok || data.success === false) {
                throw new Error(data.message || `Failed to load file: ${res.status}`);
            }

            // Successfully loaded the file content. 
            // data contains: { success: true, data: { name, path, content, size, html_url, ... } }
            // Adjust `data.data` or `data` depending on how your `repoRespond()` helper formats the JSON payload.
            const fileData = data.data || data;
            const content = fileData.content || "";
            console.log("CONTENT:", content);

            // Determine language for syntax highlighting based on file extension
            const ext = file.path.split('.').pop().toLowerCase();

            const langMap = {
                php: 'php', js: 'javascript', json: 'json', html: 'html',
                css: 'css', md: 'markdown', py: 'python'
            };

            const imageExt = new Set([
                "jpg", "jpeg", "jfif", "png", "webp", "avif", "gif", "apng",
                "bmp", "dib", "tiff", "tif", "ico", "heif", "heic", "jxl",
                "svg"
            ]);

            const langClass = langMap[ext] || 'plaintext';
            const isImage = imageExt.has(ext);
            const sizeHtml = formatFileSize(fileData.size);

            let fileContentHtml;
            let totalLines;

            if (isImage && fileData.content_encoding === "base64") {
                const allowedMimeTypes = new Set([
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'image/avif',
                    'image/gif',
                    'image/apng',
                    'image/bmp',
                    'image/tiff',
                    'image/x-icon',
                    'image/heif',
                    'image/heic',
                    'image/jxl',
                    'image/svg+xml',
                ]);
                const mimeType = allowedMimeTypes.has(fileData.mime_type)
                    ? fileData.mime_type : null;
                totalLines = "";

                if (mimeType) {
                    fileContentHtml = `
                        <div class="image_preview">
                            <img
                                src="data:${mimeType};base64,${content}"
                                alt="${escapeHtml(fileData.name || fileData.path)}"
                                class="preview_image">
                        </div>
                    `;
                } else {
                    fileContentHtml = `
                        <p class="text-red-500">
                            Unsupported image format.
                        </p>
                    `;
                }
            } else {
                const lines = content.split(/\r\n|\n|\r/);
                totalLines = lines.length;

                const lineNumbersHtml = lines.map(
                    (_, index) => `<div>${index + 1}</div>`
                ).join("");

                fileContentHtml = `
                    <div class="code_container">
                        <div class="line_numbers">${lineNumbersHtml}</div>
                         <pre><code class="language-${langClass}">${escapeHtml(content)}</code></pre>
                    </div>
                `;
            }

            preview.innerHTML = `
                <div class="file_preview">
                    <div class="file_data_top">
                        <div class="flex items-center gap-2">
                            <div class="flex items-center shrink-0">
                                <div id="fileBackBtn" class="fileBackBtn"
                                    aria-label="Back to file explorer"
                                    title="Back to files">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        height="24px" viewBox="0 -960 960 960"
                                        width="24px" fill="currentColor">
                                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="flex gap-2 items-center"
                                style="color: rgb(113 113 122); background: rgb(113 113 122 / 20%);
                                    border-radius: 15px; padding: 5px 10px 5px 10px;">
                                <p>👉<p>
                                <span class="font-bold">${escapeHtml(fileData.path)}</span>
                            </div>
                            ${totalLines !== "" ? `
                                <div class="flex gap-2 items-center">
                                    <p style="font-size: 12px;">${totalLines} lines</p>
                                    <p>·</p>
                                </div>
                            ` : ""}
                            <div class="flex gap-2 items-center" style="font-size: 12px;">
                                ${sizeHtml}
                            </div>
                        </div>
                        ${fileData.html_url ?
                    `<a href="${escapeHtml(fileData.html_url)}"
                                target="_blank" rel="noopener noreferrer">
                                    View on GitHub
                            </a>` : ""}
                    </div>
                    <div class="file_data">
                        ${fileContentHtml}
                    </div>
                </div>
            `;

            // Trigger Highlight.js syntax coloring
            if (window.hljs) {
                preview.querySelectorAll('pre code').forEach((block) => {
                    window.hljs.highlightElement(block);
                });
            }

            const backBtn = preview.querySelector(".fileBackBtn");
            backBtn?.addEventListener("click", () => {
                if (window.matchMedia("(max-width: 1024px)").matches) {
                    explorer.classList.remove("mobile_file_view");
                }
            });
        } catch (error) {
            if (error.name === "AbortError") return;

            console.error("Failed to load file content:", error);

            preview.innerHTML = `
                <div class="d_card w-full flex flex-col gap-2 items-center md:rounded-2xl text-red-500">
                    Failed to load ${escapeHtml(file.path)}. Please try again.
                </div>
            `;
        }
    }

    fetchSourceTree();

}