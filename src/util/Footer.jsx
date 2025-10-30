import React from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = ({ setShowFacebookD, setShowLinkedIn, handleLinkedIn, handleFacebook, handleGithub }) => {
    return (
        <div>
            <div className='block w-full md:flex'>
                <div className='md:size-10 md:grow-5 place-content-center'>
                    <p>Designed and developed by Draco Ghost</p>
                </div>

                <div className='md:size-10 md:grow-6 place-content-center'>
                    <p>© 2025 Draco Ghost. All rights reserved.</p>
                </div>

                <div className='hidden md:size-10 md:flex mb-2 md:mb-0 md:grow-4 text-xl gap-4 place-content-center place-items-center'>
                    <div onClick={handleLinkedIn}
                        aria-label="Open LinkedIn profile options"
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setShowLinkedIn(true)}
                        className='flex flex-col place-items-center gap-4'>
                        <FaLinkedin className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    </div>
                    <div onClick={handleFacebook}
                        aria-label='Open Facebook profile'
                        role='button'
                        onKeyDown={(e) => e.key === 'Enter' && setShowFacebookD(true)}
                        className='flex flex-col place-items-center gap-4'>
                        <FaFacebook className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    </div>
                    <div onClick={handleGithub}
                        aria-label='Open Github profile'
                        role='button'
                        onKeyDown={handleGithub}
                        className='flex flex-col place-items-center gap-4 col-span-2'>
                        <FaGithub className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
