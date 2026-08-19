"use client";

import React, { Fragment } from "react";
import SectionTitle from "./SectionTitle";
import { Timeline } from "../aceternity/timeline";
import Link from "next/link";
import { Download } from "lucide-react";
import SkillCard from "./SkillCard";
import CountUp, { CountUpProps } from "../reactbits/CountUp";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutSection");

  const about = {
    title: t("title"),
    backtitle: t("backtitle"),
    subtitle: t("subtitle"),
    personalInfo: {
      firstName: {
        label: t("personalInfo.firstName.label"),
        value: t("personalInfo.firstName.value"),
      },
      lastName: {
        label: t("personalInfo.lastName.label"),
        value: t("personalInfo.lastName.value"),
      },
      birthdate: {
        label: t("personalInfo.birthdate.label"),
        value: t("personalInfo.birthdate.value"),
      },
      nationality: {
        label: t("personalInfo.nationality.label"),
        value: t("personalInfo.nationality.value"),
      },
      address: {
        label: t("personalInfo.address.label"),
        value: t("personalInfo.address.value"),
      },
      freelance: {
        label: t("personalInfo.freelance.label"),
        value: t("personalInfo.freelance.value"),
      },
      phone: {
        label: t("personalInfo.phone.label"),
        value: t("personalInfo.phone.value"),
      },
      email: {
        label: t("personalInfo.email.label"),
        value: t("personalInfo.email.value"),
      },
      languages: {
        label: t("personalInfo.languages.label"),
        value: t("personalInfo.languages.value"),
      },
    },
    downloadText: t("downloadText"),
    experienceTitle: t("experiences.title"),
    skillsTitle: t("skills.title"),
  };

  const experience_data = [
    {
      title: t("experiences.simam.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.simam.position")}</span>
            <span className="text-end">{t("experiences.simam.period")}</span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.simam.responsibilities.0")}</li>
              <li> {t("experiences.simam.responsibilities.1")} </li>
              <li>{t("experiences.simam.responsibilities.2")}</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t("experiences.carrefoot.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.carrefoot.position")}</span>
            <span className="text-end">
              {t("experiences.carrefoot.period")}
            </span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.carrefoot.responsibilities.0")}</li>
              <li> {t("experiences.carrefoot.responsibilities.1")} </li>
              <li> {t("experiences.carrefoot.responsibilities.2")} </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t("experiences.explotel.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.explotel.position")}</span>
            <span className="text-end">{t("experiences.explotel.period")}</span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.explotel.responsibilities.0")}</li>
              <li> {t("experiences.explotel.responsibilities.1")} </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t("experiences.fidevo.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.fidevo.position")}</span>
            <span className="text-end">{t("experiences.fidevo.period")}</span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.fidevo.responsibilities.0")}</li>
              <li> {t("experiences.fidevo.responsibilities.1")} </li>
              <li> {t("experiences.fidevo.responsibilities.2")} </li>
              <li> {t("experiences.fidevo.responsibilities.3")} </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t("experiences.romas.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.romas.position")}</span>
            <span className="text-end">{t("experiences.romas.period")}</span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.romas.responsibilities.0")}</li>
              <li> {t("experiences.romas.responsibilities.1")} </li>
              <li> {t("experiences.romas.responsibilities.2")} </li>
              <li> {t("experiences.romas.responsibilities.3")} </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t("experiences.payPlus.company"),
      content: (
        <div>
          <div className="text-neutral-800 space-x-5 flex justify-between dark:text-neutral-200 text-2xl scr_3_0:text-lg font-normal mb-4">
            <span>{t("experiences.payPlus.position")}</span>
            <span className="text-end">{t("experiences.payPlus.period")}</span>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              <li>{t("experiences.payPlus.responsibilities.0")}</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const skills = [
    {
      name: "HTML",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
        >
          <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
        </svg>
      ),
    },
    {
      name: "CSS",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
        >
          <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z" />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <rect width={28} height={28} x={2} y={2} rx={1.312} />
          <path
            d="M18.245 23.759v3.068a6.492 6.492 0 0 0 1.764.575 11.56 11.56 0 0 0 2.146.192 9.968 9.968 0 0 0 2.088-.211 5.11 5.11 0 0 0 1.735-.7 3.542 3.542 0 0 0 1.181-1.266 4.469 4.469 0 0 0 .186-3.394 3.409 3.409 0 0 0-.717-1.117 5.236 5.236 0 0 0-1.123-.877 12.027 12.027 0 0 0-1.477-.734q-.6-.249-1.08-.484a5.5 5.5 0 0 1-.813-.479 2.089 2.089 0 0 1-.516-.518 1.091 1.091 0 0 1-.181-.618 1.039 1.039 0 0 1 .162-.571 1.4 1.4 0 0 1 .459-.436 2.439 2.439 0 0 1 .726-.283 4.211 4.211 0 0 1 .956-.1 5.942 5.942 0 0 1 .808.058 6.292 6.292 0 0 1 .856.177 5.994 5.994 0 0 1 .836.3 4.657 4.657 0 0 1 .751.422V13.9a7.509 7.509 0 0 0-1.525-.4 12.426 12.426 0 0 0-1.9-.129 8.767 8.767 0 0 0-2.064.235 5.239 5.239 0 0 0-1.716.733 3.655 3.655 0 0 0-1.171 1.271 3.731 3.731 0 0 0-.431 1.845 3.588 3.588 0 0 0 .789 2.34 6 6 0 0 0 2.395 1.639q.63.26 1.175.509a6.458 6.458 0 0 1 .942.517 2.463 2.463 0 0 1 .626.585 1.2 1.2 0 0 1 .23.719 1.1 1.1 0 0 1-.144.552 1.269 1.269 0 0 1-.435.441 2.381 2.381 0 0 1-.726.292 4.377 4.377 0 0 1-1.018.105 5.773 5.773 0 0 1-1.969-.35 5.874 5.874 0 0 1-1.805-1.045Zm-5.154-7.638h4v-2.527H5.938v2.527H9.92v11.254h3.171Z"
            style={{
              fill: "#000000",
              fillRule: "evenodd",
            }}
          />
        </svg>
      ),
    },
    // {
    //   name: "Bootstrap",
    //   logo: (
    //     <svg
    //       className="w-12 h-12"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 576 512"
    //       fill="currentColor"
    //     >
    //       <path d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.3,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.4h-50.1v78.4h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.4,290.2,266.4z" />
    //     </svg>
    //   ),
    // },
    {
      name: "Tailwind CSS",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54 33"
          fill="currentColor"
        >
          <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
        </svg>
      ),
    },
    {
      name: "React.js",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" />
        </svg>
      ),
    },
    // {
    //   name: "Vue.js",
    //   logo: (
    //     <svg
    //       className="w-12 h-12"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 448 512"
    //       fill="currentColor"
    //     >
    //       <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z" />
    //     </svg>
    //   ),
    // },
    {
      name: "Next.js",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z" />
        </svg>
      ),
    },
    {
      name: "React Query",
      logo: (
        <svg
          height="660"
          viewBox="0 0 663 660"
          fill="currentColor"
          width="55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m305.114318.62443771c8.717817-1.14462121 17.926803-.36545135 26.712694-.36545135 32.548987 0 64.505987 5.05339923 95.64868 14.63098274 39.74418 12.2236582 76.762804 31.7666864 109.435876 57.477568 40.046637 31.5132839 73.228974 72.8472109 94.520714 119.2362609 39.836383 86.790386 39.544267 191.973146-1.268422 278.398081-26.388695 55.880442-68.724007 102.650458-119.964986 136.75724-41.808813 27.828603-90.706831 44.862601-140.45707 50.89341-63.325458 7.677926-131.784923-3.541603-188.712259-32.729444-106.868873-54.795293-179.52309291-165.076271-180.9604082-285.932068-.27660564-23.300971.08616998-46.74071 4.69884909-69.814998 7.51316071-37.57857 20.61272131-73.903917 40.28618971-106.877282 21.2814003-35.670293 48.7704861-67.1473767 81.6882804-92.5255597 38.602429-29.7610135 83.467691-51.1674988 130.978372-62.05777669 11.473831-2.62966514 22.9946-4.0869914 34.57273-5.4964306l3.658171-.44480576c3.050084-.37153079 6.104217-.74794222 9.162589-1.14972654zm-110.555861 549.44131429c-14.716752 1.577863-30.238964 4.25635-42.869928 12.522173 2.84343.683658 6.102369.004954 9.068638 0 7.124652-.011559 14.317732-.279903 21.434964.032202 17.817402.781913 36.381729 3.63214 53.58741 8.350042 22.029372 6.040631 41.432961 17.928687 62.656049 25.945156 22.389644 8.456554 44.67706 11.084675 68.427 11.084675 11.96813 0 23.845573-.035504 35.450133-3.302696-6.056202-3.225083-14.72582-2.619864-21.434964-3.963236-14.556814-2.915455-28.868774-6.474936-42.869928-11.470264-10.304996-3.676672-20.230803-8.214291-30.11097-12.848661l-6.348531-2.985046c-9.1705-4.309263-18.363277-8.560752-27.845391-12.142608-24.932161-9.418465-52.560181-14.071964-79.144482-11.221737zm22.259385-62.614168c-29.163917 0-58.660076 5.137344-84.915434 18.369597-6.361238 3.206092-12.407546 7.02566-18.137277 11.258891-1.746125 1.290529-4.841829 2.948483-5.487351 5.191839-.654591 2.275558 1.685942 4.182039 3.014086 5.637703 6.562396-3.497556 12.797498-7.199878 19.78612-9.855246 45.19892-17.169893 99.992458-13.570779 145.098218 2.172348 22.494346 7.851335 43.219483 19.592421 65.129314 28.800338 24.503461 10.297807 49.53043 16.975034 75.846795 20.399104 31.04195 4.037546 66.433549.7654 94.808495-13.242161 9.970556-4.921843 23.814245-12.422267 28.030337-23.320339-5.207047.454947-9.892236 2.685918-14.83959 4.224149-7.866632 2.445646-15.827248 4.51974-23.908229 6.138887-27.388113 5.486604-56.512458 6.619429-84.091013 1.639788-25.991939-4.693152-50.142596-14.119246-74.179513-24.03502l-3.068058-1.268177c-2.045137-.846788-4.089983-1.695816-6.135603-2.544467l-3.069142-1.272366c-12.279956-5.085721-24.606928-10.110797-37.210937-14.51024-24.485325-8.546552-50.726667-13.784628-76.671218-13.784628zm51.114145-447.9909432c-34.959602 7.7225298-66.276908 22.7605319-96.457338 41.7180089-17.521434 11.0054099-34.281927 22.2799893-49.465301 36.4444283-22.5792616 21.065423-39.8360564 46.668751-54.8866988 73.411509-15.507372 27.55357-25.4498976 59.665686-30.2554517 90.824149-4.7140432 30.568106-5.4906485 62.70747-.0906864 93.301172 6.7503648 38.248526 19.5989769 74.140579 39.8896436 107.337631 6.8187918-3.184625 11.659796-10.445603 17.3128555-15.336896 11.4149428-9.875888 23.3995608-19.029311 36.2745548-26.928535 4.765981-2.923712 9.662222-5.194315 14.83959-7.275014 1.953055-.785216 5.14604-1.502727 6.06527-3.647828 1.460876-3.406732-1.240754-9.335897-1.704904-12.865654-1.324845-10.095517-2.124534-20.362774-1.874735-30.549941.725492-29.668947 6.269727-59.751557 16.825623-87.521453 7.954845-20.924233 20.10682-39.922168 34.502872-56.971512 4.884699-5.785498 10.077731-11.170545 15.437296-16.512656 3.167428-3.157378 7.098271-5.858983 9.068639-9.908915-10.336599.006606-20.674847 2.987289-30.503603 6.013385-21.174447 6.519522-41.801477 16.19312-59.358362 29.841512-8.008432 6.226409-13.873368 14.387371-21.44733 20.939921-2.32322 2.010516-6.484901 4.704691-9.695199 3.187928-4.8500728-2.29042-4.1014979-11.835213-4.6571581-16.222019-2.1369011-16.873476 4.2548401-38.216325 12.3778671-52.843142 13.039878-23.479694 37.150915-43.528712 65.467327-42.82854 12.228647.302197 22.934587 4.551115 34.625711 7.324555-2.964621-4.211764-6.939158-7.28162-10.717482-10.733763-9.257431-8.459031-19.382979-16.184864-30.503603-22.028985-4.474136-2.350694-9.291232-3.77911-14.015169-5.506421-2.375159-.867783-5.36616-2.062533-6.259834-4.702213-1.654614-4.888817 7.148561-9.416813 10.381943-11.478522 12.499882-7.969406 27.826705-14.525258 42.869928-14.894334 23.509209-.577147 46.479246 12.467678 56.162903 34.665926 3.404469 7.803171 4.411273 16.054969 5.079109 24.382907l.121749 1.56229.174325 2.345587c.01913.260708.038244.521433.057403.782164l.11601 1.56437.120128 1.563971c7.38352-6.019164 12.576553-14.876995 19.78612-21.323859 16.861073-15.07846 39.936636-21.7722 61.831627-14.984333 19.786945 6.133107 36.984382 19.788105 47.105807 37.959541 2.648042 4.754231 10.035685 16.373942 4.698379 21.109183-4.177345 3.707277-9.475079.818243-13.880788-.719162-3.33605-1.16376-6.782939-1.90214-10.241828-2.585698l-1.887262-.369639c-.629089-.122886-1.257979-.246187-1.886079-.372129-11.980496-2.401886-25.91652-2.152533-37.923398-.041284-7.762754 1.364839-15.349083 4.127545-23.083807 5.271929v1.651348c21.149714.175043 41.608563 12.240618 52.043268 30.549941 4.323267 7.585468 6.482428 16.267431 8.138691 24.770223 2.047864 10.50918.608423 21.958802-2.263037 32.201289-.962925 3.433979-2.710699 9.255807-6.817143 10.046802-2.902789.558982-5.36781-2.330878-7.024898-4.279468-4.343878-5.10762-8.475879-9.96341-13.573278-14.374161-12.895604-11.157333-26.530715-21.449361-40.396663-31.373138-7.362086-5.269452-15.425755-12.12007-23.908229-15.340199 2.385052 5.745041 4.721463 11.086326 5.532694 17.339156 2.385876 18.392716-5.314223 35.704625-16.87179 49.540445-3.526876 4.222498-7.29943 8.475545-11.744712 11.755948-1.843407 1.360711-4.156734 3.137561-6.595373 2.752797-7.645687-1.207961-8.555849-12.73272-9.728176-18.637115-3.970415-19.998652-2.375984-39.861068 3.132802-59.448534-4.901187 2.485279-8.443727 7.923994-11.521293 12.385111-6.770975 9.816439-12.645804 20.199291-16.858599 31.375615-16.777806 44.519521-16.616219 96.664142 5.118834 139.523233 2.427098 4.786433 6.110614 4.144058 10.894733 4.144058.720854 0 1.44257-.004515 2.164851-.010924l2.168232-.022283c4.338648-.045438 8.686803-.064635 12.979772.508795 2.227588.297243 5.320818.032202 7.084256 1.673642 2.111344 1.966755.986008 5.338808.4996 7.758859-1.358647 6.765574-1.812904 12.914369-1.812904 19.816178 9.02412-1.398692 11.525415-15.866153 14.724172-23.118874 3.624982-8.216283 7.313444-16.440823 10.667192-24.770223 1.648843-4.093692 3.854171-8.671229 3.275427-13.210785-.649644-5.10184-4.335633-10.510831-6.904531-14.862134-4.86244-8.234447-10.389363-16.70834-13.969002-25.595896-2.861567-7.104926-.197036-15.983399 7.871579-18.521521 4.450228-1.400344 9.198073 1.345848 12.094266 4.562675 6.07269 6.74328 9.992815 16.777697 14.401823 24.692609l34.394873 61.925556c2.920926 5.243856 5.848447 10.481933 8.836976 15.687808 1.165732 2.031158 2.352075 5.167068 4.740424 6.0332 2.127008.77118 5.033095-.325315 7.148561-.748886 5.492297-1.099798 10.97635-2.287117 16.488434-3.28288 6.605266-1.193099 16.673928-.969342 21.434964-6.129805-6.963066-2.205375-15.011895-2.074919-22.259386-1.577863-4.352947.298894-9.178287 1.856116-13.178381-.686135-5.953149-3.783239-9.910373-12.522173-13.552668-18.377854-8.980425-14.439388-17.441465-29.095929-26.041008-43.760726l-1.376261-2.335014-2.765943-4.665258c-1.380597-2.334387-2.750786-4.67476-4.079753-7.036188-1.02723-1.826391-2.549937-4.233231-1.078344-6.24705 1.545791-2.114476 4.91472-2.239146 7.956473-2.243117l.603351.000261c1.195428.001526 2.315572.002427 3.222811-.11692 12.27399-1.615019 24.718635-2.952611 37.098976-2.952611-.963749-3.352237-3.719791-7.141255-2.838484-10.73046 1.972017-8.030506 13.526287-10.543033 18.899867-4.780653 3.60767 3.868283 5.704174 9.192229 8.051303 13.859765 3.097352 6.162006 6.624228 12.118418 9.940876 18.16483 5.805578 10.585967 12.146205 20.881297 18.116667 31.375615.49237.865561.999687 1.726685 1.512269 2.587098l.771613 1.290552c2.577138 4.303168 5.164895 8.635123 6.553094 13.461506-20.735854-.9487-36.30176-25.018751-45.343193-41.283704-.721369 2.604176.450959 4.928448 1.388326 7.431066 1.948109 5.197619 4.276275 10.147535 7.20627 14.862134 4.184765 6.732546 8.982075 13.665732 15.313633 18.553722 11.236043 8.673707 26.05255 8.721596 39.572241 7.794364 8.669619-.595311 19.50252-4.542034 28.030338-1.864372 8.513803 2.673532 11.940924 12.063098 6.884745 19.276187-3.787393 5.403211-8.842747 7.443452-15.128962 8.257566 4.445282 9.53571 10.268996 18.385285 14.490036 28.072919 1.758491 4.035895 3.59118 10.22102 7.8048 12.350433 2.805507 1.416857 6.824562.09743 9.85761.034678-3.043765-8.053625-8.742992-14.887729-11.541904-23.118874 8.533589.390544 16.786875 4.843404 24.732651 7.685374 15.630376 5.590144 31.063836 11.701854 46.475333 17.86913l7.112077 2.848685c6.338978 2.538947 12.71588 5.052299 18.961699 7.812528 2.285297 1.009799 5.449427 3.370401 7.975455 1.917215 2.061054-1.186494 3.394144-4.015253 4.665403-5.931643 3.55573-5.361927 6.775921-10.928622 9.965609-16.513481 12.774414-22.36586 22.143967-46.872692 28.402976-71.833646 20.645168-82.323009 2.934117-173.156241-46.677107-241.922507-19.061454-26.420745-43.033164-49.262193-69.46165-68.1783861-66.13923-47.336721-152.911262-66.294198-232.486917-48.7172481zm135.205158 410.5292842c-17.532977 4.570931-35.601827 8.714164-53.58741 11.040088 2.365265 8.052799 8.145286 15.885969 12.376218 23.118874 1.635653 2.796558 3.3859 6.541816 6.618457 7.755557 3.651364 1.370619 8.063669-.853747 11.508927-1.975838-1.595256-4.364513-4.279573-8.292245-6.476657-12.385112-.905215-1.687677-2.305907-3.685809-1.559805-5.68972 1.410585-3.786541 7.266452-3.563609 10.509727-4.221671 8.54678-1.733916 17.004522-3.898008 25.557073-5.611281 3.150939-.631641 7.538512-2.342438 10.705115-1.285575 2.371037.791232 3.800147 2.744743 5.152304 4.781948l.606196.918752c.80912 1.222827 1.637246 2.41754 2.671212 3.351165 3.457625 3.121874 8.628398 3.60159 13.017619 4.453686-2.678546-6.027421-7.130424-11.301001-9.984571-17.339156-1.659561-3.511592-3.023155-8.677834-6.656381-10.707341-5.005064-2.795733-15.341663 2.461334-20.458024 3.795624zm-110.472507-40.151706c-.825246 10.467897-4.036369 18.984725-9.068639 28.072919 5.76683.729896 11.649079.989984 17.312856 2.39363 4.244947 1.051908 8.156828 3.058296 12.366325 4.211763-2.250671-6.157877-6.426367-11.651913-9.661398-17.339156-3.266358-5.740912-6.189758-12.717032-10.949144-17.339156z"
            transform="translate(.9778)"
          />
        </svg>
      ),
    },
    {
      name: "Shadcn/UI",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          stroke="currentColor"
          width="55"
        >
          <defs>
            <style>
              {
                ".st1{stroke-linecap:round;stroke-linejoin:round;stroke-width:32px}"
              }
            </style>
          </defs>
          <path
            d="M0 0h256v256H0z"
            style={{
              fill: "none",
            }}
          />
          <path d="m208 128-80 80M192 40 40 192" className="st1" />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 34 12"
          fillOpacity={0}
          stroke="currentColor"
          // width="60"
        >
          <path
            d="M12.838 0 6.12 11.989H0l5.245-9.361C6.059 1.176 8.088 0 9.778 0Zm15.008 2.997c0-1.655 1.37-2.997 3.06-2.997s3.06 1.342 3.06 2.997c0 1.656-1.37 2.998-3.06 2.998s-3.06-1.342-3.06-2.998ZM13.985 0h6.12l-6.718 11.989h-6.12Zm7.229 0h6.12l-5.246 9.362c-.813 1.451-2.842 2.627-4.532 2.627h-3.06Z"
          />
        </svg>
      ),
    },
  ];

  const stats: CountUpProps[] = [
    {
      from: 0,
      to: 2,
      label: t("stats.yearsOfExperience.label"),
      separator: ".",
      direction: "up",
      duration: 1,
    },
    {
      from: 0,
      to: 13,
      label: t("stats.completedProjects.label"),
      separator: ".",
      direction: "up",
      duration: 1.5,
    },
    {
      from: 0,
      to: 4,
      label: t("stats.happyCustomers.label"),
      separator: ".",
      direction: "up",
      duration: 1.5,
    },
  ];

  return (
    <div
      className=" min-h-screen  py-16 bg-transparent flex flex-col overflow-hidden"
      id="about"
    >
      <SectionTitle
        text={about.title}
        percentage={50}
        backgroundText="RESUME"
      />

      <div className="min-w-[22rem] w-[70%] scr_2_2:w-[88%] px-3 scr_2_0:flex-col flex justify-center items-center mx-auto mt-10 scr_2_2:mt-0">
        <div className="hidden mt-10 relative scr_4_0:hidden scr_4_3:-mr-3 mr-24 scr_2_0:mr-0">
          <div className="border-[6px] rounded-[0px_70px_0px_70px] lg-max:rounded-[0%_70px_0%_70px] overflow-hidden border-yellow-500">
            <img
              src="files/profile-bg.png"
              alt="Romaric AKODJENOU"
              className="w-[27.5rem] h-[27.5rem] border block dark:hidden object-cover z-30"
            />
            <img
              src="files/profile-bg.png"
              alt="Romaric AKODJENOU"
              className="w-[27.5rem] h-[27.5rem] hidden dark:block object-cover z-30"
            />
          </div>
        </div>
        <div className="w-1/2 hidden scr_4_0:flex scr_2_0:w-full scr_2_0:pb-4 scr_2_0:justify-center z-40 py-10 justify-start bg-transparent items-center relative p-8">
          <div className="w-full h-full scr_2_0:shadow-none scr_2_0:hidden scr_2_0:dark:block scr_2_0:bg-transparent shadow-[0_0_7px_rgba(0,0,0,0.9)] hidden dark:block max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="files/profile-bg.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover scr_2_0:mx-auto scr_2_0:w-[16.875rem] scr_2_0:h-[16.875rem] scr_4:w-[14.875rem] scr_4:h-[14.875rem] scr_2_0:border-[4px] scr_2_0:border-[#252525] scr_2_0:rounded-full"
            />
          </div>
          <div className="w-full h-full scr_2_0:shadow-none scr_2_0:block scr_2_0:dark:hidden scr_2_0:bg-transparent  shadow-[0_0_7px_rgba(0,0,0,0.9)] block dark:hidden max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="files/profile-bg.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover scr_2_0:mx-auto scr_2_0:w-[16.875rem] scr_2_0:h-[16.875rem] scr_4:w-[14.875rem] scr_4:h-[14.875rem] scr_2_0:border-[4px] scr_2_0:border-[#252525] scr_2_0:rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-7">
          <h2 className="text-5xl s scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-center text-wrap text-neutral-800 dark:text-neutral-200">
            {about.subtitle}
          </h2>
          <div className="flex flex-row scr_0:flex-col w-full items-center mb-5 scr_2_2:items-start justify-between space-x-10 scr_2_2:space-x-0">
            <div className="w-full flex flex-col scr_0:mb-7">
              <div className="flex text-xl scr_2_2:w-full scr_3_1:flex-col scr_2_0:items-start scr_0:mx-auto scr_4:text-lg pt-5 space-x-5 scr_3_1:space-x-0">
                <div className="flex flex-col text-lg scr_2_0:justify-center space-y-3.5 mb-4">
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.firstName.label} :
                    </span>
                    <span className="text-start font-semibold whitespace-nowrap ">
                      {about.personalInfo.firstName.value}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.lastName.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.lastName.value}
                    </span>
                  </div>
                  {/* <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.birthdate.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.birthdate.value}
                    </span>
                  </div> */}
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.nationality.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.nationality.value}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.address.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.address.value}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col text-lg scr_2_0:justify-center space-y-3.5 mb-4">
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.freelance.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.freelance.value}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.phone.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.phone.value}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.email.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.email.value}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.languages.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.languages.value}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/cv/CV-de-Romaric-AKODJENOU.pdf"
                target="_blank"
                className="mt-2 scr_0:mx-auto"
              >
                <div className="inline-flex items-center text-lg scr_4:text-md text-black dark:text-white rounded-full bg-transparent border-2 border-yellow-500 bg-yellow-500 transition-colors duration-300 cursor-pointer px-6 scr_4:px-4 py-2 scr_4:py-1">
                  <div className="rounded-full p-2 pl-0 flex items-center justify-center">
                    <Download />
                  </div>
                  <span className="ml-2 font-semibold ">
                    {about.downloadText}{" "}
                  </span>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(2,minmax(13rem,1fr))] scr_0:grid-cols-3 scr_2_1:grid-cols-2 scr_2_2:grid-cols-3 scr_3_O:grid-cols-2 scr_3:w-full scr_4:grid-cols-1 gap-5 h-max scr_2_2:w-[90%]">
              {stats.map((item, index) => (
                <CountUp
                  key={index}
                  from={item.from}
                  to={item.to}
                  label={item.label}
                  separator={item.separator}
                  direction={item.direction}
                  duration={item.duration}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[22rem] w-[70%] scr_2_2:w-[88%] px-3  mx-auto">
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16">
          {about.experienceTitle}
        </h2>
        <Timeline data={experience_data} />
      </div>

      <div className="min-w-[22rem] w-[70%] scr_2_2:w-[88%] px-3 mx-auto flex flex-col justify-center">
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-0">
          {about.skillsTitle}
        </h2>
        <div className="w-full mt-10">
          <div className="grid grid-cols-5 scr_2:grid-cols-4 scr_2_2:grid-cols-3 scr_3_2:grid-cols-2 gap-5 max-w-[72rem] mx-auto">
            {skills.map((item, index) => (
              <Fragment key={index}>
                <SkillCard name={item.name} logo={item.logo} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
