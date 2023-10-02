import { GoBack } from "@/components/GoBack";
import BookButton from "@/components/worker/BookButton";
import Worker from "@/types/Worker";
import calculateAverageRating from "@/utils/avgRating";
import Image from "next/image";
import React from "react";
import { BsStarHalf } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";

const worker: Worker = {
  id: 1,
  email: "worker@example.com",
  password: "securepassword",
  firstName: "Jenny",
  lastName: "Flemming",
  street: "123 Main Street",
  city: "Cityville",
  state: "Stateville",
  postalCode: "12345",
  country: "Countryville",
  phone: "123-456-7890",
  about:
    "I am a professional home cleaner with over 5 years of experience. I take pride in providing top-notch cleaning services to ensure your home is spotless and refreshed. Customer satisfaction is my priority, and I am dedicated to delivering the best service possible.",
  profilePicture: "/assets/worker.jpg",
  service: {
    name: "Home Cleaning",
    description: "",
    image: "/assets/worker.jpg",
  },
  rate: { rate: 10 },
  reviews: [
    {
      rating: 5,
      comment: "Excellent service. Very professional.",
      date: new Date("2023-10-01"),
    },
    {
      rating: 4,
      comment: "Good work, but a little late.",
      date: new Date("2023-09-25"),
    },
    {
      rating: 5,
      comment: "Incredible! Will definitely hire again.",
      date: new Date("2023-09-20"),
    },
    {
      rating: 2,
      comment: "Not satisfied with the quality of work.",
      date: new Date("2023-09-15"),
    },
    {
      rating: 3,
      comment: "Average service, could be better.",
      date: new Date("2023-09-10"),
    },
    {
      rating: 1,
      comment: "Terrible experience. Would not recommend.",
      date: new Date("2023-09-05"),
    },
  ],
  totalJobs: 23,
  category: {
    id: 1,
    name: "Cleaning",
    image: "",
  },
};

const avgRating = calculateAverageRating(worker.reviews);

export default function Worker() {
  return (
    <div className="pb-10">
      <div className="relative">
        <Image
          src={worker.profilePicture}
          alt="profilePicture"
          width={500}
          height={500}
          className="rounded-b-3xl shadow-xl"
        />
        <div className="absolute top-0 m-6 ">
          <GoBack className="text-white hover:text-neutral-300 transition" />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-start gap-4 mt-2">
        <h1 className="text-2xl font-bold font-body">{worker.service.name}</h1>
        <div className="flex items-center gap-4">
          <p className="font-heading font-semibold text-lg text-primary">
            {worker.firstName} {worker.lastName}
          </p>

          <div className="flex items-center gap-2 font-base">
            <BsStarHalf size={15} className="text-amber-400" />
            {avgRating}
            <span>|</span>

            <p>
              {worker.reviews.length} <span className="text-xs">reviews</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="px-3 py-2 bg-blue-100 text-blue-500 font-bold text-xs rounded-2xl">
            {worker.category.name}
          </span>
          <span className="font-body flex items-center gap-1">
            <TiLocation size={20} className="text-primary" />
            <p>{worker.state},</p>
            <p>{worker.city}</p>
          </span>
        </div>
        <h1 className="font-semibold text-primary text-xl">
          ${worker.rate.rate}
          <span className="text-gray-400 font-normal">/hr</span>
        </h1>

        <span className="border-2 border-b-gray-100 mt-3"></span>

        <h1 className="font-bold text-sm">About me</h1>

        <p>{worker.about}</p>

        <div className="flex justify-end">
          <BookButton />
        </div>
      </div>
    </div>
  );
}
