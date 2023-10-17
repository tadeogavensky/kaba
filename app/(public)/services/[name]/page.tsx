import { GoBack } from "@/components/GoBack";
import Card from "@/components/worker/Card";

import type Worker from "@/types/Worker";
import axios from "axios";
import { useRouter } from "next/router";

export default async function ServicesByName({
  params: { serviceName },
}: {
  params: { serviceName: string };
}) {
  const workers = await getWorkersByService(serviceName);

  return (
    <div className="p-6">
      <GoBack label="Home" />
      <div className="flex flex-col gap-4 mt-3">
        {workers.map((worker: any, index: number) => {
          return (
            <div key={index}>
              <Card
                id={worker.id}
                firstName={worker.firstName}
                lastName={worker.lastName}
                profilePicture={worker.profilePicture}
                reviews={[]}
                worker={worker.worker}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function getWorkersByService(serviceName: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/workers/${serviceName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
