"use client";
import React, { useState, useContext, useEffect, use } from "react";

import {
  IoBookmarksOutline,
  IoNotificationsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { GiPlainCircle } from "react-icons/gi";
import { BsCalendar } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";

import avatar from "/public/assets/avatar.jpg";

import HeaderButton from "./HeaderButton";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Greeting from "../Greeting";
import Modal from "../notifications/Modal";

const Header = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openMenuDesktop, setOpenMenuDesktop] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col items-center justify-between gap-4">
      {/* Mobile */}
      <div className="flex items-center w-full justify-between">
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
          <div className="relative">
            {user?.notifications && user?.notifications.length > 0 && (
              <span className="text-orange-500 absolute -top-1 -right-1 animate-bounce">
                <GiPlainCircle />
              </span>
            )}
            <button
              onClick={() => {
                setNotificationModalOpen(!isNotificationModalOpen);
              }}
              disabled={user?.notifications && user?.notifications?.length <= 0}
              className="flex justify-center items-center"
            >
              <IoNotificationsOutline size={25} />
            </button>
          </div>
          {user?.notifications && isNotificationModalOpen && <Modal />}
        </div>

        {!user && (
          <div className="flex items-center gap-4 sm:hidden">
            <Link
              href={"/auth/signin"}
              className="bg-green-400 text-white text-sm px-4 py-2 rounded-3xl font-heading font-bold shadow-md "
            >
              Sign In
            </Link>

            <Link
              href={"/signup"}
              className="bg-primary text-white text-sm px-4 py-2 rounded-3xl font-heading font-bold shadow-md"
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

        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <Link
              className="font-heading font-semibold text-sm link-item "
              href={"/how-we-work"}
            >
              How we work
            </Link>
          </li>
          <li>
            <Link
              className="font-heading font-semibold text-sm link-item"
              href={"/services"}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className="font-heading font-semibold text-sm link-item"
              href={"/faq"}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              className="font-heading font-semibold text-sm link-item"
              href={"/signup"}
            >
              Become a KabaProp
            </Link>
          </li>
        </ul>

        {!user && (
          <div className="flex items-center gap-4">
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

      {/* Sub Menu */}
      <ul className="hidden md:flex lg:hidden items-center gap-8">
        <li>
          <Link
            className="font-heading font-semibold text-md link-item "
            href={"/how-we-work"}
          >
            How we work
          </Link>
        </li>
        <li>
          <Link
            className="font-heading font-semibold text-md link-item"
            href={"/services"}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            className="font-heading font-semibold text-md link-item"
            href={"/faq"}
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="font-heading font-semibold text-md link-item"
            href={"/signup"}
          >
            Become a KabaProp
          </Link>
        </li>
      </ul>
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
