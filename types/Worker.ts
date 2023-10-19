import Rate from "./Rate";
import Service from "./Service";
import User from "./User";

type Worker = {
  id?: string;
  service?: Service;
  available: boolean;
  rate?: Rate;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  neighbourhood: string;
  street: string;
  number: string;
  totalJobs: number;
  user?: User;
  about: string;
};

export default Worker;
