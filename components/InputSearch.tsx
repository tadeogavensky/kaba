import React from "react";
import { IoSearchOutline } from "react-icons/io5";
const InputSearch = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2 px-4 gap-4 mt-10">
      <IoSearchOutline size={20} />
      <input
        placeholder="Search"
        className="font-heading bg-transparent placeholder:text-sm placeholder:font-bold shadow-none focus:ring-0 w-full focus:border-0"
      />
    </div>
  );
};

export default InputSearch;
