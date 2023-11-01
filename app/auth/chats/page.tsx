"use client";

import Header from "@/components/header/Header";
import { useAuth } from "@/contexts/AuthContext";
import { pusherClient } from "@/libs/pusher";
import avatar from "/public/assets/avatar.jpg";

import Chat from "@/types/Chat";
import Message from "@/types/Message";

import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import User from "@/types/User";
import { LuSend } from "react-icons/lu";
import { find } from "lodash";

const Chats = () => {
  const { user, updateSession } = useAuth();

  const [chats, setChats] = useState<Chat[]>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [isChatOpen, setChatOpen] = useState(false);

  /*   useEffect(() => {
    pusherClient.subscribe(chatId);
  }, [chatId]); */

  useEffect(() => {
    axios.get("/api/chats").then((response) => {
      setChats(response.data);
    });
  }, []);

  const openChat = () => {
    setChatOpen(true);
  };
  const closeChat = () => {
    setChatOpen(false);
  };

  return (
    <>
      <div className="hidden lg:block mt-6 sm:mx-32">
        <Header />
      </div>
      <div className="p-6 relative mb-32 lg:mb-0">
        <h1 className="font-bold font-body text-2xl">Chat</h1>

        <div className="w-full flex flex-col mt-6">
          <h3 className="font-body font-bold">Messages</h3>

          <ul className="flex flex-col gap-4 mt-6">
            {chats?.map((chat, index) => {
              return (
                <li
                  className="flex items-center gap-2 pb-2 border-b-[1px]"
                  onClick={() => {
                    openChat();
                    setSelectedChat(chat);
                  }}
                >
                  {
                    <Image
                      src={
                        user?.role == "client"
                          ? chat?.worker?.user?.image || avatar
                          : chat?.client?.user?.image || avatar
                      }
                      width={100}
                      height={100}
                      alt="profile"
                      className="object-cover rounded-full w-[15%] "
                    />
                  }
                  <div className="flex items-center font-body font-bold gap-1 text-lg">
                    <p>
                      {user?.role == "client"
                        ? chat?.worker?.user?.firstName
                        : chat?.client?.user?.firstName}
                    </p>
                    <p>
                      {user?.role == "client"
                        ? chat?.worker?.user?.lastName
                        : chat?.client?.user?.lastName}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <AnimatePresence>
          {isChatOpen && (
            <Chat
              selectedChat={selectedChat}
              user={user}
              setSelectedChat={setSelectedChat}
              closeChat={closeChat}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const Chat = ({
  selectedChat,
  setSelectedChat,
  user,
  closeChat,
}: {
  selectedChat?: Chat;
  user: User | null;
  closeChat: () => void;
  setSelectedChat: (chat: Chat) => void;
}) => {
  const [message, setMessage] = useState<Message>({ id: "", text: "" });
  const [messageSent, isMessageSent] = useState(false);
  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    isMessageSent(true);
    const object = {
      text: message,
      chatId: selectedChat?.id,
    };
    await axios.post("/api/messages", object);

    isMessageSent(false);
  };

  useEffect(() => {
    if (selectedChat) {
      axios.get("/api/chats").then((res) => {
        const newMessages = res.data;
        console.log("new messages", res.data);

        setSelectedChat({ ...selectedChat, messages: newMessages });
      });
    }
  }, [messageSent]);

  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="h-screen w-screen left-0 top-0 bg-white z-40 p-4 fixed overflow-x-hidden "
    >
      <div className="flex flex-col justify-between h-full ">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => {
              closeChat();
            }}
          >
            <IoArrowBack size={25} />
          </button>

          <h1 className=" font-body font-bold text-xl">
            {user?.role == "client"
              ? selectedChat?.worker?.user?.firstName
              : selectedChat?.client?.user.firstName}
          </h1>
        </div>

        <ul>
          {selectedChat?.messages?.map((message) => {
            return <p>{message.text}</p>;
          })}
        </ul>

        <form className="p-2 relative" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Message..."
            className=" bg-gray-100 rounded-full w-full p-2"
            onChange={(e) => {
              setMessage((prevState) => ({
                ...prevState,
                text: e.target.value,
              }));
            }}
          />
          <button
            type="submit"
            className="absolute top-3 right-3 mt-auto bg-primary p-2 rounded-full text-white px-4 focus:ring-primary focus:border-primary hover:bg-blue-700 transition"
          >
            <LuSend size={15} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chats;
