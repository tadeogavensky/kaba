"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import Card from "@/components/book/Card";
import { useAuth } from "@/contexts/AuthContext";
import Booking from "@/types/Booking";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import avatar from "/public/assets/avatar.jpg";

import { IoArrowBack } from "react-icons/io5";
import User from "@/types/User";
import { BiSolidReceipt } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { FaRedoAlt } from "react-icons/fa";

const Bookings = () => {
  const { user } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | null>(
    []
  );
  const [pastBookings, setPastBookings] = useState<Booking[] | null>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingBookings(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fetchUpcomingBookings = () => {
    axios.get("/api/bookings/upcoming").then((response) => {
      setUpcomingBookings(response.data);
    });
  };

  const fetchPastBookings = () => {
    axios.get("/api/bookings/past").then((response) => {
      setPastBookings(response.data);
    });
  };

  useEffect(() => {
    fetchUpcomingBookings();
    fetchPastBookings();
  }, []);

  const closeModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  return (
    <div className="p-6 relative">
      <h1 className="font-bold font-body text-2xl">Bookings</h1>

      <div className="w-full flex items-center mt-4">
        <div className="flex flex-col w-full">
          <h3 className="font-bold font-heading ">Upcoming</h3>
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
                            setModalOpen(true);
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

      <div className="w-full flex items-center mt-8">
        <div className="flex flex-col w-full">
          <h3 className="font-bold font-heading ">Past</h3>
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
                        <div key={booking.id}>
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
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            booking={selectedBooking}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({
  closeModal,
  booking,
  user,
}: {
  closeModal: () => void;
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

  console.log('====================================');
  console.log(booking);
  console.log('====================================');

  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="h-screen w-screen left-0 top-0 bg-white z-50 p-4 absolute"
    >
      <Toaster />

      <div className="flex flex-col justify-start ">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <IoArrowBack size={25} />
          </button>

          <h1 className="ml-auto mr-auto font-body font-bold text-xl">
            Booking Details
          </h1>
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
                  alt="service-image"
                  width={500}
                  height={500}
                  className="rounded-full object-cover flex-1 "
                />
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              {new Date(booking.date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              for {booking.workingHours} hours
            </p>

            <div className="flex items-center justify-start gap-4 my-4">
              <button className="flex items-center bg-gray-200 p-3 rounded-full gap-2 text-black font-semibold font-body">
                <BiSolidReceipt size={15}/>
                <p>Reciept</p>
              </button>
              <button className="flex items-center bg-gray-200 p-3 rounded-full gap-2 text-black font-semibold font-body">
                <FaRedoAlt size={15}/>
                <p>Rebook</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Bookings;
