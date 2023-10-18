import axios from "axios";
import React from "react";

const BookForm = ({
  selectedDate,
  startTime,
  workingHours,
  clientId,
  workerId,
  addressId,
}: {
  selectedDate: Date;
  startTime: string;
  workingHours: number;
  clientId: string;
  workerId: string;
  addressId: string;
}) => {
  const handleBook = async () => {
    const object = {
      selectedDate,
      startTime,
      workingHours,
    };

    await axios.post("/api/book", object);
  };
  return (
    <button
      onClick={handleBook}
      className="px-6 py-2 text-center bg-primary text-white font-body rounded-3xl w-full hover:bg-blue-800 transition"
    >
      Go to pay service
    </button>
  );
};

export default BookForm;
