import Calendar from "@/components/book/Calendar";
import WorkingHours from "@/components/book/WorkingHours";
import { GoBack } from "@/components/GoBack";
import React from "react";

const Book = () => {
  return (
    <div className="p-6">
      <GoBack label="Worker" />
      <div className="flex flex-col sm:flex-row gap-4">
        <Calendar />
        <WorkingHours />
      </div>
    </div>
  );
};

export default Book;
