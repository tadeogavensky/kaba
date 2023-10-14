import Booking from "./Booking";
import Category from "./Category";
import Rate from "./Rate";
import Review from "./Review";
import Service from "./Service";
import { User } from "./User";

type Worker = {
  id: number;
  service: Service;
  rate: Rate;
  totalJobs: number;
};

export default Worker;
