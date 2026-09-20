"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
}

const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y-2 border-foreground bg-foreground py-3 z-30">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {track.map((item, index) => (
          <span
            key={index}
            className="mx-6 flex items-center gap-6 font-display text-sm font-bold uppercase tracking-[0.15em] text-background"
          >
            {item}
            <span className="text-accent" aria-hidden="true">
              +
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
