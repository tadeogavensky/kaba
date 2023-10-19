import { GoBack } from "@/components/GoBack";
import Card from "@/components/book/Card";
import Booking from "@/types/Booking";
import axios from "axios";
import React from "react";

const Bookings = async () => {
  const bookings = await getBookingsByUser();

  console.log("===============bookings=====================");
  console.log(bookings);
  console.log("================bookings====================");
  return (
    <div className="p-6">
      <GoBack label="Home" />
      <div className="mt-4">
        {bookings.map((booking: Booking) => {
          return (
            <div key={booking.id}>
              <Card booking={booking} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

async function getBookingsByUser() {
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/bookings`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default Bookings;
