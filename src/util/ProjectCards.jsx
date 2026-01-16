import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const ProjectCards = ({ project }) => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { app_name, description, o, app_link, app_preview } = project

    const openLink = (url) => window.open(url, "_blank")

    const sourceL = (url) => {
        if (o == true) {
            navigate(url)
        } else {
            window.open(url, "_blank")
        }
    };

    return (
        <div className='w-full max-w-[600px]'>
            <div className='flex flex-col bg-zinc-800 rounded-3xl relative 
                      shadow-md shadow-blue-600 overflow-hidden select-none
                      transition delay-150 duration-300 
                      ease-in-out hover:-translate-y-1 hover:scale-110 hover:z-50
                      hover:shadow-2xl hover:shadow-[#ff0080] sm:w-[80%] md:w-full'>
                <p className='absolute top-0 transform w-full
                        z-50 bg-black/50 p-2 md:p-5
                        place-content-center place-items-center'>
                    {app_name}
                </p>
                <div className='w-full h-[200px] relative'>
                    {loading && (
                        <div className='flex justify-center items-center h-full'>
                            <HashLoader
                                color='#ff0080'
                                loading={loading}
                                size={100}
                                aria-label='Loading Spinner'
                                data-testid="loader"
                            />
                        </div>
                    )} 
                    
                    <img src={app_preview} 
                    alt={`${app_name} preview`} 
                    className={`bg-zinc-800 w-full h-full bg-cover ${loading ? 'hidden' : ''}`} 
                    onLoad={() => setLoading(false)}/>
                    
                </div>

                <div className='bg-cover
                        place-content-center place-items-center bg-zinc-800'>

                    <div className='flex flex-col gap-2 bg-black/60 p-2 md:p-4'>
                        <p>{description}</p>
                        <div className='flex flex-col p-3 gap-2 sm:grid sm:grid-cols-3 md:p-0
                            md:grid-cols-2 shrink-0'>
                            <div onClick={() => openLink(app_link.repo)} role='button'
                                className='bg-zinc-800 p-1 lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                            hover:bg-black/30 shrink-0'>
                                GitHub
                            </div>
                            <div onClick={() => sourceL(app_link.source)} role='button'
                                className='bg-zinc-800 p-1 lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                            hover:bg-black/30 shrink-0'>
                                Source Code
                            </div>
                            <div onClick={() => openLink(app_link.release)}role='button'
                                className='bg-zinc-800 p-1 md:col-span-2 justify-center lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                            hover:bg-black/30 shrink-0'>
                                Download
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProjectCards
