"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import RotatingText from "../reactbits/RotatingText";
import { navigateToSection } from "@/lib/utils";

const Hero = () => {
  const t = useTranslations("HeroSection");
  const reduceMotion = useReducedMotion();

  const profile = [t("profile.0"), t("profile.1")];

  // Chaque ligne du titre monte depuis un masque, l'une après l'autre
  const lines = [
    { text: t("greeting"), dot: true },
    { text: t("iAm"), dot: false },
    { text: t("firstName"), dot: false, accent: true },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent dark:bg-grid-white/[0.2] bg-grid-black/[0.15] flex items-center">
      {/* Voile qui estompe la grille vers les bords */}
      <div className="pointer-events-none absolute inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-8 py-24 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        {/* Grand titre */}
        <div>
          <h1 className="font-bold leading-[0.95] tracking-tight text-black dark:text-white text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
            {lines.map(({ text, dot, accent }, i) => (
              <span key={text} className="block overflow-hidden pb-2">
                <motion.span
                  className={`block ${accent ? "text-yellow-500" : ""}`}
                  initial={reduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    damping: 24,
                    stiffness: 140,
                    delay: 0.9 + i * 0.15,
                  }}
                >
                  {text}
                  {dot && <span className="text-yellow-500">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Accroche + bouton */}
        <motion.div
          className="flex flex-col items-start gap-6 text-black dark:text-white"
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          <div className="relative hidden h-40 w-40 overflow-hidden rounded-[30px] shadow-[0_0_7px_rgba(0,0,0,0.6)] lg:block xl:h-52 xl:w-52">
            <Image
              src="/files/profile-bg.png"
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 1280px) 13rem, 10rem"
              className="object-cover"
              priority
            />
          </div>

          <h2 className="pointer-events-none text-2xl font-bold sm:text-3xl">
            <RotatingText
              texts={profile}
              mainClassName="px-2 bg-yellow-500 text-black w-max overflow-hidden justify-center rounded-lg"
              staggerFrom="first"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h2>

          <p className="max-w-md text-lg text-neutral-700 dark:text-neutral-300">
            {t("description")}
          </p>

          <button
            type="button"
            onClick={() => navigateToSection("#about")}
            className="group inline-flex items-center gap-3 rounded-full border-2 border-yellow-500 px-6 py-2 text-lg font-bold transition-colors duration-300 hover:bg-yellow-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
          >
            {t("moreText")}
            <span className="flex items-center justify-center rounded-full bg-yellow-500 p-2 text-black">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
