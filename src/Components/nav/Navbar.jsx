import React from 'react';
import logo from './../../assets/dragon_logo.png';
import { NavLink } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";

export default function Navbar({ toggleRight }) {
    return (
        <div>
            <nav className={`h-[40px] top-0 flex place-content-end sm:h-[50px] md:h-[70px] select-none
                sm:justify-between cursor-pointer duration-1000 text-xs
                `}>
                <div className='absolute left-0 flex sm:place-self-center md:ml-3 sm:relative'>
                    <img src={logo} alt="logo" className='h-[40px] sm:h-[50px] md:h-[70px]' />
                    <div className='place-self-center flex'>
                        <p className='place-self-center md:ml-3 text-green-400 text-sm font-bold'>Draco</p>
                        <p className='ml-1 text-green-400 text-sm font-bold'>Ghost</p>
                    </div>
                </div>
                <div className='flex place-self-center text-white text-sm gap-3 md:mr-4 duration-1000 transition-all'>
                    <ul className='navbar hidden sm:flex'>
                    <li>
                        <NavLink to={'/'}>
                        <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>
                         <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>About</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/projects'}>
                        <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Projects</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}>
                        <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Contact</p>
                        </NavLink>
                    </li>
                </ul>
                <div className='text-3xl mr-3 sm:hidden'>
                    <TiThMenu onClick={toggleRight} />
                </div>
                </div>                
            </nav>
        </div>
    )
}
