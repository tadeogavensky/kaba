"use client";

import Header from "@/components/header/Header";
import { useAuth } from "@/contexts/AuthContext";
import Chat from "@/types/Chat";
import Message from "@/types/Message";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const Chats = () => {
  const { user, updateSession } = useAuth();

  const [chats, setChats] = useState<Chat | null>(null);
  const [message, setMessage] = useState<Message | null>(null);


  useEffect(() => {
   

   
  }, []);



  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log("emitted");

  
    setMessage("" || null);
  }

  return (
    <>
      <div className="hidden lg:block mt-6 sm:mx-32">
        <Header />
      </div>
      <div className="p-6 relative mb-32 lg:mb-0">
        <h1 className="font-bold font-body text-2xl">Chat</h1>

        <div className="w-full flex flex-col mt-6">
          <h3 className="font-body font-bold">Messages</h3>
        </div>
      </div>
    </>
  );
};

const Chat = () =>{
  return(
    <>
    </>
  )
}

export default Chat;
