import React from "react";
import FAQs from "@/components/home/FAQ";
import Header from "@/components/header/Header";
const FAQ = () => {
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
    {
      question: "How do I contact customer support?",
      answer:
        "If you need assistance or have questions, you can contact our customer support team by clicking on the 'Support' section in your profile or by sending an email to support@kaba.com.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take your privacy and security seriously. Your personal information is encrypted and stored securely. You can review our privacy policy for more details.",
    },
    // Add more FAQs here
  ];

  return (
    <div className=" ">
      <div className=" mx-32 m-6 hidden md:block">
        <Header />
      </div>
      <div className="p-6">
        <FAQs faq={faqs} />
      </div>
    </div>
  );
};

export default FAQ;
