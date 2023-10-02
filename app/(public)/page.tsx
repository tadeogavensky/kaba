import BannerSlider from "@/components/BannerSlider";
import Header from "@/components/Header";
import InputSearch from "@/components/InputSearch";
import PopularServices from "@/components/services/PopularServices";
import Services from "@/components/services/Services";
import Image from "next/image";
const client = {
  id: 1,
  email: "cliente@example.com",
  password: "hashedPassword",
  firstName: "Tadeo",
  lastName: "Gavensky",
  profilePicture: "profile.jpg",
  phone:"1160204654"
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="m-6">
        <Header client={client} />
        <InputSearch />
        <BannerSlider />
        <Services />
        <PopularServices />
      </div>
    </main>
  );
}
