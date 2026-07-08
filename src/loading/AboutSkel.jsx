import React from 'react'

export const AboutSkel = () => {
    return (
        <div className='w-full h-full overflow-hidden overflow-y-auto'>
            <div className='flex flex-col w-full h-full'>
                <div>
                    <div className='place-items-center mt-2 mb-2'>
                        <div className='bg-green-500/20 w-[40%] animate-pulse h-12 p-[4px_20px] rounded-2xl' />
                    </div>
                    <div className='lg:px-8 font-bold font-mono text-center px-[clamp(0.5rem,1vw,2rem)]'>
                        <div className='bg-green-500/20 w-full animate-pulse p-[60px_20px] rounded-2xl' />
                    </div>
                    <div className='place-items-center mt-5 mb-2'>
                        <div className='bg-green-500/20 w-[40%] animate-pulse h-12 p-[4px_20px] rounded-2xl' />
                    </div>
                </div>

                <div className='flex-1'>

                    <div className='w-full about_grid gap-4 p-[clamp(0.5rem,1vw,2rem)]'>
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className='place-content-center'
                            >
                                <div className='h-full'>
                                    <div className='about_card w-full h-full p-4 md:rounded-3xl cursor-pointer'>

                                        <div className='bg-green-500/20 w-18 animate-pulse h-18 p-[4px_20px] rounded-2xl' />
                                        <div className='bg-green-500/20 w-[90%] animate-pulse mt-1 h-10 p-[4px_20px] rounded-2xl' />

                                        <div className='mt-2'>
                                            {[...Array(3)].map((_, j) => (
                                                <div
                                                    key={j}
                                                    className='flex gap-5 p-2 place-items-center hover:bg-green-700/20 rounded-2xl relative group'>
                                                    <div className='absolute inset-0 w-full h-full bg-green-500/20 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                                                    <div className='relative w-full z-20 flex gap-2 rounded-2xl'>
                                                        <div>
                                                            <div className='bg-green-500/20 w-6 animate-pulse h-10 p-[4px_20px] rounded-2xl' />
                                                        </div>

                                                        <div className='w-full'>
                                                            <div className='bg-green-500/20 w-full animate-pulse h-10 p-[4px_20px] rounded-2xl' />
                                                        </div>

                                                        <div>
                                                            <div className='bg-green-500/20 w-6 animate-pulse h-10 p-[4px_20px] rounded-2xl' />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
