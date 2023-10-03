"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pill from "./Pill";
import Card from "./Card";
import LoadingSkeleton from "../LoadingSkeleton";

const servicesCategory = [
  {
    name: "All",
  },
  {
    name: "Cleaning",
    services: [
      {
        name: "House Cleaning",
        image: "/assets/services/house-cleaning.jpg",
      },
      {
        name: "Car Wash",
        image: "/assets/services/car-wash.jpg",
      },
      {
        name: "Carpet Cleaning",
        image: "/assets/services/carpet-cleaning.jpg",
      },
    ],
  },
  {
    name: "Painting",
    services: [
      {
        name: "House Painting",
        image: "/assets/services/house-painting.jpg",
      },
      {
        name: "Furniture Painting",
        image: "/assets/services/furniture-painting.jpg",
      },
    ],
  },
  {
    name: "Laundry",
    services: [
      {
        name: "Dry Cleaning",
        image: "/assets/services/dry-cleaning.jpg",
      },
    ],
  },
  {
    name: "Repairing",
    services: [
      {
        name: "Electrical Repair",
        image: "/assets/services/electrical-repair.jpg",
      },
      {
        name: "AC Installation",
        image: "/assets/services/ac-installation.jpg",
      },
      {
        name: "Plumbing Repair",
        image: "/assets/services/plumbing-repair.jpg",
      },
      {
        name: "Car Repair",
        image: "/assets/services/car-repair.jpg",
      },
    ],
  },
];

const PopularServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (pill: string) => {
    setSelectedCategory(pill);
    setIsLoading(true);
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
        <p className="font-heading font-bold capitalize sm:text-lg">
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
        <div className="flex items-center sm:justify-between gap-3 mt-6">
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

      <div className="grid grid-cols-3 sm:flex flex-wrap justify-center gap-4 mt-4 sm:mt-10">
        {isLoading
          ? Array.from({
              length: servicesCategory
                .filter((category) => {
                  if (selectedCategory === "All") {
                    return true;
                  } else {
                    return category.name === selectedCategory;
                  }
                })
                .flatMap((category) => category.services || []).length,
            }).map((_, index) => (
              <div key={index} className="">
                <LoadingSkeleton className="sm:w-[300px] sm:h-[300px]  md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
              </div>
            ))
          : servicesCategory
              .filter((category) => {
                if (selectedCategory === "All") {
                  return true;
                } else {
                  return category.name === selectedCategory;
                }
              })
              .flatMap((category) => category.services || [])
              .map((service, index) => (
                <Card key={index} name={service.name} image={service.image} />
              ))}
      </div>
    </div>
  );
};

export default PopularServices;
