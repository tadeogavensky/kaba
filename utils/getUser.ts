import axios from "axios";

export const getUser = async (userId: string) => {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }
  const { data } = await axios(`${apiUrl}/api/user/${userId}`);
};
