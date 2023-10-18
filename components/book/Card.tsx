import Booking from "@/types/Booking";
import React from "react";

const Card = ({ booking }: { booking: Booking }) => {
  return (
    <div className="w-full bg-white shadow-lg p-4">
      <h1 className="font-body font-semibold text-sm">
        {booking.address.street} - {booking.address.neighbourhood} -{" "}
        {booking.address.city}
      </h1>
      <h1 className="text-xl font-body capitalize font-bold ">
        {booking.service.name}
      </h1>
      <div className="flex items-center">
        <h1 className="text-lg font-body capitalize font-bold ">
          {booking.date.toString()}
        </h1>
        <h1 className="text-lg font-body capitalize font-bold ">
          {booking.time.toString()}
        </h1>
      </div>
    </div>
  );
};

export default Card;
