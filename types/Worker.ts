
import Rate from "./Rate";
import Service from "./Service";

type Worker = {
  id?: number;
  service: Service;
  rate: Rate;
  country: String;
  state: String;
  city: String;
  postalCode: String;
  neighbourhood: String;
  street: String;
  number: String;
  totalJobs: number;
  about: string;
};

export default Worker;
