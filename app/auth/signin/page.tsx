import Header from "@/components/header/Header";
import Form from "@/components/sign-in/Form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center sm:justify-center mb-20">
      <Link href={"/"} className="hidden sm:block">
        <h1 className="font-bold font-heading text-5xl">Kaba</h1>
        <h1 className="font-bold font-heading text-sm float-right">To home</h1>
      </Link>

      <div className="sm:hidden max-xs:hidden">
        <Image
          src={"/assets/happy.jpg"}
          width={400}
          height={200}
          alt="enjoy"
          className="rounded-b-3xl shadow-xl w-screen "
        />
      </div>

      <div className="px-6">
        <Form />
        <h1 className="text-xs mt-4 font-normal font-heading max-w-sm">
          Unlocking a World of Possibilities with Kaba: Where Convenience Meets
          Innovation!
        </h1>
      </div>
    </div>
  );
}
