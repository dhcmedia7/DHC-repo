import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-br from-blue-50 via-blue-50 to-green-50 backdrop-blur-sm
 text-gray-800 pt-16 pb-8"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">দরদী হেলথ কেয়ার</h3>
            <p className="text-gray-800">
              আমরা আকুপ্রেসার এবং আকুপাংচার চিকিৎসার মাধ্যমে আপনার
              স্বাস্থ্যসেবায় প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হলো ব্যথামুক্ত এবং
              সুস্থ জীবন নিশ্চিত করা।
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-blue-400 transition-colors"
                >
                  সেবাসমূহ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-blue-400 transition-colors"
                >
                  ব্লগ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link
                  href="/fqa"
                  className="hover:text-blue-400 transition-colors"
                >
                  প্রশ্নোত্তর
                </Link>
              </li>
              <li>
                <Link
                  href="/repertory"
                  className="hover:text-blue-400 transition-colors"
                >
                  রেপার্টরি
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">আমাদের সেবাসমূহ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/acupressure"
                  className="hover:text-blue-400 transition-colors"
                >
                  আকুপ্রেসার
                </Link>
              </li>
              <li>
                <Link
                  href="/services/acupuncture"
                  className="hover:text-blue-400 transition-colors"
                >
                  আকুপাংচার
                </Link>
              </li>
              <li>
                <Link
                  href="/services/hijama"
                  className="hover:text-blue-400 transition-colors"
                >
                  হিজামা
                </Link>
              </li>
              <li>
                <Link
                  href="/services/pain-relief"
                  className="hover:text-blue-400 transition-colors"
                >
                  ব্যথা নিরাময়
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">যোগাযোগ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-blue-400 transition-colors"
                >
                  +৮৮ ০১২৩৪ ৫৬৭৮৯০
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <a
                  href="mailto:dhcmediabd@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  dhcmediabd@gmail.com
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={22} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={22} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram size={22} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-500 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} দরদী হেলথ কেয়ার. সর্বস্বত্ব
            সংরক্ষিত.
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Designed and Developed by{" "}
            <Link
              className="underline hover:text-blue-400"
              href="https://chowondev.vercel.app/"
            >
              Chowon Hasan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;