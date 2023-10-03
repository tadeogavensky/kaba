"use client";
import React, { useState } from "react";
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
interface HeaderProps {
  client: Client;
}

const Header: React.FC<HeaderProps> = (/* { client } */) => {
  const [clientLogged, isClientLoggedIn] = useState(true);
  const [client, setClient] = useState<Client>({
    id: 1,
    email: "cliente@example.com",
    password: "hashedPassword",
    firstName: "Tadeo",
    lastName: "Gavensky",
    profilePicture: "/assets/avatar.jpg",
    phone: "1160204654",
  });

  return (
    <header className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        {/* Mobile */}
        {clientLogged && (
          <div className="flex items-center gap-4 sm:hidden">
            <Image
              src={client.profilePicture}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
              alt="profilePic"
            />

            <div className="flex flex-col gap-1">
              <p className="font-normal font-heading text-sm text-gray-600">
                Good Morning
              </p>
              <p className="font-bold font-heading text-xl">
                {client.firstName} {client.lastName}
              </p>
            </div>
          </div>
        )}

        {!clientLogged && (
          <div className="flex items-center gap-4 sm:hidden">
            <Link
              href={"/log-in"}
              className="bg-green-400 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Log In
            </Link>

            <Link
              href={"/sign-up"}
              className="bg-primary text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md"
            >
              Join Now
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4 sm:hidden">
          <IoInformationCircleOutline size={25} />{" "}
          <IoNotificationsOutline size={25} />
        </div>
      </div>

      {/* Tablet to Desktop */}

      <div className="hidden sm:flex justify-between items-center w-full">
        <Link href={"/"}>
          <h1 className="font-bold font-heading text-3xl">Kaba</h1>
        </Link>

        {!isClientLoggedIn && (
          <div className="flex items-center gap-2">
            <Link
              href={"/log-in"}
              className="bg-green-400 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Log In
            </Link>

            <Link
              href={"/sign-up"}
              className="bg-primary text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md"
            >
              Join Now
            </Link>
          </div>
        )}

        {!isClientLoggedIn && (
          <div className="flex items-center gap-2">
            <Link
              href={"/log-in"}
              className="bg-green-400 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
            >
              Log In
            </Link>

            <Link
              href={"/sign-up"}
              className="bg-primary text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md"
            >
              Join Now
            </Link>
          </div>
        )}

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdOutlineAccountCircle size={30} />
            <p className="text-xl font-bold font-body">{client.firstName}</p>
            <AiOutlineDown />
          </div>
          <div className="flex items-center gap-6">
            <BsCalendar size={30} />
            <IoNotificationsOutline size={30} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const AccountDropDown = () =>{
  return(
    <div>
      
    </div>
  )
}
