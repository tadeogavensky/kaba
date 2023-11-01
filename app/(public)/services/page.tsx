import Card from "@/components/services/Card";
import axios from "axios";
import React from "react";
import Service from "@/types/Service";
import Header from "@/components/header/Header";
const Services = async () => {
  const services = await getServices();
  return (
    <>
      <div className="hidden lg:block mt-6 sm:mx-32">
        <Header />
      </div>
      <div className="p-6 relative mb-32 lg:mb-0">
        <h1 className="font-bold font-body text-2xl">Services</h1>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row mt-6 gap-4">
          {services.map((service: Service) => {
            return (
              <Card
                key={service.name}
                name={service.name}
                image={service.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const getServices = async () => {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL!;
  } else {
    apiUrl = process.env.API_URL!;
  }

  try {
    const response = await axios.get(`${apiUrl}/api/services`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching services`, error);
  }
};

export default Services;
