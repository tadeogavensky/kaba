"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Category from "./Category";
import LoadingSkeleton from "../LoadingSkeleton";

const services = [
  {
    name: "cleaning",
    image: "/assets/categories/broom.jpg",
  },
  {
    name: "painting",
    image: "/assets/categories/paint-brush.jpg",
  },
  {
    name: "laundry",
    image: "/assets/categories/laundry.jpg",
  },
  {
    name: "repairing",
    image: "/assets/categories/tools.jpg",
  },
];

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col mt-6 gap-6">
      <div className="flex justify-between">
        <p className="font-heading font-bold sm:text-lg">Services</p>
        <Link
          href={"/services"}
          className="font-heading font-semibold text-sm text-primary hover:text-blue-400 transition"
        >
          See all
        </Link>
      </div>
      <ul className="flex items-baseline justify-evenly gap-6 ">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <LoadingSkeleton className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
              </div>
            ))
          : services.map((service, index) => (
              <div key={index}>
                <Category image={service.image} name={service.name} />
              </div>
            ))}
      </ul>
    </section>
  );
};

export default Services;
