import { GoBack } from "@/components/GoBack";
import Card from "@/components/worker/Card";

import axios from "axios";
import Image from "next/image";

export default async function ServicesByName({
  params: { name },
}: {
  params: { name: string };
}) {
  const workers = await getWorkersByService(name);

  console.log('====================================');
  console.log(workers);
  console.log('====================================');

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
                  reviews={[]}
                  worker={worker}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center h-full mt-4">
            <h1 className="font-body text-2xl">
              Sorry we don't have any workers at the moment for this service.
            </h1>
            <Image src={"/assets/no-workers.svg"} alt={"no-workers"}width={600} height={600}/>
          </div>
        )}
      </div>
    </div>
  );
}

async function getWorkersByService(name: string) {
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/workers/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
