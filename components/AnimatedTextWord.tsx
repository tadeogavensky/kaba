import { motion } from "framer-motion";
import React from "react";

const AnimatedTextWord = ({
  text1,
  text2,
  className,
}: {
  text1: string;
  text2: string;
  className: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const childSlow = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.5 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", stiffness: 100, delay: 0.5 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <motion.h1 className="tracking-wide" variants={child}>
        {text1}
      </motion.h1>
      <motion.h1 className="tracking-wide mt-6" variants={childSlow}>
        {text2}
      </motion.h1>
    </motion.div>
  );
};

export default AnimatedTextWord;
