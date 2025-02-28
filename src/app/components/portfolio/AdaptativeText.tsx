"use client";

import React from "react";

export interface AdaptiveTextProps {
  text: string;
  percentage: number;
}

const AdaptiveText: React.FC<AdaptiveTextProps> = ({ text, percentage }) => {
  return (
    <div
      className={`flex-1 flex items-center justify-between h-12 scrn_bk_3:h-7 py-[0.925rem] scrn_bk_3:py-[0.425rem] relative`}
    >
      <div
        className={`hidden dark:flex justify-between bg-origin-padding whitespace-nowrap overflow-hidden text-transparent px-5 font-bold scrn_bk_3:pt-0 z-40 w-full text-6xl`}
        style={{
          backgroundImage: `linear-gradient(25deg, #eab308 0%, #eab308 ${100 - percentage
            }%, white -10%, white 100%)`,
          WebkitBackgroundClip: "text",
          MozBackgroundClip: "text",
          backgroundClip: "text",
          backgroundPosition: "0 0",
        }}
      >
        {text}
      </div>
      <div
        className={`flex dark:hidden justify-between bg-origin-padding whitespace-nowrap overflow-hidden text-transparent px-5 font-bold scrn_bk_3:pt-0 z-40 w-full text-6xl`}
        style={{
          backgroundImage: `linear-gradient(25deg, #eab308 0%, #eab308 ${100 - percentage
            }%, #000000 -10%, #000000 100%)`,
          WebkitBackgroundClip: "text",
          MozBackgroundClip: "text",
          backgroundClip: "text",
          backgroundPosition: "0 0",
        }}
      >
        {text}
      </div>
      <div
        className={`z-30 absolute h-full bg-white dark:bg-black`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default AdaptiveText;