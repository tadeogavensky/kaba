"use client";
import React, { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";

const StartTime = () => {
  const { startTime, setStartTime } = useBooking();

  const hours = [
    { value: "6:00 AM", label: "6:00 AM" },
    { value: "7:00 AM", label: "7:00 AM" },
    { value: "8:00 AM", label: "8:00 AM" },
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
    { value: "6:00 PM", label: "6:00 PM" },
    { value: "7:00 PM", label: "7:00 PM" },
    { value: "8:00 PM", label: "8:00 PM" },
    { value: "9:00 PM", label: "9:00 PM" },
    { value: "10:00 PM", label: "10:00 PM" },
  ];

  return (
    <div className="flex flex-col gap-4 justify-start">
      <h1 className="font-heading font-bold text-lg">Choose Start Time</h1>
      <div className="overflow-x-auto">
        <div className="flex items-center gap-4">
          {hours.map((hour, index) => {
            return (
              <span
                key={index}
                className={`rounded-2xl text-sm font-body font-semibold whitespace-nowrap  ${
                  startTime === hour.value
                    ? "bg-primary text-white"
                    : "bg-blue-50 text-neutral-400"
                } px-4 py-1 cursor-pointer capitalize `}
                onClick={() => {
                  setStartTime(hour.value);
                }}
              >
                {hour.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StartTime;
