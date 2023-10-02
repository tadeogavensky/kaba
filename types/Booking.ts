import Address from "./Address";
import Client from "./Client";

type Booking = {
  id: number;
  date: Date;
  time: string;
  address: Address;
  client: Client;
  worker: Worker;
};

export default Booking;
