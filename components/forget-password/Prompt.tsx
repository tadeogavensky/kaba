"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";

const Prompt = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (e: any) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail.trim() !== "") {
      const isEmailValid = validateEmail(inputEmail);
      setIsEmailValid(isEmailValid);
    } else {
      setIsEmailValid(true);
    }
  };

  const handlePromptForgetPassword = async (e: FormEvent) => {
    e.preventDefault();

    setIsFormSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      try {
        const response = await axios.post("/api/user/recover", { email, role });

        toast(response.data, {
          icon: "ℹ️",
        });
      } catch (error) {}
    }
    return;
  };
  return (
    <form
      onSubmit={handlePromptForgetPassword}
      className="flex flex-1 min-h-full flex-col justify-start sm:max-w-sm lg:bg-white lg:shadow-xl lg:rounded-md lg:p-8"
    >
      <div>
        <Toaster />
      </div>

      <div className="flex gap-3 justify-between items-center flex-1 mt-8">
        <label className="font-bold font-body" htmlFor="">
          Account type
        </label>
        <div className="flex items-center">
          <button
            type="button"
            className={`${
              role === "client"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-l-xl px-3 py-1 font-body font-bold transition  w-full`}
            onClick={() => setRole("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={`${
              role === "worker"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-r-xl px-3 py-1 font-body font-bold transition duration-300`}
            onClick={() => setRole("worker")}
          >
            Worker
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-base font-body font-semibold leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <div
            className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
              (!isEmailValid && isFormSubmitted) ||
              (email.trim() === "" && isFormSubmitted)
                ? "ring-2 ring-red-500"
                : ""
            }`}
          >
            <MdAlternateEmail size={20} />
            <input
              placeholder="felipe@kaba.com"
              className="font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full shadow-none border-none outline-none focus:ring-0 ring-0  border-0 focus:border-0"
              onChange={handleEmailChange}
            />
          </div>
          {(!isEmailValid && isFormSubmitted && email.trim() !== "") ||
          (email.trim() === "" && isFormSubmitted) ? (
            <p className="text-red-500 text-sm mt-1">
              {email.trim() === ""
                ? "Email is required"
                : "Invalid email format"}
            </p>
          ) : null}
        </div>
      </div>

      <button
        className="bg-primary hover:bg-blue-800 transition text-white rounded-md font-body font-semibold mt-4 py-2"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default Prompt;
