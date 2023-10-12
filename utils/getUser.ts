import axios from "axios";

export const getUser = async (userId: string) => {
  const { data } = await axios(`/api/user/${userId}`);
};
