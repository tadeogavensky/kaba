import Client from "./Client";
import Worker from "./Worker";

import Message from "./Message";
type Chat = {
  id: string;
  messages: Message[];
  client?: Client;
  worker?: Worker;
};

export default Chat;
