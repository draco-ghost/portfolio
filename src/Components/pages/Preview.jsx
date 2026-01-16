import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { app_preview } = location.state || {}

    const closePreview = () => {
        navigate(-1); // Go back to previous route
    };

    if (!app_preview) return null; // Nothing to show

  return (
    <div onClick={closePreview}
    className='fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/80 cursor-pointer'>
        <img src={app_preview} alt='Preview'
        className='max-w-full max-h-full object-contain shadow-2xl rounded-lg' 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
        />
    </div>
  )
}
