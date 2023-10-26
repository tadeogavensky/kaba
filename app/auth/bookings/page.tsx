"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import Card from "@/components/book/Card";
import { useAuth } from "@/contexts/AuthContext";
import Booking from "@/types/Booking";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import avatar from "/public/assets/avatar.jpg";

import { IoArrowBack } from "react-icons/io5";
import User from "@/types/User";
import { BiSolidReceipt, BiSolidHelpCircle } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";

import { FaRedoAlt } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import {
  BsPlus,
  BsStarFill,
  BsFillClipboard2Fill,
  BsFillStarFill,
  BsStar,
} from "react-icons/bs";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Review from "@/types/Review";
import StarRating from "@/components/book/StarRating";
import Header from "@/components/header/Header";

const Bookings = () => {
  const { user, updateSession } = useAuth();
  console.log("user", user);

  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  const [todaysBookings, setTodaysBookings] = useState<Booking[] | null>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | null>(
    []
  );
  const [pastBookings, setPastBookings] = useState<Booking[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUpcomingBookings();
      await fetchPastBookings();
      await fetchTodayBookings();
      const timer = setTimeout(() => {
        setIsLoadingBookings(false);
      }, 1000);
      return () => clearTimeout(timer);
    };

    fetchData();
  }, []);

  const fetchUpcomingBookings = async () => {
    axios.get("/api/bookings/upcoming").then((response) => {
      setUpcomingBookings(response.data);
    });
  };

  const fetchTodayBookings = async () => {
    axios.get("/api/bookings/today").then((response) => {
      setTodaysBookings(response.data);
    });
  };

  const fetchPastBookings = async () => {
    axios.get("/api/bookings/past").then((response) => {
      setPastBookings(response.data);
    });
  };

  const closeBookingModal = () => {
    setSelectedBooking(null);
    setBookingModalOpen(false);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  return (
    <>
      <div className="hidden lg:block mt-6 sm:mx-32">
        <Header />
      </div>
      <div className="p-6 relative mb-32 lg:mb-0">
        <h1 className="font-bold font-body text-2xl">Bookings</h1>
        <div className="flex flex-col lg:flex-row mt-8 gap-4">
          <div className="flex flex-col w-full">
            <h3 className="font-bold font-heading ">Today</h3>
            {todaysBookings && todaysBookings?.length <= 0 && (
              <h1 className="mt-2 font-body ">
                You don't have any bookings for today.
              </h1>
            )}
            {todaysBookings && todaysBookings?.length > 0 && (
              <>
                <div className="mt-2">
                  {isLoadingBookings ? (
                    <h1>Loading</h1>
                  ) : (
                    todaysBookings?.map((booking: Booking) => {
                      return (
                        <div
                          key={booking.id}
                          onClick={() => {
                            setSelectedBooking(booking);
                            setBookingModalOpen(true);
                          }}
                        >
                          <Card booking={booking} />
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col w-full">
            <h3 className="font-bold font-heading ">Upcoming</h3>
            {upcomingBookings && upcomingBookings?.length <= 0 && (
              <h1 className="mt-2 font-body ">
                You don't have any upcoming bookings.
              </h1>
            )}
            {upcomingBookings && upcomingBookings?.length > 0 && (
              <>
                <div className="mt-2">
                  {isLoadingBookings
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                          <LoadingSkeleton className="w-full h-full rounded-md bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
                        </div>
                      ))
                    : upcomingBookings?.map((booking: Booking) => {
                        return (
                          <div
                            key={booking.id}
                            onClick={() => {
                              // Set the selected booking and open the modal
                              setSelectedBooking(booking);
                              setBookingModalOpen(true);
                            }}
                          >
                            <Card booking={booking} />
                          </div>
                        );
                      })}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col w-full">
            <h3 className="font-bold font-heading ">Past</h3>
            {pastBookings && pastBookings?.length <= 0 && (
              <h1 className="mt-2 font-body ">
                You don't have any past bookings.
              </h1>
            )}
            {pastBookings && pastBookings.length > 0 && (
              <>
                <div className="mt-2">
                  {isLoadingBookings
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                          <LoadingSkeleton className="w-full h-full rounded-md bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
                        </div>
                      ))
                    : pastBookings?.map((booking: Booking) => {
                        return (
                          <div
                            key={booking.id}
                            onClick={() => {
                              // Set the selected booking and open the modal
                              setSelectedBooking(booking);
                              setBookingModalOpen(true);
                            }}
                          >
                            <Card booking={booking} />
                          </div>
                        );
                      })}
                </div>
              </>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isBookingModalOpen && (
            <BookingModal
              closeBookingModal={closeBookingModal}
              setReviewModalOpen={setReviewModalOpen}
              booking={selectedBooking}
              user={user}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isReviewModalOpen && (
            <ReviewModal
              closeReviewModal={closeReviewModal}
              booking={selectedBooking}
              updateSession={updateSession}
              user={user}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const BookingModal = ({
  closeBookingModal,
  setReviewModalOpen,
  booking,
  user,
}: {
  closeBookingModal: () => void;
  setReviewModalOpen: (isOpen: boolean) => void;
  booking: Booking | null;
  user: User | null;
}) => {
  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  console.log('booking', booking)

  // Function to handle job confirmation
  const confirmJob = () => {
    // You can perform any necessary actions when confirming the job here
    // For example, you can update the job status in your database
    // You can show a confirmation message to the user
    // You can close the modal, etc.
  };

  // Function to cancel the job
  const cancelJob = () => {
    // You can perform any necessary actions when canceling the job here
    // For example, you can show a confirmation message to the user
    // You can close the modal, etc.
  };

  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="h-screen w-screen left-0 top-0 bg-white z-40 p-4 fixed overflow-hidden lg:overflow-auto"
    >
      <Toaster />

      <div className="flex flex-col justify-start ">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => {
              closeBookingModal();
            }}
          >
            <IoArrowBack size={25} />
          </button>

          <h1 className=" font-body font-bold text-xl">Booking Details</h1>
        </div>

        {booking && (
          <div className="mt-2 flex flex-col justify-start">
            <div>
              <Image
                src={booking.service.image}
                width={500}
                height={200}
                alt="category-image"
                className="w-full h-[150px] shadow-sm rounded-lg object-cover"
              />
            </div>
            <div className="flex items-center justify-around gap-1 w-full mt-6">
              <div className="flex flex-col">
                <h1 className="font-heading font-bold text-2xl">
                  KabaX{" "}
                  <span className="capitalize">{booking.service.name}</span>{" "}
                  with{" "}
                  {user?.role == "client"
                    ? booking.worker.user?.firstName
                    : booking.client.user?.firstName}{" "}
                  {user?.role == "client"
                    ? booking.worker.user?.lastName
                    : booking.client.user?.lastName}
                </h1>
              </div>
              <div className="w-32  flex justify-center items-center">
                <Image
                  src={
                    user?.role == "client"
                      ? booking.worker.user?.image || avatar
                      : booking.client.user?.image || avatar
                  }
                  alt="user-image"
                  width={500}
                  height={500}
                  className="rounded-full object-cover flex-1 "
                />
              </div>
            </div>

            <p className="text-gray-600 text-base">
              {new Date(booking.date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              for {booking.workingHours} hours
            </p>

            <p className="text-gray-600 text-base">ARS${booking.total}</p>

            <div className="flex items-center flex-wrap justify-start gap-4 my-4">
              <button className="flex items-center bg-gray-200 p-3 rounded-full gap-2 text-black font-semibold font-body text-sm">
                <BiSolidReceipt size={15} />
                <p>Receipt</p>
              </button>
              <button className="flex items-center bg-gray-200 p-3 rounded-full gap-2 text-black font-semibold font-body text-sm">
                <MdTextsms size={15} />
                <p>Message</p>
              </button>
              {new Date(booking.date) < new Date() &&
                user?.role == "client" && (
                  <Link
                    href={`/auth/worker/book/${
                      booking.worker.id
                    }-service-${booking.service.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    className="flex items-center bg-gray-200 p-3 rounded-full gap-2 text-black font-semibold font-body text-sm"
                  >
                    <FaRedoAlt size={15} />
                    <p>Rebook</p>
                  </Link>
                )}
            </div>

            {new Date(booking.date) <= new Date() &&
              user?.role === "client" && (
                <div>
                  <button
                    className="font-bolder font-body bg-black text-white p-1 rounded-full"
                    onClick={confirmJob}
                  >
                    Confirm Job
                  </button>
                  <button
                    className="font-bolder font-body bg-red-500 text-white p-1 rounded-full"
                    onClick={cancelJob}
                  >
                    Cancel Job
                  </button>
                </div>
              )}

            {new Date(booking.date) <= new Date() && (
              <div className="w-full flex items-center gap-4">
                <BsStarFill size={25} />
                <div className="font-heading flex items-center justify-between font-semibold py-3 border-y-[1px] w-full text-sm">
                  {booking.review?.rating ? (
                    <p className="flex items-center gap-2 text-base">
                      Rated {booking.review?.rating} <BsStarFill size={17} />
                    </p>
                  ) : (
                    <p>No rating</p>
                  )}
                  <p></p>
                  {!booking.review?.rating && user?.role == "client" && (
                    <button
                      className="font-bolder font-body bg-black text-white p-1 rounded-full"
                      onClick={() => {
                        setReviewModalOpen(true);
                      }}
                    >
                      <BsPlus size={20} />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col mt-4 gap-4">
              <h1 className="text-2xl font-body font-bold">Help</h1>
              <div className="w-full flex items-center gap-4">
                <BsFillClipboard2Fill size={25} />
                <Link
                  href={"/report"}
                  className=" flex items-center justify-between py-2 border-b-[1px] w-full "
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-heading font-semibold text-sm">
                      Report safety issue
                    </p>
                    <p className="text-gray-400 text-xs font-body">
                      Let us know if you have a safety related issue
                    </p>
                  </div>
                  <button className="font-bolder font-body">
                    <IoIosArrowForward size={20} />
                  </button>
                </Link>
              </div>
              <div className="w-full flex items-center gap-4">
                <BiSolidHelpCircle size={30} />
                <Link
                  href={"/faq"}
                  className=" flex items-center justify-between pb-2 border-b-[1px] w-full "
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-heading font-semibold text-sm">
                      See Frequent Asked Questions
                    </p>
                    <p className="text-gray-400 text-xs font-body">
                      Get informed about what people ask us about Kaba
                    </p>
                  </div>
                  <button className="font-bolder font-body">
                    <IoIosArrowForward size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ReviewModal = ({
  closeReviewModal,
  booking,
  user,
  updateSession,
}: {
  closeReviewModal: () => void;
  booking: Booking | null;
  user: User | null;
  updateSession: (user: User) => void;
}) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();

    const object = {
      rating,
      comment,
      bookingId: booking?.id,
      workerId: booking?.worker.id,
    };

    const response = await axios.post("/api/review", object);

    toast.success(response.data);

    const responseUser = await axios.get("/api/me");
    updateSession(responseUser.data);
  };

  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="h-screen w-screen left-0 top-0 bg-white  z-50  p-4 fixed overflow-hidden lg:overflow-auto"
      style={{ overflow: "hidden" }}
    >
      <Toaster />

      <div className="flex flex-col justify-start ">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => {
              closeReviewModal();
            }}
          >
            <IoArrowBack size={25} />
          </button>

          <h1 className=" font-body font-bold text-xl">Add Review</h1>
        </div>

        {booking && (
          <div className="flex flex-col justify-center items-center mt-6">
            <Image
              src={
                user?.role == "client"
                  ? booking.worker.user?.image || avatar
                  : booking.client.user?.image || avatar
              }
              alt="user-image"
              width={500}
              height={500}
              className="rounded-full object-cover flex-1 h-1/2 w-1/2"
            />

            <form
              className=" flex flex-col mt-6 gap-6 w-full"
              onSubmit={handleSubmitReview}
            >
              <div className="ml-auto mr-auto">
                <StarRating onRatingChange={setRating} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="comment"
                  className="block text-xl font-body font-semibold leading-6  text-gray-900"
                >
                  Comment
                </label>
                <textarea
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="bg-transparent w-full p-2 placeholder:text-sm placeholder:font-bold shadow-none border-2 rounded-lg outline-none focus:ring-0 ring-0 focus:border-0"
                  placeholder={`Leave a review for ${booking.worker.user?.firstName}`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-black text-white p-2 rounded-lg font-bold text-xl"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Bookings;
