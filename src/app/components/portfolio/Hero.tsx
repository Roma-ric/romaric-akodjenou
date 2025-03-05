'use client'

import React from 'react';
import Link from 'next/link';
import RotatingText from '../reactbits/RotatingText';

const Hero = () => {
  return (
    <div className="relative min-w-[20rem] min-h-screen bg-transparent dark:bg-grid-white/[0.2] bg-grid-black/[0.15] border-b dark:border-b-stone-800 flex flex-col overflow-hidden">
      {/* Couleur d'arrière-plan jaune */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute h-[200%] w-full -rotate-[15deg] left-[-83%] top-[-50%] bg-black dark:bg-yellow-500 z-40 "></div>

      {/* Contenu principal */}
      <div className="relative w-full z-40 h-screen flex">
        {/* Section photo */}
        <div className="w-1/2 z-40 flex py-10 justify-start bg-transparent items-center relative p-8">
          <div className="w-full h-full shadow-[0_0_7px_rgba(0,0,0,0.9)] hidden dark:block max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="file/profile-black.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full shadow-[0_0_7px_rgba(0,0,0,0.9)] block dark:hidden max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="file/profile-white.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section texte */}
        <div className="w-1/2 flex flex-col justify-center p-8 mr-20 text-black dark:text-white">
          <div className=''>
            <h1 className="flex whitespace-nowrap text-yellow-500 items-center text-4xl font-bold mb-4">
              <span className="mr-4">—</span>
              I'M ROMARIC AKODJENOU.
            </h1>
            <h2 className="text-4xl font-bold mb-6">
              <RotatingText
                texts={['FRONT-END DEVELOPER', 'FULL-STACK DEVELOPER', 'FREELANCER', 'API DEVELOPER']}
                mainClassName="px-2 text-4xl bg-yellow-500 w-max overflow-hidden justify-center rounded-lg"
                staggerFrom={"first"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </h2>
            <p className="text-lg mb-8 max-w-2xl">
              I am a full-stack developer specializing in creating modern and
              high-performance web interfaces. Focused on innovation and efficiency,
              I design solutions tailored to users' needs to enhance their daily experience.
            </p>

            <Link href="/about" className=''>
              <div className="inline-flex items-center text-black dark:text-white rounded-full bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 transition-colors duration-300 cursor-pointer px-8 py-3">
                <span className="mr-2 font-bold">MORE ABOUT ME</span>
                <div className="bg-yellow-500 rounded-full p-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;