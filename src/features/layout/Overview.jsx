import React, { useEffect, useState } from 'react';
import logo from '../../assets/dragon_logo.png';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { MdHome, MdMenu } from 'react-icons/md';
import { FaCircleInfo, FaDiagramProject } from 'react-icons/fa6';
import { IoMdContact } from 'react-icons/io';

export const Overview = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <div className='h-full flex flex-col overflow-hidden'>

            {/* HEADER */}
            <div className='flex h-12 shrink-0 items-center justify-between p-2'>
                <div className='flex items-center'>
                    <button className='lg:hidden' aria-label='Toggle menu' aria-expanded={open} onClick={() => setOpen(!open)}><MdMenu size={24} /></button>
                    <p className='ml-4'>Draco Ghost</p>
                </div>
                <div className='h-11.25 w-11.25 rounded-full ring text-green-400 overflow-hidden'>
                    <img src={logo} alt="Profile" className='h-full w-full object-cover' />
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className='flex flex-1 min-h-0 lg:grid lg:grid-cols-[20%_80%]'>

                {/* OVERLAY (mobile only) */}
                {open && (
                    <div className='fixed inset-0 bg-black/50 z-40 lg:hidden'
                        onClick={() => setOpen(false)} />
                )}

                {/* SIDEBAR */}
                <div className={`backdrop-blur-2xl lg:backdrop-blur-none
                    overflow-y-auto
                    fixed top-12 bottom-0 left-0 z-50 w-2/3 md:w-2/6
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:static lg:translate-x-0 lg:block lg:h-auto lg:w-auto`}
                >

                    <nav className='p-2 flex flex-col gap-2 mt-2'>

                        <ul className='font-bold'>
                        
                                <li><NavLink to='home'>
                                    <div className='flex items-center'>
                                        <MdHome />
                                        <p className='ml-3'>Home</p>
                                    </div>
                                </NavLink></li>

                                <li><NavLink to='about'>
                                    <div className='flex items-center'>
                                        <FaCircleInfo />
                                        <p className='ml-3'>About</p>
                                    </div>
                                </NavLink></li>

                                <li><NavLink to='p'>
                                    <div className='flex items-center'>
                                        <FaDiagramProject />
                                        <p className='ml-3'>Projects</p>
                                    </div>
                                </NavLink></li>

                                <li><NavLink to='contact'>
                                    <div className='flex items-center'>
                                        <IoMdContact />
                                        <p className='ml-3'>Contact</p>
                                    </div>
                                </NavLink></li>


                        </ul>

                    </nav>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex-1 min-h-0'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}
