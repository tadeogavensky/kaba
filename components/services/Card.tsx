import Link from "next/link";
import React, { FC } from "react";
import ServiceType from "@/types/Service";
import Image from "next/image";

const Card: FC<ServiceType> = ({ name, image }) => {
  return (
    <Link
      href={`/services/${name.replace(/\s+/g, "-").toLowerCase()}`}
      className="flex flex-col items-center gap-2 "
    >
      <Image
        src={image}
        height={500}
        width={500}
        alt="service"
        className="rounded-2xl sm:w-[300px] sm:h-[300px] md:w-[200px] md:h-[200px] w-[100px] h-[100px] object-cover"
      />
      <p className={`font-body font-semibold text-center text-sm`}>{name}</p>
    </Link>
  );
};

export default Card;
