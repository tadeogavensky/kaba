"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";

const Address = () => {
  const { user } = useAuth();
  const { setAddressId } = useBooking();
  return (
    <div className="flex flex-col gap-2 justify-start">
      <h1 className="font-heading font-bold text-lg">
        Select one of your addresses
      </h1>

      <select
        onChange={(e) => {
          console.log("e.target.value", e.target.value);
          setAddressId(e.target.value);
        }}
        className="bg-primary shadow-md rounded-full p-3 text-sm font-body font-semibold text-white text-center capitalize"
      >
        <option>Select an address</option>
        {user?.client?.addresses.map((address) => {
          return (
            <>
              <option
                value={address.id}
                key={address.id}
                className="font-body capitalize bg-white text-black font-semibold"
              >
                {address.fullAddress}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
};

export default Address;
