"use client";
import React from "react";
import Client from "@/types/Client";
import Image from "next/image";
import avatar from "../public/assets/avatar.jpg";

import {
  IoBookmarksOutline,
  IoNotificationsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
interface HeaderProps {
  client: Client;
}

const Header: React.FC<HeaderProps> = ({ client }) => {
  return (
    <header className="flex justify-between">
      {/* Mobile */}

      <div className="flex items-center gap-4 sm:hidden">
        <Image
          src={/* client.profilePicture */ avatar}
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
          alt="profilePic"
        />

        <div className="flex flex-col gap-1">
          <p className="font-normal font-heading text-sm text-gray-600">Good Morning</p>
          <p className="font-bold font-heading text-xl">
            {client.firstName} {client.lastName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        <IoInformationCircleOutline size={25} />{" "}
        <IoNotificationsOutline size={25} />
      </div>

      {/* Tablet to Desktop */}

      <div className="hidden sm:flex"></div>
    </header>
  );
};

export default Header;
