import React from 'react';
import Social from './Social';

const Footer = () => {
  return (
    <div className="pt-16 pb-8 border-t-2 border-foreground scr_3:pb-24 bg-background flex flex-col">

      <div className='mx-auto relative pointer-events-none rounded-none p-1 bg-transparent -mt-[6.7rem]'>
        <img
          src="files/profile-white.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-none brutal-border block dark:hidden object-cover z-30"
        />
        <img
          src="files/profile-black.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-none brutal-border hidden dark:block object-cover z-30"
        />
      </div>

      <div className='mx-auto mb-4'>
        <Social />
      </div>
      <p className='text-center text-xs brutal-tag'> © {(new Date()).getFullYear()} Romaric AKODJENOU. </p>

    </div>
  );
};

export default Footer;