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
    {
      name: "Bootstrap",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.3,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.4h-50.1v78.4h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.4,290.2,266.4z" />
        </svg>
      ),
    },
    {
      name: "TailwindCSS",
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
    {
      name: "Vue.js",
      logo: (
        <svg
          className="w-12 h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z" />
        </svg>
      ),
    },
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
      name: "Express.js",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
        </svg>
      ),
    },
    {
      name: "MongoDB",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[3.5rem] h-[3.5rem]"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M15.821 23.185s0-10.361.344-10.36c.266 0 .612 13.365.612 13.365-.476-.056-.956-2.199-.956-3.005zm6.668-10.24c-.919-4.016-2.932-7.469-5.708-10.134l-.007-.006a9.8 9.8 0 0 1-.895-1.732l-.024-.068.001.068c0 .565-.253 1.07-.652 1.409l-.003.002c-3.574 3.034-5.848 7.505-5.923 12.508v.013l-.001.208a15.1 15.1 0 0 0 6.07 12.115l.039.028.087.063q.241 1.784.412 3.576h.601c.166-1.491.39-2.796.683-4.076l-.046.239c.396-.275.742-.56 1.065-.869l-.003.003a14.143 14.143 0 0 0 4.549-10.404l-.001-.182v.009a16.341 16.341 0 0 0-.261-2.871l.015.099z" />
        </svg>
      ),
    },
    {
      name: "MySQL",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-13 h-13"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M30.026 15.139a3.818 3.818 0 0 0-1.646.244l.026-.009c-.125.05-.325.05-.342.209.069.066.079.175.137.267.117.198.261.366.429.506l.003.003c.175.137.35.27.534.387.325.2.694.319 1.012.52.181.117.366.266.55.391.091.062.15.175.267.215v-.025c-.057-.075-.075-.184-.131-.267-.084-.084-.167-.159-.25-.241a4.058 4.058 0 0 0-.857-.835l-.012-.008c-.267-.182-.852-.437-.962-.744l-.016-.018c.218-.031.412-.077.599-.139l-.024.007c.284-.075.544-.059.837-.132.132-.034.266-.075.4-.117v-.075c-.15-.15-.262-.354-.417-.494-.409-.36-.86-.698-1.335-1.002l-.045-.027c-.262-.167-.595-.275-.871-.417-.1-.05-.267-.075-.325-.159a3.153 3.153 0 0 1-.336-.621l-.008-.022q-.368-.714-.684-1.453a8.381 8.381 0 0 0-.448-1.001l.023.047a8.491 8.491 0 0 0-3.188-3.102l-.043-.022a3.93 3.93 0 0 0-1.045-.339l-.025-.004c-.209-.01-.417-.025-.625-.034a3.02 3.02 0 0 1-.39-.296l.003.003c-.475-.3-1.704-.95-2.054-.09-.225.542.334 1.077.527 1.352.154.183.294.388.415.605l.01.02c.059.145.075.294.134.445.145.452.292.823.459 1.182l-.026-.062c.099.199.202.368.317.528l-.008-.012c.067.091.182.134.209.284a2.352 2.352 0 0 0-.19.61l-.002.014a3.636 3.636 0 0 0-.171 1.112c0 .621.153 1.206.423 1.72l-.01-.02c.134.207.452.667.878.491.375-.15.292-.625.4-1.043.025-.1.009-.166.06-.234v.019c.117.235.235.459.342.694.302.435.661.805 1.071 1.11l.013.009c.2.15.359.41.609.502v-.025h-.019a1.091 1.091 0 0 0-.189-.164l-.004-.002a4.327 4.327 0 0 1-.429-.489l-.008-.011c-.326-.44-.636-.938-.905-1.461l-.029-.061c-.137-.262-.252-.545-.362-.804-.05-.1-.05-.25-.134-.3a3.094 3.094 0 0 0-.392.55l-.008.016a4.601 4.601 0 0 0-.234 1.251v.011c-.034.009-.017 0-.034.018-.267-.065-.359-.342-.459-.575a3.568 3.568 0 0 1-.215-1.231c0-.356.051-.7.147-1.025l-.006.026c.059-.175.309-.727.209-.895-.052-.159-.217-.25-.309-.379a3.078 3.078 0 0 1-.292-.514l-.008-.02c-.2-.467-.3-.985-.517-1.452a4.34 4.34 0 0 0-.424-.65l.007.009a4.236 4.236 0 0 1-.449-.63l-.011-.02c-.041-.091-.1-.242-.034-.342a.142.142 0 0 1 .117-.112h.001c.11-.09.419.027.527.077.317.12.59.261.843.427l-.016-.01c.117.082.244.241.394.282h.175c.267.059.569.018.819.091.459.155.856.349 1.223.587l-.021-.013a7.497 7.497 0 0 1 2.586 2.816l.02.041c.1.192.144.369.235.569.175.412.391.829.569 1.227.169.428.369.798.607 1.139l-.012-.018c.125.175.627.266.852.357.237.083.427.162.611.251l-.037-.016c.287.175.567.375.837.567.137.095.554.304.579.472zm-11.724 7.313.001.049c0 .558-.249 1.057-.643 1.393l-.003.002a2.522 2.522 0 0 1-1.736.562h.006a3.448 3.448 0 0 1-1.976-.651l.01.007.296-.595c.429.24.939.389 1.481.41h.006a1.556 1.556 0 0 0 .984-.278l-.005.003a.941.941 0 0 0 .375-.752v-.017.001c0-.412-.287-.762-.81-1.056-.485-.266-1.453-.821-1.453-.821a1.655 1.655 0 0 1-.791-1.411l.001-.063v.003l-.001-.063c0-.515.227-.977.586-1.291l.002-.002a2.2 2.2 0 0 1 1.529-.519h-.005.031a3.12 3.12 0 0 1 1.73.52l-.012-.007-.266.595a3.337 3.337 0 0 0-1.327-.287h-.002a1.17 1.17 0 0 0-.819.259l.002-.002a.853.853 0 0 0-.31.655c0 .41.292.762.832 1.062.491.269 1.483.837 1.483.837.488.287.811.809.811 1.407l-.001.055v-.003zm2.072.531a4.181 4.181 0 0 1-.42-2.183l-.001.014q0-2.611 1.587-2.612a1.335 1.335 0 0 1 1.218.619l.003.005a4.173 4.173 0 0 1 .419 2.167l.001-.014q0 2.632-1.587 2.634a1.336 1.336 0 0 1-1.219-.619l-.003-.005zm4.114 1.552-1.27-.625c.116-.097.22-.199.316-.309l.003-.003a4.201 4.201 0 0 0 .809-2.829l.001.014q0-3.43-2.693-3.432a2.553 2.553 0 0 0-2.059.869l-.002.003a4.21 4.21 0 0 0-.806 2.819l-.001-.014a4.08 4.08 0 0 0 .726 2.687l-.009-.013a2.45 2.45 0 0 0 1.986.768l-.009.001h.032c.311 0 .612-.045.897-.128l-.022.006 1.656.965.45-.777zm4.148-.169h-3.287v-6.91h1.106v6.061h2.181zm-15.401-5.098a15.605 15.605 0 0 1-1.905 5.65l.04-.077a2.489 2.489 0 0 1-1.968 1.34l-.01.001a1.96 1.96 0 0 1-.719-.177l.012.005v-.617c.137.021.295.033.456.033h.028-.001a1.16 1.16 0 0 0 .81-.279l-.002.001c.22-.181.361-.451.369-.755v-.001a5.031 5.031 0 0 0-.299-1.214l.012.034-1.267-3.944h1.137l.909 2.949c.162.416.256.898.256 1.401v.002a18.35 18.35 0 0 0 1.034-4.261l.009-.092zm-5.02 5.098H7.057q-.049-2.761-.337-5.511h-.01l-1.762 5.511h-.881l-1.75-5.511h-.012q-.205 2.751-.244 5.511H1.005q.103-3.685.512-6.911h1.437l1.668 5.079h.01l1.683-5.079h1.368q.454 3.777.535 6.911zm13.29-16.487h-.008c-.119 0-.234.015-.344.043l.01-.002v.016h.017c.086.128.174.239.269.343l-.002-.002c.067.134.125.267.192.4l.017-.019a.465.465 0 0 0 .175-.419v.002c-.05-.059-.057-.117-.1-.175-.05-.084-.157-.125-.225-.191z" />
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
      to: 8,
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
              src="files/profile-white.png"
              alt="Romaric AKODJENOU"
              className="w-[27.5rem] h-[27.5rem] border block dark:hidden object-cover z-30"
            />
            <img
              src="files/profile-black.png"
              alt="Romaric AKODJENOU"
              className="w-[27.5rem] h-[27.5rem] hidden dark:block object-cover z-30"
            />
          </div>
        </div>
        <div className="w-1/2 hidden scr_4_0:flex scr_2_0:w-full scr_2_0:pb-4 scr_2_0:justify-center z-40 py-10 justify-start bg-transparent items-center relative p-8">
          <div className="w-full h-full scr_2_0:shadow-none scr_2_0:hidden scr_2_0:dark:block scr_2_0:bg-transparent shadow-[0_0_7px_rgba(0,0,0,0.9)] hidden dark:block max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="files/profile-black.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover scr_2_0:mx-auto scr_2_0:w-[16.875rem] scr_2_0:h-[16.875rem] scr_4:w-[14.875rem] scr_4:h-[14.875rem] scr_2_0:border-[4px] scr_2_0:border-[#252525] scr_2_0:rounded-full"
            />
          </div>
          <div className="w-full h-full scr_2_0:shadow-none scr_2_0:block scr_2_0:dark:hidden scr_2_0:bg-transparent  shadow-[0_0_7px_rgba(0,0,0,0.9)] block dark:hidden max-w-md rounded-[30px] overflow-hidden bg-black">
            <img
              src="files/profile-white.png"
              alt="Romaric AKODJENOU"
              className="w-full h-full object-cover scr_2_0:mx-auto scr_2_0:w-[16.875rem] scr_2_0:h-[16.875rem] scr_4:w-[14.875rem] scr_4:h-[14.875rem] scr_2_0:border-[4px] scr_2_0:border-[#252525] scr_2_0:rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-7">
          <h2 className="text-5xl s scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-wrap text-neutral-800 dark:text-neutral-200">
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
                  <div className="flex space-x-3">
                    <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {about.personalInfo.birthdate.label} :
                    </span>
                    <span className="font-semibold whitespace-nowrap ">
                      {about.personalInfo.birthdate.value}
                    </span>
                  </div>
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
                href="/files/CV.pdf"
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

      <div className="min-w-[22rem] w-[70%] scr_2_2:w-[88%] px-3 mx-auto">
        <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-0">
          {about.skillsTitle}
        </h2>
        <div className="w-[100%] mt-10 mx-auto">
          <div className="grid grid-cols-5 scr_2:grid-cols-4 scr_2_2:grid-cols-3 scr_3_2:grid-cols-2 gap-5 max-w-6xl">
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
