import { useAuth } from "@/contexts/AuthContext";
import Notification from "@/types/Notification";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Modal = () => {
  const { user, updateSession } = useAuth();

  const clearNotifications = async () => {
    await axios.delete(`/api/notifications/${user?.id}`);

    const responseUser = await axios.get("/api/me");

    updateSession(responseUser.data);

    
  };

  const slideInVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-20 z-40 left-10 bg-white shadow-md  rounded-lg"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={slideInVariants}
      >
        <button
          className="p-4 text-blue-500 font-semibold text-lg"
          onClick={clearNotifications}
        >
          Clear
        </button>
        {user &&
          user?.notifications?.map((notification: any) => {
            return (
              <p
                key={notification.id}
                className="font-heading text-lg border-b-2 p-4"
              >
                {notification.text}
              </p>
            );
          })}
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
