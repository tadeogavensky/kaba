import React from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
const BookmarkButton = () => {
  return (
    <button className="flex justify-center items-center bg-slate-100 rounded-md p-2 hover:bg-slate-300 group transition">
      <BsFillBookmarkFill className="text-neutral-500 group-hover:text-neutral-700" />
    </button>
  );
};

export default BookmarkButton;
