import React from 'react';

export const metadata = {
  title: 'হিজামা থেরাপি (কাপিং) - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC)-তে অভিজ্ঞ থেরাপিস্টের মাধ্যমে নিরাপদ ও কার্যকর হিজামা (কাপিং থেরাপি) গ্রহণ করুন। শরীরকে বিষমুক্ত করুন ও নতুন শক্তি ফিরে পান।',
  alternates: {
    canonical: '/services/hijama',
  },
};

const HijamaPage = () => {
  return (
    <>
      <h1 className="sr-only">হিজামা (কাপিং থেরাপি) - শরীরকে বিষমুক্ত করার প্রাকৃতিক উপায়</h1>
      <h2 className="sr-only">দরদী হেলথ কেয়ার (DHC) - আন্তর্জাতিক মানের হিজামা সেবা</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          হিজামা
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          হিজামা বা কাপিং থেরাপি একটি প্রাচীন চিকিৎসা পদ্ধতি যা শরীরের বিষাক্ত
          রক্ত বের করে রোগ নিরাময়ে সাহায্য করে।
        </p>
      </div>
    </>
  );
};

export default HijamaPage;
