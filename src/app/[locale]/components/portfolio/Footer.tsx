import React from 'react';
import Social from './Social';

const Footer = () => {
  return (
    <div className=" pt-16 pb-8 border-t scr_3:pb-24 bg-black/5 dark:bg-transparent flex flex-col">

      <div className='mx-auto relative pointer-events-none rounded-full p-1 bg-transparent -mt-[6.7rem]'>
        <img
          src="files/profile-white.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-full border-4 block dark:hidden object-cover z-30"
        />
        <img
          src="files/profile-black.png"
          alt="Romaric AKODJENOU"
          className="w-[5rem] h-[5rem] rounded-full border-4 hidden dark:block object-cover z-30"
        />
      </div>

      <div className='mx-auto mb-4'>
        <Social />
      </div>
      <p className='text-center text-xs'> © {(new Date()).getFullYear()} Romaric AKODJENOU. </p>

    </div>
  );
};

export default Footer;