import axios from "axios";
import Image from "next/image";
import React from "react";
import Card from "./worker/Card";

const Hero = async () => {
  const workers = await getWorkers();
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 ">
      <h1 className="font-body font-bold lowercase text-7xl max-w-3xl text-center">
        Unlock Your Home's Full Potential
      </h1>
      <p className="font-body max-w-sm text-center">
        Elevating home services to a new standard of convenience and quality.
      </p>

      <div className="grid grid-cols-5 grid-rows-5 gap-12 place-items-center place-content-center ">
        <div className="row-span-3">
          {" "}
          <div className="flex items-start rounded-3xl bg-blue-200 p-2">
            <Image
              src={"/assets/screen-worker.jpeg"}
              width={1000}
              height={1000}
              alt="screen-worker"
              className="rounded-2xl w-[700px] h-[400px]"
            />
          </div>
        </div>
        <div className="col-start-1 row-start-4">2</div>
        <div className="row-span-2 col-start-2 row-start-1">
          {" "}
          <h1 className="font-body font-bold text-3xl max-w-xl">
            With Kaba, every day is an opportunity to simplify your life and
            embrace the extraordinary.
          </h1>
        </div>
        <div className="row-span-3 col-start-2 row-start-3">
          <div className=" flex items-center w-[200px]  rounded-2xl bg-blue-200 p-2">
            <Image
              src={"/assets/book-screen.png"}
              width={200}
              height={200}
              alt="book"
              className="rounded-2xl"
            />
          </div>
        </div>
        <div className="col-span-2 row-span-3 col-start-3 row-start-1">
          {" "}
          <div className="flex items-center w-full flex-wrap gap-4">
            {workers.map((worker: any, index: number) => {
              return (
                <div key={index}>
                  <Card
                    id={worker.id}
                    firstName={worker.user.firstName}
                    lastName={worker.user.lastName}
                    profilePicture={worker.profilePicture}
                    worker={worker}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="row-start-5">7</div>
      </div>
    </div>
  );
};

export default Hero;

async function getWorkers() {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }

  try {
    const response = await axios.get(`${apiUrl}/api/workers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
