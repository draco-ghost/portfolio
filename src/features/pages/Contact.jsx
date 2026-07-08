import React, { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa6';
import { FaCoffee, FaFacebook, FaGithub } from "react-icons/fa";
import { OpenDeepLink } from '../../util/DeepLinkUtils';
import { trackOutbound } from '../../util/umami_track';

const LINKED_IN_URL = import.meta.env.VITE_LINKED_IN_URL;
const LINKEDIN_APP_URL = import.meta.env.VITE_LINKEDIN_APP_URL; // Deep link

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL;
const FACEBOOK_APP_URL = import.meta.env.VITE_FACEBOOK_APP_URL;

const KOFI_URL = import.meta.env.VITE_KOFI;


const Contact = () => {
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

  const handleKofi = () => {
    window.open(KOFI_URL, "_blank");
  };


  return (
    <div className='h-full w-full flex overflow-hidden'>
      <div className='text-green-400 md:p-[clamp(0.5rem,1vw,2rem)] flex flex-col w-full'>

        <div className='flex-1 pb-5 overflow-y-auto'>
          <div className='h-full flex flex-col w-full'>
            <div className='flex-1 w-full flex items-center justify-center'>
              <div className='w-full md:self-center'>

                <div className='d_card w-full min-w-[75%] flex flex-col gap-2 items-center md:rounded-2xl h-full'>
                  <h1 className='font-bold w-fit ml-5'>Contact Me</h1>
                  <div className='w-full pl-5 pr-5 pt-2 cursor-pointer font-mono'>
                    <div className='text-center'>
                      <p>Let's Connect</p>
                      <p>I'm always open to collaboration, ideas, or just a good conversation.</p>
                      <p>Find me on the platforms below, whether you want to talk code, design, or community</p>
                    </div>
                  </div>
                  <div className='w-full cursor-pointer flex justify-center '>
                    <div className='contact_grid  w-full pt-7 pb-7 font-mono place-content-center place-items-center'>
                      
                      <div onClick={handleLinkedIn}
                        aria-label="Open LinkedIn profile options"
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setOpenDialog('linkedin')}
                        className='contact_card p-4 rounded-3xl w-full flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaLinkedin className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                        <span className='mb-2'>(Talk career, collabs, or networking)</span>
                      </div>
                      
                      <div onClick={handleFacebook}
                        aria-label='Open Facebook profile'
                        role='button'
                        onKeyDown={(e) => e.key === 'Enter' && setOpenDialog('facebook')}
                        className='contact_card p-4 rounded-3xl w-full flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaFacebook className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                        <span className='mb-2'>(For social convos and updates)</span>
                      </div>
                      
                      <div onClick={handleGithub}
                        aria-label='Open Github profile'
                        role='button'
                        onKeyDown={(e) => e.key === 'Enter' && handleGithub(e)}
                        className='contact_card p-4 rounded-3xl w-full flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaGithub className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                        <span className='mb-2'>(See what I'm building)</span>
                      </div>

                      <div onClick={handleKofi}
                        aria-label="Toggle Ko-fi support widget"
                        role="button"
                        onKeyDown={(e) => e.key === 'Enter' && handleKofi(e)}
                        className='contact_card p-4 rounded-3xl w-full flex flex-col text-xs md:text-base place-items-center gap-4'>
                        <FaCoffee className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                        <span>(For my supporters on Ko-fi)</span>

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

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact;
