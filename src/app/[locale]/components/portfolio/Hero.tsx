"use client";

import React from "react";
import Link from "next/link";
import RotatingText from "../reactbits/RotatingText";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HeroSection");

  const profile = [t("profile.0"), t("profile.1")];
  const nameWords = t("title").replace(/\.$/, "").split(" ");

  return (
    <div
      className="relative min-h-screen bg-background dark:bg-grid-white/[0.2] bg-grid-black/[0.15] flex flex-col justify-center overflow-hidden"
      id="home"
    >
      {/* Fond */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="absolute h-[200%] scr_2_0:hidden w-full -rotate-[15deg] left-[-83%] top-[-50%] bg-accent border-y-4 border-foreground z-40" />

      {/* Contenu principal */}
      <div className="relative w-full scr_2_0:overflow-y-auto scr_2_0:h-auto scr_2_0:flex-col z-40 h-screen flex">
        {/* Section photo */}
        <div className="w-1/2 scr_4_0:hidden scr_2_0:w-full scr_2_0:justify-center z-40 flex py-10 scr_2_0:pb-0 justify-start bg-transparent items-center relative p-8">
          <div className="w-full h-full max-w-md xl:max-w-[90%] scr_2_0:max-w-none scr_2_0:w-[16.875rem] scr_2_0:h-[16.875rem] scr_4:w-[14.875rem] scr_4:h-[14.875rem] scr_2_0:mx-auto brutal-border brutal-shadow brutal-marks rounded-none overflow-hidden bg-foreground rotate-[-1.5deg]">
            <img
              src="/files/profile-bg.png"
              alt={t("title")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section texte */}
        <div className="w-1/2 scr_2_0:w-full scr_2_0:items-center scr_2_0:mr-0 flex flex-col justify-center p-8 scr_2_0:pt-0 mr-20 text-foreground">
          <div className="scr_2_0:flex scr_2_0:flex-col scr_2_0:items-center">
            {/* Kicker numéroté */}
            <div className="brutal-kicker mb-5 scr_2_0:mx-auto">
              <span>N°00</span>
              <span aria-hidden="true">—</span>
              <span>HOME</span>
            </div>

            {/* Nom : titre géant en poster */}
            <h1 className="scr_4:text-center font-display font-black uppercase leading-[0.85] text-7xl scr_2_0:text-6xl scr_4:text-5xl scr_4_2:text-4xl mb-6">
              {nameWords.map((word, index) => (
                <span key={index} className="block">
                  {word}
                  {index === nameWords.length - 1 && (
                    <span className="text-accent">.</span>
                  )}
                </span>
              ))}
            </h1>

            {/* Profil */}
            <h2 className="text-4xl scr_2_0:text-3xl scr_4:text-2xl font-display font-bold mb-6 pointer-events-none uppercase leading-none scr_4:leading-tight">
              <RotatingText
                texts={profile}
                mainClassName="px-3 py-1 text-4xl scr_2_0:text-3xl scr_4:text-xl bg-accent text-accent-foreground brutal-border brutal-shadow-sm w-max max-w-[85vw] overflow-hidden justify-center rounded-none"
                staggerFrom="first"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400,
                }}
                rotationInterval={3000}
              />
            </h2>

            {/* Description */}
            <p className="text-lg mb-8 max-w-2xl scr_2_0:text-center scr_2_0:px-5 text-muted-foreground">
              {t("description")}
            </p>

            {/* Bouton */}
            <Link href="#about" className="scr_2_0:mx-auto">
              <div className="brutal-btn text-lg scr_4:text-md">
                <span>{t("moreText")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 011 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
