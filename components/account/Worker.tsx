"use client";

import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import avatar from "/public/assets/avatar.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAutoGraph, MdNewReleases, MdVerified } from "react-icons/md";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import SignOut from "../SignOut";
import { useEffect, useState } from "react";
import Service from "@/types/Service";

import Select from "react-select";
import User from "@/types/User";
import { useAuth } from "@/contexts/AuthContext";

const Worker = ({ user }: { user: User }) => {
  const { updateSession } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState({
    label: user.worker?.service?.name,
    value: user.worker?.service?.id,
  });
  const [rate, setRate] = useState(null);

  console.log(service.label);

  const updatedServices = services.map((service) => ({
    label: service.name,
    value: service.id,
    ...service,
  }));

  const handleServiceChange = async (selectedOption: any) => {
    setService((prevService) => ({
      ...prevService,
      label: selectedOption.label,
      value: selectedOption.value,
    }));

    await axios.put(`/api/service/worker/${selectedOption}/${user.worker?.id}`);

    toast.success("Service changed");

    const responseUser = await axios.get("/api/me");
    updateSession(responseUser.data);
  };

  const sendVerificationMail = async () => {
    try {
      toast(`An email has been sent to ${user?.email}`, {
        icon: "✉️",
      });
      const response = await axios.post("/api/activate", user);
    } catch (error) {}
  };

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-8">
      <Toaster />
      <div className="flex justify-center relative">
        <Image
          src={user?.image || avatar}
          className="rounded-full w-[65%] shadow-xl"
          alt="profilePicture"
        />
        <div className="absolute bg-white p-2 shadow-xl  rounded-full bottom-0 right-16">
          <button className="rounded-full p-2  bg-blue-600 text-white">
            <AiOutlinePlus size={30} />
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center gap-2">
          <h1 className="font-heading text-3xl font-bold capitalize">
            {user?.firstName}
          </h1>
          <h1 className="font-heading text-3xl font-bold capitalize">
            {user?.lastName}
          </h1>

          {user?.active == false ? (
            <MdNewReleases className="text-red-500" size={35} />
          ) : (
            <MdVerified className="text-green-500" size={35} />
          )}
        </div>

        {user?.active == false && (
          <div className="text-center text-xs">
            <h2>Your account is not verified.</h2>
            <p>Please verify it to access key features of Kaba</p>

            <button
              type="button"
              className="text-lg mt-4 bg-blue-500 text-white p-2 rounded-lg font-body font-bold"
              onClick={() => {
                sendVerificationMail();
              }}
            >
              Send verification email
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center flex-col items-center">
        <h1 className="text-xl font-body font-semibold mb-2 text-center">
          What you are doing today?
        </h1>
        <select
          name="service"
          value={service.label}
          onChange={(e) => {
            handleServiceChange(e.target.value);
          }}
          className="bg-primary shadow-xl rounded-full p-3 font-body font-semibold text-white text-center capitalize"
        >
          <option selected disabled>
            {service.label}
          </option>

          {updatedServices.map((service) => (
            <option
              key={service.value}
              value={service.value}
              className="font-body capitalize bg-white text-black font-semibold "
            >
              {service.label}
            </option>
          ))}
        </select>

        {/*   <Select options={updatedServices} onChange={handleServiceChange} /> */}
      </div>

      <Link
        href={`/auth/account/${user.id}/account-info`}
        className="w-full bg-white px-3 py-2 flex items-center justify-between gap-4 shadow-md rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center border-[1px] border-gray-300 rounded-full p-2">
            <BiUser size={25} className="text-primary" />
          </div>
          <div className="flex flex-col items-start font-heading ">
            <h1 className="font-bold text-lg">Account Info</h1>
            <p className="text-sm">See your info saved</p>
          </div>
        </div>

        <IoIosArrowForward size={20} />
      </Link>

      <Link
        href={`/auth/account/${user.id}/addresses`}
        className="w-full bg-white px-3 py-2 flex items-center justify-between gap-4 shadow-md rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center border-[1px] border-gray-300 rounded-full p-2">
            <SlLocationPin size={25} className="text-primary" />
          </div>
          <div className="flex flex-col items-start font-heading">
            <h1 className="font-bold text-lg">Address</h1>
            <p className="text-sm">See your saved address</p>
          </div>
        </div>

        <IoIosArrowForward size={20} />
      </Link>

      <Link
        href={`/auth/account/${user.id}/dashboard`}
        className="w-full bg-white px-3 py-2 flex items-center justify-between gap-4 shadow-md rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center border-[1px] border-gray-300 rounded-full p-2">
            <MdAutoGraph size={25} className="text-primary" />
          </div>
          <div className="flex flex-col items-start font-heading">
            <h1 className="font-bold text-lg">Dashboard</h1>
            <p className="text-sm">See your work analytics</p>
          </div>
        </div>

        <IoIosArrowForward size={20} />
      </Link>

      <div className="mr-auto">
        <SignOut className="bg-primary text-white px-4 py-2 text-2xl font-bold rounded-full" />
      </div>
    </div>
  );
};

export default Worker;
