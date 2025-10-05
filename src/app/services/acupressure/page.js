import React from 'react';

export const metadata = {
  title: 'আকুপ্রেসার চিকিৎসা - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC)-তে অভিজ্ঞ থেরাপিস্টের মাধ্যমে নিরাপদ ও কার্যকর আকুপ্রেসার চিকিৎসা গ্রহণ করুন। ব্যথা ও বিভিন্ন রোগ থেকে মুক্তি পান।',
  alternates: {
    canonical: '/services/acupressure',
  },
};

const AcupressurePage = () => {
  return (
    <>
      <h1 className="sr-only">আকুপ্রেসার চিকিৎসা - পার্শ্বপ্রতিক্রিয়াহীন ব্যথা নিরাময়</h1>
      <h2 className="sr-only">দরদী হেলথ কেয়ার (DHC) এর অভিজ্ঞ আকুপ্রেসার বিশেষজ্ঞ</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          অ্যাকুপ্রেশার
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          অ্যাকুপ্রেশার একটি প্রাচীন চিকিৎসা পদ্ধতি যা শরীরের নির্দিষ্ট বিন্দুতে
          চাপ দিয়ে রোগ নিরাময় করে। এটি ব্যথামুক্ত এবং পার্শ্ব-প্রতিক্রিয়াহীন।
        </p>
      </div>
    </>
  );
};

export default AcupressurePage;
