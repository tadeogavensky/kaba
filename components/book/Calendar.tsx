"use client";
import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useBooking } from "@/contexts/BookingContext";
const Calendar = () => {
  const { selectedDate, setSelectedDate } = useBooking();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null); 
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const selectedDay = new Date(currentYear, currentMonth, day, 0, 0, 0);
    console.log("====================================");
    console.log(selectedDay);
    console.log("====================================");
    setSelectedDate(selectedDay);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  return (
    <div className=" w-full flex flex-col mt-10 lg:mt-0 bg-sky-50 rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center">
        <button className="text-gray-400" onClick={goToPreviousMonth}>
          <HiChevronLeft size={30} />
        </button>

        <p className="font-semibold font-body text-lg">
          {months[currentMonth]} {currentYear}
        </p>
        <button className="text-gray-400" onClick={goToNextMonth}>
          <HiChevronRight size={30} />
        </button>
      </div>

      <table className="mt-6 font-body table-auto w-full  border-separate border-spacing-y-6 border-spacing-1 lg:border-spacing-x-6">
        <thead>
          <tr>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              SUN
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              MON
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              TUE
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              WED
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              THU
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              FRI
            </th>
            <th className="text-base lg:text-base text-gray-500 font-semibold">
              SAT
            </th>
          </tr>
        </thead>
        <tbody className="">
          {Array.from(
            { length: Math.ceil((daysInMonth + dayOfWeek) / 7) },
            (_, weekIndex) => (
              <tr key={weekIndex} className="text-center">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const cellIndex = weekIndex * 7 + dayIndex - dayOfWeek + 1;
                  const isCurrentMonth =
                    cellIndex >= 1 && cellIndex <= daysInMonth;
                  const isToday =
                    isCurrentMonth &&
                    cellIndex === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear();

                  return (
                    <td
                      onClick={() => {
                        handleDateClick(cellIndex);
                      }}
                      key={cellIndex}
                      className={`rounded-full ${
                        isToday ? " bg-blue-200" : ""
                      } ${
                        selectedDate &&
                        isCurrentMonth &&
                        selectedDate.getDate() === cellIndex
                          ? "bg-primary text-white"
                          : ""
                      } cursor-pointer`}
                    >
                      {isCurrentMonth ? cellIndex : ""}
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
