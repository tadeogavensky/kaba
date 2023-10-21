"use client";
import React, { useState } from "react";
import axios from "axios";
import { AiOutlineLock } from "react-icons/ai";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { PiIdentificationBadgeBold } from "react-icons/pi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Form = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const router = useRouter();

  const validatePassword = (inputPassword: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(inputPassword);
  };

  const handlePasswordShow = () => {
    setHidePassword(!hidePassword);
  };

  const handlePasswordChange = (e: any) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.trim() === "") {
      setIsPasswordValid(false);
    } else {
      const isPasswordValid = validatePassword(inputPassword);
      setIsPasswordValid(isPasswordValid);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsFormSubmitted(true);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isPasswordValid = passwordRegex.test(password);
    setIsPasswordValid(isPasswordValid);

    if (isPasswordValid) {
      try {
        const response = await axios.put(`/api/user/recover`, {
          password,
          token,
        });


        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        toast.success(response.data);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {}
    }
    return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 min-h-full flex-col justify-center sm:max-w-sm lg:bg-white lg:shadow-xl lg:rounded-md lg:p-8"
    >
      <div>
        <Toaster />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full">
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-base font-semibold leading-6 font-body text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <div
              className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                (!isPasswordValid && isFormSubmitted) ||
                (password.trim() === "" && isFormSubmitted) // Display message if password is empty
                  ? "ring-2 ring-red-500"
                  : ""
              }`}
            >
              <AiOutlineLock size={20} />
              <input
                placeholder="password"
                type={hidePassword ? "text" : "password"}
                className={`font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full shadow-none border-none outline-none focus:ring-0 ring-0  border-0 focus:border-0${
                  (!isPasswordValid && isFormSubmitted) ||
                  (password.trim() === "" && isFormSubmitted) // Display message if password is empty
                    ? "text-red-500"
                    : ""
                }`}
                onChange={handlePasswordChange}
              />

              <button
                type="button"
                onClick={() => {
                  handlePasswordShow();
                }}
              >
                {hidePassword ? (
                  <BiSolidShow size={20} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </button>
            </div>
            {(!isPasswordValid && isFormSubmitted) ||
            (password.trim() === "" && isFormSubmitted) ? ( // Display password validation message
              <p className="text-red-500 text-sm mt-1">
                {password.trim() === ""
                  ? "Password is required"
                  : "Password must be at least 8 characters long, have one uppercase letter and one number"}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <button
        className="bg-primary hover:bg-blue-800 transition text-white rounded-md font-body font-semibold mt-4 py-2"
        type="submit"
      >
        Change password
      </button>
    </form>
  );
};

export default Form;
