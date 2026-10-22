export async function init(projectId) {
    const sourceContent = document.getElementById("sourceContent");

    const kofiBtn = document.getElementById("kofiBtn");
    const contactBtn = document.getElementById("contactBtn");
    
    const sourceBack = document.getElementById("sourceBack");

    if (!projectId || !sourceContent) {
        if (sourceContent) {
            sourceContent.textContent = "Invalid project URL.";
        }
        return;
    }

    if (!kofiBtn) {
        console.error("kofiBtn element not found");
        return;
    }

    if (!contactBtn) {
        console.error("contactBtn element not found");
        return;
    }

    if (!sourceBack) {
        console.error("sourceBack element not found");
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

    sourceBack.addEventListener("click", () => {
        console.log("Back clicked");
        window.history.back();
    });
}