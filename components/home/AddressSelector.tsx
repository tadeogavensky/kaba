"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { FaLocationDot } from "react-icons/fa6";

const Address = () => {
  const { user } = useAuth();
  const { setAddressId } = useBooking();

  return (
    <div className="mt-10">
      {user?.role == "client" &&
        user?.client?.addresses &&
        user?.client?.addresses.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <FaLocationDot size={25} />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <select
                onChange={(e) => {
                  setAddressId(e.target.value);
                }}
                className="bg-white text-gray-600 shadow-md w-full focus:border-2 border-2 border-transparent focus:border-primary rounded-full p-3 text-sm font-body font-semibold  text-center capitalize"
              >
                <option
                  disabled
                  value=""
                  className="text-ellipsis w-10 text-gray-500"
                >
                  Select one of your address
                </option>
                {user?.client?.addresses.map((address) => {
                  return (
                    <option
                      value={address.id}
                      key={address.id}
                      className="font-body capitalize font-semibold text-gray-500"
                    >
                      {address.fullAddress}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
    </div>
  );
};

export default Address;
