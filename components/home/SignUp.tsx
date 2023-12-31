"use client";
import React, { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { FaTools } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import axios from "axios";
import Image from "next/image";
import calculateAverageRating from "@/utils/avgRating";
import Review from "@/types/Review";
import StarRating from "../worker/StarRating";
import avatar from "/public/assets/avatar.jpg";
import { motion } from "framer-motion";

const SignUp = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = () => {
    axios.get("/api/client/reviews").then((response) => {
      console.log("response.data", response.data[0].worker.user.image);
      const limitedReviews = response.data.slice(0, 6);
      setReviews(limitedReviews);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const cardsProps = [
    {
      title: "Flexible Availability",
      description:
        "Our workers set their own schedules, so they're available when it suits you.",
      icon: <FiClock size={25} />,
    },
    {
      title: "Skilled Professionals",
      description:
        "Highly skilled and experienced workers who excel in their respective services.",
      icon: <FaTools size={25} />,
    },
    {
      title: "User Ratings and Reviews",
      description:
        "Transparent feedback system allows you to see what others say about our worker's performance.",
      icon: <BsStarFill size={25} />,
    },
    {
      title: "Secure Payments",
      description:
        "Your payments are safe and easy, with multiple payment options to choose from.",
      icon: <RiSecurePaymentLine size={25} />,
    },
  ];

  return (
    <div className="w-full flex md:flex-col lg:flex-row md:items-center lg:items-start justify-between gap-8  mt-10">
      <div className="flex flex-col mr-auto">
        <motion.h2
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-heading font-bold text-4xl max-w-xl"
        >
          Start using Kaba right now and enjoy the services KabaProps offers you
          and embrace a{" "}
          <span className="text-primary">New Sense of Freedom</span>.
        </motion.h2>

        <span className="border-4 border-primary w-[25%] mt-4"></span>

        <div className="grid grid-rows-2 grid-cols-2 gap-4 mt-6 w-[600px]">
          {cardsProps.map((card, index) => {
            return (
              <motion.div
                initial={{ x: -100, y: 30, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: index * 0.4 }}
                viewport={{ once: true }}
                key={index}
                className="bg-white shadow-md rounded-md p-4 flex flex-col justify-start gap-1"
              >
                <span className="text-blue-400"> {card.icon}</span>
                <h1 className="font-heading font-bold mt-2 text-lg">
                  {card.title}
                </h1>
                <p>{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="lg:hidden font-heading font-bold text-2xl">
          What the Clients says about our KabaProps{" "}
        </h1>
        <motion.div
          initial={{ x: 500, y: 30, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-row flex-wrap lg:flex-col gap-4"
        >
          {reviews.map((review: any, index) => {
            return (
              <motion.div
                key={index}
                className="bg-white shadow-md  rounded-md p-3  flex items-start w-[500px] gap-4 cursor-default"
              >
                <Image
                  src={review.worker.user?.image || avatar}
                  alt="review-user"
                  width={300}
                  height={300}
                  className="w-16 h-16 shadow-lg object-cover rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between items-center">
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="font-heading">{review.comment}</p>
                  <p className="whitespace-nowrap text-sm">
                    Review about{" "}
                    <span className="font-semibold">
                      {review.worker?.user.firstName}{" "}
                      {review.worker?.user.lastName}
                    </span>{" "}
                    on{" "}
                    <span className="capitalize">
                      {review.booking.service.name}
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
