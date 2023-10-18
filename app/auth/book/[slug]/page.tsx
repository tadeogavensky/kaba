import Address from "@/components/book/Address";
import Calendar from "@/components/book/Calendar";
import StartTime from "@/components/book/StartTime";
import WorkingHours from "@/components/book/WorkingHours";
import { GoBack } from "@/components/GoBack";
import Button from "@/components/mercadopago/Button";
import axios from "axios";
import React from "react";
import { Toaster } from "react-hot-toast";

const Book = async ({ params: { slug } }: { params: { slug: string } }) => {
  const worker = await getWorker(slug);
  console.log('==============worker.service.id======================');
  console.log(worker.service.id);
  console.log('==============worker.service.id======================');
  return (
    <div className="p-6 min-h-max mb-20">
      <div>
        <Toaster />
      </div>
      <GoBack label="Worker" />
      <div className="flex flex-col mt-6">
        <div>
          <p className="font-body text-lg">Hire</p>
          <h1 className="font-body font-semibold text-2xl">
            {worker?.user?.firstName} {worker?.user?.lastName}
          </h1>
          <p className="font-body text-xl">
            for{" "}
            <span className="uppercase font-semibold text-primary">
              {worker.service.name}
            </span>
          </p>
        </div>
        <div className="lg:flex lg:gap-10 ">
          <Calendar />
          <div className="flex gap-8 flex-col w-full">
            <WorkingHours />
            <StartTime />
            <Address />
          </div>
        </div>

        <Button workerId={worker.id} serviceId={worker.service.id} />
      </div>
    </div>
  );
};

async function getWorker(slug: string) {
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/worker/${slug}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default Book;
