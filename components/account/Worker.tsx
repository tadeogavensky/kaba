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

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const Worker = () => {
  const { updateSession, user } = useAuth();

  const [picture, setPicture] = useState(user?.image);
  const [pictureInput, showChangePictureInput] = useState(false);

  const uploadProfilePicture = (image: string) => {
    axios.post("/api/picture", { image }).then(() => {
      axios.get("/api/me").then((response) => {
        updateSession(response.data);
      });
    });
  };

  const sendVerificationMail = async () => {
    try {
      toast(`An email has been sent to ${user?.email}`, {
        icon: "✉️",
      });
      await axios.post("/api/activate", user);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-between items-center gap-8 min-h-full mb-28">
      <Toaster />
      <div
        className="flex justify-center relative "
        onMouseEnter={() => {
          showChangePictureInput(true);
        }}
        onMouseLeave={() => {
          showChangePictureInput(false);
        }}
      >
        <Image
          src={user?.image || avatar}
          width={500}
          height={500}
          className=" w-[300px] h-[300px] object-cover  rounded-full  shadow-xl"
          alt="profilePicture"
        />
        {pictureInput && (
          <div className="absolute bg-white p-2 w-full shadow-xl bottom-0 h-full flex justify-center opacity-50  rounded-full ">
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                console.log("res.fileUrl", res);
                uploadProfilePicture(res[0].fileUrl);
              }}
            />
          </div>
        )}
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

      <Link
        href={`/auth/account/${user?.id}/account-info`}
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
        href={`/auth/account/${user?.id}/addresses`}
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
        href={`/auth/account/${user?.id}/dashboard`}
        className="w-full bg-white px-3 py-2 flex items-center justify-between gap-4 shadow-md rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center border-[1px] border-gray-300 rounded-full p-2">
            <MdAutoGraph size={25} className="text-primary" />
          </div>
          <div className="flex flex-col items-start font-heading">
            <h1 className="font-bold text-lg">Dashboard</h1>
            <p className="text-sm">
              Change your service, rate, about me and view analytics
            </p>
          </div>
        </div>

        <IoIosArrowForward size={30} />
      </Link>

      <div className="mr-auto">
        <SignOut className="text-red-500 py-1 text-2xl font-bold font-body flex items-center gap-2 " />
      </div>
    </div>
  );
};

export default Worker;
