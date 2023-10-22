"use client";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { useBooking } from "@/contexts/BookingContext";

const WorkingHours = () => {
  const { workingHours, setWorkingHours } = useBooking();

  const incrementHours = () => {
    if (workingHours < 8) {
      setWorkingHours((prevState) => prevState + 1);
    }
  };

  const decrementHours = () => {
    if (workingHours > 0) {
      setWorkingHours((prevState) => prevState - 1);
    }
  };

  return (
    <div className="w-full mt-6 lg:mt-0 bg-white shadow-md flex items-center justify-between rounded-xl p-4">
      <div className="flex flex-col items-start">
        <h1 className="font-heading font-bold text-lg">Working Hours</h1>
        <p>cost increases per hour</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="bg-gray-200 rounded-full flex justify-center items-center p-2"
          onClick={decrementHours}
        >
          <AiOutlineMinus size={20} />
        </button>
        <p>{workingHours}</p>
        <button
          className="bg-gray-200 rounded-full flex justify-center items-center p-2"
          onClick={incrementHours}
        >
          <IoAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default WorkingHours;
