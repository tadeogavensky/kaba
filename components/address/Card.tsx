import Address from "@/types/Address";
import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
const Card = ({ address }: { address: Address }) => {
  const [isModalOpen, setOpen] = useState(false);

  const {updateSession} = useAuth()
  const handleDelete = async (id: string) => {
    const response = await axios.delete(`/api/address/${id}`);

    updateSession(response.data.user)
  };

  return (
    <div className="w-full bg-white relative ">
      <div className="flex items-center justify-between border-b-[1px] p-4">
        <div className="flex items-center justify-between gap-1">
          <div>
            <span>{address.type == "home" && <BiHomeAlt size={25} />}</span>
            <span>
              {address.type == "office" && <PiSuitcaseSimpleFill size={25} />}
            </span>
            <span>
              {address.type == "other" && <GrLocationPin size={25} />}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-green-700 font-normal mb-2 font-body bg-green-200  rounded-full w-1/3 text-center text-xs">
              {address.active == true ? "Active" : ""}
            </p>
            <p className="font-semibold font-body">
              {address.street} {address.number} {address.floorDepartment}
            </p>
            <p className="text-xs text-slate-500">
              ZIP code {address.postalCode} - {address.city} -{" "}
              {address.neighbourhood}
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
        <Modal handleDelete={handleDelete} id={address?.id || ""} />
      )}
    </div>
  );
};

const Modal = ({
  handleDelete,
  id,
}: {
  handleDelete: (id: string) => void;
  id: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-md absolute z-50 font-body flex flex-col right-8 top-16">
      <button className="px-4 py-2 text-sm hover:bg-slate-100 transition w-full text-left rounded-t-md">
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
