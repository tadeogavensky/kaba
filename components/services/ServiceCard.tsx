import Link from "next/link";
import React, { FC } from "react";
import ServiceType from "@/types/Service";
import Image from "next/image";

const ServiceCard: FC<ServiceType> = ({ name, image }) => {
  return (
    <Link
      href={`/services/${name.replace(/\s+/g, "-")}`}
      className="flex flex-col items-center gap-2"
    >
      <Image
        src={image}
        height={200}
        width={200}
        alt="service"
        className="rounded-2xl w-[100px] h-[100px] object-cover"
      />
      <p
        className={`font-heading font-semibold text-center text-sm capitalize`}
      >
        {name}
      </p>
    </Link>
  );
};

export default ServiceCard;
