"use client";

import { GoBack } from "@/components/GoBack";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Card from "@/components/book/Card";
import { useAuth } from "@/contexts/AuthContext";
import Booking from "@/types/Booking";
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const { user } = useAuth();

  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingBookings(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 mb-20">
      <GoBack label="Home" />
      <div className="mt-4">
        {isLoadingBookings ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
             <LoadingSkeleton className="w-full h-full rounded-md bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

            </div>
          ))
        ) : (
          user?.bookings?.map((booking: Booking) => {
            return (
              <div key={booking.id}>
                <Card booking={booking} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Bookings;
