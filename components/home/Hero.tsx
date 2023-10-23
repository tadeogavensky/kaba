"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "../worker/Card";
import { motion } from "framer-motion";
import AnimatedTextWord from "../AnimatedTextWord";
import Link from "next/link";
import user from "/public/assets/user.jpg";

const Hero = () => {
  const [workers, setWorkers] = useState([] || null);
  const [loading, setLoading] = useState(true);

  const [userCount, setUserCount] = useState(0);
  const fetchUserCount = () => {
    axios.get("/api/user/count").then((response) => {
      setUserCount(response.data);
    });
  };
  useEffect(() => {
    fetchUserCount();
  }, [userCount]);

  const getWorkers = () => {
    try {
      axios.get(`/api/workers`).then((response) => {
        const limitedWorkers = response.data.slice(0, 4);
        setWorkers(limitedWorkers);
      });
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    getWorkers();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 ">
      <AnimatedTextWord
        text1="Unlock Your Home's"
        text2="Full Potential"
        className="font-body font-bold lowercase text-7xl max-w-3xl text-center"
      />
      <motion.p
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, delay: 0.5 },
        }}
        initial={{
          opacity: 0,
          y: 20,
        }}
        className="font-body max-w-sm text-center"
      >
        Elevating home services to a new standard of convenience and quality.
      </motion.p>

      <motion.span
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, delay: 0.5 },
        }}
        initial={{
          opacity: 0,
          y: 20,
        }}
        className="relative flex flex-col items-center justify-center bg-gray-200 pt-2 pb-2 gap-2 px-1 rounded-md"
      >
        <Link
          href={"/signup"}
          className="bg-black text-sm hover:bg-slate-600 transition px-12 py-3 rounded-md text-white font-heading"
        >
          Try it now
        </Link>
        <p className=" text-xs font-semibold bottom-2 px-1 py-1">
          {userCount} people have now chosen us
        </p>
      </motion.span>

      <div className="hidden lg:flex justify-center gap-6 ">
        <div className="flex flex-col justify-end">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-baseline rounded-3xl  bg-gray-200 p-2"
          >
            <Image
              src={"/assets/screen-worker.jpeg"}
              width={1000}
              height={1000}
              alt="screen-worker"
              className="rounded-2xl object-cover  h-full w-[300px]"
            />
          </motion.div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex items-center justify-baseline">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center  rounded-2xl bg-gray-200 p-2"
            >
              <Image
                src={"/assets/book-screen.png"}
                width={200}
                height={200}
                alt="book"
                className="rounded-xl w-[300px] object-contain"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="bg-sky-400 flex flex-col  shadow-md rounded-3xl w-[200px] p-3 cursor-default"
          >
            <div className=" flex items-center gap-2">
              <Image
                src={user}
                alt="review-user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-heading font-bold text-xl">Angela</p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-body text-xs">Upcoming jobs</p>

              <div className="bg-black rounded-2xl p-2 flex items-center gap-2">
                <div className="flex flex-col justify-center rounded-xl items-center bg-sky-200 px-4 py-1">
                  <p className="font-body text-[10px]">Jan</p>
                  <h1 className="font-body font-bold text-lg">28</h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-white font-heading text-xs">
                    House Cleaning
                  </h1>
                  <p className="text-white font-body text-sm">10am</p>
                </div>
              </div>

              <div className="bg-black rounded-2xl p-2 flex items-center gap-2">
                <div className="flex flex-col justify-center rounded-xl items-center bg-sky-200 px-4 py-1">
                  <p className="font-body text-[10px]">Feb</p>
                  <h1 className="font-body font-bold text-lg">15</h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-white font-heading text-xs">
                    Carpet Cleaning
                  </h1>
                  <p className="text-white font-body text-sm">3pm</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="">
          <div className="flex flex-col items-center justify-center w-full flex-wrap gap-4">
            {loading
              ? // Display the loading skeleton while loading
                [1, 2, 3].map((index) => (
                  <div key={index}>
                    <WorkerCardLoadingSkeleton />
                  </div>
                ))
              : // Display worker cards when data is available
                workers.map((worker: any, index: number) => (
                  <motion.div whileHover={{ scale: 1.05 }} key={index}>
                    <Card
                      id={worker.id}
                      firstName={worker.user?.firstName}
                      lastName={worker.user?.lastName}
                      profilePicture={worker.profilePicture}
                      worker={worker}
                    />
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkerCardLoadingSkeleton = () => {
  return (
    <div className=" flex w-[350px] flex-row justify-between bg-gray-200 rounded-lg shadow-xl p-3 gap-4 animate-pulse">
      <span className="rounded-xl h-[100px] w-[100px] bg-gray-300 "></span>
      <div className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <span className="w-[100px] rounded-md  bg-gray-300"></span>

          <span className="w-[30px] rounded-md  bg-gray-300"></span>
        </div>

        <span className="w-full rounded-md  bg-gray-300"></span>
      </div>
    </div>
  );
};

export default Hero;
