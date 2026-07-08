import React from 'react';
import { Link } from 'react-router-dom';
import { trackOutbound } from '../../util/umami_track';


const KOFI = import.meta.env.VITE_KOFI;

const Source = () => {

    const handleKofi = () => {
        trackOutbound(KOFI);
        window.open(KOFI, "_blank");
    };

    return (
        <div className='h-full w-full flex overflow-hidden'>
            <div className=' flex flex-col w-full'>

                <div className='flex-1 pb-5 overflow-y-auto'>
                    <div className='h-full flex flex-col w-full'>
                        <div className='flex-1 w-full flex items-center justify-center'>
                            <div className='w-full md:self-center'>

                                <div className='d_card w-full min-w-[75%] flex flex-col gap-2 items-center md:rounded-2xl h-full'>
                                    <h1 className='font-bold w-fit'>Access the Source Code</h1>
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

                                        <div className=''>
                                            <div className='btn_source_grid  mt-2 mb-2 p-[clamp(0.5rem,1vw,2rem)]'>
                                                <div onClick={handleKofi}
                                                    aria-label='Open Support'
                                                    role='button'
                                                    onKeyDown={(e) => e.key === 'Enter' && handleKofi(e)}
                                                    className='project_btn rounded-3xl text-center'>
                                                    Support on Ko-fi
                                                </div>

                                                <div className='project_btn rounded-3xl text-center'>
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
                </div>
            </div>
        </div>
    )
}

export default Source
