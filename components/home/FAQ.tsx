"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

const FAQ = () => {
  const [active, setActive] = useState(-1);

  const faq = [
    {
      question: "How do I sign up as a client?",
      answer:
        "To sign up as a client, go to our website and click on the 'Join Now' button. Fill out the required information, and you'll be all set! Remember to verify your account via the email sent to access key features of Kaba.",
    },
    {
      question: "As a KabaProp, can I change the service I do?",
      answer:
        "Yes, you can change your service. Just go to your profile and select the dashboard section to make the change.",
    },
    {
      question: "How can I leave a review for a worker?",
      answer:
        "You can leave a review for a worker by going to your booking history and clicking on the 'Leave a Review' button.",
    },
    {
      question: "What payment options are available?",
      answer:
        "We offer multiple payment options for your convenience, including credit/debit cards, and more.",
    },
  ];

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
    </motion.div>
  );
};

export default FAQ;
