import React from 'react';
import logo from './../../assets/dragon_logo.png';
import { NavLink } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from 'react-icons/io';

export default function Navbar({ toggleRight, isRightEn }) {
    return (
        <div>
            <nav className={`h-[40px] top-0 flex place-content-end sm:h-[50px] md:h-[70px] select-none
                sm:justify-between sm:px-8 lg:px-20 xl:px-40 llg:px-60 2xl:px-70 3xl:px-110 3lg:px-180 gg:px-200 4xl:px-270
                5xl:px-420 2gg:px-460 cursor-pointer duration-1000 text-xs relative z-10 w-full
                ${isRightEn ? "bg-black/90 opacity-100" : "bg-transparent"}`}>
                <div className='absolute left-0 flex sm:place-self-center md:ml-3 sm:relative'>
                    <div className='img_ring w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[70px] md:h-[70px] rounded-full place-content-center place-items-center'>
                        <img src={logo} alt="logo" className='h-[30px] sm:h-[40px] md:h-[60px] rounded-full' />
                    </div>
                    <div className='place-self-center flex font-mono'>
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
                    <button onClick={toggleRight}
                    className='duration-700'>
                        {isRightEn ? <IoMdClose /> : <TiThMenu /> }
                    </button>
                </div>
                </div>                
            </nav>
        </div>
    )
}
