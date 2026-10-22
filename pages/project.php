<div class='w-full h-full'>
    <div class='text-green-400 w-full h-full flex flex-col'>

        <div class='flex p-2 gap-2'>

            <div class='w-full place-items-end'>
                <label for="searchP"></label>
                <div class='w-full md:w-[60%] lg:w-[70%] flex items-center px-3 bg-zinc-800 rounded-2xl overflow-hidden'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                    <div class="w-full">
                        <input type="search" name="searchP" id="searchP"
                            autoComplete='on'
                            class='bg-transparent text-white outline-none border-none p-2 size-full ml-2 mr-2 rounded-2xl'
                            placeholder='Search project...' />
                    </div>
                </div>
            </div>

            <div class='flex'>

                <button type="button" id="mobileMenuBtn"
                    class='lg:hidden flex items-center justify-center bg-zinc-700 w-10 rounded-full'
                    aria-label='dropdown menu'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                    </div>
                </button>

                <div>
                    <!-- Desktop filters -->
                    <div class='hidden lg:flex gap-2'>

                        <!-- <div class="custom_select relative w-40" data-select="sortBy">
                            <div>
                                <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                    <span class="select_label">
                                            Views
                                        </span>
                                    <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                        </span>
                                </button>
                            </div>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="views">
                                    Views
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="likes">
                                    Likes
                                </div>
                            </div>
                        </div> -->

                        <div class="custom_select relative w-40" data-select="order">
                            <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                <span class="select_label">
                                    Descending
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </span>
                            </button>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="desc">
                                    Descending
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="asc">
                                    Ascending
                                </div>
                            </div>
                        </div>

                        <div class="custom_select relative w-40" data-select="dateRange">
                            <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                <span class="select_label">
                                    All time
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </span>
                            </button>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="7">
                                    Last 7 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="30">
                                    Last 30 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="90">
                                    Last 90 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="custom">
                                    Custom...
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="all">
                                    All Time
                                </div>
                            </div>
                        </div>

                        <input type="number" id="customDays"
                            min="1" placeholder='Enter days'
                            class='bg-zinc-800 hidden rounded-md px-3 py-2 w-40' />
                    </div>

                    <!-- Mobi dropdown -->
                    <div id="mobileFilterMenu"
                        hidden
                        class='absolute right-0 top-15 bg-black border-green-500/50 shadow-lg border rounded-md p-2 z-50 flex flex-col gap-2'>

                        <!-- <div class="custom_select relative w-40" data-select="mobileSortBy">
                            <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                <span class="select_label">
                                    Views
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </span>
                            </button>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="views">
                                    Views
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="likes">
                                    Likes
                                </div>
                            </div>
                        </div> -->

                        <div class="custom_select relative w-40" data-select="mobileOrder">
                            <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                <span class="select_label">
                                    Descending
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </span>
                            </button>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="desc">
                                    Descending
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="asc">
                                    Ascending
                                </div>
                            </div>
                        </div>

                        <div class="custom_select relative w-40" data-select="mobileDateRange">
                            <button type="button" class="select_trigger w-full px-3 py-2 bg-zinc-800
                                text-green-400 rounded-md flex gap-2 justify-between items-center
                                hover:bg-zinc-700">
                                <span class="select_label">
                                    All time
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </span>
                            </button>

                            <div class="select_options hidden absolute left-0 mt-1 bg-zinc-800 border border-green-400/40 rounded-md w-40 overflow-hidden shadow-lg z-50">
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="7">
                                    Last 7 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="30">
                                    Last 30 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="90">
                                    Last 90 days
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="custom">
                                    Custom...
                                </div>
                                <div class="select_option px-3 py-2 cursor-pointer text-green-400 hover:bg-green-500/20 hover:text-green-300 transition w-40" data-value="all">
                                    All Time
                                </div>
                            </div>
                        </div>

                        <input type="number" id="mobileCustomDays"
                            min="1" placeholder='Enter days'
                            class='bg-zinc-800 hidden rounded-md px-3 py-2 w-40' />

                    </div>
                </div>

            </div>

        </div>

        <div class='flex-1 overflow-hidden overflow-y-auto'>

            <!-- No projects -->
            <div id="noProjectState" class='h-full flex items-center justify-center hidden'>
                <div class='md:self-center'>
                    <div class='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                        <p class='text-gray-400 font-bold'>No project found</p>
                    </div>
                </div>
            </div>

            <!-- Servers down -->
            <div id="serverDownState" class='hidden h-full flex items-center justify-center'>
                <div class='md:self-center'>
                    <div class='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                        <p class='text-gray-400 font-bold'>Wait server is down!!!</p>
                    </div>
                </div>
            </div>
        
            <!-- Loading projects -->
            <div id="loadingProjectsGrid" class="project_skel_grid lg:px-2 hidden">

            </div>

            <div id="projectsGrid" class="project_grid pt-2 pb-5 md:px-2 hidden">

            </div>
        </div>
    </div>
</div>