import React from "react";
import SectionTitle from "./SectionTitle";
import { HoverEffect } from "../aceternity/card-hover-effect";
import { useTranslations } from "next-intl";

const Projects = () => {
  const t = useTranslations("ProjectsSection");

  const projectsData = {
    title: t("title"),
    subtitle: t("subtitle"),
  };

  const projects = [
    {
      title: t("projects.brand.title"),
      description: t("projects.brand.description"),
      link: "https://brand.friym.com",
      fileSrc: "/realisation/brand-friym.png",
    },
    {
      title: t("projects.simam-cargo.title"),
      description: t("projects.simam-cargo.description"),
      link: "https://simam-cargo.vercel.app",
      fileSrc: "/realisation/simam-cargo.png",
    },
    {
      title: t("projects.simam-immigration.title"),
      description: t("projects.simam-immigration.description"),
      link: "https://simam-immigration.vercel.app",
      fileSrc: "/realisation/simam-immigration.png",
    },
    {
      title: t("projects.template-carrefoot-1.title"),
      description: t("projects.template-carrefoot-1.description"),
      link: "https://v2-carrefoot.vercel.app",
      fileSrc: "/realisation/template-carrefoot-1.png",
    },
    {
      title: t("projects.template-carrefoot-2.title"),
      description: t("projects.template-carrefoot-2.description"),
      link: "https://vote.carrefoot.com",
      fileSrc: "/realisation/template-carrefoot-2.png",
    },
    {
      title: t("projects.portfolio.title"),
      description: t("projects.portfolio.description"),
      link: "https://romaric-akodjenou.vercel.app",
      fileSrc: "/realisation/my-portfolio.png",
    },
    {
      title: t("projects.timer.title"),
      description: t("projects.timer.description"),
      link: "https://nexus-timer.vercel.app/",
      fileSrc: "/realisation/timer.png",
    },
  ];

  // const testimonials = [
  //   {
  //     testimonie:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
  //     name: "Lorem dolor", //Adlou A. Kondo
  //     designation: "Lorem ipsum dolor", //CEO at Friym
  //     src: "/maquette/blog1.png", //files/Adlou-A-KONDO.jpg
  //   },
  //   {
  //     testimonie:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
  //     name: "Lorem dolor", //Arnaud F. LOKONON
  //     designation: "Lorem ipsum dolor", //Full Stack Developer
  //     src: "/maquette/blog1.png", //files/Arnaud-F-LOKONON.jpg
  //   },
  //   {
  //     testimonie:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
  //     name: "Lorem dolor", //Godwin K. ADJAHOUINOU
  //     designation: "Lorem ipsum dolor", //CEO at Explotel
  //     src: "/maquette/blog1.png", //files/Godwin-K-ADJAHOUINOU.png
  //   },
  //   {
  //     testimonie:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium Lorem, ipsum dolor sit amet consectetur adipisicing elit. non, modi consequuntur reprehenderit nulla praesentium.",
  //     name: "Lorem dolor", //Mr Aristide
  //     designation: "Lorem ipsum dolor", //CEO at Carrefoot
  //     src: "/maquette/blog1.png", //files/Mr-Aristide.png
  //   },
  // ];

  return (
    <div
      className=" min-h-screen py-16 scr_4_0:pb-0   bg-transparent flex flex-col overflow-hidden"
      id="projects"
    >
      <SectionTitle
        text={projectsData.title}
        percentage={50}
        backgroundText="WORKS"
      />

      <div className="w-[70%] scr_2_2:w-[88%] scr_4:w-[95%] px-3 mx-auto">
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-7">
          {projectsData.subtitle}
        </h2>
        <div className="mt-0 scr_2_0:-mt-7">
          <HoverEffect items={projects} />
        </div>
      </div>

      {/* <div className="w-[70%] scr_2_2:w-[88%] px-3 mx-auto mt-10 scr_2_0:mt-0 z-40">
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-10">
          Testimonials
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div> */}
    </div>
  );
};

export default Projects;
