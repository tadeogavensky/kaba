import Form from "@/components/forget-password/Form";
import Prompt from "@/components/forget-password/Prompt";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Recover() {
  return (
    <div className="flex flex-col items-center sm:justify-center sm:min-h-screen mb-20 sm:mt-10">
      <Link href={"/"} className="hidden sm:block">
        <h1 className="font-bold font-heading text-5xl">Kaba</h1>
        <h1 className="font-bold font-heading text-sm float-right">To home</h1>
      </Link>
      <div className="sm:hidden max-xs:hidden">
        <Image
          src={"/assets/forget.jpg"}
          width={400}
          height={300}
          alt="forget"
          className="rounded-b-3xl shadow-xl w-screen"
        />
      </div>

      <div className="px-6">
        <Prompt />

        <h1 className="text-xs mt-4 font-normal font-heading max-w-sm">
          Simplify Your Lifestyle with Kaba: One-Touch Convenience for
          Effortless Living!
        </h1>
      </div>
    </div>
  );
}
