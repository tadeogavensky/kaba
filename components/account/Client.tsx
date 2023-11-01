"use client";
import Image from "next/image";
import avatar from "/public/assets/avatar.jpg";
import { TbEdit } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { BsCreditCard } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { MdVerified, MdNewReleases } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SignOut from "../SignOut";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
const Client = () => {
  const { user, updateSession } = useAuth();

  console.log("user?.profilePicture", user?.image);
  const [picture, setPicture] = useState(user?.image);

  const sendVerificationMail = async () => {
    try {
      toast(`An email has been sent to ${user?.email}`, {
        icon: "✉️",
      });
      const response = await axios.post("/api/activate", user);
    } catch (error) {}
  };

  const uploadProfilePicture = (image: string) => {
    axios.post("/api/picture", { image }).then(() => {
      axios.get("/api/me").then((response) => {
        updateSession(response.data);
      });
    });
  };

  return (
    <div className="flex flex-col justify-between items-center  gap-8 mb-28">
      <Toaster />
      <div className="flex justify-center relative ">
        <Image
          src={user?.image || avatar}
          width={500}
          height={500}
          className=" w-[300px] sm:w-[40%] rounded-full  shadow-xl"
          alt="profilePicture"
        />
        <div className="absolute bg-white p-2 shadow-xl  rounded-full bottom-0 right-16 lg:right-[12rem]">
          {/*   <div className="bg-blue-600 rounded-full p-2 text-white font-bold">
            <input
              type="file"
              name="picture"
              id="picture"
              placeholder=""
              className=""
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const selectedFile = e.target.files[0];
                  uploadProfilePicture(selectedFile);
                }
              }}
            />

            <label htmlFor="picture" className="">
              <AiOutlinePlus size={30} />
            </label>
          </div> */}

          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              console.log("res.fileUrl", res);
              uploadProfilePicture(res[0].fileUrl);
            }}
            onUploadError={(error: Error) => {}}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center gap-2">
          <div className="text-center whitespace-nowrap flex items-center gap-1">
            <h1 className="font-heading text-3xl font-bold capitalize">
              {user?.firstName}
            </h1>
            <h1 className="font-heading text-3xl font-bold capitalize">
              {user?.lastName}
            </h1>
          </div>

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
              Send email
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
            <h1 className="font-bold text-lg">Addresses</h1>
            <p className="text-sm">See addresses saved</p>
          </div>
        </div>

        <IoIosArrowForward size={20} />
      </Link>

      {/*     <Link
        href={`/auth/account/${user?.id}/cards`}
        className="w-full bg-white px-3 py-2 flex items-center justify-between gap-4 shadow-md rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center border-[1px] border-gray-300 rounded-full p-2">
            <BsCreditCard size={25} className="text-primary" />
          </div>
          <div className="flex flex-col items-start font-heading ">
            <h1 className="font-bold text-lg">Cards</h1>
            <p className="text-sm">See cards saved</p>
          </div>
        </div>

        <IoIosArrowForward size={20} />
      </Link>
 */}
      <div className="font-body flex flex-col justify-start w-full">
        <p className="font-normal">
          {" "}
          Do you have a skill and want to earn some extra money?
        </p>
        <Link href={"/signup"} className="font-bold text-blue-700">
          Register as a Worker right now!
        </Link>
      </div>

      <div className="mr-auto">
        <SignOut className="text-red-500 py-1 text-2xl font-bold font-body flex items-center gap-2 " />
      </div>
    </div>
  );
};

export default Client;
