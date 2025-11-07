import React from 'react';
import { Link } from 'react-router-dom';


const KOFI = "https://ko-fi.com/draco_ghost";

const Source = () => {

    const handleKofi = () => {
        window.open(KOFI, "_blank");
    };

    return (
        <div className='overflow-hidden w-full h-full'>
            <div className='text-green-400 w-full h-full'>
                <div className={`source-div backdrop-blur-3xl relative z-10 w-full h-full pt-4 flex flex-col
            overflow-y-auto  max-h-[calc(100vh-40px)] lg:max-h-[calc(100vh-70px)] 
            place-content-center place-items-center`}>

                    <div className='sm:bg-black/75 place-items-center mt-5 justify-center 
          sm:border-t sm:border-b rounded-2xl backdrop-blur-3xl lg:backdrop-blur-none lg:rounded-2xl lg:border'>
                        <h1 className='font-bold w-fit ml-5 mt-[-20px] 
            sm:bg-black p-2 sm:rounded-2xl'>Access the Source Code</h1>
                        <div className='w-full pl-5 pr-5 pt-2 cursor-pointer font-mono'>
                            <div className='text-center'>
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

                            <div className='cursor-pointer gap-10 flex justify-center '>
                                <div className='flex flex-col gap-7 p-7 md:grid md:grid-cols-2 md:gap-4 font-mono place-content-center place-items-center'>
                                    <div onClick={handleKofi}
                  aria-label='Open Support'
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && handleKofi(e)}
                      className='bg-zinc-800 p-[1px_15px] lg:p-[1px_15px] shadow-lg shadow-green-600 rounded-3xl
                      hover:bg-black/30'>
                                        Support on Ko-fi
                                    </div>

                                    <div
                                    className='bg-zinc-800 p-[1px_15px] lg:p-[1px_15px] shadow-lg shadow-green-600 rounded-3xl
                      hover:bg-black/30'>
                                        <Link to={'/contact'}>
                                        Contact Me
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Source
