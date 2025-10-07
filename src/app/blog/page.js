import React from 'react';
import Link from 'next/link';
import clientPromise from "@/app/lib/mongodb";
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'স্বাস্থ্য ব্লগ - দরদী হেলথ কেয়ার (DHC)',
  description: 'দরদী হেলথ কেয়ার (DHC) এর স্বাস্থ্য ব্লগে প্রাকৃতিক চিকিৎসা, ব্যথা নিরাময়, এবং স্বাস্থ্যকর জীবনযাপন নিয়ে লেখা পড়ুন। আকুপাংচার, হিজামা ও স্বাস্থ্য টিপস।',
  alternates: {
    canonical: '/blog',
  },
};

async function getBlogs() {
    try {
        const client = await clientPromise;
        const db = client.db("dorodi_health");
        const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
        // We need to serialize the _id to a string
        return JSON.parse(JSON.stringify(blogs));
    } catch (e) {
        console.error('Failed to fetch blogs:', e);
        return [];
    }
}

const BlogCard = ({ post }) => {
    const excerpt = post.content.substring(0, 100) + '...';
    const formattedDate = new Date(post.createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <Link href={`/blog/${post.slug}`} className="block group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
                <Image width={900} height={900} src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category}</div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar size={14} className="mr-2" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">#{tag}</span>
                        ))}
                    </div>
                    <div className="flex items-center text-blue-500 font-semibold">
                        <span>আরও পড়ুন</span>
                        <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

const BlogPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="bg-gray-50 py-20 md:py-40 font-noto-sans-bengali">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">আমাদের ব্লগ</h1>
                <p className="text-lg text-gray-600 mt-2">প্রাকৃতিক চিকিৎসা ও স্বাস্থ্যকর জীবনযাপন নিয়ে সর্বশেষ তথ্য ও টিপস।</p>
            </div>

            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(post => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    {/* <h2 className="text-2xl font-semibold text-gray-700">কোনো ব্লগ পোস্ট পাওয়া যায়নি।</h2> */}
                    <p className="text-gray-500 mt-2">শীঘ্রই আমরা নতুন পোস্ট নিয়ে আসব। সাথেই থাকুন!</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default BlogPage;