import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Rightbar = ({ isOpen, isClosed }) => {
    return (
        <div>
            <div className={`w-screen inset-0 absolute right-0 z-50 transition-all ease-out duration-700 flex flex-col place-items-end md:hidden
            ${isOpen ? "visible bg-black/50 opacity-100" : "invisible opacity-0"}`}
            onClick={isClosed}>
                <div className={`text-green-400 right-0 h-full bg-zinc-900 w-[80vw] transform transition-opacity ease-in-out duration-700
                ${isOpen ? "opacity-100" : "opacity-0"}`}
                style={{
                    transitionDelay: isOpen ? '0s' : '1000ms'
                }}
                onClick={(e) => e.stopPropagation()}>
                    <div className='flex justify-end text-3xl mr-3 pr-2 pt-2'>
                        <IoMdCloseCircle onClick={isClosed} />
                    </div>
                    <div className='p-4 mt-5'>
                        <ul className='flex flex-col gap-5'>
                            <li onClick={isClosed}>
                                <NavLink to={'/'}>
                                    <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Home</p>
                                </NavLink>
                            </li>
                            <li onClick={isClosed}>
                                <NavLink to={'/about'}>
                                    <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>About</p>
                                </NavLink>
                            </li>
                            <li onClick={isClosed}>
                                <NavLink to={'/projects'}>
                                    <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Projects</p>
                                </NavLink>
                            </li>
                            <li onClick={isClosed}>
                                <NavLink to={'/contact'}>
                                    <p className='p-[5px_25px] text-green-400 border-b border-dotted hover:text-[#ff0080] hover:shadow-lg shadow-[#ff0080] hover:animate-pulse rounded-full'>Contact</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar
