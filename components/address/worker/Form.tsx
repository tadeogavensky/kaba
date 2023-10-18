import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState, Fragment, FormEvent } from "react";
import { IoArrowBack } from "react-icons/io5";
import Cookies from "js-cookie";

import {
  Country,
  State,
  City,
  ICity,
  ICountry,
  IState,
} from "country-state-city";

import { BsMailbox2 } from "react-icons/bs";
import {
  PiRoadHorizonBold,
  PiElevator,
  PiUsersThreeBold,
} from "react-icons/pi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import Select from "react-select";
import Address from "@/types/Address";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

type FormProps = {
  closeForm: () => void;
};

const Form: React.FC<FormProps> = ({ closeForm }) => {
  const { updateSession, user } = useAuth();

  const countryData: ICountry[] = Country.getAllCountries();

  const [values, setValues] = useState({
    country: {
      value: "Argentina",
      isoCode: "",
      label: "",
    },
    state: {
      value: "Buenos Aires",
      isoCode: "",
      label: "",
    },
    city: {
      value: "Balvanera",
      stateCode: "",
      label: "",
    },
  });

  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const [zipPostalCode, setZipPostalCode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");

  const address = {
    fullAddress:
      street +
      " " +
      streetNumber +
      (neighbourhood ? " - " + neighbourhood : "") +
      (values.city.label ? " - " + values.city.label : "") +
      (values.state.label ? " - " + values.state.label : "") +
      " - " +
      values.country.label,
    street: street,
    city: values.city.label,
    state: values.state.label,
    postalCode: zipPostalCode,
    country: values.country.label,
    number: streetNumber,
    neighbourhood: neighbourhood,
  };

  const handleSubmitAddressForm = async (e: FormEvent) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (
      zipPostalCode.trim().length === 0 ||
      neighbourhood.trim().length === 0 ||
      street.trim().length === 0 ||
      streetNumber.trim().length === 0
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const statesAvailable = State.getStatesOfCountry(values.country.isoCode);
    const citiesAvailable = City.getCitiesOfState(
      values.country.isoCode,
      values.state.isoCode
    );

    if (values.country.label.trim().length == 0) {
      toast.error("Please select a country");
      return;
    }

    if (statesAvailable.length > 0 && values.state.label.trim().length == 0) {
      toast.error("Please select a state");
      return;
    }

    if (citiesAvailable.length > 0 && values.city.label.trim().length == 0) {
      toast.error("Please select a city");
      return;
    }

    try {
      const response = await axios.post("/api/worker/address", address);

      const responseUser = await axios.get("/api/me");

      toast.success(response.data.msg);

      updateSession(responseUser.data);

      closeForm();
    } catch (e: any) {
      toast.error(e);
    }
  };

  const initialValues = {
    state: {
      value: "",
      isoCode: "",
      label: "",
    },
    city: {
      value: "",
      stateCode: "",
      label: "",
    },
  };

  const updatedCountries = countryData.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  const updatedStates = (isoCode: string) => {
    const states = State.getStatesOfCountry(isoCode).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));

    return states;
  };

  const updatedCities = (countryCode: string, stateCode: string) => {
    const cities = City.getCitiesOfState(countryCode, stateCode).map(
      (city) => ({
        label: city.name,
        value: city.stateCode,
        ...city,
      })
    );
    return cities;
  };

  const handleCountryChange = (selectedOption: any) => {
    setValues({
      ...values,
      country: selectedOption,
      ...initialValues,
    });
  };

  const handleStateChange = (selectedOption: any) => {
    const stateValue = selectedOption || { value: "", isoCode: "" };

    if (stateValue.label === "Ciudad Autónoma de Buenos Aires") {
      setValues({
        ...values,
        state: { value: "Buenos Aires", isoCode: "BA", label: "Buenos Aires" },
        city: {
          value: "Ciudad Autónoma de Buenos Aires",
          stateCode: "BA",
          label: "Ciudad Autónoma de Buenos Aires",
        },
      });
    } else {
      setValues({
        ...values,
        state: stateValue,
        city: { value: "", stateCode: "", label: "" },
      });
    }

    console.log(values.state.label);
  };

  const handleCityChange = (selectedOption: any) => {
    setValues({ ...values, city: selectedOption });
  };

  const container = {
    exit: {
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial={{ y: 500 }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
      exit={"exit"}
      className="pt-6 p-4 min-h-screen justify-between bg-white absolute w-full flex flex-col top-0 left-0 z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between fixed top-0 left-0 w-full px-6 py-4 bg-white z-50 border-b-[1px] ">
        <button onClick={closeForm} type="button">
          <IoArrowBack size={25} className="text-gray-500" />
        </button>
        <h1 className="font-bold font-heading text-xl">New Address</h1>
        <span></span>
      </div>
      <form
        className="flex flex-col justify-start items-start gap-6 w-full mt-12"
        onSubmit={handleSubmitAddressForm}
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            Country
          </label>
          <Select
            id="country"
            name="country"
            placeholder="Select..."
            options={updatedCountries}
            onChange={handleCountryChange}
          />
        </div>
        {values.country &&
          State.getStatesOfCountry(values.country.isoCode).length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              <label className="block text-base font-body font-semibold leading-6 text-gray-900">
                State
              </label>
              <Select
                id="state"
                name="state"
                required
                placeholder="Select..."
                options={updatedStates(values.country.isoCode)}
                value={values.state}
                onChange={handleStateChange}
              />
            </div>
          )}
        {(values.state.label === "Buenos Aires" ||
          City.getCitiesOfState(values.country.isoCode, values.state.isoCode)
            .length > 0) && (
          <div className="flex flex-col gap-2 w-full">
            <label className="block text-base font-body font-semibold leading-6 text-gray-900">
              City
            </label>
            <Select
              id="city"
              name="city"
              required
              placeholder="Select..."
              options={updatedCities(
                values.country.isoCode,
                values.state.isoCode
              )}
              value={values.city}
              onChange={handleCityChange}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            ZIP/Postal Code
          </label>
          <div
            className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
              zipPostalCode.trim() === "" && isFormSubmitted
                ? "ring-2 ring-red-500"
                : ""
            }`}
          >
            <BsMailbox2 size={30} />
            <input
              type="text"
              onChange={(e) => {
                setZipPostalCode(e.target.value);
              }}
              placeholder="C1425"
              className="bg-transparent w-full p-1 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none  ring-0 focus:border-0"
            />
          </div>
          <div className="px-2">
            {!zipPostalCode.trim() && isFormSubmitted && (
              <p className="text-red-500 text-sm mt-1">
                ZIP/Postal Code is required
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            Neighbourhood
          </label>
          <div
            className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
              neighbourhood.trim() === "" && isFormSubmitted
                ? "ring-2 ring-red-500"
                : ""
            }`}
          >
            <PiUsersThreeBold size={30} />
            <input
              type="text"
              onChange={(e) => {
                setNeighbourhood(e.target.value);
              }}
              placeholder="Palermo"
              className="bg-transparent w-full p-1 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none  ring-0 focus:border-0"
            />
          </div>
          <div className="px-2">
            {!neighbourhood.trim() && isFormSubmitted && (
              <p className="text-red-500 text-sm mt-1">
                Neighbourhood is required
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            Street
          </label>
          <div
            className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
              street.trim() === "" && isFormSubmitted
                ? "ring-2 ring-red-500"
                : ""
            }`}
          >
            <PiRoadHorizonBold size={30} />
            <input
              type="text"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              placeholder="Bulnes"
              className="bg-transparent w-full p-1 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none  ring-0 focus:border-0"
            />
          </div>
          <div className="px-2">
            {!street.trim() && isFormSubmitted && (
              <p className="text-red-500 text-sm mt-1">Street is required</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            Number
          </label>
          <div
            className={`flex items-center flex-1 focus-within:border-blue-600 focus-within:border-[1.5px] border-[1.5px] border-transparent bg-gray-100 rounded-lg p-2 px-4 gap-4 mx-auto w-full ${
              streetNumber.trim() === "" && isFormSubmitted
                ? "ring-2 ring-red-500"
                : ""
            }`}
          >
            <AiOutlineFieldNumber size={30} />
            <input
              type="number"
              onChange={(e) => {
                setStreetNumber(e.target.value);
              }}
              placeholder="4624"
              className="bg-transparent w-full p-1 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none  ring-0 focus:border-0"
            />
          </div>
          <div className="px-2">
            {!streetNumber.trim() && isFormSubmitted && (
              <p className="text-red-500 text-sm mt-1">Number is required</p>
            )}
          </div>
        </div>

        <button
          className="w-full bg-primary hover:bg-blue-800 transition text-white font-body font-semibold py-1 rounded-full mt-2 "
          type="submit"
        >
          Save
        </button>
      </form>
    </motion.div>
  );
};

export default Form;
