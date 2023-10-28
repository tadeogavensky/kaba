import Address from "./Address";
import Inbox from "./Inbox";
import Review from "./Review";
import User from "./User";

type Client = {
  id: number;
  user: User;
  addresses: Address[];
  reviews?: Review[];
  inboxes?: Inbox[];
};

export default Client;
