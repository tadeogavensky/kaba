import Address from "./Address";
import Review from "./Review";
import User from "./User";

type Client = {
  id: number;
  user: User;
  addresses: Address[];
  reviews?: Review[];
};

export default Client;
