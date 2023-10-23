"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface FAQProps {
    faq: { question: string; answer: string }[];
  }

const FAQ: React.FC<FAQProps> = ({ faq }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(-1);

  const handleClick = (index: number) => {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  };

  const variants = {
    open: {
      height: "auto",
      opacity: 1,
    },
    closed: {
      height: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col mr-auto ml-auto max-w-lg mt-10"
    >
      <h1 className="text-left font-heading font-bold text-4xl ">
        Kaba in your life
      </h1>
      <p className="text-left font-body font-normal mt-2">
        When you enter the site, you get what you want. Skilled people are
        waiting for your call to provide the best experience you can get. 3
        clicks, 1 experience.
      </p>

      <ul className="flex flex-col">
        {faq.map((faqItem, index) => (
          <li key={index} className="bg-white my-2 shadow-md rounded-md">
            <motion.div
              onClick={() => handleClick(index)}
              className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer"
            >
              <p>{faqItem.question}</p>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: active === index ? 360 : 0 }}
                className="text-primary"
              >
                {active === index ? (
                  <BsArrowUpCircle size={20} />
                ) : (
                  <BsArrowDownCircle size={20} />
                )}
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {active === index && (
                <motion.div
                  className="border-l-2 border-primary overflow-hidden"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variants}
                >
                  <p className="p-3 text-gray-900">{faqItem.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <div className="self-end text-blue-600 font-body font-semibold">
        {pathname !== "/faq" ? <Link href={"/faq"}>See all FAQ</Link> : null}
      </div>
    </motion.div>
  );
};

export default FAQ;
