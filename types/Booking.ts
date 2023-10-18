import Address from "./Address";
import Client from "./Client";
import Service from "./Service";
import Worker from "./Worker";

type Booking = {
  id: number;
  date: Date;
  time: string;
  workingHours: number;
  service: Service;
  address: Address;
  client: Client;
  worker: Worker;
};

export default Booking;
