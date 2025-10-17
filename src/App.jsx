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
      <div className='w-screen h-screen max-h-screen'>
        <Navbar toggleRight={toggleRight} />
        <Rightbar isOpen={isRightEn} isClosed={toggleRight} />
        <div className='w-screen h-[calc(100vh-40px)] sm:h-[calc(100vh-50px)] md:h-[calc(100vh-70px)] max-h-[calc(100vh-40px)] sm:max-h-[calc(100vh-50px)] md:max-h-[calc(100vh-70px)] overflow-hidden overflow-y-auto'>
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
