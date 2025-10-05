"use client";
import AppoinButton from "../Appoinments/AppoinButton";

// Example usage component showing how to connect with buttons
const CTA = () => {


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-200 to-green-200 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          স্বাস্থ্যকর জীবনের জন্য
        </h2>
        <p className="text-lg mb-8 opacity-90 text-gray-800">
          প্রাকৃতিক পদ্ধতিতে চিকিৎসা সেবা নিন
        </p>

        {/* Hero Appointment Button */}
        <AppoinButton>এখনই অ্যাপয়েন্টমেন্ট নিন</AppoinButton>
      </section>
    </div>
  );
};

export default CTA;
