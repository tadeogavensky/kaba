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
import { BiHistory, BiLogOut } from "react-icons/bi";
import SignOut from "../SignOut";
import { AnimatePresence, motion } from "framer-motion";
import { FiUser } from "react-icons/fi";

const Header = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openMenuDesktop, setOpenMenuDesktop] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    setNotificationModalOpen(false);
  }, [user?.notifications]);

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
          <BiHistory size={25} />{" "}
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
          <div
            className={`flex flex-col items-end ${
              openMenuDesktop
                ? "border-2 rounded-lg p-2 border-blue-500"
                : "border-2 rounded-lg p-2 border-transparent"
            }`}
          >
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-6 cursor-pointer select-none">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setOpenMenuDesktop(!openMenuDesktop);
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
            <AnimatePresence>
              {openMenuDesktop && (
                <AccountDesktopDropDown
                  user={user}
                  openMenuDesktop={openMenuDesktop}
                  logout={logout}
                />
              )}
            </AnimatePresence>
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

const AccountDesktopDropDown = ({
  logout,
  openMenuDesktop,
  user,
}: {
  logout: () => void;
  openMenuDesktop: boolean;
  user: any;
}) => {
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div
      initial="exit"
      animate={openMenuDesktop ? "enter" : "exit"}
      variants={subMenuAnimate}
      className="bg-white w-[300px] gap-2 absolute top-24 shadow-2xl border-[1px] border-gray-100 flex flex-col items-start rounded-md "
    >
      <Link
        href={`/auth/account/${user.id}`}
        className="flex items-center gap-2 hover:bg-gray-200 transition w-full py-3 px-4"
      >
        <FiUser size={20} />
        <p className="font-heading font-semibold text-base">Account</p>
      </Link>
      <Link
        href={"/auth/bookings"}
        className="flex items-center gap-2 hover:bg-gray-200 transition w-full py-3 px-4"
      >
        <BsCalendar size={20} />
        <p className="font-heading font-semibold text-base">Bookings</p>
      </Link>
      <div className="flex items-center gap-2 hover:bg-gray-200 transition w-full  py-3 px-4 cursor-pointer">
        <IoNotificationsOutline size={20} />
        <p className="font-heading font-semibold text-base">Notifications</p>
      </div>

      <button
        onClick={() => {
          logout();
        }}
        className=" flex items-center gap-2 hover:bg-gray-200 transition w-full  py-3 px-4 font-heading font-semibold text-base"
      >
        <BiLogOut size={20} />
        <p>Sign Out</p>
      </button>
    </motion.div>
  );
};
