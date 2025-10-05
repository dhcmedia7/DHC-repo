
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      service,
      appointmentDate,
      appointmentTime,
      patientName,
      mobileNumber,
      age,
      gender,
    } = body;

    // Basic validation
    if (
      !service ||
      !appointmentDate ||
      !appointmentTime ||
      !patientName ||
      !mobileNumber ||
      !age ||
      !gender
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const collection = db.collection("appointments");

    // Create new appointment document
    const newAppointment = {
      service,
      appointmentDate,
      appointmentTime,
      patientName,
      mobileNumber,
      age,
      gender,
      status: "Pending", // Default status
      createdAt: new Date(),
    };

    await collection.insertOne(newAppointment);

    return NextResponse.json(
      { message: "Appointment created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Appointment creation error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const collection = db.collection("appointments");

    const appointments = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(appointments, { status: 200 });
  } catch (err) {
    console.error("Fetching appointments error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
