import React, { useState } from 'react';
import Footer from '../../util/Footer';

const Project = () => {

  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showFacebookD, setShowFacebookD] = useState(false);

  const isMobi = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleLinkedIn = () => {
    if (isMobi) {
      // On Mobi, try open directly with fallback
      closeAllModals();
      handleLinkedInClick();
    } else {
      // On desktop show modal
      closeAllModals();
      setShowLinkedIn(true);
    }
  }

  const handleFacebook = () => {
    if (isMobi) {
      // On Mobi, try open directly with fallback
      OpenDeepLink(FACEBOOK_APP_URL, FACEBOOK_URL);
    } else {
      // On desktop show modal
      closeAllModals();
      setShowFacebookD(true);
    }
  }

  const closeAllModals = () => {
    setShowLinkedIn(false);
    setShowFacebookD(false);
  };

  const handleGithub = () => {
    window.open(GITHUB_URL, "_blank");
  };

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
    <div className='overflow-hidden h-full'>
      <div className='text-green-400 w-full h-full overflow-hidden'>
        <div className='relative flex flex-col z-10 backdrop-blur-3xl w-full h-full overflow-hidden
              place-content-center place-items-center 3lg:text-4xl'>
          <div className='flex flex-col justify-between w-full h-full place-content-centeroverflow-hidden
              overflow-y-auto'>
            <div>
              <p className='border-b rounded-3xl p-[2px_10px] w-fit place-self-center mb-4 shadow-lg shadow-green-700 hover:shadow-pink-600 hover:text-pink-600 cursor-pointer'>
              Coming soon
            </p>
            </div>

            <div className='w-full relative place-content-center place-items-center'>
              <div className='w-full h-full relative place-content-center place-items-center'>
                <div className='outer absolute top-1/2 w-[200px] h-[200px]
                  transform -translate-y-1/2
                  z-50 rounded-full bg-zinc-800  shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  place-content-center place-items-center'>

                </div>
                <div className='middle absolute top-1/2 w-[160px] h-[160px]
                  transform -translate-y-1/2
                  z-50 rounded-full bg-zinc-800  shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  place-content-center place-items-center'>

                </div>
                <div className='inner absolute top-1/2 w-[120px] h-[120px]
                  transform -translate-y-1/2
                  z-50 rounded-full bg-zinc-800  shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  place-content-center place-items-center'>

                </div>
                <div className='center absolute top-1/2 w-[80px] h-[80px]
                  transform -translate-y-1/2
                  z-50 rounded-full bg-zinc-800  shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  place-content-center place-items-center'>

                </div>

                <div className='center-inner absolute top-1/2 w-[40px] h-[40px]
                  transform -translate-y-1/2
                  z-50 rounded-full bg-zinc-800  shadow-lg
                  md:left-1/2 md:-translate-x-1/2
                  place-content-center place-items-center'>

                </div>

              </div>
            </div>

            <div className='w-full'>
              <Footer setShowFacebookD={setShowFacebookD}
                setShowLinkedIn={setShowLinkedIn}
                handleLinkedIn={handleLinkedIn}
                handleFacebook={handleFacebook}
                handleGithub={handleGithub} />
            </div>
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
            <div onClick={() => setShowFacebookD(false)}
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
  )
}

export default Project
