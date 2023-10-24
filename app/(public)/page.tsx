import BannerSlider from "@/components/BannerSlider";
import Header from "@/components/header/Header";
import AddressSelector from "@/components/home/AddressSelector";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import SignUp from "@/components/home/SignUp";
import InputSearch from "@/components/InputSearch";
import PopularServices from "@/components/services/PopularServices";
import Services from "@/components/services/Services";
const faqs = [
  {
    question: "How do I sign up as a client?",
    answer:
      "To sign up as a client, go to our website and click on the 'Join Now' button. Fill out the required information, and you'll be all set! Remember to verify your account via the email sent to access key features of Kaba.",
  },
  {
    question: "As a KabaProp, can I change the service I do?",
    answer:
      "Yes, you can change your service. Just go to your profile and select the dashboard section to make the change.",
  },
  {
    question: "How can I leave a review for a worker?",
    answer:
      "You can leave a review for a worker by going to your booking history and clicking on the 'Leave a Review' button.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We offer multiple payment options for your convenience, including credit/debit cards, and more.",
  },
];
export default function Home() {
  console.log(process.env.API_URL);

  return (
    <main className="mb-40">
      <div className="m-6 sm:mx-32">
        <Header />
        {/* Only from tablet to desktop */}
        <div className="hidden sm:flex flex-col gap-10 mt-10">
          <Hero />
          <SignUp />
          <FAQ faq={faqs} />
        </div>

        {/* Only on mobile */}
        <div className="sm:hidden">
          <AddressSelector />
          <InputSearch />
          <BannerSlider />
          <Services />
          <PopularServices />
        </div>
      </div>
    </main>
  );
}
