
import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongodb";

// This helper function is now only for initializing the database on the first run.
const generateTimeSlots = (startHour, endHour, intervalMinutes, maxPatients) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0);
  
    const endTime = new Date();
    endTime.setHours(endHour, 0, 0, 0);
  
    let idCounter = 1;
    while (currentTime < endTime) {
      const startTime = new Date(currentTime);
      const slotEndTime = new Date(currentTime.getTime() + intervalMinutes * 60 * 1000);
  
      if (slotEndTime > endTime) break;
  
      slots.push({
        id: idCounter++,
        time: `${startTime.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: 'numeric', hour12: true })} - ${slotEndTime.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
        maxPatients: maxPatients,
        isEnabled: true,
      });
  
      currentTime = slotEndTime;
    }
    return slots;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const context = searchParams.get('context');
    const date = searchParams.get('date');

    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const timeSlotsCollection = db.collection("timeslots");

    // --- Master Slot List --- //
    let masterSlots = await timeSlotsCollection.find({}).sort({ id: 1 }).toArray();

    // If no slots exist in the DB, generate and insert them.
    if (masterSlots.length === 0) {
      const initialSlots = generateTimeSlots(10, 17, 90, 5);
      await timeSlotsCollection.insertMany(initialSlots);
      masterSlots = initialSlots;
    }

    // --- Admin Context --- //
    // If the request is from the admin dashboard, return all master slots with their settings.
    if (context === 'admin') {
      // Optionally, you could enrich this with total booking counts across all days if needed.
      return NextResponse.json(masterSlots);
    }

    // --- Public Context (Appointment Form) --- //
    if (!date) {
        return NextResponse.json({ message: "Date parameter is required" }, { status: 400 });
    }

    // --- Calculate Booked Counts for the given Date --- //
    const appointmentsCollection = db.collection("appointments");
    const bookingCounts = await appointmentsCollection.aggregate([
        { $match: { appointmentDate: date } },
        { $group: { _id: "$appointmentTime", count: { $sum: 1 } } },
    ]).toArray();

    // Create a map for easy lookup of booked counts
    const bookedCountMap = new Map();
    bookingCounts.forEach(item => {
        bookedCountMap.set(item._id, item.count);
    });

    // --- Combine and Filter --- //
    // Map over the master slots and enrich them with the dynamic booking count for the specific date.
    const availableSlots = masterSlots
      .filter(slot => slot.isEnabled) // Only consider slots enabled by the doctor
      .map(slot => {
        const bookedPatients = bookedCountMap.get(slot.time) || 0;
        return {
          ...slot,
          bookedPatients: bookedPatients,
        };
      })
      .filter(slot => slot.bookedPatients < slot.maxPatients); // Filter out fully booked slots

    return NextResponse.json(availableSlots);

  } catch (error) {
    console.error("Error fetching time slots:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const updatedSlots = await request.json();
    const client = await clientPromise;
    const db = client.db("dorodi_health");
    const collection = db.collection("timeslots");

    const bulkOperations = updatedSlots.map(slot => ({
      updateOne: {
        filter: { id: slot.id },
        update: { $set: { isEnabled: slot.isEnabled, maxPatients: slot.maxPatients } },
        upsert: true,
      },
    }));

    if (bulkOperations.length > 0) {
        await collection.bulkWrite(bulkOperations);
    }

    return NextResponse.json({ message: "Time slots updated successfully" });
  } catch (error) {
    console.error("Error updating time slots:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
