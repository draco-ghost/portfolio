import React, { useState } from 'react';
import TypeWrite from '../../util/TypeWrite';
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { OpenDeepLink } from '../../util/DeepLinkUtils';
import { trackOutbound } from '../../util/umami_track';

const LINKED_IN_URL = import.meta.env.VITE_LINKED_IN_URL;
const LINKEDIN_APP_URL = import.meta.env.VITE_LINKEDIN_APP_URL; // Deep link

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL;
const FACEBOOK_APP_URL = import.meta.env.VITE_FACEBOOK_APP_URL;

export default function Home() {
  const [openDialog, setOpenDialog] = useState(null);

  const isMobi = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleLinkedIn = () => {
    trackOutbound(LINKED_IN_URL);

    if (isMobi) {
      // On Mobi, try open directly with fallback
      handleLinkedInClick();
    } else {
      // On desktop show modal
      setOpenDialog('linkedin');
    }
  }

  const handleFacebook = () => {
    trackOutbound(FACEBOOK_URL);

    if (isMobi) {
      // On Mobi, try open directly with fallback
      OpenDeepLink(FACEBOOK_APP_URL, FACEBOOK_URL);
    } else {
      // On desktop show modal
      setOpenDialog('facebook');
    }
  }

  const closeDialog = () => {
    setOpenDialog(null);
  }

  const handleGithub = () => {
    trackOutbound(GITHUB_URL);
    window.open(GITHUB_URL, "_blank");
  };

  const handleAppOpen = () => {
    closeDialog();

    // Try to open linkedIn app via hidden iframe deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.src = LINKEDIN_APP_URL;
    document.body.appendChild(iframe);

    // Remove ifrfame after short delay to clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  };

  const handleWebOpen = () => {
    closeDialog();
    window.open(LINKED_IN_URL, "_blank");
  };

  const handleFabAppOpen = () => {
    closeDialog();

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Try to open Facebook app via hidden iframe deep link
      const iframe = document.createElement('iframe');
      iframe.style.display = "none";
      iframe.src = FACEBOOK_APP_URL;
      document.body.appendChild(iframe);

      // Remove ifrfame after short delay to clean up
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    } else {
      window.open(FACEBOOK_URL, "_blank");
    }
  };

  const handleFabWebOpen = () => {
    closeDialog();
    window.open(FACEBOOK_URL, "_blank");
  };

  const handleLinkedInClick = () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.src = LINKEDIN_APP_URL;
    document.body.appendChild(iframe);

    // Remove ifrfame after short delay to clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(LINKED_IN_URL, "_blank");
    }, 2000);
  };

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <div className='flex-1 min-h-0 overflow-y-auto'>

        <div className='p-[clamp(0.5rem,1vw,2rem)] flex flex-col min-h-full'>
          <div className='flex-1 flex flex-col w-full'>
            <div className='flex-1 w-full flex items-center justify-center'>
              <div className='w-full md:self-center'>
                <div className='d_card w-full min-w-[75%] flex flex-col gap-2 p-4 items-center lg:rounded-2xl'>

                  <p className='border-b rounded-3xl p-[2px_10px] w-fit place-self-center mb-4 shadow-lg shadow-green-900 hover:shadow-pink-600 hover:text-pink-600 cursor-pointer'>
                    Hi I'm
                  </p>
                  <h3 className='border-b rounded-3xl p-[2px_10px] w-fit place-self-center mb-5 shadow-lg shadow-green-900 hover:shadow-pink-600 hover:text-pink-600 cursor-pointer'>
                    Draco Ghost
                  </h3>

                  <TypeWrite />
                  <div className='w-full cursor-pointer gap-10 flex justify-center '>
                    <div className='flex w-full p-10 place-content-center gap-5 place-items-center'>
                      <div onClick={handleLinkedIn}
                        aria-label="Open LinkedIn profile options"
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setOpenDialog('linkedin')}
                        className='flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaLinkedin className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                      </div>
                      <div onClick={handleFacebook}
                        aria-label='Open Facebook profile'
                        role='button'
                        onKeyDown={(e) => e.key === 'Enter' && setOpenDialog('facebook')}
                        className='flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaFacebook className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                      </div>
                      <div onClick={handleGithub}
                        aria-label='Open Github profile'
                        role='button'
                        onKeyDown={handleGithub}
                        className='flex flex-col text-xs md:text-base place-items-center gap-4 col-span-2'>
                        <FaGithub className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className='block md:flex place-items-center gap-2'>
            <div className='md:grow-5 text-center place-content-center'>
                    <p>Designed and developed by Draco Ghost</p>
                </div>

                <div className='md:grow-6 text-center place-content-center'>
                    <p>© 2025 Draco Ghost. All rights reserved.</p>
                </div>
          </div>

          </div>



          {openDialog === 'linkedin' && (
            <div onClick={closeDialog}
              role='dialog'
              aria-modal="true"
              aria-labelledby='linkedin-modal-title'
              className='absolute top-1/2 left-0 w-full 
                  transform -translate-y-1/2 
                  z-50 rounded-3xl bg-zinc-800 p-[5px_20px] shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  md:w-[80%]'>
              <div onClick={(e) => e.stopPropagation()}
                className='flex flex-col font-mono text-base p-2 gap-2 place-content-center place-items-center text-white'>
                <div className='text-center'>
                  <h2 id="linkedin-modal-title">
                    Open LinkedIn Profile
                  </h2>
                  <p>
                    Clicking "Open in App" will try to open the LinkedIn app if it's installed
                  </p>
                </div>
                <div>
                  <button type="button" onClick={handleAppOpen}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>Open in App</button>
                </div>
                <div>
                  <button type="button" onClick={handleWebOpen}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>Open in web</button>
                </div>
                <div>
                  <button onClick={closeDialog}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {openDialog === 'facebook' && (
            <div onClick={closeDialog}
              role='dialog'
              aria-modal="true"
              aria-labelledby='facebook-modal-title'
              className='absolute top-1/2 left-0 w-full 
                  transform -translate-y-1/2 
                  z-50 rounded-3xl bg-zinc-800 p-[5px_20px] shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  md:w-[80%]'>
              <div onClick={(e) => e.stopPropagation()}
                className='flex flex-col font-mono text-base p-2 gap-2 place-content-center place-items-center text-white'>
                <div className='text-center'>
                  <h2 id="facebook-modal-title">
                    Open Facebook Profile
                  </h2>
                  <p>
                    Clicking "Open in App" will try to open the Facebook app if it's installed
                  </p>
                </div>
                <div>
                  <button type="button" onClick={handleFabAppOpen}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>Open in App</button>
                </div>
                <div>
                  <button type="button" onClick={handleFabWebOpen}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>Open in web</button>
                </div>
                <div>
                  <button onClick={closeDialog}
                    className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
