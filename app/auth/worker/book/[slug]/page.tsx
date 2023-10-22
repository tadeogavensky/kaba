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

  return (
    <div className="p-6 mb-20">
      <div>
        <Toaster />
      </div>

      <div className="md:hidden">
        <GoBack label="Worker" />
        <div className="flex flex-col mt-6 lg:max-w-xl">
          <WorkerInfo worker={worker} />
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

      <div className="hidden md:flex flex-col items-start gap-4">
        <GoBack label="Worker" />
        <div className="flex flex-row items-start gap-10 w-1/2">
          <Calendar />
          <div className="flex flex-col w-full gap-4 justify-start items-start">
            <WorkerInfo worker={worker} />
            <WorkingHours />
            <StartTime />
            <Address />
            <Button workerId={worker.id} serviceId={worker.service.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkerInfo = ({ worker }: { worker: any }) => {
  return (
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
  );
};

async function getWorker(slug: string) {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }

  try {
    const response = await axios.get(`${apiUrl}/api/worker/${slug}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default Book;
