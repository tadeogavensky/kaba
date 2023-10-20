"use client";

import { GoBack } from "@/components/GoBack";
import Card from "@/components/book/Card";
import { useAuth } from "@/contexts/AuthContext";
import Booking from "@/types/Booking";
import React from "react";

const Bookings = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="p-6 mb-20">
      <GoBack label="Home" />
      <div className="mt-4 ">
        {user?.bookings && user.bookings.length > 0 ? (
          user?.bookings?.map((booking: Booking) => {
            return (
              <div key={booking.id}>
                <Card booking={booking} />
              </div>
            );
          })
        ) : (
          <div>
            <h1 className="font-body font-semibold text-left text-2xl">
             {user?.role=="client" ? "You haven't made any bookings yet :(" : "You don't have any bookings yet :("}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
