- ActivityHeatmap

```jsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ActivityItem {
  date: string;
  count: number;
}

export interface GithubContributionGraphProps {
  contributionsData?: ActivityItem[];
  years?: number[];
}

export interface HoveredDayInfo {
  text: string;
  x: number;
  y: number;
}

export const GithubContributionGraph: React.FC<
  GithubContributionGraphProps
> = ({ contributionsData = [], years = [2025, 2024, 2023, 2022] }) => {
  const [selectedYear, setSelectedYear] =
    useState < number > (years[0] || 2025);
  const [hoveredDay, setHoveredDay] =
    (useState < HoveredDayInfo) | (null > null);

  const processedData = useMemo(() => {
    const dataByDate: Record<string, number> = {};

    years.forEach((year) => {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateStr = d.toISOString().split("T")[0];
        dataByDate[dateStr] = 0;
      }
    });

    contributionsData.forEach((item) => {
      if (item.date && typeof item.count === "number") {
        const dateStr = new Date(item.date).toISOString().split("T")[0];
        dataByDate[dateStr] = item.count;
      }
    });

    return dataByDate;
  }, [contributionsData, years]);

  const yearData = useMemo(() => {
    const result: Record<string, number> = {};

    Object.keys(processedData).forEach((dateStr) => {
      if (dateStr.startsWith(selectedYear.toString())) {
        result[dateStr] = processedData[dateStr];
      }
    });

    return result;
  }, [processedData, selectedYear]);

  const totalActivitys = useMemo(() => {
    return Object.values(yearData).reduce((sum, count) => sum + count, 0);
  }, [yearData]);

  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    if (count <= 15) return 4;
    return 4;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekdays = ["Mon", "Wed", "Fri"];

  const renderActivityGrid = (): React.ReactNode[] => {
    const cells: React.ReactNode[] = [];
    const year = selectedYear;
    const firstDay = new Date(year, 0, 1);

    const firstMonday = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    if (dayOfWeek !== 1) {
      firstMonday.setDate(
        firstDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
      );
    }

    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(firstMonday);
        date.setDate(firstMonday.getDate() + week * 7 + day);

        const dateStr = date.toISOString().split("T")[0];
        const count = yearData[dateStr] || 0;
        const level = getActivityLevel(count);

        const monthDay = date.getDate();
        const monthName = months[date.getMonth()];
        const yearStr = date.getFullYear();
        const tooltipText = `${count} contribution${
          count !== 1 ? "s" : ""
        } on ${monthName} ${monthDay}, ${yearStr}`;

        cells.push(
          <div
            key={dateStr}
            className={`w-4 h-4 m-0.5 rounded-sm cursor-pointer
              ${
                level === 0
                  ? "bg-gray-100"
                  : level === 1
                  ? "bg-green-200"
                  : level === 2
                  ? "bg-green-300"
                  : level === 3
                  ? "bg-green-400"
                  : level === 4
                  ? "bg-green-500"
                  : "bg-green-500"
              }`}
            style={{
              gridColumn: week + 1,
              gridRow: day + 1,
            }}
            onMouseEnter={() =>
              setHoveredDay({ text: tooltipText, x: week, y: day })
            }
            onMouseLeave={() => setHoveredDay(null)}
          />
        );
      }
    }

    return cells;
  };

  return (
    <div className="py-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {totalActivitys} contribution{totalActivitys !== 1 ? "s" : ""} in the
          last year
        </h2>

        <div className="flex space-x-4">
          <div className="relative">
            <Select
              onValueChange={(value) => setSelectedYear(parseInt(value))}
              value={selectedYear.toString()}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sélectionnez une année" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div className="flex flex-col justify-around text-xs text-gray-500">
            {weekdays.map((day) => (
              <div key={day} className="h-3">
                {day}
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500">
              {months.map((month) => (
                <div key={month}>{month}</div>
              ))}
            </div>

            <div className="relative">
              <div className="grid grid-rows-7 grid-flow-col gap-0">
                {renderActivityGrid()}
              </div>

              {hoveredDay && (
                <div
                  className="absolute bg-gray-800 text-white text-xs rounded mt-5 py-1 px-2 z-10"
                  style={{
                    top: `${hoveredDay.y * 16 + 20}px`,
                    left: `${hoveredDay.x * 16}px`,
                  }}
                >
                  {hoveredDay.text}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-200"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-300"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-400"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const generateSampleData = () => {
    const data = [];
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2025, 2, 12);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const rand = Math.random();
      let count = 0;

      if (rand > 0.6) count = Math.floor(Math.random() * 5) + 1;
      if (rand > 0.85) count = Math.floor(Math.random() * 5) + 6;
      if (rand > 0.95) count = Math.floor(Math.random() * 5) + 11;
      if (rand > 0.98) count = Math.floor(Math.random() * 10) + 16;

      if (count > 0) {
        data.push({
          date: new Date(d).toISOString().split("T")[0],
          count: count,
        });
      }
    }

    return data;
  };

  const sampleData = generateSampleData();

  return (
    <GithubContributionGraph
      contributionsData={sampleData}
      years={[2025, 2024, 2023, 2022]}
    />
  );
};

export default App;
```

