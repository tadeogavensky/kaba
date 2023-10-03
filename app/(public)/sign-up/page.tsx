import Form from "@/components/sign-up/Form";
import Image from "next/image";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center sm:min-h-screen">
      <div className="sm:hidden">
        <Image
          src={"/assets/enjoy.jpg"}
          width={400}
          height={300}
          alt="enjoy"
          className="rounded-b-3xl shadow-xl "
        />
      </div>

      <div className="px-6">
        <Form />
        <h1 className="text-xs mt-4 font-normal font-heading max-w-sm">
          Unlocking Convenience, One Tap at a Time: Choose Kaba for Effortless
          Living!
        </h1>
      </div>
    </div>
  );
}
