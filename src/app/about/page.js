import React from 'react';
import About from '@/components/Home/About';

export const metadata = {
  title: 'আমাদের সম্পর্কে - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর লক্ষ্য ও উদ্দেশ্য সম্পর্কে জানুন। আমরা প্রাকৃতিক উপায়ে আপনার সুস্বাস্থ্য নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। আমাদের বিশেষজ্ঞ ডাক্তার এবং চিকিৎসা পদ্ধতি সম্পর্কে আরও জানুন।',
  alternates: {
    canonical: '/about',
  },
};

const AboutPage = () => {
  return (
    <>
      <h1 className="sr-only">দরদী হেলথ কেয়ার (DHC) এর পথচলা এবং লক্ষ্য</h1>
      <h2 className="sr-only">কেন আমরা বাংলাদেশের সেরা প্রাকৃতিক চিকিৎসা কেন্দ্র</h2>
      <About />
    </>
  );
};

export default AboutPage;