- Count Down

```tsx
"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate?: string | Date | number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("En attente...");

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft("Date non définie");
      return;
    }

    const dateB = new Date(targetDate);

    if (isNaN(dateB.getTime())) {
      setTimeLeft("Date invalide");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diffInMs = Math.max(0, dateB.getTime() - now.getTime());

      if (diffInMs <= 0) {
        setTimeLeft("Terminé!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
      const milliseconds = Math.floor(diffInMs % 1000);

      const formattedTime = `${days > 0 ? days + "j " : ""}${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;

      setTimeLeft(formattedTime);
    }, 10);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-black text-white px-2 py-0.5 rounded-md text-xs select-none leading-loose text-center">
      {timeLeft}
    </div>
  );
};

export default Countdown;

/*Exmple d'utilisation*/
/**
 * 
'use client'

import React, { useState } from 'react';
import SimpleCountdown from './SimpleCountdown';

export default function CountdownDemo() {
  // Exemple de date cible (1 heure dans le futur)
  const futureDate = new Date();
  futureDate.setHours(futureDate.getHours() + 1);
  
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Démonstration du compte à rebours</h1>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm mb-1">Compte à rebours vers {futureDate.toLocaleString()}</p>
          <SimpleCountdown targetDate={futureDate} />
        </div>
        
        <div>
          <p className="text-sm mb-1">Compte à rebours vers une date passée</p>
          <SimpleCountdown targetDate="2023-01-01T00:00:00" />
        </div>
        
        <div>
          <p className="text-sm mb-1">Compte à rebours avec date non valide</p>
          <SimpleCountdown targetDate="date-invalide" />
        </div>
        
        <div>
          <p className="text-sm mb-1">Compte à rebours sans date</p>
          <SimpleCountdown />
        </div>
      </div>
    </div>
  );
}
 * **/
