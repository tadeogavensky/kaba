import { GoBack } from "@/components/GoBack";
import Card from "@/components/worker/Card";

import type Worker from "@/types/Worker";
import { useRouter } from "next/router";

const workers = [
  {
    email: "worker@example.com",
    firstName: "Jenny",
    lastName: "Flemming",
    phone: "123-456-7890",
    worker: {
      street: "123 Main Street",
      country: "Countryville",
      city: "Cityville",
      number: "4624",
      postalCode: "12345",
      neighbourhood: "Palermo",
      state: "Stateville",
      service: {
        name: "Home Cleaning",
        description: "",
        image: "/assets/worker.jpg",
        category: {
          id:"1",
          name: "Cleaning",
        },
      },
      rate: { rate: 10 },
      totalJobs: 25,
      about:
        "I am a professional home cleaner with over 5 years of experience. I take pride in providing top-notch cleaning services to ensure your home is spotless and refreshed. Customer satisfaction is my priority, and I am dedicated to delivering the best service possible.",
    },
    profilePicture: "/assets/worker.jpg",
    reviews: [
      {
        rating: 5,
        comment: "Excellent service. Very professional.",
        date: new Date("2023-10-01"),
      },
      {
        rating: 4,
        comment: "Good work, but a little late.",
        date: new Date("2023-09-25"),
      },
      {
        rating: 5,
        comment: "Incredible! Will definitely hire again.",
        date: new Date("2023-09-20"),
      },
      {
        rating: 2,
        comment: "Not satisfied with the quality of work.",
        date: new Date("2023-09-15"),
      },
      {
        rating: 3,
        comment: "Average service, could be better.",
        date: new Date("2023-09-10"),
      },
      {
        rating: 1,
        comment: "Terrible experience. Would not recommend.",
        date: new Date("2023-09-05"),
      },
    ],
  },
  // You can add more worker objects here if needed
];


export default function ServicesByName({ params }: any) {
  return (
    <div className="p-6">
      <GoBack label="Home" />
      <div className="flex flex-col gap-4 mt-3">
        {workers.map((worker, index) => {
          return (
            <div key={index}>
             <Card {...worker} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
