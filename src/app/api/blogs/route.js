
import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongodb";
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to generate a URL-friendly slug
const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^ঀ-৿०-९a-z0-9-]/g, '') // Allow Bengali characters and numbers
      .replace(/--+/g, '-');
  };

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, category, tags, image } = body;

    if (!title || !content || !category || !image) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'dorodi_health_blogs', // Create an upload preset in your Cloudinary account
    });

    const imageUrl = uploadResponse.secure_url;

    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const collection = db.collection("blogs");

    const slug = generateSlug(title);

    const newBlog = {
      title,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()), // Assuming tags is a comma-separated string
      imageUrl,
      slug,
      createdAt: new Date(),
    };

    await collection.insertOne(newBlog);

    return NextResponse.json({ message: "Blog published successfully", blog: newBlog }, { status: 201 });

  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const client = await clientPromise;
      const db = client.db("dorodi_health");
      const collection = db.collection("blogs");
  
      const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();
  
      return NextResponse.json(blogs, { status: 200 });
    } catch (err) {
      console.error("Fetching blogs error:", err);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }

  export async function PUT(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const body = await req.json();
      const { title, content, category, tags, image } = body;
  
      if (!id) {
        return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
      }
  
      let imageUrl;
      if (image && image.startsWith('data:image')) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: 'dorodi_health_blogs',
        });
        imageUrl = uploadResponse.secure_url;
      }
  
      const client = await clientPromise;
      const db = client.db("dorodi_health");
      const collection = db.collection("blogs");
  
      const updateData = {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        updatedAt: new Date(),
      };
  
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }
  
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  
      return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("Blog update error:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  
  export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("dorodi_health");
      const collection = db.collection("blogs");
  
      await collection.deleteOne({ _id: new ObjectId(id) });
  
      return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("Blog deletion error:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
