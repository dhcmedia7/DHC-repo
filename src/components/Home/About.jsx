import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-blue-50 via-blue-50 to-green-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-40 py-20 ">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              আমাদের সম্পর্কে
            </h2>
            <div className="text-base md:text-lg text-gray-600 space-y-4 leading-relaxed">
              <p>
                দরদী হেলথ কেয়ার একটি বিশ্বস্ত প্রতিষ্ঠান যেখানে প্রাকৃতিক এবং
                পার্শ্ব-প্রতিক্রিয়াহীন চিকিৎসার মাধ্যমে মানুষের সেবা করা হয়।
                আমাদের লক্ষ্য হলো মানুষকে একটি সুস্থ ও সুন্দর জীবন উপহার দেওয়া।
              </p>
              <p>
                আমরা বিশ্বাস করি, প্রতিটি মানুষের সুস্থভাবে বেঁচে থাকার অধিকার
                আছে। সেই লক্ষ্যে, আমরা আকুপাংচার, আকুপ্রেসার, এবং হিজামা (কাপিং
                থেরাপি)-এর মতো পরীক্ষিত এবং কার্যকর বিকল্প চিকিৎসা পদ্ধতি
                ব্যবহার করে থাকি। আমাদের অভিজ্ঞ চিকিৎসক এবং থেরাপিস্টগণ যত্ন ও
                আন্তরিকতার সাথে প্রতিটি রোগীর সমস্যা শোনেন এবং ব্যক্তিগত প্রয়োজন
                অনুযায়ী চিকিৎসা পরিকল্পনা তৈরি করেন।
              </p>
              <p>
                আমাদের প্রতিষ্ঠানে আধুনিক সরঞ্জামের সাথে প্রাকৃতিক পরিবেশের
                সমন্বয় ঘটানো হয়েছে, যা রোগীদের শারীরিক ও মানসিক শান্তিতে সহায়তা
                করে। আমরা শুধু রোগ নিরাময় করি না, বরং রোগ প্রতিরোধ এবং একটি
                স্বাস্থ্যকর জীবনধারা গড়ে তোলার জন্যও পরামর্শ দিয়ে থাকি।
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/images/AbuTaherKaji.webp"
                alt="Abu Taher Kaji"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold text-gray-800">
                আবু তাহের কাজী
              </p>
              <p className="text-sm text-gray-600">
                আকুপ্রেসার, আকুপাংচার এবং হিজামা থেরাপিস্ট
              </p>
              <p className="text-sm text-gray-600">
                প্রতিষ্ঠাতা, দরদী হেলথ কেয়ার সেন্টার
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;