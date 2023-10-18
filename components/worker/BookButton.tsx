import Link from "next/link";
import React from "react";

const BookButton = ({ slug }: { slug: string }) => {
  return (
    <Link
      href={`/auth/book/${slug.replace(/\s+/g, "-").toLowerCase()}`}
      className="px-6 py-2 text-center bg-primary text-white font-body rounded-3xl w-1/2 hover:bg-blue-800 transition"
    >
      Book
    </Link>
  );
};

export default BookButton;
