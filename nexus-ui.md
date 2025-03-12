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

export interface ActivityGraphProps {
  contributionsData?: ActivityItem[];
  years?: number[];
}

export interface HoveredDayInfo {
  text: string;
  x: number;
  y: number;
}

export const ActivityGraph: React.FC<ActivityGraphProps> = ({
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
    <ContributionGraph
      contributionsData={sampleData}
      years={[2025, 2024, 2023, 2022]}
    />
  );
};

export default App;
```
