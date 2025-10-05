import React from 'react';

export const metadata = {
  title: 'আকুপাংচার চিকিৎসা - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC)-তে বিশ্বমানের আকুপাংচার চিকিৎসার মাধ্যমে দীর্ঘস্থায়ী ব্যথা ও জটিল রোগ থেকে আরোগ্য লাভ করুন।',
  alternates: {
    canonical: '/services/acupuncture',
  },
};

const AcupuncturePage = () => {
  return (
    <>
      <h1 className="sr-only">আকুপাংচার চিকিৎসা - নিরাপদ ও কার্যকর রোগ নিরাময়</h1>
      <h2 className="sr-only">দরদী হেলথ কেয়ার (DHC) - বাংলাদেশের সেরা আকুপাংচার ক্লিনিক</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          অ্যাকুপাংচার
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          অ্যাকুপাংচার হলো একটি প্রাচীন চীনা চিকিৎসা পদ্ধতি যেখানে শরীরের
          নির্দিষ্ট বিন্দুতে সূঁচ ফুটিয়ে রোগ নিরাময় করা হয়।
        </p>
      </div>
    </>
  );
};

export default AcupuncturePage;
