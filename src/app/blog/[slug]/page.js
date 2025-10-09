
import React from 'react';
import clientPromise from "@/app/lib/mongodb";
import { notFound } from 'next/navigation';
import { Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

async function getSingleBlog(slug) {
    try {
        const client = await clientPromise;
        const db = client.db("dorodi_health");
        const blog = await db.collection("blogs").findOne({ slug: slug });
        
        if (!blog) {
            return null;
        }
        return JSON.parse(JSON.stringify(blog));
    } catch (e) {
        console.error('Failed to fetch blog:', e);
        return null;
    }
}

async function getRelatedBlogs(category, currentSlug) {
    try {
        const client = await clientPromise;
        const db = client.db("dorodi_health");
        const relatedBlogs = await db.collection("blogs")
            .find({
                category: category,
                slug: { $ne: currentSlug } // Exclude the current blog
            })
            .limit(5) // Limit to 5 related posts
            .sort({ createdAt: -1 })
            .toArray();
        return JSON.parse(JSON.stringify(relatedBlogs));
    } catch (e) {
        console.error('Failed to fetch related blogs:', e);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const blog = await getSingleBlog(slug);
  
    if (!blog) {
      return {
        title: 'Blog Post Not Found',
      };
    }
  
    return {
      title: `${blog.title} - দরদী হেলথ কেয়ার`,
      description: blog.content.substring(0, 160),
      alternates: {
        canonical: `/blog/${blog.slug}`,
      },
    };
  }

const RelatedPosts = ({ posts }) => (
    <div className="bg-gray-50 p-6 rounded-2xl">
        <h3 className="font-bold text-xl mb-4">Related Posts</h3>
        <div className="space-y-4">
            {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex items-center gap-4 group">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold group-hover:text-blue-600 transition-colors">{post.title}</h4>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('bn-BD', { month: 'long', day: 'numeric' })}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const SingleBlogPage = async ({ params }) => {
    const slug = await params.slug;
    const blog = await getSingleBlog(slug);

    if (!blog) {
        notFound();
    }

    const relatedPosts = await getRelatedBlogs(blog.category, blog.slug);

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
      <div className="container mx-auto md:py-40 py-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main blog content */}
          <div className="w-full lg:w-3/4">
            <article className="font-noto-sans-bengali">
              <header className="mb-8">
                <div className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-green-600">
                    {blog.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <Calendar size={14} className="mr-2" />
                  <span>Published: {formattedDate}</span>
                </div>
              </header>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <p style={{ whiteSpace: "pre-wrap" }}>{blog.content}</p>
              </div>

              <footer className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center">
                  <Tag size={18} className="mr-3 text-gray-600" />
                  {Array.isArray(blog.tags) && blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>
            </article>
          </div>

          {/* Related Posts Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky top-24 h-full">
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
          </aside>
        </div>
      </div>
    );
};

export default SingleBlogPage;
