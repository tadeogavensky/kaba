import Image from "next/image";
import React, { FC } from "react";
import ServiceType from "@/types/Service"; // Cambio de nombre aquí
import Link from "next/link";

const ServiceComponent: FC<ServiceType> = ({ image, name }) => {
  return (
    <Link href={"/service/"} className="flex flex-col items-center flex-1 gap-2 ">
      <Image
        src={image}
        width={100}
        height={100}
        className="rounded-full overflow-hidden w-[60px] h-[60px] object-cover"
        alt="service"
      />
      <p className="font-heading text-center font-semibold text-xs">{name}</p>
    </Link>
  );
};

export default ServiceComponent; // Cambio de nombre aquí
