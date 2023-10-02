import Booking from "./Booking";
import Category from "./Category";
import Rate from "./Rate";
import Review from "./Review";
import Service from "./Service";

type Worker = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  about: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  profilePicture: string;
  service: Service;
  rate: Rate;
  totalJobs: number;
  reviews: Review[];
  category: Category;
};

export default Worker;
