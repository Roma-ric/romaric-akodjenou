import React from 'react';
import SectionTitle from './SectionTitle';
import { AnimatedTestimonials } from '../aceternity/animated-testimonials';
import { HoverEffect } from '../aceternity/card-hover-effect';

const Projects = () => {

  const testimonials = [
    {
      quote:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
      name: "Lorem dolor", //Adlou A. Kondo
      designation: "Lorem ipsum dolor", //CEO at Friym
      src: "/maquette/about-me2.png", ///files/Adlou-A-KONDO.jpg
    },
    {
      quote:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
      name: "Lorem dolor", //Godwin K. ADJAHOUINOU
      designation: "Lorem ipsum dolor", //CEO at Explotel
      src: "/maquette/about-me2.png", ///files/Godwin-K-ADJAHOUINOU.png
    },
    {
      quote:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
      name: "Lorem dolor", //Mr Aristide
      designation: "Lorem ipsum dolor", //CEO at Carrefoot
      src: "/maquette/about-me2.png", ///files/Mr-Aristide.png
    },
    {
      quote:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
      name: "Lorem dolor", //Arnaud F. LOKONON
      designation: "Lorem ipsum dolor", //Full Stack Developer
      src: "/maquette/about-me2.png", ///files/Arnaud-F-LOKONON.jpg
    },
  ];

  const projects = [
    {
      title: "Faiza Zeina",
      description:
        "Presentation of the works of Faiza Zeina, a French artist specializing in digigraphy, linocut, painting, lithography, screen printing, engraving, and drawing.",
      link: "https://faiza-mzeina.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Vote Carrefoot - Front end",
      description:
        "Voting platform for the best African football players through interactive monthly and annual elections.",
      link: "https://vote.carrefoot.com",
      fileSrc: '/realisation/vote-carrefoot.png'
    },
    {
      title: "Portfolio",
      description:
        "My portfolio.",
      link: "https://romaric-akodjenou.vercel.app",
      fileSrc: '/realisation/my-portfolio.png'
    },
    {
      title: "Pronostic Carrefoot - Front end",
      description:
        "Platform allowing users to submit their predictions for football matches.",
      link: "https://pronostic.carrefoot.com",
      fileSrc: '/realisation/pronostic-carrefoot.png'
    },
    {
      title: "Explotel - Front end",
      description:
        "Online ticketing platform to book, sell, and buy tickets for events, concerts, shows, and sports.",
      link: "https://www.explotel.com",
      fileSrc: '/realisation/explotel.png'
    },
    // {
    //   title: "ROMAS Technologie",
    //   description:
    //     "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    //   link: "https://amazon.com",
    //   fileSrc: '/realisation/faiza-zeina.png'
    // }
  ];

  return (
    <div className=" min-h-screen py-16 scr_4_0:pb-0   bg-transparent flex flex-col overflow-hidden" id='projects'>

      <SectionTitle
        text={"PORTFOLIO"}
        percentage={50}
        backgroundText='WORKS'
      />

      <div className='w-[70%] scr_2_2:w-[88%] scr_4:w-[95%] px-3 mx-auto'>
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-7">
          Projects
        </h2>
        <div className='mt-0 scr_2_0:-mt-7'>
          <HoverEffect items={projects} />
        </div>
      </div>

      <div className='w-[70%] scr_2_2:w-[88%] px-3 mx-auto mt-10 scr_2_0:mt-0 z-40'>
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-10">
          Testimonials
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>

    </div>
  );
};

export default Projects;