```

- QrCode

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  FileExtension,
  GradientType,
  Mode,
  ShapeType,
  TypeNumber,
} from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const QRCode = ({
  size,
  margin,
  data,
  type,
  className,
}: {
  size: number;
  margin: number;
  data: string;
  type: FileExtension;
  className?: string;
}) => {
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const [_size, set_Size] = useState(size);
  const [_margin, set_Margin] = useState(margin);
  const [_data] = useState(data);
  const [_type, set_Type] = useState<FileExtension>(type);

  useEffect(() => {
    const qr_config = {
      type: "svg" as DrawType,
      width: size,
      height: size,
      margin: margin,
      data: _data,
      image: "/images/default.png",
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 0,
      },
      dotsOptions: {
        type: "rounded" as DotType,
        color: "#0D0D0D",
        gradient: {
          type: "linear" as GradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: "#0D0D0D" },
            { offset: 1, color: "#0D0D0D" },
          ],
        },
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded" as CornerSquareType,
        color: "#0D0D0D",
        gradient: null,
      },
      cornersDotOptions: {
        color: "#0D0D0D",
        gradient: null,
      },
    };

    qrCodeRef.current = new QRCodeStyling(qr_config);

    const qrCodeContainer = document.getElementById(
      "qr-code-container"
    ) as HTMLElement;
    if (qrCodeContainer) {
      qrCodeRef.current.append(qrCodeContainer);
    }

    return () => {
      qrCodeContainer.innerHTML = "";
      qrCodeRef.current = null;
    };
  }, []);

  const handleDownload = (
    size: number,
    margin: number,
    type: FileExtension
  ) => {
    const qr_config = {
      type: "svg" as DrawType,
      width: size,
      height: size,
      margin: margin,
      data: _data,
      image: "/images/default.png",
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 0,
      },
      dotsOptions: {
        type: "rounded" as DotType,
        color: "#0D0D0D",
        gradient: {
          type: "linear" as GradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: "#0D0D0D" },
            { offset: 1, color: "#0D0D0D" },
          ],
        },
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded" as CornerSquareType,
        color: "#0D0D0D",
        gradient: null,
      },
      cornersDotOptions: {
        color: "#0D0D0D",
        gradient: null,
      },
    };

    const qrCodeDownloadInstance = new QRCodeStyling(qr_config);
    qrCodeDownloadInstance.download({ name: "qr-code", extension: type });
  };

  return (
    <div className={cn("p-0 ", className)}>
      <div id="qr-code-container" className="-ml-2"></div>

      <div className="grid grid-cols-3 w-full mb-2">
        <div>
          <Label htmlFor="largeur"> Largeur </Label>
          <Input
            className="border-e-0 rounded-e-none"
            name="largeur"
            id="largeur"
            type="number"
            value={_size}
            onChange={(e) => set_Size(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="hauteur"> Hauteur </Label>
          <Input
            className="rounded-none"
            name="hauteur"
            id="hauteur"
            type="number"
            value={_size}
            onChange={(e) => set_Size(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="marge"> Marge </Label>
          <Input
            className="border-s-0 rounded-s-none"
            name="marge"
            id="marge"
            type="number"
            value={_margin}
            onChange={(e) => set_Margin(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex w-full  space-x-5 scrn_bk_4:space-x-0 scrn_bk_4:flex-col items-center mb-5">
        <Button
          className="w-1/2 scrn_bk_4:w-full h-11 order-1 scrn_bk_4:order-2"
          onClick={() => handleDownload(_size, _margin, _type)}
        >
          Télécharger le code Qr
        </Button>
        <Select
          defaultValue={_type}
          onValueChange={(e) => set_Type(e as FileExtension)}
        >
          <SelectTrigger className="w-1/2 scrn_bk_4:w-full scrn_bk_4:mb-2  order-2 scrn_bk_4:order-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QRCode;

/**Exemple**/
/*
<QRCode
  size={200}
  margin={0}
  data={pub_link()}
  type="svg"
  className="w-full"
/>
*/
```

- Scroll To Top

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={() => scrollToTop()}
      className={`fixed right-0 bottom-12 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-50 m-5
                       transition-all duration-300 ease-in-out transform
                       ${
                         isVisible
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10 pointer-events-none"
                       }`}
    >
      <ArrowUp className="w-5 h-5 text-white dark:text-black" />
    </button>
  );
};

export default ScrollToTop;
```

- Scroll To Bottom

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user is not at the bottom of the page
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (
        !scrolledToBottom &&
        window.scrollY < document.body.offsetHeight - window.innerHeight - 100
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check visibility on mount
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={() => scrollToBottom()}
      className={`fixed right-0 bottom-12 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-50 m-5
                       transition-all duration-300 ease-in-out transform
                       ${
                         isVisible
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10 pointer-events-none"
                       }`}
    >
      <ArrowDown className="w-5 h-5 text-white dark:text-black" />
    </button>
  );
};

export default ScrollToBottom;
```

