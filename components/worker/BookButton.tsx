"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import React from "react";

const BookButton = ({ slug }: { slug: string }) => {
  const { user } = useAuth();

  return (
    <Link
      href={
        user
          ? user.role === "client" && user.active
            ? `/auth/worker/book/${slug.replace(/\s+/g, "-").toLowerCase()}`
            : "/"
          : "/auth/signin" 
      }
      className="w-1/2 px-6 lg:px-4 py-2 text-center bg-primary text-white font-body rounded-3xl hover:bg-blue-800 transition"
    >
      Book
    </Link>
  );
};

export default BookButton;
