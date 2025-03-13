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

export const GithubContributionGraph: React.FC<GithubContributionGraphProps> = ({
  contributionsData = [],
  years = [2025, 2024, 2023, 2022],
}) => {
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
'use client'

import React, { useState, useEffect } from 'react';

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
      const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
      const milliseconds = Math.floor(diffInMs % 1000);
      
      const formattedTime = `${days > 0 ? days + 'j ' : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
      
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

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { CornerSquareType, DotType, DrawType, ErrorCorrectionLevel, FileExtension, GradientType, Mode, ShapeType, TypeNumber } from 'qr-code-styling';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';

const QRCode = ({ size, margin, data, type, className }: { size: number, margin: number, data: string, type: FileExtension, className?: string }) => {

    const qrCodeRef = useRef<QRCodeStyling | null>(null);

    const [_size, set_Size] = useState(size);
    const [_margin, set_Margin] = useState(margin);
    const [_data] = useState(data);
    const [_type, set_Type] = useState<FileExtension>(type)

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
                errorCorrectionLevel: "Q" as ErrorCorrectionLevel
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.3,
                margin: 0
            },
            dotsOptions: {
                type: "rounded" as DotType,
                color: "#0D0D0D",
                gradient: {
                    type: "linear" as GradientType,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: "#0D0D0D" },
                        { offset: 1, color: "#0D0D0D" }
                    ]
                }
            },
            backgroundOptions: {
                color: "#ffffff"
            },
            cornersSquareOptions: {
                type: "extra-rounded" as CornerSquareType,
                color: "#0D0D0D",
                gradient: null
            },
            cornersDotOptions: {
                color: "#0D0D0D",
                gradient: null
            }
        };

        qrCodeRef.current = new QRCodeStyling(qr_config);

        const qrCodeContainer = document.getElementById("qr-code-container") as HTMLElement;
        if (qrCodeContainer) {
            qrCodeRef.current.append(qrCodeContainer);
        }

        return () => {
            qrCodeContainer.innerHTML = "";
            qrCodeRef.current = null;
        };
    }, []);

    const handleDownload = (size: number, margin: number, type: FileExtension) => {
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
                errorCorrectionLevel: "Q" as ErrorCorrectionLevel
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.3,
                margin: 0
            },
            dotsOptions: {
                type: "rounded" as DotType,
                color: "#0D0D0D",
                gradient: {
                    type: "linear" as GradientType,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: "#0D0D0D" },
                        { offset: 1, color: "#0D0D0D" }
                    ]
                }
            },
            backgroundOptions: {
                color: "#ffffff"
            },
            cornersSquareOptions: {
                type: "extra-rounded" as CornerSquareType,
                color: "#0D0D0D",
                gradient: null
            },
            cornersDotOptions: {
                color: "#0D0D0D",
                gradient: null
            }
        };

        const qrCodeDownloadInstance = new QRCodeStyling(qr_config);
        qrCodeDownloadInstance.download({ name: "qr-code", extension: type });
    };

    return (
        <div className={cn("p-0 ", className)}>

            <div id="qr-code-container" className='-ml-2'></div>

            <div className='grid grid-cols-3 w-full mb-2'>
                <div>
                    <Label htmlFor='largeur'> Largeur </Label>
                    <Input className='border-e-0 rounded-e-none' name='largeur' id='largeur' type="number" value={_size} onChange={(e) => set_Size(Number(e.target.value))} />
                </div>
                <div>
                    <Label htmlFor='hauteur'> Hauteur </Label>
                    <Input className='rounded-none' name='hauteur' id='hauteur' type="number" value={_size} onChange={(e) => set_Size(Number(e.target.value))} />
                </div>
                <div>
                    <Label htmlFor='marge'> Marge </Label>
                    <Input className='border-s-0 rounded-s-none' name='marge' id='marge' type="number" value={_margin} onChange={(e) => set_Margin(Number(e.target.value))} />
                </div>
            </div>

            <div className='flex w-full  space-x-5 scrn_bk_4:space-x-0 scrn_bk_4:flex-col items-center mb-5'>
                <Button className="w-1/2 scrn_bk_4:w-full h-11 order-1 scrn_bk_4:order-2" onClick={() => handleDownload(_size, _margin, _type)}>
                    Télécharger le code Qr
                </Button>
                <Select defaultValue={_type} onValueChange={(e) => set_Type(e as FileExtension)} >
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
            className={`fixed ${isVisible ? 'block' : 'hidden'} right-0 bottom-12 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-50 m-5`}>
            <ArrowUp className="w-5 h-5 text-white dark:text-black" />
        </button>
    );
};

export default ScrollToTop;
```