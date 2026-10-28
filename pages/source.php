<div class='h-full w-full flex overflow-hidden'>
    <div class=' flex flex-col w-full min-h-0 min-w-0'>

        <div class='flex-1 relative min-h-0 min-w-0 pb-2 overflow-hidden'>
            <div class='h-full min-h-0 min-w-0 flex flex-col w-full overflow-hidden'>

                <div id="noSources" class='hidden flex-1 w-full flex items-center justify-center'>
                    <div class='w-full md:self-center'>

                        <div class='d_card w-full min-w-[75%] flex flex-col gap-2 items-center md:rounded-2xl h-full'>
                            No source code found
                        </div>
                    </div>
                </div>

                <div id="noSourcesAllowed" class='hidden flex-1 w-full flex items-center justify-center'>
                    <div class='w-full md:self-center'>

                        <div id="sourceContent"
                            class='d_card w-full min-w-[75%] flex flex-col gap-2 items-center md:rounded-2xl h-full'>
                            <h1 class='font-bold w-fit'>Access the Source Code</h1>
                            <div class='w-full pl-5 pr-5 pt-2 cursor-pointer font-mono'>
                                <div class='text-center'>
                                    <p>
                                        This project is made possibble thanks to community support.
                                        As a token of appreciation,
                                    </p>

                                    <p>
                                        <strong> Ko-fi supporters </strong>
                                        gain exclusive access to the complete source code.
                                    </p>

                                    <p>
                                        When making a donation on Ko-fi, please include your
                                        <strong> Github username</strong> in the message
                                    </p>

                                    <p>
                                        this helps me invite you quickly to the private repository.
                                    </p>

                                    <p>
                                        If you've already supported but haven't received an invite yet, please don't hesitate to reach out.
                                    </p>

                                    <p>
                                        I might simply have missed your message, and I truely appreciate your patience
                                    </p>

                                    <p>
                                        If already a supporter and not able to access contact me
                                    </p>
                                </div>

                                <div class=''>
                                    <div class='btn_source_grid  mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>
                                        <button id="kofiBtn" role='button'
                                            class='project_btn rounded-3xl text-center'>
                                            Support on Ko-fi
                                        </button>

                                        <div id="contactBtn" class='project_btn rounded-3xl text-center'>
                                            Contact Me
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="loadingAllSources" class="hidden flex-1 w-full flex">
                    <div class="loadingAllSourcesCont">
                        <div class="flex flex-col gap-2 border border-green-500/20 w-full h-full animate-pulse p-2 rounded-2xl">
                            <div class='flex flex-col gap-2'>

                                <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>

                            </div>
                            <div class='flex flex-col gap-2 border border-green-500/20 w-full h-full animate-pulse p-2 rounded-2xl'>
                                <?php for ($i = 0; $i < 2; $i++): ?>
                                    <div class="flex gap-2">
                                        <div class='bg-green-500/20 w-10 h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                        <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                    </div>
                                    <div class="subTree">
                                        <?php for ($j = 0; $j < 4; $j++): ?>
                                            <div class="flex gap-2">
                                                <div class='bg-green-500/20 w-10 h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                                <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                            </div>
                                        <?php endfor; ?>
                                    </div>
                                <?php endfor; ?>

                            </div>
                        </div>

                        <div class="flex flex-col gap-2 border border-green-500/20 w-full h-full animate-pulse p-2 rounded-2xl">
                            <div class='flex flex-col gap-2'>
                                <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                            </div>
                            <div class='flex flex-col gap-2 border border-green-500/20 w-full h-full animate-pulse rounded-2xl'>
                                <?php for ($j = 0; $j < 4; $j++): ?>
                                    <div class="flex gap-2 p-2 border-b border-green-500/20">
                                        <div class='bg-green-500/20 w-full h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                        <div class='bg-green-500/20 w-10 h-8 animate-pulse p-[0px_20px] rounded-2xl'></div>
                                    </div>
                                <?php endfor; ?>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="allSources" class="hidden flex-1 min-h-0 min-w-0 w-full flex overflow-hidden">
                    
                </div>

            </div>
        </div>
    </div>
</div>