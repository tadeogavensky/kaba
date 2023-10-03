import Image from "next/image";
import React, { FC } from "react";
import WorkerTypes from "@/types/Worker";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import calculateAverageRating from "@/utils/avgRating";

const Card: FC<WorkerTypes> = ({
  id,
  firstName,
  lastName,
  profilePicture,
  service,
  rate,
  reviews,
  totalJobs,
  category,
}) => {
  const avgRating = calculateAverageRating(reviews);

  return (
    <div className="sm:w-[350px]  flex flex-row justify-around bg-white rounded-lg shadow-xl p-3 gap-4">
      <Link
        href={`/workers/${id}-${service.name
          .replace(/\s+/g, "-")
          .toLowerCase()}-${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
        className="flex justify-center items-center"
      >
        <Image
          src={profilePicture}
          height={300}
          width={300}
          className="rounded-xl object-cover  h-[100px] w-[100px] "
          alt="profilePicture"
        />
      </Link>
      <div className="flex flex-col justify-start">
        <div className="flex justify-between items-center">
          <p className="font-body font-normal">
            {firstName} {lastName}
          </p>
          <BookmarkButton />
        </div>
        <Link
          href={`/workers/${id}-${service.name
            .replace(/\s+/g, "-")
            .toLowerCase()}-${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
          className="font-body text-xl font-semibold"
        >
          {service.name}
        </Link>

        <div className="flex justify-between items-center gap-3 mt-2">
          <div className="flex flex-col justify-start gap-1 text-sm">
            <p className="text-gray-400 font-semibold font-body ">Rating</p>
            <div className="flex items-center gap-1 font-semibold">
              <BsStarFill className="text-amber-500" />
              {avgRating}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-gray-400 font-semibold font-body whitespace-nowrap  ">
              Total Jobs
            </p>
            <p className="font-semibold">{totalJobs}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm font-body">
            <p className="text-gray-400 font-semibold">Rate</p>
            <p className="font-semibold">
              ${rate.rate}
              <span className="text-gray-400 font-normal">/hr</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
