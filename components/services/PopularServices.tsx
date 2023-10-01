"use client";
import Link from "next/link";
import React, { useState } from "react";
import ServicePill from "./ServicePill";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

const services = [
  {
    name: "All",
  },
  {
    name: "Cleaning",
  },
  {
    name: "Painting",
  },
  {
    name: "Laundry",
  },
  {
    name: "Repairing",
  },
];

const PopularServices = () => {
  const [activeService, setActiveService] = useState("Cleaning");

  const handleClick = (pill: string) => {
    setActiveService(pill);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <p className="font-heading font-bold capitalize">
          Most popular services
        </p>
        <Link
          href={"/popular-services"}
          className="font-heading font-semibold text-sm text-primary hover:text-blue-400 transition"
        >
          See all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-center gap-3 mt-4">
          {services.map((service, index) => (
            <ServicePill
              key={index}
              name={service.name}
              handleClick={() => handleClick(service.name)}
              active={activeService === service.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularServices;
