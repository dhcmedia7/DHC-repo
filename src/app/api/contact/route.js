
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Send email notification
    await resend.emails.send({
      from: "Dorodi Healthcare <noreply@dorodihealthcare.com>", // Must be a verified domain in Resend
      to: "dhcmediabd@gmail.com",
      subject: "New Contact Form Submission",
      reply_to: `"${name}" <${phone}@unknown.com>`, // A trick to have a name on the reply-to
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
