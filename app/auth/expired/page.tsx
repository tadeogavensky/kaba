import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineToken } from "react-icons/md";
const Expired = () => {
  return (
    <div className="p-6 flex flex-col min-h-screen justify-center items-center gap-2">
      <div className="flex flex-col items-center justify-between gap-4">
        <h1 className="font-heading text-6xl font-bold text-center">
          Your Token Has Expired
        </h1>
      </div>

      <p className="font-body text-3xl text-center font-semibold">
        Please go back to your{" "}
        <Link href={"/auth/account"} className="text-underline text-purple-500">
          profile
        </Link>{" "}
        and re-send a verification mail
      </p>
    </div>
  );
};

export default Expired;
