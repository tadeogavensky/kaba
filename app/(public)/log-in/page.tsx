import Form from "@/components/log-in/Form";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center sm:min-h-screen">
      <div className="sm:hidden">
        <Image
          src={"/assets/happy.jpg"}
          width={400}
          height={200}
          alt="enjoy"
          className="rounded-b-3xl shadow-xl "
        />
      </div>

      <div className="px-6">
        <Form />
        <h1 className="text-xs mt-4 font-normal font-heading max-w-sm">
        Unlocking a World of Possibilities with Kaba: Where Convenience Meets Innovation!
        </h1>
      </div>
    </div>
  );
}
