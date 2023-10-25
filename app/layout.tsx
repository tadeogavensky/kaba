import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Kaba",
  description: "Hire services in an instant with Kaba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <BookingProvider>
          
            {children}

            <Navbar />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
