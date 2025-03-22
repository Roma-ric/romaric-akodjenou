import React from 'react';
import Social from './Social';

const Footer = () => {
  return (
    <div className=" pt-16 pb-8 scr_3:pb-24 bg-black bg-opacity-10 dark:bg-transparent flex flex-col">

      <div className='mx-auto relative rounded-full p-1 bg-transparent -mt-[6.7rem]'>
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