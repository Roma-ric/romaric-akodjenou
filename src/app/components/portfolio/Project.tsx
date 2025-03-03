import React from 'react';
import SectionTitle from './SectionTitle';
import { AnimatedTestimonials } from '../aceternity/animated-testimonials';

const Projects = () => {

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/maquette/blog1.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/maquette/blog2.png",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/maquette/blog3.png",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/maquette/portfolio1.png",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/maquette/portfolio2.png",
    },
  ];

  return (
    <div className="relative min-h-screen py-16 border-b dark:border-b-stone-800  bg-transparent flex flex-col md:flex-row overflow-hidden md:pb-16" id='projects'>

      <SectionTitle
        text={"MY PORTFOLIO"}
        percentage={50}
        backgroundText='WORKS'
      />

      <div className='w-[80%] mx-auto mt-10'>
        <h2 className="text-5xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mt-16">
          Testimonials
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>

    </div>
  );
};

export default Projects;