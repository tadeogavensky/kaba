import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/contexts/AuthContext";

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
      <body className={inter.className}>
        <AuthProvider>
          <div id="home">
            <Navbar />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
