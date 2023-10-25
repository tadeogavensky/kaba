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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<ServiceType[]>(
    []
  );
  const [serviceCategoryLength, setServiceCategoryLength] = useState(0);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => {
      const categoriesWithAll = [{ name: "all" }, ...res.data];
      setCategories(categoriesWithAll);
      setIsLoadingCategories(false); // Loading for categories is complete
    });
  };

  const fetchServicesByCategories = (category: string) => {
    axios.get(`/api/services/${category}`).then((res) => {
      setServicesByCategory(res.data);
      setServiceCategoryLength(res.data.length);
      setIsLoadingServices(false); // Loading for services is complete
    });
  };

  const handleClick = async (pill: string) => {
    setSelectedCategory(pill);
    setIsLoadingServices(true); // Start loading for services

    await fetchServicesByCategories(pill);
  };

  useEffect(() => {
    fetchCategories();

    handleClick(selectedCategory);
    const timer = setTimeout(() => {
      setIsLoadingCategories(false); // Loading for categories is complete
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
          {isLoadingCategories
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <LoadingSkeleton className="w-[80px] h-[30px] rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
                </div>
              ))
            : categories.map((category, index) => (
                <div key={index}>
                  <Pill
                    key={index}
                    name={category.name}
                    handleClick={() => handleClick(category?.name || "")}
                    active={selectedCategory === category.name}
                  />
                </div>
              ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex flex-wrap justify-center gap-4 mt-4 sm:mt-10">
        {isLoadingServices
          ? Array.from({ length: serviceCategoryLength }).map((_, index) => (
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
