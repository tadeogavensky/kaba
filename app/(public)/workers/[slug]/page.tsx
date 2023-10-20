import { GoBack } from "@/components/GoBack";
import BookButton from "@/components/worker/BookButton";
import Worker from "@/types/Worker";
import calculateAverageRating from "@/utils/avgRating";
import Image from "next/image";
import React, { useState } from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import ReviewsButton from "@/components/worker/ReviewsButton";

import avatar from "/public/assets/avatar.jpg";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

export default async function Worker({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const worker = await getWorker(slug);

  const avgRating = calculateAverageRating(worker.user.reviews);
  return (
    <div className="min-h-full relative mb-10 flex flex-col sm:justify-center sm:items-center sm:flex-row sm:min-h-screen">
      <div className="relative">
        <Image
          src={worker.user.profilePicture || avatar}
          alt="profilePicture"
          width={500}
          height={500}
          className="rounded-b-3xl shadow-xl sm:rounded-3xl"
        />
        <div className="absolute top-0  m-6 ">
          <GoBack label={"Workers"} />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-start  gap-4 mt-2 sm:m-0 sm:px-6 py-2">
        <h1 className="text-2xl font-bold font-body capitalize">
          {worker?.service?.name}
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-heading font-semibold text-lg text-primary">
            {worker.user.firstName} {worker.user.lastName}
          </p>

          <div className="flex items-center gap-2 font-base">
            <BsStarHalf size={15} className="text-amber-400" />
            {avgRating}
            <span>|</span>

            <p>
              {worker.user.reviews.length}{" "}
              <span className="text-xs">reviews</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-2 bg-blue-100 text-blue-500 font-bold text-xs rounded-2xl capitalize">
            {worker?.service?.category.name}
          </span>
          {worker?.street && (
            <span className="font-body flex items-center gap-1">
              <TiLocation size={25} className="text-primary" />
              <div className="flex flex-col">
                <p className="text-xs">{worker?.city},</p>
                <p className="text-xs">{worker?.state}</p>
              </div>
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-primary text-xl">
            ${worker?.rate.rate}
            <span className="text-gray-400 font-normal">/hr</span>
            <span className="text-gray-400 font-normal text-sm">
              {" "}
              ({worker?.rate.currency})
            </span>
          </h1>
          <BookButton slug={`${worker.id}-service-${worker.service.name}`} />
        </div>

        <Border />
        {worker?.about && (
          <div className="flex flex-col justify-start gap-2">
            <h1 className="font-bold text-base font-heading">About me</h1>

            <p>{worker?.about}</p>
          </div>
        )}

        <div className="flex flex-col justify-start gap-2">
          <h1 className="font-heading text-base font-bold">
            Reviews of{" "}
            <span>
              {worker.user.firstName} {worker.user.lastName}
            </span>
          </h1>

          <ReviewsButton>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-start gap-3">
                <h1 className="font-bold text-primary text-3xl">{avgRating}</h1>
                <div className="flex flex-col">
                  <StarRating rating={avgRating} />
                  <p className="font-light">
                    {worker.user.reviews?.length} reviews
                  </p>
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

async function getWorker(slug: string) {
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/worker/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
