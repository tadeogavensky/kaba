import { motion } from "framer-motion";
import React from "react";
import { IoClose } from "react-icons/io5";

const Form = ({ closeForm }: { closeForm: () => void }) => {
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
      className="min-h-screen pt-6 p-4 bg-white absolute w-full flex flex-col justify-between top-0 left-0 z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between ">
        <button onClick={closeForm} type="button">
          <IoClose size={25} className="text-gray-500" />
        </button>
        <h1 className="font-bold font-heading text-xl">New Address</h1>
        <span></span>
      </div>
      <form className="">
        <button
          className="w-full bg-primary text-white font-body font-semibold py-1 rounded-full mt-10"
          type="submit"
        >
          Save
        </button>
      </form>
    </motion.div>
  );
};

export default Form;
