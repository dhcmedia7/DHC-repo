import React from 'react';
import Blog from '@/components/Home/Blog';

export const metadata = {
  title: 'স্বাস্থ্য ব্লগ - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর স্বাস্থ্য ব্লগে প্রাকৃতিক চিকিৎসা, ব্যথা নিরাময়, এবং স্বাস্থ্যকর জীবনযাপন নিয়ে লেখা পড়ুন। আকুপাংচার, হিজামা ও স্বাস্থ্য টিপস।',
  alternates: {
    canonical: '/blog',
  },
};

const BlogPage = () => {
  return (
    <>
      <h1 className="sr-only">দরদী হেলথ কেয়ার (DHC) এর স্বাস্থ্য বিষয়ক ব্লগ</h1>
      <h2 className="sr-only">প্রাকৃতিক চিকিৎসা ও স্বাস্থ্যকর জীবনযাপন নিয়ে সর্বশেষ তথ্য ও টিপস</h2>
      <Blog />
    </>
  );
};

export default BlogPage;
