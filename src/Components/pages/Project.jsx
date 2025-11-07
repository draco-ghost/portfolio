import React from 'react';
import { cardsData } from '../../util/ProjectData';
import ProjectCards from '../../util/ProjectCards';


const Project = () => {

  return (
    <div className='overflow-hidden w-full h-full'>
      <div className='text-green-400 w-full h-full overflow-hidden'>

        <div className='relative flex flex-col z-10 backdrop-blur-3xl w-full h-full 
          place-content-center place-items-center'>
          <div className='flex flex-col w-full h-full overflow-hidden
              overflow-y-auto p-2 sm:p-4 md:p-6'>

            <div className='flex flex-col gap-4 w-full mt-1 mb-1
            md:grid md:gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
            3lg:grid-cols-[repeat(auto-fit,minmax(600px,auto))] justify-center'>

              {cardsData.map((proj, index) => (
                <ProjectCards key={index} project={proj} />
              ))}


            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Project
