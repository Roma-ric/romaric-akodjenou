import React from 'react';
import SectionTitle from './SectionTitle';
import Social from './Social';

const Footer = () => {
  return (
    <div className="min-w-[20rem] pt-16 pb-8 bg-transparent flex flex-col">

      <div className='mx-auto relative rounded-full p-1 bg-black dark:bg-white dark:border-white/[0.2] dark:bg-opacity-5 bg-transparent -mt-[6.5rem]'>
        <img
          src="file/profile-white.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-full border-4 block dark:hidden object-cover z-30"
        />
        <img
          src="file/profile-black.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-full border-4 hidden dark:block object-cover z-30"
        />
      </div>

      <div className='mx-auto mb-4'>
        <Social />
      </div>
      <p className='text-center text-xs font-semibold'> © {(new Date()).getFullYear()} Romaric AKODJENOU. </p>

    </div>
  );
};

export default Footer;