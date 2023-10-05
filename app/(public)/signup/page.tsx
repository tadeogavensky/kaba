import Form from "@/components/sign-up/Form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center min-h-screen sm:justify-center">
      <Link href={"/"} className="hidden sm:block">
        <h1 className="font-bold font-heading text-5xl">Kaba</h1>
        <h1 className="font-bold font-heading text-sm float-right">To home</h1>
      </Link>
      <div className="sm:hidden">
        <Image
          src={"/assets/enjoy.jpg"}
          width={400}
          height={300}
          alt="enjoy"
          className="rounded-b-3xl shadow-xl w-screen"
        />
      </div>

      <div className="px-6">
        <div className="flex mt-3 lg:shadow-xl">
          <Image
            src={"/assets/signup.jpg"}
            width={900}
            height={900}
            className="w-[400px] h-[450px] hidden lg:block"
            alt="signup"
          />
          <Form />
        </div>
        <h1 className="text-xs mt-4 font-normal font-heading max-w-sm">
          Unlocking Convenience, One Tap at a Time: Choose Kaba for Effortless
          Living!
        </h1>
      </div>
    </div>
  );
}
