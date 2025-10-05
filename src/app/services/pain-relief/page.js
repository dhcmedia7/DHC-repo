import React from 'react';

export const metadata = {
  title: 'ব্যথা নিরাময় চিকিৎসা - দরদী হেলথ কেয়ার (DHC)',
  description: 'যেকোনো ধরনের দীর্ঘস্থায়ী ব্যথা, যেমন - কোমর, ঘাড়, হাঁটু ব্যথা ইত্যাদির প্রাকৃতিক ও পার্শ্বপ্রতিক্রিয়াহীন চিকিৎসা নিন দরদী হেলথ কেয়ার (DHC)-তে।',
  alternates: {
    canonical: '/services/pain-relief',
  },
};

const PainReliefPage = () => {
  return (
    <>
      <h1 className="sr-only">দীর্ঘস্থায়ী ব্যথা নিরাময়ের প্রাকৃতিক চিকিৎসা</h1>
      <h2 className="sr-only">দরদী হেলথ কেয়ার (DHC) - কোমর, ঘাড় ও হাঁটু ব্যথার সেরা চিকিৎসা</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          ব্যথা নিরাময়
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          আমরা বিভিন্ন ধরণের ব্যথা নিরাময়ের জন্য প্রাকৃতিক এবং কার্যকর চিকিৎসা
          প্রদান করি।
        </p>
      </div>
    </>
  );
};

export default PainReliefPage;
