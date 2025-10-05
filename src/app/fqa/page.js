import React from 'react';

export const metadata = {
  title: 'সাধারণ জিজ্ঞাসা (FAQ) - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর চিকিৎসা সম্পর্কিত সাধারণ প্রশ্ন ও উত্তর। আকুপাংচার, হিজামা, চিকিৎসা পদ্ধতি, এবং অ্যাপয়েন্টমেন্ট নিয়ে আপনার সকল প্রশ্নের উত্তর জানুন।',
  alternates: {
    canonical: '/fqa',
  },
};

const QAPage = () => {
  return (
    <>
      <h1 className="sr-only">সাধারণ জিজ্ঞাসা (FAQ) - দরদী হেলথ কেয়ার (DHC)</h1>
      <h2 className="sr-only">আমাদের চিকিৎসা ও সেবা সম্পর্কিত আপনার সকল প্রশ্নের উত্তর</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          প্রশ্নোত্তর
        </p>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
          আপনাদের সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন। আমাদের প্রশ্নোত্তর পর্বটি
          খুব শীঘ্রই আসছে।
        </p>
      </div>
    </>
  );
};

export default QAPage;
