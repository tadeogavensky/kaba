"use client";
import Booking from "@/types/Booking";
import Image from "next/image";
import React, { useState } from "react";
import avatar from "/public/assets/avatar.jpg";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const Card = ({ booking }: { booking: Booking }) => {
  const { user, updateSession } = useAuth();



  return (
    <div className="w-full relative sm:w-[350px] flex flex-row cursor-pointer items-center justify-between gap-2 rounded-md mt-4  bg-white border-2 p-4">
      <div className="flex flex-col justify-start gap-1  max-w-[70%]">
        <div className="flex flex-wrap items-center gap-2">
          {booking.canceled && (
            <p className="px-2 py-1 bg-red-100 text-red-500 font-bold text-xs rounded-2xl capitalize">
              Canceled
            </p>
          )}
          {booking.completed && (
            <p className="px-2 py-1 bg-green-100 text-green-500 font-bold text-xs rounded-2xl capitalize">
              Completed
            </p>
          )}
          <h1 className="capitalize font-body font-bold text-lg">
            {booking.service.name}
          </h1>
          <p className="px-2 py-1 bg-blue-100 text-blue-500 font-bold text-xs rounded-2xl capitalize">
            {booking.service.category.name}
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          {booking.address.street} {booking.address.number} -{" "}
          {booking.address.neighbourhood}
        </p>
        <p className="text-gray-600 text-sm">
          { new Date(booking.date).toISOString().slice(0, 10)}
          , {booking.time} for {booking.workingHours} hour/s
        </p>
        <div className="flex items-center justify-between"></div>
      </div>
      <div className="w-14 h-14 flex flex-col gap-1 items-center justify-center m-2">
        <Image
          src={
            user?.role == "client"
              ? booking.worker.user?.image || avatar
              : booking.client.user?.image || avatar
          }
          alt="service-image"
          width={500}
          height={500}
          className="rounded-full object-cover flex-1"
        />
        <p className="font-heading capitalize text-center text-xs">
          {user?.role == "client"
            ? booking.worker.user?.firstName
            : booking.client.user?.firstName}{" "}
          {user?.role == "client"
            ? booking.worker.user?.lastName
            : booking.client.user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default Card;
