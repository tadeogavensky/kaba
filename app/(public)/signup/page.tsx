import Form from "@/components/sign-up/Form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center  sm:justify-center mb-20">
      <Link href={"/"} className="hidden sm:block">
        <h1 className="font-bold font-heading text-5xl">Kaba</h1>
        <h1 className="font-bold font-heading text-sm float-right">To home</h1>
      </Link>
      <div className="sm:hidden max-xs:hidden">
        <Image
          src={"/assets/enjoy.jpg"}
          width={400}
          height={300}
          alt="enjoy"
          className="rounded-b-3xl shadow-xl w-screen"
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
