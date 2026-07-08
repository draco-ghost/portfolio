import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AboutCard } from '../components/AboutCard';
import { AboutSkel } from '../../loading/AboutSkel';


const API_URL = import.meta.env.VITE_API_URL;


export const About = () => {
  const [about, setAbout] = useState([]);
  const [skillData, setskillData] = useState({});
  const [serverDown, setServerDown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const maxRetries = 3;
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
        const [aboutRes, skillRes] = await Promise.all([
          axios.get(`${API_URL}/api/about/ab`),
          axios.get(`${API_URL}/api/about/sk`)
        ]);

          setAbout(aboutRes.data);
        setskillData(skillRes.data);
          setServerDown(false);
          setLoading(false);

          return; // success, stop retrying
        } catch (err) {
          attempt++;
          console.error(`Request failed. Attempt ${attempt}/${maxRetries}`);

          if (attempt < maxRetries) {
            // wait before trying again
            await new Promise(resolve =>{
              setTimeout(resolve, 1500)
            });
          }
        }
      }
      // only reached after all retries failed
      setServerDown(true);
          setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
      return <AboutSkel />;
    }

  return (
    <div className='w-full h-full overflow-hidden overflow-y-auto'>
      <div className='flex flex-col w-full h-full'>
        <div>
          <h2 className='font-bold mb-2 text-center'>About Me</h2>
          <div className='lg:px-8 font-bold font-mono text-center px-[clamp(0.5rem,1vw,2rem)]'>
            <p>Hey! I'm a solo developer passionate about building practical apps that make life easier. Whether it's a productivity tools or fun utility, I focus on creating solutions that simplify tasks and improve workflows. I’m always experimenting with new ideas to help users get things done faster and more effectively!</p>
          </div>
          <h3 className='font-bold mt-5 underline text-center'>Skills</h3>
        </div>

        <div className='flex-1'>
          {serverDown ? (
            <div className='h-full flex items-center justify-center'>
              <div className='md:self-center'>
                <div className='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                  <p className='text-gray-400 font-bold'>Wait server is down!!!</p>
                </div>
              </div>
            </div>
          ) : about.length === 0 ? (
            <div className='h-full flex items-center justify-center'>
              <div className='md:self-center'>
                <div className='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                  <p className='text-gray-400 font-bold'>No project found</p>
                </div>
              </div>
            </div>
          ) : (

          <div className='w-full about_grid gap-4 p-[clamp(0.5rem,1vw,2rem)]'>

            {about.map((proj) => (
              <div
                key={proj.id}
                className='place-content-center'
              >
                <AboutCard
                  about={proj}
                  cardSkills={skillData[proj.id] || []}
                />
              </div>
            ))}

          </div>
          )}
        </div>
      </div>
    </div>
  )
}