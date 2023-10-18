"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import axios from "axios";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const Button = ({
  workerId,
  serviceId,
}: {
  workerId: string;
  serviceId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedDate, workingHours, startTime, addressId } = useBooking();
  const { user } = useAuth();

  const handleBook = async () => {
    const object = {
      selectedDate,
      startTime,
      workingHours,
      user: user?.id,
      serviceId: serviceId,
      clientId: user?.client?.id,
      workerId,
      addressId,
    };

    try {
      const { data } = await axios.post("/api/checkout", object);

      toast.success("Booking done!");

      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    const generateLink = async () => {
      setLoading(true);

      setLoading(false);
    };

    generateLink();
  }, [workerId]);

  return (
    <div className="mt-10">
      {loading ? (
        <button>
          <Loader />
        </button>
      ) : (
        <button
          onClick={handleBook}
          className="px-6 py-2 text-center bg-primary text-white font-body rounded-3xl w-full hover:bg-blue-800 transition"
        >
          Book
        </button>
      )}
    </div>
  );
};

export default Button;
