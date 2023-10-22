import BannerSlider from "@/components/BannerSlider";
import Header from "@/components/header/Header";
import Hero from "@/components/Hero";
import InputSearch from "@/components/InputSearch";
import PopularServices from "@/components/services/PopularServices";
import Services from "@/components/services/Services";
const client = {
  id: 1,
  email: "cliente@example.com",
  password: "hashedPassword",
  firstName: "Tadeo",
  lastName: "Gavensky",
  profilePicture: "profile.jpg",
  phone: "1160204654",
};

export default function Home() {

  console.log(process.env.API_URL);


  
  return (
    <main className="mb-40">
      <div className="m-6 sm:mx-32">
        <Header />
        {/* Only from tablet to desktop */}
        <div className="hidden sm:block mt-10">
          <Hero />
        </div>

        {/* Only on mobile */}
        <div className="sm:hidden">
          <InputSearch />
          <BannerSlider />
          <Services />
          <PopularServices />
        </div>
      </div>
    </main>
  );
}
