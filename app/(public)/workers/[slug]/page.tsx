import { GoBack } from "@/components/GoBack";
import BookButton from "@/components/worker/BookButton";
import Worker from "@/types/Worker";
import calculateAverageRating from "@/utils/avgRating";
import Image from "next/image";
import React from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import ReviewsButton from "@/components/worker/ReviewsButton";
import  User  from "@/types/User";

import avatar from "/public/assets/avatar.jpg";


const worker: User = {
  email: "worker@example.com",
  firstName: "Jenny",
  lastName: "Flemming",
  phone: "123-456-7890",
  worker: {
    street: "123 Main Street",
    country: "Countryville",
    city: "Cityville",
    number:"4624",
    postalCode: "12345",
    neighbourhood:"Palermo",
    state: "Stateville",
    service: {
      name: "Home Cleaning",
      description: "",
      image: "/assets/worker.jpg",
      category: {
        name: "Cleaning",
      },
    },
    rate: { rate: 10 },

    totalJobs: 25,
    about:
      "I am a professional home cleaner with over 5 years of experience. I take pride in providing top-notch cleaning services to ensure your home is spotless and refreshed. Customer satisfaction is my priority, and I am dedicated to delivering the best service possible.",
  },
  profilePicture: "/assets/worker.jpg",

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
};

const avgRating = calculateAverageRating(worker.reviews);

export default function Worker() {
  return (
    <div className="min-h-screen mb-10">
      <div className="relative">
        <Image
          src={worker.profilePicture || avatar}
          alt="profilePicture"
          width={500}
          height={500}
          className="rounded-b-3xl shadow-xl"
        />
        <div className="absolute top-0 m-6 ">
          <GoBack label={"Workers"} />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-start gap-4 mt-2">
        <h1 className="text-2xl font-bold font-body">{worker.worker?.service.name}</h1>
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
        <div className="flex items-center gap-4">
          <span className="px-3 py-2 bg-blue-100 text-blue-500 font-bold text-xs rounded-2xl">
            {worker.worker?.service.category.name}
          </span>
          <span className="font-body flex items-center gap-1">
            <TiLocation size={20} className="text-primary" />
            <p>{worker?.worker?.street},</p>
            <p>{worker.worker?.city}</p>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-primary text-xl">
            ${worker.worker?.rate.rate}
            <span className="text-gray-400 font-normal">/hr</span>
          </h1>
          <BookButton />
        </div>

        <Border />

        <div className="flex flex-col justify-start gap-2">
          <h1 className="font-bold text-base font-heading">About me</h1>

          <p>{worker.worker?.about}</p>
        </div>

        <div className="flex flex-col justify-start gap-2">
          <h1 className="font-heading text-base font-bold">
            Reviews of{" "}
            <span>
              {worker.firstName} {worker.lastName}
            </span>
          </h1>

          <ReviewsButton>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-start gap-3">
                <h1 className="font-bold text-primary text-3xl">{avgRating}</h1>
                <div className="flex flex-col">
                  <StarRating rating={avgRating} />
                  <p className="font-light">{worker.reviews?.length} reviews</p>
                </div>
              </div>
              <IoIosArrowForward size={25} />
            </div>
          </ReviewsButton>
        </div>
      </div>
    </div>
  );
}

const Border = () => {
  return <span className="border-2 border-b-gray-100 mt-3"></span>;
};

const StarRating = ({ rating }: { rating: number }) => {
  const MAX_STARS = 5;
  const roundedRating = Math.round(rating);

  const stars = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    if (i <= roundedRating) {
      stars.push(<BsStarFill key={i} size={15} className="text-primary" />);
    } else if (i === roundedRating + 0.5) {
      stars.push(<BsStarHalf key={i} size={15} className="text-primary" />);
    } else {
      stars.push(<BsStar key={i} size={15} className="text-primary" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};
