import React, { useState } from 'react';
import code_logo from './../../assets/dragon_logo_1.png';
import { FaLinkedin } from 'react-icons/fa6';
import { FaFacebook, FaGithub } from "react-icons/fa";


const LINKED_IN_URL = "https://www.linkedin.com/in/draco-ghost-173385350";
const LINKEDIN_APP_URL = "linkedin://in/draco-ghost-173385350"; // Deep link

const GITHUB_URL = "https://github.com/draco-ghost";
const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61582662980698";
const FACEBOOK_APP_URL = "fb://profile/61582662980698";


const Contact = () => {
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showFacebookD, setShowFacebookD] = useState(false);

  const handleAppOpen = () => {
    setShowLinkedIn(false);

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
    setShowLinkedIn(false);
    window.open(LINKED_IN_URL, "_blank");
  };

  const handleGithub = () => {
      window.open(GITHUB_URL, "_blank");
  };

  const handleFabAppOpen = () => {
    setShowFacebookD(false);

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
    window.open(FACEBOOK_URL, "_blank");
  };


  return (
    <div className='overflow-hidden'>
      <div className='text-green-400 w-screen h-[calc(100vh-40px)] sm:h-[calc(100vh-50px)] md:h-[calc(100vh-70px)] max-h-[calc(100vh-40px)] sm:max-h-[calc(100vh-50px)] md:max-h-[calc(100vh-70px)]
          place-content-center place-items-center'>
        <div className='h-full w-full lg:flex relative overflow-hidden'>
          <div className='absolute w-full inset-0 pointer-events-none h-full'>
            <img src={code_logo} alt="" className='h-auto max-h-full' />
          </div>
          <div className={`contact-div backdrop-blur-3xl cont-content relative z-10 w-full h-full pt-4 flex flex-col
            overflow-y-auto  max-h-[calc(100vh-40px)] lg:max-h-[calc(100vh-70px)] 
            place-content-center place-items-center`}>

            <div className='w-full place-items-center mt-5 justify-center sm:border-t sm:border-b rounded-2xl backdrop-blur-3xl lg:backdrop-blur-none lg:rounded-2xl lg:border'>
              <h1 className='font-bold text-2xl 3lg:text-3xl w-fit ml-5 mt-[-20px] sm:bg-black p-2 sm:rounded-2xl'>Contact Me</h1>
              <div className='w-full pl-5 pr-5 pt-2 cursor-pointer font-mono'>
                <div className='text-center'>
                  <p>Let's Connect</p>
                  <p>I'm always open to collaboration, ideas, or just a good conversation.</p>
                  <p>Find me on the platforms below, whether you want to talk code, design, or community</p>
                </div>
              </div>
              <div className='w-full cursor-pointer text-3xl 3lg:text-4xl gap-10 flex justify-center '>
                <div className='w-full p-7 md:grid md:grid-cols-2 gap-4 font-mono place-content-center place-items-center'>
                  <div onClick={() => setShowLinkedIn(true)}
                    aria-label="Open LinkedIn profile options"
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowLinkedIn(true)}
                    className='flex flex-col text-xs md:text-base place-items-center gap-4'>
                    <FaLinkedin className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    <span>(Talk career, collabs, or networking)</span>
                  </div>
                  <div onClick={() => setShowFacebookD(true)}
                  aria-label='Open Facebook profile'
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && showFacebookD(true)}
                  className='flex flex-col text-xs md:text-base place-items-center gap-4'>
                    <FaFacebook className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    <span>(For social convos and updates)</span>
                  </div>
                  <div onClick={handleGithub}
                  aria-label='Open Github profile'
                  role='button'
                  onKeyDown={handleGithub}
                  className='flex flex-col text-xs md:text-base place-items-center gap-4 col-span-2'>
                    <FaGithub className='transition text-3xl md:text-4xl delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink-600' />
                    <span>(See what I'm building)</span>
                  </div>

                  {showLinkedIn && (
                    <div onClick={() => setShowLinkedIn(false)}
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
                          <button onClick={() => setShowLinkedIn(false)}
                            className='p-[2px_15px] bg-blue-500 hover:bg-[#ff0080] rounded-3xl'>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showFacebookD && (
                    <div onClick={() => setShowLinkedIn(false)}
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
                          <button onClick={() => setShowFacebookD(false)}
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
  )
}

export default Contact
