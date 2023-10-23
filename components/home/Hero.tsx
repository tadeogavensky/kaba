"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "../worker/Card";
import { motion } from "framer-motion";
import AnimatedTextWord from "../AnimatedTextWord";
import Link from "next/link";

const Hero = () => {
  const [workers, setWorkers] = useState([] || null);

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
        setWorkers(response.data);
      });
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    getWorkers();
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
          className="bg-black text-sm hover:bg-slate-600 transition px-6 py-3 rounded-md text-white font-heading"
        >
          Try it now
        </Link>
        <p className=" text-xs font-semibold bottom-2 px-1 py-1">
         {userCount} people have chosen us
        </p>
      </motion.span>

      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex items-start rounded-3xl bg-blue-200 p-2"
          >
            <Image
              src={"/assets/screen-worker.jpeg"}
              width={1000}
              height={1000}
              alt="screen-worker"
              className="rounded-2xl w-[700px] h-[400px] object-cover"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="col-span-2 row-span-2 place-self-center  "
        >
         
        </motion.div>
        <div className="row-span-3 col-start-2 row-start-3">
          <div className=" flex items-center w-[200px]  rounded-2xl bg-blue-200 p-2">
            <Image
              src={"/assets/book-screen.png"}
              width={200}
              height={200}
              alt="book"
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-3 col-start-4 row-start-1 place-self-center ">
          <div className="flex flex-col items-center justify-center w-full flex-wrap gap-4">
            {workers.map((worker: any, index: number) => {
              return (
                <motion.div
                  initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                  transition={{ delay: index * 0.4 }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  whileHover={{ scale: 1.1 }}
                  key={index}
                >
                  <Card
                    id={worker.id}
                    firstName={worker.user?.firstName}
                    lastName={worker.user?.lastName}
                    profilePicture={worker.profilePicture}
                    worker={worker}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="row-span-3 col-start-3 row-start-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className=" flex items-center w-[200px]  rounded-2xl bg-blue-200 p-2"
          >
            <Image
              src={"/assets/book-screen.png"}
              width={200}
              height={200}
              alt="book"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
        <div className="col-span-2 row-span-2 col-start-4 row-start-4">10</div>
      </div>
    </div>
  );
};

export default Hero;
