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
        {workers.length > 0 ? (
          workers.map((worker: any, index: number) => {
            return (
              <div key={index}>
                <Card
                  id={worker.id}
                  firstName={worker.user.firstName}
                  lastName={worker.user.lastName}
                  profilePicture={worker.profilePicture}
                  worker={worker}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center h-full mt-4">
            <h1 className="font-body text-2xl">
              Sorry we don't have any workers at the moment for this service :(
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

async function getWorkersByService(name: string) {
  let apiUrl;

  if (process.env.NODE_ENV === "development") {

    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL!;
  } else {
    apiUrl = process.env.API_URL!;
  }

  try {

    const response = await axios.get(`${apiUrl}/api/workers/${name}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching workers by: ${name}`, error);
  }
}