- Scroll Button

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ScrollButtonProps {
  direction?: "top" | "bottom";
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction = "top" }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (direction === "top") {
        setIsVisible(window.scrollY > window.innerHeight);
      } else if (direction === "bottom") {
        const scrolledToBottom: boolean =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;
        const notAtTop: boolean = window.scrollY > 100;

        setIsVisible(notAtTop && !scrolledToBottom);
      }
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [direction]);

  const scrollTo = (): void => {
    window.scrollTo({
      top: direction === "top" ? 0 : document.body.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={() => scrollTo()}
      className={`fixed right-0 bottom-12 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-50 m-5
                       transition-all duration-300 ease-in-out transform
                       ${
                         isVisible
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10 pointer-events-none"
                       }`}
      aria-label={direction === "top" ? "Scroll to top" : "Scroll to bottom"}
    >
      {direction === "top" ? (
        <ArrowUp className="w-5 h-5 text-white dark:text-black" />
      ) : (
        <ArrowDown className="w-5 h-5 text-white dark:text-black" />
      )}
    </button>
  );
};

export default ScrollButton;
```

- Add DrapDrop On Component

```tsx
import { GripVertical } from "lucide-react";

// in grid
<GripVertical className="w-3.5 h-3.5 absolute top-0 right-0 mt-3 mr-2" />;
```

- HorizontalScrollbar

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Grip } from "lucide-react";

interface HorizontalScrollbarProps {
  height?: number;
  thumbColor?: string;
  trackColor?: string;
  showScrollPercentage?: boolean;
}

const HorizontalScrollbar: React.FC<HorizontalScrollbarProps> = ({
  height = 12,
  thumbColor = "bg-black dark:bg-white",
  trackColor = "bg-gray-200 dark:bg-gray-800",
  showScrollPercentage = false,
}) => {
  const [thumbWidth, setThumbWidth] = useState<number>(0);
  const [thumbLeft, setThumbLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startLeftRef = useRef<number>(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflowX;
    const originalHeight = document.body.style.height;
    const originalWidth = document.body.style.width;

    document.body.style.overflowX = "scroll";
    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";

    const handleWheelEvent = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        document.body.scrollLeft += e.deltaY;
      }
    };

    document.body.addEventListener("wheel", handleWheelEvent, {
      passive: false,
    });

    return () => {
      document.body.style.overflowX = originalOverflow;
      document.body.style.overflowY = "auto";
      document.body.style.height = originalHeight;
      document.body.style.width = originalWidth;
      document.body.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  useEffect(() => {
    const updateThumbPosition = () => {
      if (!trackRef.current) return;

      const { scrollWidth, clientWidth, scrollLeft } = document.body;

      const ratio = clientWidth / scrollWidth;
      const newThumbWidth = Math.max(ratio * trackRef.current.clientWidth, 50); // minimum 50px thumb width
      setThumbWidth(newThumbWidth);

      const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
      const maxLeft = trackRef.current.clientWidth - newThumbWidth;
      const newLeft = scrollRatio * maxLeft;

      setThumbLeft(newLeft);
      setScrollPercentage(Math.round(scrollRatio * 100));
    };

    updateThumbPosition();
    window.addEventListener("scroll", updateThumbPosition);
    window.addEventListener("resize", updateThumbPosition);

    return () => {
      window.removeEventListener("scroll", updateThumbPosition);
      window.removeEventListener("resize", updateThumbPosition);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current || !isDragging) return;

      const { scrollWidth, clientWidth } = document.body;
      const trackWidth = trackRef.current.clientWidth;
      const deltaX = e.clientX - startXRef.current;

      const newLeft = Math.max(
        0,
        Math.min(startLeftRef.current + deltaX, trackWidth - thumbWidth)
      );
      setThumbLeft(newLeft);

      const scrollRatio = newLeft / (trackWidth - thumbWidth);
      const newScrollLeft = scrollRatio * (scrollWidth - clientWidth);
      document.body.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbWidth]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startLeftRef.current = thumbLeft;
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || e.target !== trackRef.current) return;

    const { scrollWidth, clientWidth } = document.body;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickPositionX = e.clientX - trackRect.left;

    const clickRatio = clickPositionX / trackRect.width;

    const newScrollLeft = clickRatio * (scrollWidth - clientWidth);
    document.body.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 py-2 z-50">
      <div
        ref={trackRef}
        className={`w-full rounded-full cursor-pointer ${trackColor}`}
        style={{ height: `${height}px` }}
        onClick={handleTrackClick}
      >
        <div
          ref={thumbRef}
          className={`absolute rounded-full flex items-center justify-center cursor-grab ${thumbColor} ${
            isDragging ? "cursor-grabbing" : ""
          }`}
          style={{
            height: `${height * 2}px`,
            width: `${thumbWidth}px`,
            left: `${thumbLeft}px`,
            top: `${-height / 2}px`,
            transform: "translateY(-25%)",
          }}
          onMouseDown={handleThumbMouseDown}
        >
          <Grip className="w-4 h-4 text-white dark:text-black opacity-70" />
          {showScrollPercentage && (
            <div className="absolute -top-6 text-xs font-bold bg-black dark:bg-white text-white dark:text-black rounded-md px-2 py-1">
              {scrollPercentage}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
```

- HorizontalScrollContainer

```tsx
"use client";

import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { Grip } from "lucide-react";

interface HorizontalScrollContainerProps {
  height?: number;
  thumbColor?: string;
  trackColor?: string;
  showScrollPercentage?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

const HorizontalScrollContainer: React.FC<
  PropsWithChildren<HorizontalScrollContainerProps>
> = ({
  children,
  height = 12,
  thumbColor = "bg-black dark:bg-white",
  trackColor = "bg-gray-200 dark:bg-gray-800",
  showScrollPercentage = false,
  containerClassName = "",
  contentClassName = "",
}) => {
  const [thumbWidth, setThumbWidth] = useState<number>(0);
  const [thumbLeft, setThumbLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startLeftRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheelEvent, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !trackRef.current) return;

    const updateThumbPosition = () => {
      const { scrollWidth, clientWidth, scrollLeft } = container;

      const ratio = clientWidth / scrollWidth;
      const newThumbWidth = Math.max(ratio * trackRef.current!.clientWidth, 50); // minimum 50px thumb width
      setThumbWidth(newThumbWidth);

      const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
      const maxLeft = trackRef.current!.clientWidth - newThumbWidth;
      const newLeft = scrollRatio * maxLeft;

      setThumbLeft(newLeft);
      setScrollPercentage(Math.round(scrollRatio * 100));
    };

    updateThumbPosition();
    container.addEventListener("scroll", updateThumbPosition);
    window.addEventListener("resize", updateThumbPosition);

    return () => {
      container.removeEventListener("scroll", updateThumbPosition);
      window.removeEventListener("resize", updateThumbPosition);
    };
  }, []);

  useEffect(() => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current || !isDragging) return;

      const { scrollWidth, clientWidth } = container;
      const trackWidth = trackRef.current.clientWidth;
      const deltaX = e.clientX - startXRef.current;

      const newLeft = Math.max(
        0,
        Math.min(startLeftRef.current + deltaX, trackWidth - thumbWidth)
      );
      setThumbLeft(newLeft);

      const scrollRatio = newLeft / (trackWidth - thumbWidth);
      const newScrollLeft = scrollRatio * (scrollWidth - clientWidth);
      container.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbWidth]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startLeftRef.current = thumbLeft;
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (
      !trackRef.current ||
      !containerRef.current ||
      e.target !== trackRef.current
    )
      return;

    const container = containerRef.current;
    const { scrollWidth, clientWidth } = container;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickPositionX = e.clientX - trackRect.left;

    const clickRatio = clickPositionX / trackRect.width;

    const newScrollLeft = clickRatio * (scrollWidth - clientWidth);
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={containerRef}
        className={`w-full overflow-x-auto overflow-y-hidden flex-grow ${containerClassName}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className={`inline-block min-w-max ${contentClassName}`}>
          {children}
        </div>
      </div>

      <div className="px-4 py-2">
        <div
          ref={trackRef}
          className={`w-full rounded-full cursor-pointer ${trackColor}`}
          style={{ height: `${height}px` }}
          onClick={handleTrackClick}
        >
          <div
            ref={thumbRef}
            className={`absolute rounded-full flex items-center justify-center cursor-grab ${thumbColor} ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            style={{
              height: `${height * 2}px`,
              width: `${thumbWidth}px`,
              left: `${thumbLeft}px`,
              top: `${-height / 2}px`,
              transform: "translateY(-25%)",
            }}
            onMouseDown={handleThumbMouseDown}
          >
            <Grip className="w-4 h-4 text-white dark:text-black opacity-70" />
            {showScrollPercentage && (
              <div className="absolute -top-6 text-xs font-bold bg-black dark:bg-white text-white dark:text-black rounded-md px-2 py-1">
                {scrollPercentage}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollContainer;

/*Exemple*/
<HorizontalScrollContainer>
  <div className="flex gap-4">
    <div className="w-screen h-screen bg-blue-200">Section 1</div>
    <div className="w-screen h-screen bg-green-200">Section 2</div>
    <div className="w-screen h-screen bg-red-200">Section 3</div>
    <div className="w-screen h-screen bg-yellow-200">Section 4</div>
  </div>
</HorizontalScrollContainer>;
```

- HorizontalScrollPage

```tsx
"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Grip } from "lucide-react";

interface HorizontalScrollPageProps {
  children: ReactNode;
  height?: number;
  thumbColor?: string;
  trackColor?: string;
  showScrollPercentage?: boolean;
}

interface SectionProps {
  id: string;
  children: ReactNode;
}

export const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="min-w-full flex-shrink-0 snap-start">
      {children}
    </section>
  );
};

const HorizontalScrollPage = ({
  children,
  height = 12,
  thumbColor = "bg-black dark:bg-white",
  trackColor = "bg-gray-200 dark:bg-gray-800",
  showScrollPercentage = false,
}: HorizontalScrollPageProps) => {
  const [thumbWidth, setThumbWidth] = useState<number>(0);
  const [thumbLeft, setThumbLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startLeftRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheelEvent, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollToHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
              inline: "start",
            });
          }, 100);
        }
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", inline: "start" });

          history.pushState(null, "", href);
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorClick as EventListener);
    });

    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !trackRef.current) return;

    const updateThumbPosition = () => {
      const { scrollWidth, clientWidth, scrollLeft } = container;

      const ratio = clientWidth / scrollWidth;
      const newThumbWidth = Math.max(ratio * trackRef.current!.clientWidth, 50);
      setThumbWidth(newThumbWidth);

      const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
      const maxLeft = trackRef.current!.clientWidth - newThumbWidth;
      const newLeft = Math.max(0, Math.min(scrollRatio * maxLeft, maxLeft));

      setThumbLeft(newLeft);
      setScrollPercentage(Math.round(scrollRatio * 100));
    };

    updateThumbPosition();
    container.addEventListener("scroll", updateThumbPosition);
    window.addEventListener("resize", updateThumbPosition);

    return () => {
      container.removeEventListener("scroll", updateThumbPosition);
      window.removeEventListener("resize", updateThumbPosition);
    };
  }, []);

  useEffect(() => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current || !isDragging) return;

      const { scrollWidth, clientWidth } = container;
      const trackWidth = trackRef.current.clientWidth;
      const deltaX = e.clientX - startXRef.current;

      const newLeft = Math.max(
        0,
        Math.min(startLeftRef.current + deltaX, trackWidth - thumbWidth)
      );
      setThumbLeft(newLeft);

      const scrollRatio = newLeft / (trackWidth - thumbWidth);
      const newScrollLeft = scrollRatio * (scrollWidth - clientWidth);
      container.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbWidth]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startLeftRef.current = thumbLeft;
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (
      !trackRef.current ||
      !containerRef.current ||
      e.target !== trackRef.current
    )
      return;

    const container = containerRef.current;
    const { scrollWidth, clientWidth } = container;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickPositionX = e.clientX - trackRect.left;

    const clickRatio = clickPositionX / trackRect.width;

    const newScrollLeft = clickRatio * (scrollWidth - clientWidth);
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement && containerRef.current) {
      targetElement.scrollIntoView({ behavior: "smooth", inline: "start" });
      history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Main content container */}
      <div
        ref={containerRef}
        className="w-full flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Custom scrollbar */}
      <div className="px-4 py-2 z-50">
        <div
          ref={trackRef}
          className={`w-full rounded-full cursor-pointer ${trackColor}`}
          style={{ height: `${height}px` }}
          onClick={handleTrackClick}
        >
          <div
            ref={thumbRef}
            className={`absolute rounded-full flex items-center justify-center cursor-grab ${thumbColor} ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            style={{
              height: `${height * 2}px`,
              width: `${thumbWidth}px`,
              left: `${thumbLeft}px`,
              top: `${-height / 2}px`,
              transform: "translateY(-25%)",
            }}
            onMouseDown={handleThumbMouseDown}
          >
            <Grip className="w-4 h-4 text-white dark:text-black opacity-70" />
            {showScrollPercentage && (
              <div className="absolute -top-6 text-xs font-bold bg-black dark:bg-white text-white dark:text-black rounded-md px-2 py-1">
                {scrollPercentage}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

HorizontalScrollPage.Section = Section;

export default HorizontalScrollPage;

/*Exemple d'utilisation*/

import HorizontalScrollPage from "./HorizontalScrollPage";

export default function Home() {
  const handleNavigation = (sectionId) => {
    console.log(`Navigating to ${sectionId}`);
  };

  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <a href="#section1">Section 1</a>
          </li>
          <li>
            <a href="#section2">Section 2</a>
          </li>
          <li>
            <a href="#section3">Section 3</a>
          </li>
          <li>
            <button onClick={() => handleNavigation("section4")}>
              Section 4
            </button>
          </li>
        </ul>
      </nav>

      {/* Contenu principal avec défilement horizontal */}
      <HorizontalScrollPage showScrollPercentage={true}>
        <HorizontalScrollPage.Section id="section1">
          <div className="h-screen w-screen bg-blue-100 flex items-center justify-center">
            <h2 className="text-4xl font-bold">Section 1</h2>
          </div>
        </HorizontalScrollPage.Section>

        <HorizontalScrollPage.Section id="section2">
          <div className="h-screen w-screen bg-green-100 flex items-center justify-center">
            <h2 className="text-4xl font-bold">Section 2</h2>
          </div>
        </HorizontalScrollPage.Section>

        <HorizontalScrollPage.Section id="section3">
          <div className="h-screen w-screen bg-yellow-100 flex items-center justify-center">
            <h2 className="text-4xl font-bold">Section 3</h2>
          </div>
        </HorizontalScrollPage.Section>

        <HorizontalScrollPage.Section id="section4">
          <div className="h-screen w-screen bg-red-100 flex items-center justify-center">
            <h2 className="text-4xl font-bold">Section 4</h2>
          </div>
        </HorizontalScrollPage.Section>
      </HorizontalScrollPage>
    </main>
  );
}
```

-

```tsx

```

-

```tsx

```

-

```tsx

```
