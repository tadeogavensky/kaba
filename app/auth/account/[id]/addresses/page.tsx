"use client";
import { GoBack } from "@/components/GoBack";
import CardClient from "@/components/address/client/Card";
import CardWorker from "@/components/address/worker/Card";

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

  return (
    <div className="p-6 relative">
      <div>
        <Toaster />
      </div>
      <GoBack label="Profile" />

      <div className="flex flex-col mt-6 rounded-2xl shadow-lg">
        {user?.client?.addresses?.map((address: Address, index: number) => (
          <CardClient key={index} address={address} />
        ))}

        {user?.worker && (
          <CardWorker id={user.worker.id || ""} country={user.worker.country} state={user.worker.state} city={user.worker.city} postalCode={user.worker.postalCode} neighbourhood={user.worker.neighbourhood} street={user.worker.street} number={user.worker.number}         
          />
        )}
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
