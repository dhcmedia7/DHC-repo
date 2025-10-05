import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, pass } = body;

    if (!email || !pass) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const collection = db.collection("auth");

    // Find admin by email and password
    const user = await collection.findOne({ email, pass });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Success
    return NextResponse.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
