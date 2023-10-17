"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import axios from "axios";
import CategoryType from "@/types/Category";
import Category from "./Category";

const Services = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const response = axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });

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
          : categories.map((category, index) => (
              <div key={index}>
                <Category
                  image={category.image}
                  name={category.name}
                  id={category.name}
                />
              </div>
            ))}
      </ul>
    </section>
  );
};

export default Services;
