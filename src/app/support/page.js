import React from 'react';

export const metadata = {
  title: 'সাপোর্ট - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর সাপোর্ট টিমের সাথে যোগাযোগ করুন। আমাদের সেবা, অ্যাপয়েন্টমেন্ট বা অন্য যেকোনো প্রয়োজনে আমরা আপনাকে সাহায্য করতে প্রস্তুত।',
  alternates: {
    canonical: '/support',
  },
};

const SupportPage = () => {
  return (
    <>
      <h1 className="sr-only">আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন</h1>
      <h2 className="sr-only">দরদী হেলথ কেয়ার (DHC) - আপনার সেবায় আমরা সর্বদা প্রস্তুত</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center" >
          সহায়তা
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          আমাদের সহায়তা কেন্দ্র খুব শীঘ্রই আসছে। এখানে আপনারা আমাদের সাথে যোগাযোগ
          করার বিভিন্ন উপায় খুঁজে পাবেন।
        </p>
      </div>
    </>
  );
};

export default SupportPage;
