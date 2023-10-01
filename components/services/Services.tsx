import React from "react";
import Link from "next/link";
import broom from "/kaba-app/public/assets/services/broom.jpg";
import tools from "/kaba-app/public/assets/services/tools.jpg";
import paintBrush from "/kaba-app/public/assets/services/paint-brush.jpg";
import laundry from "/kaba-app/public/assets/services/laundry.jpg";
import Service from "./Service";
import ServicePill from "./ServicePill";

const services = [
  {
    name: "Cleaning",
    image: "/assets/services/broom.jpg",
  },
  {
    name: "Painting",
    image: "/assets/services/paint-brush.jpg",
  },
  {
    name: "Laundry",
    image: "/assets/services/laundry.jpg",
  },
  {
    name: "Repairing",
    image: "/assets/services/tools.jpg",
  },
];

const Services = () => {
  return (
    <section className="flex flex-col mt-6 gap-6">
      <div className="flex justify-between">
        <p className="font-heading font-bold">Services</p>
        <Link
          href={"/services"}
          className="font-heading font-semibold text-sm text-primary hover:text-blue-400 transition"
        >
          See all
        </Link>
      </div>
      <ul className="flex items-baseline justify-evenly gap-6 ">
        {services.map((service, index) => (
          <div key={index}>
            <Service image={service.image} name={service.name} />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Services;
