import Address from "./Address";
import Client from "./Client";
import Review from "./Review";
import Worker from "./Worker";

export type User = {
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
  reviews?: Review[];
  addresses?: Address[];
  worker?: Worker;
  client?: Client;
};
