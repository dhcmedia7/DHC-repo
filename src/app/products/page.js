import React from 'react';

export const metadata = {
  title: 'প্রোডাক্টস - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর স্বাস্থ্যকর প্রোডাক্টস সম্পর্কে জানুন। আমরা শীঘ্রই বিভিন্ন প্রাকৃতিক ও হারবাল পণ্য নিয়ে আসছি।',
  alternates: {
    canonical: '/products',
  },
};

const ProductsPage = () => {
  return (
    <>
      <h1 className="sr-only">স্বাস্থ্যকর প্রোডাক্টস - দরদী হেলথ কেয়ার (DHC)</h1>
      <h2 className="sr-only">প্রাকৃতিক ও হারবাল পণ্যের সমাহার</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          প্রোডাক্ট
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          আমাদের প্রোডাক্ট পেজটি খুব শীঘ্রই আসছে। এখানে আপনারা স্বাস্থ্যকর বিভিন্ন
          প্রোডাক্ট খুঁজে পাবেন।
        </p>
      </div>
    </>
  );
};

export default ProductsPage;
