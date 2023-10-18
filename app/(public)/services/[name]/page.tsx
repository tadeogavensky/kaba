import { GoBack } from "@/components/GoBack";
import Card from "@/components/worker/Card";

import axios from "axios";

export default async function ServicesByName({
  params: { name },
}: {
  params: { name: string };
}) {
  const workers = await getWorkersByService(name);

  return (
    <div className="p-6">
      <GoBack label="Home" />
      <div className="flex flex-col gap-4 mt-3">
        {workers.map((worker: any, index: number) => {
          return (
            <div key={index}>
              <Card
                id={worker.id}
                firstName={worker.user.firstName}
                lastName={worker.user.lastName}
                profilePicture={worker.profilePicture}
                reviews={[]}
                worker={worker}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function getWorkersByService(name: string) {
  console.log(name);
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/workers/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
