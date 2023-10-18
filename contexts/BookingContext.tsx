"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the types for your context values
type BookingContextType = {
  selectedDate: Date | null;
  startTime: string;
  workingHours: number;
  clientId: string;
  workerId: string;
  addressId: string;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  setStartTime: Dispatch<SetStateAction<string>>;
  setWorkingHours: Dispatch<SetStateAction<number>>;
  setClientId: Dispatch<SetStateAction<string>>;
  setWorkerId: Dispatch<SetStateAction<string>>;
  setAddressId: Dispatch<SetStateAction<string>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("6:00 AM");
  const [workingHours, setWorkingHours] = useState<number>(0);
  const [clientId, setClientId] = useState<string>("");
  const [workerId, setWorkerId] = useState<string>(""); // You should provide the actual worker ID here
  const [addressId, setAddressId] = useState<string>(""); // You can set an initial value here

  const contextValue: BookingContextType = {
    selectedDate,
    startTime,
    workingHours,
    clientId,
    workerId,
    addressId,
    setSelectedDate,
    setStartTime,
    setWorkingHours,
    setClientId,
    setWorkerId,
    setAddressId,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
