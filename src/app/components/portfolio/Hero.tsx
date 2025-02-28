import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-transparent border-b dark:border-b-slate-700 flex flex-col md:flex-row overflow-hidden md:pb-16">
      {/* Couleur d'arrière-plan jaune */}
      <div className="absolute h-[200%] w-full -rotate-[15deg] left-[-83%] top-[-50%] lg:hidden bg-black dark:bg-yellow-500 z-40 "></div>

      {/* Contenu principal */}
      <div className="relative w-full lg:overflow-y-auto z-40 h-screen lg:h-auto flex lg:flex-col">
        {/* Section photo */}
        <div className="w-1/2 lg:w-full z-40 flex py-10 lg:pb-4 md:pt-14 md:pb-0 justify-start lg:justify-center bg-transparent items-center relative p-8">
          <div className="w-full h-full shadow-[0_0_7px_rgba(0,0,0,0.9)] lg:shadow-none hidden dark:block lg:block lg:dark:hidden lg:bg-transparent max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="file/profile-black.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full lg:mx-auto lg:w-[16.875rem] lg:h-[16.875rem] low-xs:w-[14.875rem] low-xs:h-[14.875rem] lg:border-[4px] lg:border-[#252525] lg:rounded-full object-cover"
            />
          </div>
          <div className="w-full h-full shadow-[0_0_7px_rgba(0,0,0,0.9)] lg:shadow-none block dark:hidden lg:hidden lg:dark:block lg:bg-transparent max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="file/profile-white.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full lg:mx-auto lg:w-[16.875rem] lg:h-[16.875rem] low-xs:w-[14.875rem] low-xs:h-[14.875rem]  lg:border-[4px] lg:border-[#252525]  lg:rounded-full object-cover"
            />
          </div>
        </div>

        {/* Section texte */}
        <div className="w-1/2 lg:w-full flex flex-col lg:items-center justify-center p-8 md:p-12 md:pt-4 low-xs:px-8 xl:mr-[7.5rem] mr-20 lg:mr-0 text-black dark:text-white">
          <div className='lg:flex lg:flex-col lg:items-center'>
            <h1 className="flex whitespace-nowrap low-xs:text-center text-yellow-500 items-center text-4xl lg:text-3xl md:text-xl sm:text-lg low-xs:text-3xl font-bold mb-4">
              <span className="mr-4 sm:hidden">—</span>
              I'M ROMARIC AKODJENOU.
            </h1>
            <h2 className="text-4xl lg:text-3xl md:text-xl sm:text-lg font-bold mb-6">
              WEB DEVELOPER
            </h2>
            <p className="text-lg mb-8 max-w-2xl lg:text-center lg:px-5">
              I am a full-stack developer specializing in creating modern and
              high-performance web interfaces. Focused on innovation and efficiency,
              I design solutions tailored to users' needs to enhance their daily experience.
            </p>

            <Link href="/about" className='lg:mx-auto'>
              <div className="inline-flex items-center text-black dark:text-white rounded-full bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 transition-colors duration-300 cursor-pointer px-8 lg:px-6 lg:py-2 py-3">
                <span className="mr-2 font-bold lg:text-md">MORE ABOUT ME</span>
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