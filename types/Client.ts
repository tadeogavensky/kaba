import Address from "./Address";
import Chat from "./Chat";
import Review from "./Review";
import User from "./User";

type Client = {
  id: number;
  user: User;
  addresses: Address[];
  reviews?: Review[];
  chats?: Chat[];
};

export default Client;
