"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import AppoinButton from "../Appoinments/AppoinButton";

const services = [
  {
    title: "আকুপ্রেসার",
    description:
      "আকুপ্রেসার একটি প্রাচীন চিকিৎসা পদ্ধতি যা শরীরের নির্দিষ্ট বিন্দুতে চাপ প্রয়োগ করে বিভিন্ন রোগ নিরাময় করে এবং শক্তি প্রবাহকে ভারসাম্যপূর্ণ করে।",
    image: "/images/acupressure.webp",
  },
  {
    title: "আকুপাংচার",
    description:
      "আকুপাংচার হলো একটি ঐতিহ্যবাহী চীনা চিকিৎসা পদ্ধতি যেখানে শরীরের নির্দিষ্ট বিন্দুতে পাতলা সূঁচ প্রবেশ করিয়ে রোগের চিকিৎসা ও প্রতিরোধ করা হয়।",
    image: "/images/acupuncture.webp",
  },
  {
    title: "হিজামা (কাপিং থেরাপি)",
    description:
      "হিজামা বা কাপিং থেরাপি হলো একটি প্রাচীন চিকিৎসা পদ্ধতি যেখানে ত্বকের উপর কাপ বসিয়ে রক্ত সঞ্চালন উন্নত করা হয় এবং শরীর থেকে দূষিত পদার্থ বের করা হয়।",
    image: "/images/hijama.webp",
  },
];

const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


const ServicesSlider = () => {
  return (
    <section className="pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="mySwiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col-reverse md:flex-row mb-16">
                  <div className="md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center border border-gray-200">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="">
                        <AppoinButton>অ্যাপয়েন্টমেন্ট নিন</AppoinButton>
                      </div>
                      <button
                        href="tel:+8801777276072"
                        className="bg-white text-blue-500 border border-blue-500 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-teal-50 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        এখনই কল করুন
                      </button>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="w-full h-full bg-gray-200">
                      <Image
                        src={service.image}
                        width={900}
                        height={600}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center items-center z-10">
            <div className="swiper-button-prev-custom cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ArrowLeft />
            </div>
            <div className="swiper-pagination-custom mx-4 !w-auto"></div>
            <div className="swiper-button-next-custom cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
