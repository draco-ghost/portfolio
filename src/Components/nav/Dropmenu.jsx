import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Dropmenu = ({ isOpen, isClosed }) => {

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && isOpen) {
                isClosed(); // Auto-close the menu
            }
        };

        // Atach event listener
        window.addEventListener('resize', handleResize);

        // Run once on mount in case window is already >=640px
        handleResize();

        // Clean up on mount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen, isClosed]); // Only re-run if isOpen or isCLosed changes

    return (
        <div>
            <div className={`absolute left-0 top-10 w-screen px-6 py-4 z-50
      transition-all duration-1000 ease-in-out'
      ${isOpen ? "visible bg-black/90 opacity-100" : "invisible opacity-0"}`}>
                <div className='place-items-center text-white backdrop-blur-3xl'>
                    <ul className='w-full'>
                        <li onClick={isClosed}>
                            <NavLink to={'/'}>
                                <p className='p-[5px_25px] text-white border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Home</p>
                            </NavLink>
                        </li>
                        <li onClick={isClosed}>
                            <NavLink to={'/about'}>
                                <p className='p-[5px_25px] text-white border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>About</p>
                            </NavLink>
                        </li>
                        <li onClick={isClosed}>
                            <NavLink to={'/projects'}>
                                <p className='p-[5px_25px] text-white border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Projects</p>
                            </NavLink>
                        </li>
                        <li onClick={isClosed}>
                            <NavLink to={'/contact'}>
                                <p className='p-[5px_25px] text-white border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Contact</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dropmenu
