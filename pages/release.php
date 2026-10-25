<div class='h-full w-full flex overflow-hidden'>
    <div class='flex flex-col w-full h-full'>

        <div class="flex items-center">
            <div id="releaseBack"
                class="backBtn">
                <svg xmlns="http://www.w3.org/2000/svg"
                    height="24px" viewBox="0 -960 960 960"
                    width="24px" fill="currentColor">
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                </svg>
            </div>
        </div>

        <div class='flex-1 pb-5 flex flex-col gap-2 lg:px-4 overflow-y-auto'>
            
            <div id="noReleases" class='hidden h-full flex items-center justify-center'>
                <div class='md:self-center'>
                    <div class='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                        <p class='text-gray-400 font-bold'>No Releases found for this repository</p>
                    </div>
                </div>
            </div>

            <div id="loadingAllReleases" class='flex-1 flex flex-col gap-2'>

            </div>

            <div id="allReleases" class='flex-1 flex flex-col gap-2' aria-live="polite">

            </div>

        </div>

    </div>
</div>