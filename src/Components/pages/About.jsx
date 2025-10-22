import React from 'react';
import check from './../../assets/star-rings.svg';
import ui from './../../assets/ui-ux-design.png';
import web from './../../assets/dev-web.svg';
import mob from './../../assets/mobile-dev.svg';
import desk from './../../assets/dsktop-app.png';
import htmlPng from './../../assets/html.png';
import cssPng from './../../assets/css.png';
import javaPng from './../../assets/java.png';
import pythonPng from './../../assets/python.png';
import javaSPng from './../../assets/java-script.png';
import reactPng from './../../assets/react.svg';

const About = () => {
  return (
    <div className='w-full h-full'>
      <div className='overflow-hidden text-green-400 w-full'>
          <div className='relative z-10 backdrop-blur-3xl w-full h-full text-center flex flex-col overflow-hidden overflow-y-auto
                     3lg:text-4xl'>
            <div className='pt-4 pb-4'>
              <div>
                <h1 className='font-bold text-2xl 3lg:text-4xl mb-5'>About Me</h1>
                <div className='px-1 lg:px-8 3lg:text-2xl font-bold font-mono'>
                  <p>Hey! I'm a solo developer passionate about building practical apps that make life easier. Whether it's a productivity tools or fun utility, I focus on creating solutions that simplify tasks and improve workflows. I’m always experimenting with new ideas to help users get things done faster and more effectively!</p>
                </div>
              </div>
              <div className='place-items-center'>
                <h1 className='underline w-[80vw] p-4 bg-zinc-800 lg:bg-black rounded-3xl md:w-[50vw]'>Skills</h1>
              </div>
              <div className='py-4 w-full h-full p-2 3lg:text-2xl'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 gap-4'>
                  <div className='bg-zinc-900 w-full h-full p-4 rounded-3xl hover:bg-zinc-800 cursor-pointer'>
                    <img src={ui} alt="" className='w-[64px]' />
                    <h2 className='p-3'>UI/UX Designs</h2>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Mobile App Design</p>
                      </div>
                    </div>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>User Flow</p>
                      </div>
                    </div>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Landing Page</p>
                      </div>
                    </div>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Web App Design</p>
                      </div>
                    </div>
                  </div>
                  <div className='bg-zinc-900 w-full p-2 h-full rounded-3xl hover:bg-zinc-800 cursor-pointer'>
                    <div className='p-4'>
                      <img src={web} alt="" className='w-[64px]' />
                    </div>
                    <h2 className='p-3'>Web development</h2>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Html/Css</p>
                        <img src={htmlPng} alt="check" className='w-[28px] h-[28px]' />
                        <img src={cssPng} alt="check" className='w-[28px] h-[28px]' />
                      </div>
                    </div>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>JavaScript</p>
                        <img src={javaSPng} alt="check" className='w-[28px] h-[28px]' />
                      </div>
                    </div>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>React</p>
                        <img src={reactPng} alt="check" className='w-[28px] h-[28px]' />
                      </div>
                    </div>
                  </div>
                  <div className='bg-zinc-900 w-full p-4 h-full rounded-3xl hover:bg-zinc-800 cursor-pointer'>
                    <div className='p-4'>
                      <img src={mob} alt="" className='w-[64px]' />
                    </div>
                    <h2 className='pt-3 pb-3'>Mobile App development</h2>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Java</p>
                        <img src={javaPng} alt="check" className='w-[28px] h-[28px]' />
                      </div>
                    </div>
                  </div>
                  <div className='bg-zinc-900 w-full p-4 h-full rounded-3xl hover:bg-zinc-800 cursor-pointer 3xl:p-4'>
                    <div className='p-4 3xl:p-0'>
                      <img src={desk} alt="" className='w-[64px]' />
                    </div>
                    <h2 className='pt-3 pb-3'>Desktop App development</h2>
                    <div className='flex gap-5 p-2 place-items-center hover:bg-zinc-700 hover:rounded-2xl relative group'>
                      <div className='absolute inset-0 w-full h-full bg-zinc-900 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left'></div>
                      <div className='relative w-full z-20 flex'>
                        <img src={check} alt="check" className='w-[24px]' />
                        <p className='rounded-2xl w-full'>Python</p>
                        <img src={pythonPng} alt="check" className='w-[28px] h-[28px]' />
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

export default About
