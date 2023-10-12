"use client";
import { GoBack } from "@/components/GoBack";
import React, { EventHandler, FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMailMinus } from "react-icons/lu";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { PiUser, PiIdentificationCard } from "react-icons/pi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { TiBusinessCard } from "react-icons/ti";

import { MdAlternateEmail } from "react-icons/md";
import { PiIdentificationBadgeBold } from "react-icons/pi";

import { useAuth } from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AccountInfo({
  params: { id },
}: {
  params: { id: string };
}) {
  const { user, updateSession } = useAuth();
  const router = useRouter();

  const [updatedUser, setUpdatedUser] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    identity: user?.identity || "",
    phone: user?.phone || "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const isOpen = () => {
    setVisibilityUserDataForm(true);
  };

  const closeEditForm = () => {
    setVisibilityUserDataForm(false);

    setUpdatedUser({
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      identity: user?.identity || "",
      phone: user?.phone || "",
    });
  };

  const [isEditUserDataVisible, setVisibilityUserDataForm] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const validateName = (inputName: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(inputName);
  };

  const handleEmailChange = (e: any) => {
    const inputEmail = e.target.value;
    setUpdatedUser((prevState) => ({
      ...prevState,
      email: inputEmail,
    }));

    if (inputEmail.trim() !== "") {
      const isEmailValid = validateEmail(inputEmail);
      setIsEmailValid(isEmailValid);
    } else {
      setIsEmailValid(true);
    }
  };

  const handleFirstNameChange = (e: any) => {
    const inputFirstName = e.target.value;
    setUpdatedUser((prevState) => ({
      ...prevState,
      firstName: inputFirstName,
    }));

    if (inputFirstName.trim() === "") {
      setIsFirstNameValid(false);
      console.log("First name is empty");
    } else {
      const isFirstNameValid = validateName(inputFirstName);
      setIsFirstNameValid(isFirstNameValid);
      console.log("First name validation result:", isFirstNameValid);
    }
  };

  const handleLastNameChange = (e: any) => {
    const inputLastName = e.target.value;
    setUpdatedUser((prevState) => ({
      ...prevState,
      lastName: inputLastName,
    }));

    if (inputLastName.trim() === "") {
      setIsLastNameValid(false);
      console.log("Last name is empty");
    } else {
      const isLastNameValid = validateName(inputLastName);
      setIsLastNameValid(isLastNameValid);
      console.log("Last name validation result:", isLastNameValid);
    }
  };

  const handleSubmitEditUser = async (e: FormEvent) => {
    e.preventDefault();

    setIsFormSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(updatedUser.email);
    setIsEmailValid(isEmailValid);

    const nameRegex = /^[A-Za-z\s]+$/;
    const isFirstNameValid = nameRegex.test(updatedUser.firstName);
    const isLastNameValid = nameRegex.test(updatedUser.lastName);

    if (isEmailValid && isFirstNameValid && isLastNameValid) {
      const response = await axios.put(`/api/user/${user?.id}`, updatedUser);

      updateSession(response.data.user);

      toast.success(response.data.msg);

      closeEditForm();
    }
    return;
  };

  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative p-4">
      <div>
        <Toaster />
      </div>
      <GoBack label="Profile" />

      <div className="flex flex-col mt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading font-semibold text-lg">
            Account information
          </h1>

          <button onClick={isOpen} type="button">
            <HiOutlinePencil size={25} className="text-gray-500" />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-start gap-4">
            <div className="flex justify-center items-center border-[1.5px] border-gray-300 rounded-full p-2 relative">
              <TiBusinessCard size={25} className="text-primary" />
            </div>
            <div className="flex flex-col items-start font-heading">
              <h1 className="text-sm">Full Name</h1>
              <p className="text-xs text-gray-500">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="flex justify-center items-center border-[1.5px] border-gray-300 rounded-full p-2 relative">
              <LuMailMinus size={25} className="text-primary" />
              {user?.emailVerified && (
                <BsFillCheckCircleFill
                  size={10}
                  className="absolute text-green-600 bg-white right-0 bottom-0"
                />
              )}
              {!user?.emailVerified && (
                <RiErrorWarningFill
                  size={10}
                  className="absolute text-orange-600 bg-white right-0 bottom-0"
                />
              )}
            </div>
            <div className="flex flex-col items-start font-heading">
              <h1 className="text-sm">Email</h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 ">
            <div className="flex justify-center items-center border-[1.5px] border-gray-300 rounded-full p-2 relative">
              <IoPhonePortraitOutline size={25} className="text-primary" />
              {user?.phoneVerified && (
                <BsFillCheckCircleFill
                  size={10}
                  className="absolute text-green-600 bg-white right-0 bottom-0"
                />
              )}
              {!user?.phoneVerified && (
                <RiErrorWarningFill
                  size={10}
                  className="absolute text-orange-600 bg-white right-0 bottom-0"
                />
              )}
            </div>
            <div className="flex flex-col items-start font-heading">
              <h1 className="text-sm">Phone</h1>

              <p className="text-xs text-gray-500">
                {user?.phone?.trim() === ""
                  ? "Please add a phone number"
                  : user?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="flex justify-center items-center border-[1.5px] border-gray-300 rounded-full p-2">
              <PiUser size={25} className="text-primary" />
            </div>
            <div className="flex flex-col items-start font-heading">
              <h1 className="text-sm">Username</h1>
              <p className="text-xs text-gray-500">
                {user?.username?.trim() == ""
                  ? "Please add a username"
                  : user?.username}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="flex justify-center items-center border-[1.5px] border-gray-300 rounded-full p-2">
              <PiIdentificationCard size={25} className="text-primary" />
            </div>
            <div className="flex flex-col items-start font-heading">
              <h1 className="text-sm">Identity</h1>
              <p className="text-xs text-gray-500">
                {user?.identity?.trim() == ""
                  ? "Please add your identity number"
                  : user?.identity}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEditUserDataVisible && (
          <motion.div
            variants={container}
            initial={{ y: 500 }}
            animate={{
              y: 0,
            }}
            transition={{ duration: 0.3 }}
            exit={"exit"}
            className="min-h-screen pt-6 p-4 bg-white absolute w-full flex flex-col justify-between top-0 left-0 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between ">
              <button onClick={closeEditForm} type="button">
                <IoClose size={25} className="text-gray-500" />
              </button>
              <h1 className="font-bold font-heading text-xl">Edit Account</h1>
              <span></span>
            </div>

            <form
              action=""
              className="flex flex-1 flex-col mt-10 gap-10"
              onSubmit={handleSubmitEditUser}
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="first-name"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  First name *
                </label>
                <div
                  className={`flex items-center flex-1  focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent  bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                    (!isFirstNameValid && isFormSubmitted) ||
                    (updatedUser.firstName.trim() === "" && isFormSubmitted)
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    value={updatedUser.firstName}
                    onChange={handleFirstNameChange}
                    placeholder="Stanley"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none  ring-0 focus:border-0"
                  />
                </div>
                <div className="px-2">
                  {(!isFirstNameValid &&
                    isFormSubmitted &&
                    updatedUser.firstName.trim() !== "") ||
                  (updatedUser.firstName.trim() === "" && isFormSubmitted) ? (
                    <p className="text-red-500 text-sm mt-1">
                      {updatedUser.firstName.trim() === ""
                        ? "First name is required"
                        : "Can't input numbers"}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="last-name"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  Last name *
                </label>
                <div
                  className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                    (!isLastNameValid && isFormSubmitted) ||
                    (updatedUser.lastName.trim() === "" && isFormSubmitted)
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    value={updatedUser.lastName}
                    onChange={handleLastNameChange}
                    placeholder="Hudson"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
                  />
                </div>
                <div className="px-2">
                  {(!isLastNameValid &&
                    isFormSubmitted &&
                    updatedUser.lastName.trim() !== "") ||
                  (updatedUser.lastName.trim() === "" && isFormSubmitted) ? (
                    <p className="text-red-500 text-sm mt-1">
                      {updatedUser.lastName.trim() === ""
                        ? "Last name is required"
                        : "Can't input numbers"}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="email"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  Email * (if you change your email you will need to confirm the
                  new one)
                </label>
                <div
                  className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                    (!isEmailValid && isFormSubmitted) ||
                    (updatedUser.email.trim() === "" && isFormSubmitted)
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    value={updatedUser.email}
                    onChange={handleEmailChange}
                    placeholder="Hudson"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
                  />
                </div>
                <div className="px-2">
                  {(!isEmailValid &&
                    isFormSubmitted &&
                    updatedUser.email.trim() !== "") ||
                  (updatedUser.email.trim() === "" && isFormSubmitted) ? (
                    <p className="text-red-500 text-sm mt-1">
                      {updatedUser.email.trim() === ""
                        ? "Email is required"
                        : "Invalid email format"}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="username"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  Username
                </label>
                <div
                  className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full`}
                >
                  <input
                    type="text"
                    value={updatedUser.username}
                    onChange={(e) => {
                      setUpdatedUser((prevState) => ({
                        ...prevState,
                        username: e.target.value,
                      }));
                    }}
                    placeholder="CoolKabaUsername"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="identity"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  Identity
                </label>
                <div
                  className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full`}
                >
                  <input
                    type="text"
                    value={updatedUser.identity}
                    onChange={(e) => {
                      setUpdatedUser((prevState) => ({
                        ...prevState,
                        identity: e.target.value,
                      }));
                    }}
                    placeholder="42315123"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="phone"
                  className="block text-base font-body font-semibold leading-6 text-gray-900"
                >
                  Phone (if you change your phone you will need to confirm the
                  new one)
                </label>
                <div
                  className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full`}
                >
                  <input
                    type="text"
                    value={updatedUser.phone}
                    onChange={(e) => {
                      setUpdatedUser((prevState) => ({
                        ...prevState,
                        phone: e.target.value,
                      }));
                    }}
                    placeholder="5411232502"
                    className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
                  />
                </div>
              </div>

              <button
                className="w-full bg-primary text-white font-body font-semibold py-1 rounded-full mt-10"
                type="submit"
              >
                Save
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
