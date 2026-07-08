import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './features/pages/Home';
import { About } from './features/pages/About';
import Project from './features/pages/Project';
import Contact from './features/pages/Contact';
import Source from './features/pages/Source';
import { useUmamiPageView } from './util/umami_page';
import { Preview } from './features/pages/Preview';
import { Overview } from './features/layout/Overview';
import { P_Project } from './features/pages/P_Project';
import { Download } from './features/pages/Download';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  useUmamiPageView(); // track every route change

  /*
  // ------ Umami: disable on localhost & track outbound links ------
  useEffect(() => {
    // Disable tracking on localhost
    if (window.location.hostname === 'localhost') {
      localStorage.setItem('umami.disabled', 1);
    }
  }, []);
  */

  return (
    <div className='h-dvh flex flex-col overflow-hidden'>
      <div className='flex-1 min-h-0 overflow-hidden text-green-400'>
          <Routes>
            <Route path='/' element={<Overview />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path='home' element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />

              <Route
                path='p/*'
                element={
                  <Project />
                }
              >
                <Route index element={<Navigate to="projects" replace />} />

                <Route path='projects' element={<P_Project />} />
                <Route path='source' element={<Source />} />
                <Route path='image' element={<Preview />} />
                <Route path='download' element={<Download />} />
              </Route>

            </Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
