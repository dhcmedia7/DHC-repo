import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ post }) => {
    const excerpt = post.content.substring(0, 80) + '...';
    const formattedDate = new Date(post.createdAt).toLocaleDateString('bn-BD', {
        month: 'long', day: 'numeric'
    });

    return (
      <Link
        href={`/blog/${post.slug}`}
        className="block group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <span className="text-xs font-semibold text-green-500 uppercase">
            {post.category}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h3>
          <p>{excerpt}</p>
          <div className="flex items-center text-xs text-gray-500 mt-3">
            <Calendar size={14} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
    );
};

const Blog = ({ blogs }) => {
  return (
    <section id="blog" className="bg-gray-50 font-noto-sans-bengali">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">স্বাস্থ্য কথা</h2>
            <p className="text-lg text-gray-600">আমাদের ব্লগে স্বাস্থ্য, চিকিৎসা ও জীবনধারা নিয়ে পড়ুন।</p>
        </div>
        
        {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(post => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-500">
                <p>শীঘ্রই নতুন ব্লগ পোস্ট আসছে...</p>
            </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            সকল ব্লগ পোস্ট দেখুন
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;