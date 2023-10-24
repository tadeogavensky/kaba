import Image from "next/image";
import React, { FC } from "react";
import CategoryType from "@/types/Category";
import Link from "next/link";

const Category: FC<CategoryType> = ({ image, name }) => {
  return (
    <Link
      href={`/service/${name}`}
      className="flex flex-col items-center flex-1 gap-2 "
    >
      <Image
        src={image || ""}
        width={100}
        height={100}
        className="rounded-full overflow-hidden w-[60px] shadow-lg h-[60px] object-cover"
        alt="service"
      />
      <p className="font-heading text-center font-semibold text-xs capitalize">
        {name}
      </p>
    </Link>
  );
};


export default Category;
