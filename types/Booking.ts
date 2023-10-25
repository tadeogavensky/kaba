import { User } from "@prisma/client";
import Address from "./Address";
import Client from "./Client";
import Service from "./Service";
import Worker from "./Worker";
import Review from "./Review";

type Booking = {
  id: number;
  date: Date;
  time: string;
  total: number;
  workingHours: number;
  service: Service;
  address: Address;
  user: User;
  client: Client;
  review: Review;
  worker: Worker;
};

export default Booking;
