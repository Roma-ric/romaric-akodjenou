import React from 'react';
import Link from 'next/link';
import AdaptiveText from './AdaptativeText';
import SectionTitle from './SectionTitle';

const About = () => {
    return (
        <div className="relative min-h-screen py-16 bg-transparent flex flex-col md:flex-row overflow-hidden md:pb-16">

            <SectionTitle
                text={"ABOUT ME"}
                percentage={50}
            />

            <div className='w-[80%] flex items-center mx-auto'>
                <div className='flex mt-10 relative mr-24'>
                    <img
                        src="file/profile-white.png"
                        alt="Romaric AKODJENOU"
                        className="w-[27.5rem] h-[27.5rem] block dark:hidden object-cover z-30"
                    />
                    <img
                        src="file/profile-black.png"
                        alt="Romaric AKODJENOU"
                        className="w-[27.5rem] h-[27.5rem] hidden dark:block object-cover z-30"
                    />
                    <div className='absolute mt-7 ml-7 w-[27.5rem] h-[27.5rem] border-[6px] border-yellow-500'>

                    </div>
                </div>
                <div className='flex text-xl'>
                    <div className='flex flex-col space-y-3'>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> First Name </span>
                            <span className='text-start'> AKODJENOU </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Last Name </span>
                            <span> Romaric </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Birthdate </span>
                            <span> 09 September 2003 </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Nationality </span>
                            <span> Benineese </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Experience </span>
                            <span> 2 years </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Adresse </span>
                            <span> Cotonou </span>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> First Name </span>
                            <span> AKODJENOU </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Last Name </span>
                            <span> Romaric </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Birthdate </span>
                            <span> 09 September 2003 </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Nationality </span>
                            <span> Benineese </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Experience </span>
                            <span> 2 years </span>
                        </div>
                        <div className='grid grid-cols-2'>
                            <span className='text-stone-300'> Adresse </span>
                            <span> Cotonou </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;