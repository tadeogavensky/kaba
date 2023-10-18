import Client from "@/components/account/Client";
import Worker from "@/components/account/Worker";
import axios from "axios";

export default async function Account({
  params: { id },
}: {
  params: { id: string };
}) {
  const userData = await getUser(id);

  return (
    <div className="p-6 min-h-screen">
      {userData?.role === "client" && <Client />}
      {userData?.role === "worker" && <Worker />}
    </div>
  );
}

async function getUser(id: string) {
  try {
    const response = await axios.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
