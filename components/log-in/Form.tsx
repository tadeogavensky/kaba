"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
const LoginForm = () => {
  const [userType, setUserType] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const router = useRouter();
  const { login } = useAuthContext();

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

  const handlePasswordChange = (e: any) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.trim() !== "") {
      setIsPasswordValid(true);
      setIsPasswordTouched(true); // Mark password field as touched
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsFormSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);

    if (isEmailValid && password.trim() !== "") {
      console.log("Form sent");

      try {
        const response = await axios.post(`/api/${userType}/login`, {
          email,
          password,
        });

        if (!response) {
          return console.log("Error");
        }

        const tokens = response.data();
        login(tokens);

        return router.push("/");
      } catch (error) {
        // Handle login failure, e.g., display an error message
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 min-h-full flex-col justify-center sm:max-w-sm"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-3 justify-between items-center flex-1 mt-8">
        <label className="font-bold font-body" htmlFor="">
          Who are you?
        </label>
        <div className="flex items-center">
          <button
            type="button"
            className={`${
              userType === "client"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-l-xl px-3 py-1 font-body font-bold transition w-full`}
            onClick={() => setUserType("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={`${
              userType === "worker"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-r-xl px-3 py-1 font-body font-bold transition duration-300`}
            onClick={() => setUserType("worker")}
          >
            Worker
          </button>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full">
        <div>
          <label
            htmlFor="email"
            className="block text-base font-body font-semibold leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="flex flex-col mt-2 ">
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
                (password.trim() === "" && isFormSubmitted)
                  ? "ring-2 ring-red-500"
                  : ""
              }`}
            >
              <AiOutlineLock size={20} />
              <input
                placeholder="password"
                type="password"
                className={`font-heading bg-transparent placeholder:text-sm placeholder:font-bold w-full ${
                  (!isPasswordValid && isFormSubmitted) ||
                  (password.trim() === "" &&
                    (isFormSubmitted || isPasswordTouched))
                    ? "text-red-500"
                    : ""
                }`}
                onChange={handlePasswordChange}
              />
            </div>
            {(!isPasswordValid && (isFormSubmitted || isPasswordTouched)) ||
            (password.trim() === "" && isFormSubmitted) ? (
              <p className="text-red-500 text-sm mt-1">
                {password.trim() === ""
                  ? "Password is required"
                  : "Password is required"}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <button
        className="bg-primary hover:bg-blue-800 transition text-white rounded-md font-body font-semibold mt-4 py-2"
        type="submit"
      >
        Log In
      </button>
      <div className="flex items-center justify-between mt-3">
        <p className="font-bold">Not a member yet?</p>
        <Link href={"/signup"} className="text-blue-600">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
