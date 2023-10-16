"use client";
import { GoBack } from "@/components/GoBack";
import Card from "@/components/address/Card";
import Form from "@/components/address/Form";
import NewAddressBtn from "@/components/address/NewAddressBtn";
import { useAuth } from "@/contexts/AuthContext";
import Address from "@/types/Address";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";

const Addresses = () => {
  const { user } = useAuth();

  const [isFormVisible, setFormVisibility] = useState(false);

  const openForm = () => {
    setFormVisibility(true);
  };

  const closeForm = () => {
    setFormVisibility(false);
  };

  console.log(user?.addresses);

  return (
    <div className="p-6 relative">
      <div>
        <Toaster />
      </div>
      <GoBack label="Profile" />

      <div className="flex flex-col mt-6 rounded-2xl shadow-lg">
        {user.client?.addresses?.map((address: Address, index: number) => (
          <Card key={index} address={address} />
        ))}

        {user.worker?.address && <Card address={user.worker.address} />}
        <button
          onClick={() => {
            openForm();
          }}
          className="text-primary bg-white w-full font-semibold text-sm flex items-center justify-between p-4 hover:bg-slate-50 transition"
        >
          <p>Add a new address</p>
          <IoIosArrowForward size={15} />
        </button>
      </div>
      <AnimatePresence>
        {isFormVisible && <Form closeForm={closeForm} />}
      </AnimatePresence>
    </div>
  );
};

export default Addresses;
