import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState, Fragment } from "react";
import { IoClose } from "react-icons/io5";
import {
  Country,
  State,
  City,
  ICity,
  ICountry,
  IState,
} from "country-state-city";

import Select from "react-select";

type FormProps = {
  closeForm: () => void;
};

const Form: React.FC<FormProps> = ({ closeForm }) => {
  const countryData: ICountry[] = Country.getAllCountries();

  const [values, setValues] = useState({
    country: {
      value: "Argentina",
      isoCode: "",
    },
    state: {
      value: "Buenos Aires",
      isoCode: "",
    },
    city: {
      value: "Balvanera",
      stateCode: "",
    },
  });

  const initialValues = {
    state: {
      value: "",
      isoCode: "",
    },
    city: {
      value: "",
      stateCode: "",
    },
  };

  const updatedCountries = countryData.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  const updatedStates = (isoCode: string) => {
    return State.getStatesOfCountry(isoCode).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  };

  const updatedCities = (countryCode: string, stateCode: string) => {
    return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
      label: city.name,
      value: city.stateCode,
      ...city,
    }));
  };

  const handleCountryChange = (selectedOption: any) => {
    setValues({
      ...values,
      country: selectedOption,
      ...initialValues,
    });
  };
  const handleStateChange = (selectedOption: any) => {
    console.log(selectedOption);

    setValues({ ...values, state: selectedOption });
  };

  const handleCityChange = (selectedOption: any) => {
    setValues({ ...values, city: selectedOption });
  };

  console.log("values :>> ", values);
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
      <div className="flex items-center justify-between ">
        <button onClick={closeForm} type="button">
          <IoClose size={25} className="text-gray-500" />
        </button>
        <h1 className="font-bold font-heading text-xl">New Address</h1>
        <span></span>
      </div>
      <form className="flex flex-col justify-start items-start w-full ">
        <div className="flex flex-col w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            ZIP/Postal Code
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="block text-base font-body font-semibold leading-6 text-gray-900">
            Country
          </label>
          <Select
            id="country"
            name="country"
            options={updatedCountries}
            onChange={handleCountryChange}
          />
        </div>
        <div className="flex flex-col w-full">
          {values.country && (
            <div>
              <label className="block text-base font-body font-semibold leading-6 text-gray-900">
                State
              </label>
              <Select
                id="state"
                name="state"
                options={updatedStates(values.country.isoCode)}
                value={values.state}
                onChange={handleStateChange}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          {values.state && (
            <div>
              <label className="block text-base font-body font-semibold leading-6 text-gray-900">
                City
              </label>
              <Select
                id="city"
                name="city"
                options={updatedCities(
                  values.country.isoCode,
                  values.state.isoCode
                )}
                value={values.city} // Use values.city instead of city
                onChange={handleCityChange}
              />
            </div>
          )}
        </div>
      </form>
      <button
        className="w-full bg-primary text-white font-body font-semibold py-1 rounded-full mt-10"
        type="submit"
      >
        Save
      </button>
    </motion.div>
  );
};

export default Form;
