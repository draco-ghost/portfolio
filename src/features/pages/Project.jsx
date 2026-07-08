import React from 'react';
import { Outlet } from 'react-router-dom';


const Project = () => {

  return (
    <div className='h-full w-full flex'>
      <div className='text-green-400 flex flex-col w-full'>
          <Outlet />
      </div>
    </div>
  )
}

export default Project