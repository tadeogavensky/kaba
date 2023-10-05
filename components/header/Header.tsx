"use client";
import React, { useState, useContext, useEffect } from "react";
import Client from "@/types/Client";
import Image from "next/image";
import avatar from "../public/assets/avatar.jpg";

import {
  IoBookmarksOutline,
  IoNotificationsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { BsCalendar } from "react-icons/bs";
import { LuMail } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";

import HeaderButton from "./HeaderButton";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("session :>> ", session);
  }, [session]);

  return (
    <header className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        {/* Mobile */}
        {session && (
          <div className="flex items-center gap-4 sm:hidden">
            {/*  <Image
              src={user?.profilePicture}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
              alt="profilePic"
            /> */}

            <div className="flex flex-col gap-1">
              <p className="font-normal font-heading text-sm text-gray-600">
                Good Morning
              </p>
              <p className="font-bold font-heading text-xl">
                {/*   {user?.firstName} {user?.lastName} */}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 sm:hidden">
          <IoInformationCircleOutline size={25} />{" "}
          <IoNotificationsOutline size={25} />
        </div>

        {!session && (
          <div className="flex items-center gap-4 sm:hidden">
            <Link
              href={"/auth/signin"}
              className="bg-green-400 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Sign In
            </Link>

            <Link
              href={"/signup"}
              className="bg-primary text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>

      {/* Tablet to Desktop */}

      <div className="hidden sm:flex justify-between items-center w-full">
        <Link href={"/"}>
          <h1 className="font-bold font-heading text-3xl">Kaba</h1>
        </Link>

        {!session && (
          <div className="flex items-center gap-2">
            <Link
              href={"/auth/signin"}
              className="bg-green-400 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Sign In
            </Link>

            <Link
              href={"/signup"}
              className="bg-primary text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md"
            >
              Join Now
            </Link>
          </div>
        )}
        {session && (
          <div className="flex items-center gap-12">
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Sign Out
            </button>
            <div className="flex items-center gap-1 cursor-pointer">
              <MdOutlineAccountCircle size={30} />
              <p className="text-xl font-bold font-body">{}</p>
              <AiOutlineDown />
            </div>
            <div className="flex items-center gap-6">
              <BsCalendar size={30} />
              <IoNotificationsOutline size={30} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

const AccountDropDown = () => {
  return <div></div>;
};
