"use client";
import { GoBack } from "@/components/GoBack";
import { useAuth } from "@/contexts/AuthContext";
import Service from "@/types/Service";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowsRotate } from "react-icons/fa6";

const Dashboard = () => {
  const { updateSession, user } = useAuth();

  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState({
    label: user?.worker?.service?.name,
    value: user?.worker?.service?.id,
  });
  const [rate, setRate] = useState({
    currency: "ARS",
    value: user?.worker?.rate?.rate,
  });
  const [available, setAvailable] = useState(user?.worker?.available);

  const updatedServices = services.map((service) => ({
    label: service.name,
    value: service.id,
    ...service,
  }));

  const handleServiceChange = async (selectedOption: any) => {
    setService((prevService) => ({
      ...prevService,
      label: selectedOption.label,
      value: selectedOption.value,
    }));

    axios
      .put(`/api/service/worker/${selectedOption}/${user?.worker?.id}`)
      .then(async (res) => {
        console.log(res);
        toast.success("Service changed", { icon: "🧹" });

        const responseUser = await axios.get("/api/me");
        updateSession(responseUser.data);
      });
  };

  const handleRate = async () => {
    const object = {
      rate: rate.value,
      currency: rate.currency,
      serviceId: user?.worker?.service?.id,
      workerId: user?.worker?.id,
    };

    await axios.post("/api/rate", object);

    toast.success("Rate updated", { icon: "💸" });

    const responseUser = await axios.get("/api/me");
    updateSession(responseUser.data);
  };

  const handleAvailability = async (e: any) => {
    const isAvailable = e.target.checked;
    setAvailable(isAvailable);

    const response = await axios.put("/api/available", {
      available: isAvailable,
    });

    if (isAvailable) {
      toast.success("You are now available to work", { icon: "💪" });
    } else {
      toast.success("You are now unavailable to work", { icon: "🚫" });
    }

    const responseUser = await axios.get("/api/me");
    updateSession(responseUser.data);
  };

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  return (
    <div className="relative p-4">
      <div>
        <Toaster />
      </div>
      <GoBack label="Profile" />

      <div className="flex flex-col mt-10 gap-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-body font-semibold mb-2 text-center">
            Set service and rate
          </h1>
          <div className="flex gap-2 items-center">
            <div className="w-full flex justify-center flex-col items-center">
              <select
                name="service"
                value={service.label}
                onChange={(e) => {
                  handleServiceChange(e.target.value);
                }}
                className="bg-primary shadow-md rounded-full p-3 text-sm font-body font-semibold text-white text-center capitalize"
              >
                <option defaultValue={service.value} disabled>
                  {service.label}
                </option>

                {updatedServices.map((service) => (
                  <option
                    key={service.value}
                    value={service.value}
                    className="font-body capitalize bg-white text-black font-semibold "
                  >
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-center flex-col">
              <div className="flex items-center justify-start w-full gap-2 ">
                <div
                  className={`flex items-center  shadow-sm  focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 gap-4 mx-auto w-full`}
                >
                  <input
                    type="number"
                    value={rate.value || ""}
                    onChange={(e) => {
                      setRate((prevState) => ({
                        ...prevState,
                        value: parseFloat(e.target.value),
                      }));
                    }}
                    placeholder="$3000"
                    className="bg-transparent w-full text-xs p-1 placeholder:text-xs placeholder:font-bold shadow-none border-none outline-none ring-0 focus:border-0"
                  />
                  <select
                    value={rate.currency}
                    onChange={(e) => {
                      setRate((prevState) => ({
                        ...prevState,
                        currency: e.target.value,
                      }));
                    }}
                    className="bg-transparent p-1 border-none outline-none text-sm ring-0 focus:border-0 font-body font-semibold"
                  >
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <button
                  className="bg-primary p-3 rounded-full text-white focus:animate-spin focus:duration-150  shadow-lg"
                  onClick={handleRate}
                >
                  <FaArrowsRotate size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center  gap-3">
          <h1 className="text-xl font-body font-semibold text-center">
            Set as available to work
          </h1>

          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={handleAvailability}
              checked={available}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
