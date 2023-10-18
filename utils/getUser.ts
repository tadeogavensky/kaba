import axios from "axios";
const apiUrl = process.env.API_URL;

export const getUser = async (userId: string) => {
  const { data } = await axios(`${apiUrl}/api/user/${userId}`);
};
