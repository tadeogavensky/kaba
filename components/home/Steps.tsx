import Link from "next/link";
import React from "react";

const Steps = () => {
  return (
    <div className="flex flex-col">
      <p className="font-heading text-lg">How Kaba works?</p>
      <h1 className="font-body font-bold text-3xl uppercase">Is this easy.</h1>

      <div className="flex flex-wrap sm:flex-col lg:flex-row lg:flex-nowrap items-start gap-12 mt-10">
        <div className="flex flex-col relative">
          <span className="absolute -top-20 -left-10 -z-10 text-[10rem] text-primary font-body font-bold">
            1
          </span>
          <h3 className="font-body font-bold text-xl">Sign Up as a Client</h3>
          <p>
            Go to our{" "}
            <Link href={"/signup"} className="font-bold text-blue-700">
              Sign Up
            </Link>{" "}
            page and register as a client. Fill up the form, and follow the
            steps to activate your account to book a KabaProp.
          </p>
        </div>
        <div className="flex flex-col relative max-w-sm">
          <span className="absolute -top-20 -left-10 -z-10 text-[10rem] text-primary font-body font-bold">
            2
          </span>
          <h3 className="font-body font-bold text-xl">
            Look for the service you need
          </h3>
          <p className="">
            We provide the services, our KabaProps provides the work. This is a
            free market, where everyone, even you can register and start working
            as a House Cleaner, Electrician, Carpet Cleaner or a Plumber.
          </p>
        </div>
        <div className="flex flex-col relative">
          <span className="absolute -top-20 -left-10 -z-10 text-[10rem] text-primary font-body font-bold">
            3
          </span>
          <h3 className="font-body font-bold text-xl">Book a KabaProp</h3>
          <p>
            Select any Worker you like and that fit best your interest and book
            a job with him/her. Select the date, working hours, starting hour,
            address and thats it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
