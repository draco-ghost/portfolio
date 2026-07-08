import React from 'react'

export const ProSkel = () => {
    return (
        <div className='w-full h-full'>
            <div className='text-green-400 w-full h-full overflow-hidden overflow-y-auto'>

                <div className='project_skel_grid lg:px-2'>

                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className='place-content-center'
                        >
                            <div className='w-full h-full'>
                                <div className='project_card flex flex-col h-full relative overflow-hidden select-none md:rounded-3xl'>
                                    <div className='flex pt-3 pb-3 px-7 place-items-center'>
                                        <div className='bg-green-500/20 w-[50%] animate-pulse h-8 p-[0px_20px] rounded-2xl' />
                                    </div>

                                    <div className='w-full h-50 relative'>
                                        <div className='bg-green-500/20 animate-pulse h-full p-[0px_20px]' />
                                    </div>

                                    <div className='flex flex-col place-content-center flex-1'>

                                        <div className='text-center px-8 pt-2'>
                                            <div className='bg-green-500/20 animate-pulse h-8 p-[0px_20px] rounded-2xl' />
                                        </div>

                                        <div className='btn_grid mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>

                                            <div className='bg-green-500/20 animate-pulse h-8 p-[0px_20px] rounded-2xl' />

                                            <div className='bg-green-500/20 animate-pulse h-8 p-[0px_20px] rounded-2xl' />

                                            <div className='h-6 p-[0px_20px] rounded-2xl place-items-center'>
                                                <div className='bg-green-500/20 w-[50%] animate-pulse h-8 p-[0px_20px] rounded-2xl'/>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}
