"use client";
import Review from "@/types/Review";
import Worker from "@/types/Worker";
import calculateAverageRating from "@/utils/avgRating";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import StarRating from "../worker/StarRating";

const Modal = ({ reviews, worker }: { reviews: Review[]; worker: Worker }) => {
  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const avgRating = calculateAverageRating(reviews);

  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="h-screen w-screen left-0 top-0 bg-white  z-50  p-4 fixed overflow-hidden"
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col justify-start ">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/worker/${worker?.id}-service-${worker?.service?.name}`}
            type="button"
            className=""
          >
            <IoArrowBack size={25} />
          </Link>

          <h1 className=" font-body font-bold text-xl">Reviews</h1>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col justify-start gap-1">
            <h1 className="font-bold text-black text-5xl">{avgRating} </h1>
            <StarRating rating={avgRating} />
            <p className="font-light text-left">{reviews?.length} reviews</p>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          {reviews.map((review) => {
            return (
              <div className="flex flex-col border-b-[1px] py-2">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <p className="font-body text-sm text-gray-400 justify-start">
                    {new Date(review.date).toLocaleDateString("us-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="font-heading text-lg my-2">{review.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
