import Address from "./Address";
import User from "./User";

type Client = {
  id: number;
  user: User;
  addresses: Address[];
};

export default Client;
