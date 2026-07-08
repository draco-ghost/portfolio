import React, { useEffect, useState } from 'react'
import { SkillCheck } from './SkillCheck'
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

export const AboutCard = ({ about, cardSkills }) => {

    const { check, header, ui } = about

    return (
        <div className='h-full'>
            <div className='about_card w-full h-full p-4 md:rounded-3xl cursor-pointer'>

                <img src={`${API_URL}${ui}`} alt={header} className='w-16' />
                <h3 className='p-3'>{header}</h3>
                
                {cardSkills.map((skill, index) => (
                    <SkillCheck 
                        key={index}
                        info={skill}
                        checkIcon={check}
                    />
                ))}

            </div>
        </div>
    )
}
