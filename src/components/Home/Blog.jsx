import React from 'react';
import Link from 'next/link';

const Blog = () => {
  return (
    <section
      id="blog"
      className=" bg-gradient-to-br from-blue-50 via-blue-50 to-green-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-40 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          আমাদের ব্লগ
        </h2>
        <p className="text-lg text-text-color mt-2">
          স্বাস্থ্য বিষয়ে জানতে আমাদের ব্লগ পড়ুন।
        </p>
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-blue-600 hover:underline font-semibold"
          >
            সব ব্লগ পোস্ট দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
