export async function init() {
    const cardContainer = document.getElementById("about_cards");

    if (!cardContainer) return;

    function showSkeleton() {
        cardContainer.innerHTML = Array.from({ length: 4 }).map(() => `
            <article
                class="d_card overflow-hidden  rounded-2xl
                border border-green-500/30 p-4
                flex flex-col
                md:rounded-3xl cursor-pointer
                backdrop-blur-xl">

                <div class="w-16 h-16 rounded-2xl bg-gray-700/60 animate-pulse"></div>

                <div class="py-4">
                    <div class="w-2/3 h-6 rounded-2xl bg-gray-700/60 animate-pulse"></div>
                    
                    ${Array.from({ length: 4 }).map((_, i) => `
                        <div key="${i}" class='flex gap-5 p-2 place-items-center hover:bg-pink-700/20 rounded-2xl relative group'>
                            <div class='relative w-full z-20 flex gap-2 rounded-2xl'>
                    
                                <div class="w-10 h-6 rounded-xl bg-gray-700/60 animate-pulse"></div>
                    
                                <div class="w-full h-6 rounded-xl bg-gray-700/60 animate-pulse"></div>
                            </div>
                        </div>
                    `).join("")}
                </div>
                
            </article>
        `).join("");
    }

    async function loadAbout() {
        showSkeleton();

        try {
            const [aboutResponse, skillResponse] = await Promise.all([
                fetch("assets/data/about.json"),
                fetch("assets/data/skills.json")
            ]);

            if (!aboutResponse.ok) {
                throw new Error("Failed to load about.json")
            }

            if (!skillResponse.ok) {
                throw new Error("Failed to load skills.json")
            }

            const aboutData = await aboutResponse.json();
            const skillsData = await skillResponse.json();

            renderAbout(aboutData, skillsData);
        } catch (error) {
            console.error(error);

            cardContainer.innerHTML = `
                <div class='h-full flex items-center justify-center'>
                    <div class='md:self-center'>
                        <div class='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                            <p class="text-red-500">
                                Failed to load about information.
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function renderAbout(aboutData = [], skillsData = {}) {
        cardContainer.innerHTML = aboutData.map(item => {
            const skills = skillsData[item.id] ?? [];

            return `
                <article
                    class="d_card overflow-hidden  rounded-2xl
                    border border-green-500/30 p-4
                    md:rounded-3xl cursor-pointer
                    backdrop-blur-xl">

                    <img
                        src="${item.ui}"
                        alt="${item.header}"
                        class="w-16 h-16">

                    <div class="py-4">

                        <p class="text-xl font-bold">
                            ${item.header}
                        </p>

                        ${skills.map((skill, index) => `
                            <div key="${index}" class='flex gap-5 p-2 place-items-center hover:bg-green-700/20 rounded-2xl relative group'>
                                <div class='absolute inset-0 w-full h-full bg-green-500/20 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                                <div class='relative w-full z-20 flex gap-2 rounded-2xl'>
                        
                                    <img src="${item.check}"
                                        alt="check" class='w-6 h-6 shrink-0 object-contain' />
                        

                                    <div>
                                        <span>
                                            ${skill.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </article>
            `;
        }).join("");
    }

    await loadAbout();
}