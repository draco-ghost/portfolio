import React, { useState } from 'react';
import Blocker_app from '../../assets/Blocker_App.png';
import Blocker_bg from '../../assets/Blocker_App1.png';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProjectCards from '../../util/ProjectCards';
import { cardsData } from '../../util/ProjectData';

const BLOCK_GIT = "https://github.com/draco-ghost/blocker_app";
const BLOCK_DOWNLOAD = "https://github.com/draco-ghost/blocker_app/releases";

const Project = () => {

  const navigate = useNavigate();

  const handleGithubRepo = () => {
    window.open(BLOCK_GIT, "_blank");
  };

  const handleGithubRelease = () => {
    window.open(BLOCK_DOWNLOAD, "_blank");
  };

  const handleSource = () => {
    navigate('/p/source')

  };


  return (
    <div className='overflow-hidden w-full h-full'>
      <div className='text-green-400 w-full h-full overflow-hidden'>
        <div className='relative flex flex-col z-10 backdrop-blur-3xl w-full h-full overflow-hidden
              place-content-center place-items-center'>
          <div className='flex flex-col w-full h-full overflow-hidden
              overflow-y-auto p-2 place-content-center place-items-center'>

            {/* for single project display
            <div className='flex flex-col gap-2 mt-1 mb-1 sm:place-items-center
               md:w-[80%] lg:w-[70%] xl:w-[60%] llg:w-[50%] 3lg:w-[30%] text-white'>

              <div className='flex flex-col bg-zinc-800 rounded-3xl relative 
                shadow-md shadow-blue-600 overflow-hidden select-none
                transition delay-150 duration-300 
                ease-in-out hover:-translate-y-1 hover:scale-110
                sm:w-[80%] md:w-full'>
                <p className='absolute top-0 transform w-full
                  z-50 bg-black/50 p-2 md:p-5
                  place-content-center place-items-center'>
                  Blocker App
                </p>
                <div className='w-full h-[200px]'>
                  <img src={app_preview} alt={`${app_name} preview`} className='bg-amber-200 w-full h-full bg-cover' />
                </div>

                <div className='bg-cover bg-zinc-800
                  place-content-center place-items-center'>

                  <div className='flex flex-col gap-2 bg-black/60 p-2 md:p-4'>
                    <p>
                      BlockerApp is a lightweight Windows desktop application designed to
                      help you stay focused by blocking distracting websites.
                    </p>
                    <div className='flex flex-col p-3 gap-2 sm:grid sm:grid-cols-3 md:p-0
                      md:grid-cols-2'>
                      <div onClick={handleGithubRepo}
                  aria-label='Open Github repo'
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && handleGithubRepo(e)}
                      className='bg-zinc-800 p-1 lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                      hover:bg-black/30'>
                        GitHub
                      </div>
                      <div onClick={handleSource}
                  aria-label='Open Source Code'
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && handleSource(e)}
                      className='bg-zinc-800 p-1 lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                      hover:bg-black/30'>
                        Source Code
                      </div>
                      <div onClick={handleGithubRelease}
                  aria-label='Open Github releases'
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && handleGithubRelease(e)}
                      className='bg-zinc-800 p-1 md:col-span-2 justify-center lg:p-2 shadow-lg shadow-green-600 rounded-3xl
                      hover:bg-black/30'>
                        Download
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='mt-10'>
                <p>More Coming !!!</p>
              </div>

            </div>
            */}

            {/* For many projects display*/}
            <div className='flex flex-col w-full h-full overflow-hidden
              overflow-y-auto p-2 sm:p-4 md:p-6'>

              <div className='flex flex-col items-center gap-4 w-full mt-1 mb-1
                md:grid md:grid-flow-row md:justify-start md:gap-4 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]  
                3lg:grid-cols-[repeat(auto-fit,minmax(600px,auto))] justify-items-center'>

                {cardsData.map((proj, index) => (
                  <ProjectCards key={index} project={proj} />
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Project