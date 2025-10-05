import React from "react";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import AppoinButton from "../Appoinments/AppoinButton";
const videoHome = "/images/hero.webm";

const Hero = () => {


  return (
    <section
      id="home"
      className="md:pt-50 pt-40  md:pb-0 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row md:gap-10 gap-5 items-center">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            দরদী হেলথ কেয়ার
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg  my-6">
            দরদী হেলথ কেয়ার-এ আমরা বিশ্বমানের আকুপ্রেসার, আকুপাংচার ও হিজামা
            চিকিৎসার মাধ্যমে আপনার সুস্বাস্থ্য নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
          </p>

          {/* USP */}
          <div className="text-gray-600 space-y-2 my-8 flex gap-5 md:hidden">
            <div className=" w-1/2">
              <Image
                src="/images/harbal.webp"
                width={60}
                height={60}
                alt=""
                className="mx-auto"
              />
              <p className="">১০০% প্রাকৃতিক চিকিৎসা</p>
            </div>

            <div className="w-1/2">
              <Image
                src="/images/certi.webp"
                width={60}
                height={60}
                alt=""
                className="mx-auto"
              />
              <p> অভিজ্ঞ ও সার্টিফায়েড থেরাপিস্ট</p>
            </div>
          </div>

          {/* CTA */}
          <div className="md:w-2/3 md:flex gap-4">
            <div className="w-full">
              <AppoinButton>অ্যাপয়েন্টমেন্ট নিন</AppoinButton>
            </div>
            <div className="w-full">
              <a
                href="#appointment"
                className="hidden md:flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Noto Sans Bengali, Arial, sans-serif" }}
              >
                <Phone className="w-4 h-4" />
                <span>কল করুন</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Illustration / Animation */}
        <div className="md:w-1/2 flex justify-center animate-bounce-slow">
          <div className="">
            <video
              preload="metadata"
              autoPlay
              loop
              muted
              className="myVideo rounded-md"
            >
              <source src={videoHome} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:block hidden mt-20">
        {/* USP */}
        <div className="text-gray-600 space-y-2 my-8 flex justify-center gap-5">
          <div className=" w-1/2 text-center">
            <Image
              src="/images/harbal.webp"
              width={60}
              height={60}
              alt=""
              className="mx-auto"
            />
            <p className="">১০০% প্রাকৃতিক চিকিৎসা</p>
          </div>

          <div className="w-1/2 text-center">
            <Image
              src="/images/certi.webp"
              width={60}
              height={60}
              alt=""
              className="mx-auto"
            />
            <p> অভিজ্ঞ ও সার্টিফায়েড থেরাপিস্ট</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
