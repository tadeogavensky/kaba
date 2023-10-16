import Address from "@/types/Address";
import React, { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import EditForm from "../EditForm";
import { AnimatePresence } from "framer-motion";
const Card = ({
  id,
  country,
  state,
  city,
  postalCode,
  neighbourhood,
  street,
  number,
}: {
  id: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  neighbourhood: string;
  street: string;
  number: string;
}) => {
  const [isModalOpen, setOpen] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);

  const { updateSession } = useAuth();

  const handleDelete = async (id: string) => {
    const response = await axios.delete(`/api/address/${id}`);

    const responseUser = await axios.get("/api/me");

    updateSession(responseUser.data);
  };

  const handleEdit = async (id: string) => {
    setFormVisibility(true);
    setOpen(false);
  };

  const closeForm = () => {
    setFormVisibility(false);
  };

  return (
    <div className="w-full bg-white relative ">
      <div className="flex items-center justify-between border-b-[1px] p-4">
        <div className="flex items-center justify-between gap-1">
          <div className="flex flex-col">
            <p className="font-semibold font-body">
              {street} {number}
            </p>
            <p className="text-xs text-slate-500">
              ZIP code {postalCode} - {city} - {neighbourhood}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setOpen(!isModalOpen);
          }}
          className="hover:bg-slate-200 p-2 rounded-full text-slate-600 "
        >
          <BsThreeDotsVertical />
        </button>
      </div>

      {isModalOpen && (
        <Modal
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          id={id || ""}
        />
      )}

      <AnimatePresence>
        {isFormVisible && <EditForm id={id || ""} closeForm={closeForm} />}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({
  handleDelete,
  handleEdit,
  id,
}: {
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;

  id: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-md absolute z-50 font-body flex flex-col right-8 top-16">
      <button
        className="px-4 py-2 text-sm hover:bg-slate-100 transition w-full text-left rounded-t-md"
        onClick={() => {
          if (id) {
            handleEdit(id);
          }
        }}
      >
        Edit
      </button>
      <button className="px-4 py-2 text-sm hover:bg-slate-100 transition w-full text-left">
        Set as primary address
      </button>
      <button
        className="px-4 py-2 text-sm hover:bg-red-400 hover:text-white transition w-full text-left rounded-b-md"
        onClick={() => {
          if (id) {
            handleDelete(id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
