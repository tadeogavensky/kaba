import Booking from "./Booking";
import Client from "./Client";
import Review from "./Review";
import Worker from "./Worker";

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  image?: string;
  phone?: string;
  identity?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  role?: string;
  active?: boolean;
  bookings?: Booking[];
  notifications?: Notification[];
  worker?: Worker;
  client?: Client;
};

export default User;
