import React from 'react';
import SectionTitle from './SectionTitle';
import { AnimatedTestimonials } from '../aceternity/animated-testimonials';
import { HoverEffect } from '../aceternity/card-hover-effect';

const Projects = () => {

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/maquette/about-me2.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/maquette/about-me2.png",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/maquette/about-me2.png",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/maquette/about-me2.png",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/maquette/about-me2.png",
    },
  ];

  const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
      fileSrc: '/realisation/faiza-zeina.png'
    },
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

      <div className='w-[70%] scr_2_2:w-[88%] px-3 mx-auto mt-10 scr_2_0:mt-0'>
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-10">
          Testimonials
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>

    </div>
  );
};

export default Projects;