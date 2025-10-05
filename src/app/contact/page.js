import React from 'react';
import Contact from '@/components/Home/Contact';

export const metadata = {
  title: 'যোগাযোগ - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর সাথে যোগাযোগ করুন। অ্যাপয়েন্টমেন্ট, ঠিকানা এবং যেকোনো জিজ্ঞাসার জন্য আমাদের সাথে সরাসরি কথা বলুন বা ইমেইল করুন।',
  alternates: {
    canonical: '/contact',
  },
};

const ContactPage = () => {
  return (
    <>
      <h1 className="sr-only">যোগাযোগ করুন - দরদী হেলথ কেয়ার (DHC)</h1>
      <h2 className="sr-only">অ্যাপয়েন্টমেন্ট ও তথ্যের জন্য আমাদের ঠিকানা ও ফোন নাম্বার</h2>
      <Contact />
    </>
  );
};

export default ContactPage;
