import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

type SelectorProps<T> = {
  data: T[];
  selected: T | null;
  setSelected: (item: T | null) => void;
  displayItem: (item: T) => string;
  query: string;
  setQuery: (query: string) => void;
};

function Selector<T>({
  data,
  selected,
  setSelected,
  displayItem,
  query, // Receive query as a prop
  setQuery, // Receive setQuery as a prop
}: SelectorProps<T>) {
  const filteredData = data.filter((item) =>
    displayItem(item).toLowerCase().includes(query.toLowerCase())
  );



  
  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Input
        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
        onChange={(event) => setQuery(event.target.value)} // Use setQuery to update the query
      />
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")} // Clear the query after leaving
      >
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div>
            {filteredData.map((item) => (
              <Combobox.Option
                key={displayItem(item)}
                value={displayItem(item)}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {displayItem(item)}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </div>
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}

export default Selector;
