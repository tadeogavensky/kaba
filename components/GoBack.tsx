"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { IoArrowBack } from "react-icons/io5";
interface GoBackProps {
  className: string;
}

export const GoBack: FC<GoBackProps> = ({ className }) => {
  const router = useRouter();


  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={className}
    >
      <IoArrowBack size={30} />
    </button>
  );
};
