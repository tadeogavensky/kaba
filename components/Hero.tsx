import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 ">
      <h1 className="font-body font-bold lowercase text-7xl max-w-3xl text-center">
        Unlock Your Home's Full Potential
      </h1>
      <p className="font-body max-w-sm text-center">
        Elevating home services to a new standard of convenience and quality.
      </p>

      <div className="flex items-baseline gap-8">
        <div className="flex items-center rounded-3xl bg-blue-200 p-2">
          <Image
            src={"/assets/screen-worker.jpeg"}
            width={800}
            height={800}
            alt="screen-worker"
            className="rounded-2xl w-[250px] h-[500px]"
          />
        </div>
        <Image
          src={"/assets/new-life.jpg"}
          width={500}
          height={500}
          alt="new-life"
          className="rounded-2xl w-[250px] h-[200px]"
        />
      </div>
    </div>
  );
};

export default Hero;
