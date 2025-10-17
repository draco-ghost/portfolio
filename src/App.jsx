import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Components/nav/Navbar';
import About from './Components/pages/About';
import Project from './Components/pages/Project';
import Contact from './Components/pages/Contact';
import Rightbar from './Components/nav/Rightbar';
import { useEffect, useState } from 'react';

function App() {

  const [isRightEn, setIsRightEn] = useState(false);

  const toggleRight = () => {
    setIsRightEn(!isRightEn);
  };

  useEffect(() => {
    function setVhProperty() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);

    return () => {
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('orientationchange', setVhProperty);  
    };
  }, []);

  return (
    <div>
      <div className='w-screen'
      style={{ 
        height: 'calc(var(--vh, 1vh) * 100)', 
        maxHeight: 'calc(var(--vh, 1vh) * 100)',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Navbar toggleRight={toggleRight} />
        <Rightbar isOpen={isRightEn} isClosed={toggleRight} />
        <div className='flex-grow overflow-y-auto'
        style={{ 
          minHeight: 0, // Required for flex overflow scroll
        }}
        >
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='/about' element={<About /> } />
            <Route path='/projects' element={<Project /> } />
            <Route path='/contact' element={<Contact /> } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
