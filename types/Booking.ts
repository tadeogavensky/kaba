import { User } from "@prisma/client";
import Address from "./Address";
import Client from "./Client";
import Service from "./Service";
import Worker from "./Worker";

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
  worker: Worker;
};

export default Booking;
