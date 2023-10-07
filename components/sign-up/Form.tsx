"use client";
import React, { useState } from "react";
import axios from "axios";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { PiIdentificationBadgeBold } from "react-icons/pi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "../GoogleSignInButton";

const Form = () => {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const router = useRouter();

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const validatePassword = (inputPassword: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(inputPassword);
  };

  const validateFirstName = (inputFirstName: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(inputFirstName);
  };

  const validateLastName = (inputLastName: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(inputLastName);
  };

  const handlePasswordShow = () => {
    setHidePassword(!hidePassword);
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

  const handleFirstNameChange = (e: any) => {
    const inputFirstName = e.target.value;
    setFirstName(inputFirstName);

    if (inputFirstName.trim() === "") {
      setIsFirstNameValid(false);
    } else {
      const isFirstNameValid = validateFirstName(inputFirstName);
      setIsFirstNameValid(isFirstNameValid);
    }
  };

  const handleLastNameChange = (e: any) => {
    const inputLastName = e.target.value;
    setLastName(inputLastName);

    if (inputLastName.trim() === "") {
      setIsLastNameValid(false);
    } else {
      const isLastNameValid = validateLastName(inputLastName);
      setIsLastNameValid(isLastNameValid);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsFormSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isPasswordValid = passwordRegex.test(password);
    setIsPasswordValid(isPasswordValid);

    const nameRegex = /^[A-Za-z\s]+$/;
    const isFirstNameValid = nameRegex.test(firstName);
    const isLastNameValid = nameRegex.test(lastName);

    if (
      isEmailValid &&
      isPasswordValid &&
      isFirstNameValid &&
      isLastNameValid
    ) {
      try {
        axios.post(`/api/signup`, {
          email,
          password,
          firstName,
          lastName,
          role,
        });

        toast.success("Account created successfully");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 min-h-full flex-col justify-center sm:max-w-sm lg:bg-white lg:shadow-xl lg:rounded-md lg:p-8"
    >
      <div>
        <Toaster />
      </div>
      <div className="flex gap-3 justify-between items-center flex-1 mt-8">
        <label className="font-bold font-body" htmlFor="">
          Who are you?
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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-base font-body font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <div
                className={`flex items-center flex-1 bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                  (!isFirstNameValid && isFormSubmitted) ||
                  (firstName.trim() === "" && isFormSubmitted)
                    ? "ring-2 ring-red-500"
                    : ""
                }`}
              >
                <PiIdentificationBadgeBold size={20} />
                <input
                  type="text"
                  placeholder="Stanley"
                  className="font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full"
                  onChange={handleFirstNameChange}
                />
              </div>
              {(!isFirstNameValid &&
                isFormSubmitted &&
                firstName.trim() !== "") ||
              (firstName.trim() === "" && isFormSubmitted) ? (
                <p className="text-red-500 text-sm mt-1">
                  {firstName.trim() === ""
                    ? "First name is required"
                    : "Can't input numbers"}
                </p>
              ) : null}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-base font-body font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <div
                className={`flex items-center flex-1 bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                  (!isLastNameValid && isFormSubmitted) ||
                  (lastName.trim() === "" && isFormSubmitted)
                    ? "ring-2 ring-red-500"
                    : ""
                }`}
              >
                <PiIdentificationBadgeBold size={20} />
                <input
                  type="text"
                  placeholder="Hudson"
                  className="font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full"
                  onChange={handleLastNameChange}
                />
              </div>
              {(!isLastNameValid &&
                isFormSubmitted &&
                lastName.trim() !== "") ||
              (lastName.trim() === "" && isFormSubmitted) ? (
                <p className="text-red-500 text-sm mt-1">
                  {lastName.trim() === ""
                    ? "Last name is required"
                    : "Can't input numbers"}
                </p>
              ) : null}
            </div>
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
              className={`flex items-center flex-1 bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
                (!isEmailValid && isFormSubmitted) ||
                (email.trim() === "" && isFormSubmitted)
                  ? "ring-2 ring-red-500"
                  : ""
              }`}
            >
              <MdAlternateEmail size={20} />
              <input
                placeholder="felipe@kaba.com"
                className="font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full"
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
              className={`flex items-center flex-1 bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
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
                className={`font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full ${
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
        Sign Up
      </button>

      {/*   <div className="flex items-center justify-center mt-5">
        <div className="border-t-2 border-gray-300 w-1/4"></div>
        <span className="mx-4 text-gray-600">or</span>
        <div className="border-t-2 border-gray-300 w-1/4"></div>
      </div>

      <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}

      <div className="flex items-center justify-between mt-3">
        <p className="font-bold">Already have an account?</p>{" "}
        <Link href={"/auth/signin"} className="text-blue-600">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default Form;
