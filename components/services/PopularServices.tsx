"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pill from "./Pill";
import ServiceCard from "./ServiceCard";
import LoadingSkeleton from "../LoadingSkeleton";

const servicesCategory = [
  {
    name: "all",
  },
  {
    name: "cleaning",
    services: [
      {
        name: "house cleaning",
        image: "/assets/services/house-cleaning.jpg",
      },
      {
        name: "car wash",
        image: "/assets/services/car-wash.jpg",
      },
      {
        name: "carpet cleaning",
        image: "/assets/services/carpet-cleaning.jpg",
      },
    ],
  },
  {
    name: "painting",
    services: [
      {
        name: "house painting",
        image: "/assets/services/house-painting.jpg",
      },
      {
        name: "furniture painting",
        image: "/assets/services/furniture-painting.jpg",
      },
    ],
  },
  {
    name: "laundry",
    services: [
      {
        name: "dry cleaning",
        image: "/assets/services/dry-cleaning.jpg",
      },
    ],
  },
  {
    name: "repairing",
    services: [
      {
        name: "electrical repair",
        image: "/assets/services/electrical-repair.jpg",
      },
      {
        name: "ac installations",
        image: "/assets/services/ac-installation.jpg",
      },
      {
        name: "plumbing repair",
        image: "/assets/services/plumbing-repair.jpg",
      },
      {
        name: "car repair",
        image: "/assets/services/car-repair.jpg",
      },
    ],
  },
];

const PopularServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (pill: string) => {
    setSelectedCategory(pill);
    setIsLoading(true)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

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
        <div className="flex items-center gap-3 mt-6">
          {servicesCategory.map((category, index) => (
            <Pill
              key={index}
              name={category.name}
              handleClick={() => handleClick(category.name)}
              active={selectedCategory === category.name}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 grid-flow-row gap-4 mt-4">
        {isLoading
          ? // Render loading skeletons when data is loading
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index}>
                <LoadingSkeleton className="w-[100px] h-[100px] rounded-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
              </div>
            ))
          : // Render service cards when data is available
            servicesCategory
              .filter((category) => {
                if (selectedCategory === "all") {
                  return true;
                } else {
                  return category.name === selectedCategory;
                }
              })
              .map((category) =>
                category.services?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    name={service.name}
                    image={service.image}
                  />
                ))
              )}
      </div>
    </div>
  );
};



export default PopularServices;
