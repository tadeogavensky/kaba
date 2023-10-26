"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import Link from "next/link";

const Address = () => {
  const { user } = useAuth();
  const { setAddressId } = useBooking();
  return (
    <div className="flex flex-col gap-2 justify-start">
      {user?.client?.addresses && user.client.addresses.length == 0 && (
        <div className="flex flex-col w-full justify-end items-center gap-2">
          <p className="font-semibold font-body text-sm">You need an address to book a worker</p>
          <Link
            href={`/auth/account/${user?.id}/addresses`}
            className="font-body font-semibold text-sm bg-primary text-center p-2 rounded-full w-full text-white"
          >
            Add an address
          </Link>
        </div>
      )}
      {user?.client?.addresses && user?.client?.addresses.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Address;
