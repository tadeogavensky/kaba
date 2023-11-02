import Client from "@/components/account/Client";
import Worker from "@/components/account/Worker";
import Header from "@/components/header/Header";
import axios from "axios";

export default async function Account({
  params: { id },
}: {
  params: { id: string };
}) {
  const userData = await getUser(id);

  return (
    <div className="p-6 ">
      <div className="m-6 sm:mx-32 hidden lg:block">
        <Header />
      </div>
      {userData?.role === "client" && <Client />}
      {userData?.role === "worker" && <Worker />}
    </div>
  );
}

async function getUser(id: string) {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }

  try {
    const response = await axios.get(`${apiUrl}/api/user/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
