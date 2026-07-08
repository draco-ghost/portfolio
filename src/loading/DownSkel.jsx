import React from 'react'

export const DownSkel = () => {
    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className='flex flex-col w-full h-full pt-2'>

                <div className='flex-1 pb-5 flex flex-col gap-2 lg:px-4'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='r_card md:rounded-2xl p-4 flex flex-col gap-2'>
                            <div className='bg-green-500/20 w-[50%] animate-pulse h-5 p-[0px_20px] rounded-2xl' />
                            
                            <div className='bg-green-500/20 w-[50%] animate-pulse h-5 p-[0px_20px] rounded-2xl' />

                            <div className='bg-green-500/20 animate-pulse h-99 w-full p-[0px_20px] rounded-2xl' />

                            <div className='bg-green-500/20 w-[50%] animate-pulse h-5 p-[0px_20px] rounded-2xl' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
