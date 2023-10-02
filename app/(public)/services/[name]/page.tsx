import { GoBack } from "@/components/GoBack";
import Card from "@/components/worker/Card";

import type Worker from "@/types/Worker";
import { useRouter } from "next/router";

const workers = [
  {
    id: 1,
    email: "worker@example.com",
    password: "securepassword",
    firstName: "Jenny",
    lastName: "Flemming",
    street: "123 Main Street",
    city: "Cityville",
    state: "Stateville",
    postalCode: "12345",
    country: "Countryville",
    phone: "123-456-7890",
    profilePicture: "/assets/worker.jpg",
    category: {
      id: 1,
      name: "Cleaining",
      image: "",
    },
    service: {
      name: "Home Cleaning",
      description: "",
      image: "/assets/worker.jpg",
    },
    about:
      "I am a professional home cleaner with over 5 years of experience. I take pride in providing top-notch cleaning services to ensure your home is spotless and refreshed. Customer satisfaction is my priority, and I am dedicated to delivering the best service possible.",
    rate: { rate: 10 },

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
    totalJobs: 32,
  },
  {
    id: 2,
    email: "worker2@example.com",
    password: "securepassword2",
    firstName: "John",
    lastName: "Doe",
    street: "456 Elm Street",
    city: "Townville",
    state: "Statetown",
    postalCode: "54321",
    country: "Countrytown",
    about:"I am a professional lawn care expert with a passion for keeping your lawn healthy and beautiful. With years of experience, I provide top-quality lawn maintenance services. Your satisfaction is my top priority, and I am committed to delivering exceptional results.",
    phone: "987-654-3210",
    category: {
      id: 1,
      name: "Cleaning",
      image: "",
    },
    profilePicture: "/assets/worker.jpg",
    service: {
      name: "Lawn Care",
      description: "Expert lawn maintenance services.",
      image: "/assets/lawn-care.jpg",
    },
    rate: { rate: 15 },
    reviews: [
      {
        rating: 4,
        comment: "Great job on my lawn.",
        date: new Date("2023-09-28"),
      },
      {
        rating: 5,
        comment: "Professional and reliable service.",
        date: new Date("2023-09-15"),
      },
      {
        rating: 3,
        comment: "Average service, but got the job done.",
        date: new Date("2023-09-05"),
      },
    ],
    totalJobs: 12,
  },
  {
    id: 3,
    email: "worker3@example.com",
    password: "securepassword3",
    firstName: "Sarah",
    lastName: "Smith",
    street: "789 Oak Avenue",
    city: "Villagetown",
    state: "Stateville",
    postalCode: "67890",
    country: "Countryville",
    phone: "555-123-4567",
    about:
      "I am a professional lawn care expert with a passion for keeping your lawn healthy and beautiful. With years of experience, I provide top-quality lawn maintenance services. Your satisfaction is my top priority, and I am committed to delivering exceptional results.",
    category: {
      id: 3,
      name: "Repairing",
      image: "",
    },
    profilePicture: "/assets/worker.jpg",
    service: {
      name: "Plumbing",
      description: "Expert plumbing and repair services.",
      image: "/assets/plumbing.jpg",
    },
    rate: { rate: 12 },

    reviews: [
      {
        rating: 5,
        comment: "Fixed my plumbing issue quickly and efficiently.",
        date: new Date("2023-09-20"),
      },
      {
        rating: 4,
        comment: "Good plumbing work, but a bit pricey.",
        date: new Date("2023-09-10"),
      },
      {
        rating: 5,
        comment: "Highly recommended plumber!",
        date: new Date("2023-09-01"),
      },
    ],
    totalJobs: 54,
  },
];

export default function ServicesByName({ params }: any) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 group hover:text-neutral-600 transition cursor-pointer">
        <GoBack className="hover:text-neutral-600" />
        <p className="font-bold font-body text-2xl">Home</p>
      </div>
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
