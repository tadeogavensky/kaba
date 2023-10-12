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

const addresses: Address[] = [
  {
    fullAddress: "Bulnes 1854 2A, Palermo 1425, CABA, Buenos Aires",
    street: "Bulnes",
    floorDepartment: "2A",
    number: "1854",
    neighbourhood: "Palermo",
    city: "CABA",
    state: "Buenos Aires",
    postalCode: "1425",
    country: "Argentina",
    type: "home",
    description: "My home address",
    active: true,
  },
  {
    fullAddress: "456 Elm St, Suite 201, New York, NY 10001, USA",
    street: "Elm St",
    floorDepartment: "Suite 201",
    number: "456",
    neighbourhood: "",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    type: "office",
    description: "Another work address",
    active: false,
  },
  {
    fullAddress: "123 Main St, Apartment 3B, Springfield, IL 62701, USA",
    street: "Main St",
    floorDepartment: "3B",
    number: "123",
    neighbourhood: "",
    city: "Springfield",
    state: "IL",
    postalCode: "62701",
    country: "USA",
    type: "other",
    description: "My work address",
    active: false,
  },
];

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
        {addresses.map((address, index) => (
          <Card key={index} address={address} />
        ))}
        <button
          onClick={() => {
            openForm();
          }}
          className="text-primary bg-white w-full font-semibold text-sm flex items-center justify-between p-4 hover:bg-slate-50 transition"
        >
          <p>Add new address</p>
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
