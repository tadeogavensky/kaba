"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { IoArrowBack } from "react-icons/io5";
interface GoBackProps {
  label: string;
}

export const GoBack: FC<GoBackProps> = ({ label }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={
        "flex items-center gap-2 group hover:text-neutral-600 transition cursor-pointer"
      }
    >
      <IoArrowBack size={30} />
      <p className="font-bold font-body text-2xl">{label}</p>
    </button>
  );
};
