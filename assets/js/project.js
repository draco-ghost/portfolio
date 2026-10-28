export async function init() {
    let projects = [];

    let search = "";
    // let sortBy = "views";
    let order = "desc";
    let dateRange = "all";
    let customDays = "";

    let menuOpen = false;
    let serverDown = false;
    let loading = true;

    const searchInput = document.getElementById("searchP");

    const customDaysInput = document.getElementById("customDays");
    const mobileCustomDaysInput = document.getElementById("mobileCustomDays");

    const projectsGrid = document.getElementById("projectsGrid");
    const loadingProjectsGrid = document.getElementById("loadingProjectsGrid");
    const noProjectState = document.getElementById("noProjectState");
    const serverDownState = document.getElementById("serverDownState");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const mobileFilterMenu = document.getElementById("mobileFilterMenu");

    if (!searchInput) {
        console.error("SearchP element not found");
        return;
    }

    if (!projectsGrid) {
        console.error("projectsGrid element not found");
        return;
    }

    if (!noProjectState) {
        console.error("noProjectState element not found");
        return;
    }

    projectsGrid.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");

        if (!btn || !projectsGrid.contains(btn)) return;

        // Find the project card that contains the clicked button
        const card = btn.closest("[data-project-id]");

        if (!card) return;

        // Get the project ID stored on the card
        const projectId = card.dataset.projectId;

        // Find the matching project in the API data
        const project = projects.find(p => String(p.id) === projectId);

        if (!project) {
            console.error("Project not found:", projectId);
            return;
        }

        let url;

        const action = btn.dataset.action;

        switch (action) {
            case "github":
                url = project.github_repo;
                break;

            case "source":
                url = `/${encodeURIComponent(project.id)}/source/${encodeURIComponent(project.name)}`;
                break;

            case "releases":
                url = `/releases/${encodeURIComponent(project.name)}`;
                break;
            default:
                return;
        };

        if (action === "source" || action === "releases") {
            window.location.assign(url);
            return;
        }

        // Validate the URL before opening it
        if (!url) {
            console.error("URL not available for this project");
            return;
        }

        try {
            const parsedUrl = new URL(url);
            if (
                parsedUrl.protocol !== "https:" ||
                parsedUrl.host !== "github.com"
            ) {
                console.error("Invalid project URL");
                return;
            }

            window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
        } catch {
            console.error("Invalid URL:", url);
        }
    });

    function showLoading() {
        loading = true;

        projectsGrid.classList.add("hidden");
        noProjectState.classList.add("hidden");
        serverDownState.classList.add("hidden");
        loadingProjectsGrid.classList.remove("hidden");

        loadingProjectsGrid.innerHTML = Array.from(
            { length: 3 },
            () => `
                <div class="place-content-center">

                    <div class='w-full h-full'>
                        <div class='project_card flex flex-col h-full relative overflow-hidden select-none md:rounded-3xl'>
                            <div class='flex gap-2 pt-3 pb-3 px-7 justify-between place-items-center'>
                                <div class="w-full">
                                    <div class='bg-green-500/20 w-1/2 animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                                </div>
                                <div class='hidden items-center gap-2'>
                                    <div class='bg-green-500/20 w-full animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>
                                </div>
                            </div>

                            <div class='w-full h-50 relative'>
                                <div class='bg-green-500/20 animate-pulse h-full p-[0px_20px]'></div>
                            </div>

                            <div class='bg-green-500/20 mt-2 animate-pulse h-8 p-[0px_20px] rounded-2xl'></div>

                            <div class="flex flex-col">

                                <div class='w-full btn_grid mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>

                                        <div class='project_btn rounded-3xl animate-pulse h-8 p-[0px_20px]'></div>

                                        <div class='project_btn rounded-3xl animate-pulse h-8 p-[0px_20px]'></div>

                                        <div class='d_btn'>
                                            <div class='project_btn rounded-3xl animate-pulse h-8 p-[0px_20px]'></div>
                                        </div>

                                    </div>

                            </div>

                        </div>
                    </div>

                </div>

            `
        ).join("");
    };

    function showProject() {
        loading = false;

        loadingProjectsGrid.classList.add("hidden");
        noProjectState.classList.add("hidden");
        serverDownState.classList.add("hidden");
        projectsGrid.classList.remove("hidden");
    }

    function showNoProject() {
        loading = false;

        loadingProjectsGrid.classList.add("hidden");
        projectsGrid.classList.add("hidden");
        serverDownState.classList.add("hidden");
        noProjectState.classList.remove("hidden");
    }

    // Fetch projects from php api
    async function fetchProjects() {
        const maxRetries = 3;

        loading = true;
        serverDown = false;

        showLoading();

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            let timeout;

            try {
                console.log(`Fetching projects... attempt ${attempt}/${maxRetries}`);

                const controller = new AbortController();

                timeout = setTimeout(() => {
                    controller.abort();
                }, 5000);

                const res = await fetch("/api/projects.php", {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch projects");
                }

                projects = Array.isArray(data.projects) ? data.projects : [];

                serverDown = false;
                loading = false;

                renderProjects();

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
        serverDown = true;
        loading = false;

        renderProjects();
    }

    document.querySelectorAll(".custom_select").forEach(select => {
        const trigger = select.querySelector(".select_trigger");
        const options = select.querySelector(".select_options");
        const label = select.querySelector(".select_label");

        if (!trigger || !options || !label) {
            console.error("Invalid custom select:", select);
            return;
        }

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".select_options")
                .forEach(menu => {
                    if (menu !== options) {
                        menu.classList.add("hidden");
                    }
                });
            options.classList.toggle("hidden");
        });

        select.querySelectorAll(".select_option").forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;

                const text = option.textContent.trim();

                label.textContent = text;
                options.classList.add("hidden");

                // Update state
                const selectName = select.dataset.select;

                // if (selectName === "sortBy" ||
                //     selectName === "mobileSortBy"
                // ) {
                //     sortBy = value;
                // }

                if (selectName === "order" ||
                    selectName === "mobileOrder"
                ) {
                    order = value;
                }

                if (
                    selectName === "dateRange" ||
                    selectName === "mobileDateRange"
                ) {
                    dateRange = value;

                    if (value !== "custom") {
                        customDays = "";
                        customDaysInput.value = "";
                        mobileCustomDaysInput.value = "";
                        customDaysInput.classList.add("hidden");
                        mobileCustomDaysInput.classList.add("hidden");
                    } else {
                        customDaysInput.classList.remove("hidden");
                        mobileCustomDaysInput.classList.remove("hidden");
                    }
                }

                renderProjects();
            });
        });
    });

    // Search
    searchInput.addEventListener("input", (event) => {
        search = event.target.value.toLowerCase();
        renderProjects();
    });

    // Custom days
    customDaysInput.addEventListener("input", (e) => {
        customDays = e.target.value;
        customDaysInput.value = customDays;
        renderProjects();
    });

    mobileCustomDaysInput.addEventListener("input", (e) => {
        customDays = e.target.value;
        mobileCustomDaysInput.value = customDays;
        renderProjects();
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        menuOpen = !menuOpen;

        if (menuOpen) {
            mobileFilterMenu.hidden = false;
        } else {
            mobileFilterMenu.hidden = true;
        }
    });

    // close dropdown when clicking outside
    document.addEventListener("click", () => {
        document.querySelectorAll(".select_options")
            .forEach(menu => {
                menu.classList.add("hidden");
            });
    });

    // Resize
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            menuOpen = false;
            mobileFilterMenu.classList.add("hidden");
        }
    });

    // Filter + sort
    function getFinalProjects() {
        let result = [...projects];

        // search
        result = result.filter(project => {
            const name = (project.name || "").toLowerCase();
            return name.includes(search);
        });

        // Date filter
        result = result.filter(project => {
            if (dateRange === "all") {
                return true;
            }

            const days = dateRange === "custom"
                ? Number(customDays)
                : Number(dateRange);

            if (!days || days <= 0) {
                return true;
            }

            const cutoff = new Date();

            cutoff.setDate(cutoff.getDate() - days);

            return new Date(
                project.repo_created_at
            ) >= cutoff;
        });

        // sort
        // result.sort((a, b) => {
        //     let valA = 0;
        //     let valB = 0;

        //     if (sortBy === "views") {
        //         valA = Number(a.views ?? 0);
        //         valB = Number(b.views ?? 0);
        //     } else if (sortBy === "likes") {
        //         valA = Number(a.likes ?? 0);
        //         valB = Number(b.likes ?? 0);
        //     } else {
        //         valA = new Date(a.created_at).getTime();
        //         valB = new Date(b.created_at).getTime();
        //     }

        //     const result = valA - valB;

        //     return order === "asc"
        //         ? result
        //         : -result;
        // });

        return result;
    }

    function initProjectImages() {
        const images = projectsGrid.querySelectorAll(".project_img");

        images.forEach((img) => {
            const container = img.closest(".project_image");
            const spinner = container?.querySelector(".image_spinner");

            function finishLoading() {
                spinner?.classList.add('hidden');
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
            }

            img.addEventListener("load", finishLoading, { once: true });

            img.addEventListener("error", () => {
                if (!img.dataset.fallbackUsed) {
                    img.dataset.fallbackUsed = "true";
                    img.src = "/assets/uploads/default.webp";
                    return;
                }
                // Even the fallback failed: stop spinning.
                finishLoading();
            }, { once: true });

            // Handle cached images that loaded before the event listener
            if (img.complete) {
                if (img.naturalWidth > 0) {
                    finishLoading();
                } else {
                    img.dispatchEvent(new Event('error'));
                }
            }
        });
    }

    // Render projects
    function renderProjects() {
        if (serverDown) {
            loadingProjectsGrid.classList.add("hidden");
            projectsGrid.classList.add("hidden");
            noProjectState.classList.add("hidden");
            serverDownState.classList.remove("hidden");
            return;
        }

        const finalProjects = getFinalProjects();

        // no project
        if (finalProjects.length === 0) {
            projectsGrid.innerHTML = "";
            showNoProject();
            return;
        }

        // Show projects
        showProject();

        // build projects cards
        projectsGrid.innerHTML = finalProjects.map(project => {
            return `
                <div class="min-w-0 w-full h-full"
                    data-project-id="${escapeHtml(project.id)}">

                    <div class='project_card flex flex-col min-w-0 w-full h-full
                        relative overflow-hidden select-none md:rounded-3xl'>
                        <div class='flex pt-3 pb-3 px-7 justify-between place-items-center'>
                            <div>
                                ${escapeHtml(project.name || "Unnamed Project")}
                            </div>
                            <div class='hidden items-center gap-2'>
                                <span>👁 ${Number(project.views ?? 0)}</span>
                            </div>
                        </div>

                        <div class='project_image relative w-full h-50 overflow-hidden'>
                            <div class="image_spinner absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                                aria-label="Loading image" role="status">
                                <div class="h-8 w-8 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin"></div>
                            </div>

                            <img
                                src="${
                                    project.image_path 
                                        ? escapeHtml(project.image_path)
                                        : '/assets/uploads/default.webp'
                                    }"
                                alt="${escapeHtml(project.name || "")}"
                                class="project_img absolute inset-0 w-full h-full object-cover mb-3 opacity-0 transition-opacity duration-300"
                                loading="lazy"
                            >
                        </div>

                        <div class='flex flex-col place-content-center flex-1'>

                            <div class="text-gray-400 text-sm text-center px-8">
                                <p>${escapeHtml(project.description || "")}</p>
                            </div>

                            ${project.name === "portfolio" ? (
                                `
                                    <div class="flex flex-col">

                                        <div class='port_btn_grid mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>

                                                <div>
                                                    <div role='button' data-action='github'
                                                        class='project_btn rounded-3xl text-center w-full'>
                                                        Github
                                                    </div>
                                                </div>

                                                <div>
                                                    <div role='button' data-action='source'
                                                        class='project_btn rounded-3xl text-center'>
                                                        Source Code
                                                    </div>
                                                </div>

                                            </div>

                                    </div>
                                `
                            ) : (
                                `
                                    <div class="flex flex-col">

                                        <div class='btn_grid mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>

                                                <div>
                                                    <div role='button' data-action='github'
                                                        class='project_btn rounded-3xl text-center w-full'>
                                                        Github
                                                    </div>
                                                </div>

                                                <div>
                                                    <div role='button' data-action='source'
                                                        class='project_btn rounded-3xl text-center'>
                                                        Source Code
                                                    </div>
                                                </div>

                                                <div class='d_btn'>
                                                    <div role='button' data-action='releases'
                                                        class='project_btn rounded-3xl text-center p-[0_25px] md:p-0'>
                                                        Download
                                                    </div>
                                                </div>

                                            </div>

                                    </div>
                                `
                            )}
                        </div>
                    </div>
                </div>
            `;

        }).join("");

        initProjectImages();
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

    // Init state
    await fetchProjects();
}