import React from 'react';
import logo from '../../assets/dragon_logo_1.png';

const Project = () => {
  return (
    <div className='overflow-hidden w-full h-full'>
          <div className='text-green-400 w-full h-full'>
            <div className='relative h-full w-full'>
              <div className='absolute inset-0 z-0 h-full'>
                <img src={logo} alt="" className='w-full h-full' />
              </div>
              <div className='relative z-10 backdrop-blur-3xl w-full h-full overflow-hidden
                place-content-center place-items-center 3lg:text-4xl'>
                <p className='border-b rounded-3xl p-[2px_10px] w-fit place-self-center mb-4 shadow-lg shadow-green-700 hover:shadow-pink-600 hover:text-pink-600 cursor-pointer'>
                  Coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Project
