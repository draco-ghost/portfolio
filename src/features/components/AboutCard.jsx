import React, { useEffect, useState } from 'react'
import { SkillCheck } from './SkillCheck'
import axios from 'axios';

export const AboutCard = ({ about, cardSkills }) => {

    const { check, header, ui } = about

    return (
        <div className='h-full'>
            <div className='about_card w-full h-full p-4 md:rounded-3xl cursor-pointer'>

                <img src={`http://localhost:3000${ui}`} alt={header} className='w-16' />
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
