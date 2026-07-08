import React from 'react';

export const SkillCheck = ({ info, checkIcon }) => {

    return (
        <div>
            <div className='flex gap-5 p-2 place-items-center hover:bg-green-700/20 rounded-2xl relative group'>
                <div className='absolute inset-0 w-full h-full bg-green-500/20 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                <div className='relative w-full z-20 flex justify-between rounded-2xl'>
                    <div>
                        <img src={`http://localhost:3000${checkIcon}`}
                        alt="check" className='w-6' />
                    </div>

                    <div>
                        <span className='rounded-2xl w-full'>{info.name}</span>
                    </div>

                    {info.icon ? (
                        <>
                        <img src={`http://localhost:3000${info.icon}`}
                                alt={info.name} className='w-7 h-7' />
                        </>
                    ) : (
                        <div>
                        <img src={`http://localhost:3000${checkIcon}`}
                        alt="check" className='w-6' />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
