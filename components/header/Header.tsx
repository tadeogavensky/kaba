"use client";
import React, { useState, useContext, useEffect, use } from "react";

import {
  IoBookmarksOutline,
  IoNotificationsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { BsCalendar } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";

import avatar from "/public/assets/avatar.jpg";

import HeaderButton from "./HeaderButton";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Greeting from "../Greeting";

const Header = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openMenuDesktop, setOpenMenuDesktop] = useState(false);

  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        {/* Desktop */}
        {user && (
          <div className="relative">
            <div
              className="flex items-center gap-4 sm:hidden"
              onClick={() => {
                setOpenMenuMobile(!openMenuMobile);
              }}
            >
              <Image
                src={user.image || avatar}
                width={100}
                height={100}
                className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
                alt="profilePic"
              />

              <div className="flex flex-col gap-1">
                <p className="font-normal font-heading text-sm text-gray-600">
                  <Greeting />
                </p>
                <p className="font-bold font-heading text-2xl">
                  {user?.firstName}
                </p>
              </div>
            </div>
            {openMenuMobile && <AccountMobileDropDown logout={logout} />}
          </div>
        )}

        <div className="flex items-center gap-4 sm:hidden">
          <IoInformationCircleOutline size={25} />{" "}
          <IoNotificationsOutline size={25} />
        </div>

        {!user && (
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

        {!user && (
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
        {user && (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-12">
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-2xl font-heading font-bold shadow-md "
              >
                Sign Out
              </button>

              <div className="flex items-center gap-6">
                <Link href={"/bookings"} className="flex items-center gap-2">
                  <BsCalendar size={20} />
                  <p className="font-heading font-semibold text-base">
                    Bookings
                  </p>
                </Link>
                <div className="flex items-center gap-2 cursor-pointer">
                  <IoNotificationsOutline size={20} />
                  <p className="font-heading font-semibold text-base">
                    Notifications
                  </p>
                </div>

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onMouseOver={() => {
                    setOpenMenuDesktop(true);
                  }}
                  onMouseLeave={() => {
                    setOpenMenuDesktop(false);
                  }}
                >
                  <MdOutlineAccountCircle size={20} />
                  <p className="text-base font-semibold font-heading">
                    {user.firstName}
                  </p>
                  <AiOutlineDown />
                </div>
              </div>
            </div>
            {openMenuDesktop && <AccountDesktopDropDown logout={logout} />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

const AccountMobileDropDown = ({ logout }: { logout: () => void }) => {
  return (
    <div className="bg-white w-full absolute shadow-xl flex flex-col rounded-md">
      <p>hola</p>

      <button
        onClick={() => {
          logout();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

const AccountDesktopDropDown = ({ logout }: { logout: () => void }) => {
  return (
    <div className="bg-white w-[300px] absolute top-16 shadow-xl flex flex-col items-start rounded-md p-4">
      <button
        onClick={() => {
          logout();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
