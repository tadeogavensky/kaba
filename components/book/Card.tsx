"use client";
import Booking from "@/types/Booking";
import Image from "next/image";
import React from "react";
import avatar from "/public/assets/avatar.jpg";
import { useAuth } from "@/contexts/AuthContext";

const Card = ({ booking }: { booking: Booking }) => {
  const { user } = useAuth();
  return (
    <div className="w-full flex flex-col items-center gap-2 rounded-md  bg-white shadow-lg p-4">
      <div className="flex items-center gap-2">
        <Image
          src={user?.role=="client" ? (booking.worker.user?.image || avatar) : (booking.client.user?.image || avatar) }
          alt="service-image"
          width={30}
          height={30}
          className="w-[25%] rounded-full object-cover flex-1"
        />
        <h2 className="font-heading">
          {user?.role=="client" ? booking.worker.user?.firstName : booking.client.user?.firstName } {user?.role=="client" ? booking.worker.user?.lastName : booking.client.user?.lastName } 
        </h2>
      </div>
      <div className="flex items-center gap-2 flex-1">
        <Image
          src={booking.service.image}
          alt="service-image"
          width={400}
          height={400}
          className="w-1/2 rounded-md object-cover flex-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-body font-semibold text-sm">
          {booking.address.street} - {booking.address.neighbourhood} -{" "}
          {booking.address.city}
        </h1>
        <h1 className="text-xl font-body capitalize font-bold ">
          {booking.service.name}
        </h1>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-body capitalize font-bold ">
            {new Date(booking.date).toLocaleDateString()}
          </h1>
          <h1 className="text-lg font-body capitalize font-bold ">
            {new Date(booking.time).toLocaleTimeString()}
          </h1>
        </div>
      </div>
      <button className="w-full hover:bg-red-700 transition bg-red-500 text-white rounded-full font-semibold font-body mt-2 py-1">
        Cancel
      </button>
    </div>
  );
};

export default Card;
