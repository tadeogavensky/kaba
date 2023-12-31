"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import axios from "axios";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Button = ({
  workerId,
  serviceId,
}: {
  workerId: string;
  serviceId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const { selectedDate, workingHours, startTime, addressId } = useBooking();
  const { user, updateSession } = useAuth();

  const handleBook = async () => {
    const object = {
      selectedDate,
      startTime,
      workingHours,
      userId: user?.id,
      serviceId: serviceId,
      clientId: user?.client?.id,
      workerId,
      addressId,
    };

    console.log(object);
    

    if (!object.selectedDate) {
      toast.error("You need to select a date");
      return;
    }

    if (object.workingHours <= 0) {
      toast.error("You need to add working hours");
      return;
    }

    if (!object.addressId) {
      toast.error("You need to select an address");
      return;
    }

    try {
      const { data } = await axios.post("/api/checkout", object);

      toast.success("Booking done!");

      const responseUser = await axios.get("/api/me");

      updateSession(responseUser.data);

      router.push("/");
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
    <div className="mt-10 lg:mt-0 w-full">
      {loading ? (
        <button>
          <Toaster />
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
