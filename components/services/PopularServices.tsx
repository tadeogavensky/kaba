"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pill from "./Pill";
import Card from "./Card";
import LoadingSkeleton from "../LoadingSkeleton";

import CategoryType from "@/types/Category";
import ServiceType from "@/types/Service";
import axios from "axios";

const PopularServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("cleaning");

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<ServiceType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const fetchServicesByCategories = (category: string) => {
    axios.get(`/api/services/${category}`).then((res) => {
      setServicesByCategory(res.data);
    });
  };

  const handleClick = async (pill: string) => {
    setSelectedCategory(pill);
    setIsLoading(true);

    await fetchServicesByCategories(pill);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    handleClick(selectedCategory);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
          {categories.map((category, index) => (
            <Pill
              key={index}
              name={category.name}
              handleClick={() => handleClick(category?.name || "")}
              active={selectedCategory === category.name}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex flex-wrap justify-center gap-4 mt-4 sm:mt-10">
        {isLoading
          ? servicesByCategory.map((service, index) => (
              <div key={index} className="">
                <LoadingSkeleton className="sm:w-[300px] sm:h-[300px] md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
              </div>
            ))
          : servicesByCategory.map((service, index) => (
              <Card key={index} name={service.name} image={service.image} />
            ))}
      </div>
    </div>
  );
};

export default PopularServices;
