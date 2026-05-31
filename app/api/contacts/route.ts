import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Direct input validations
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are mandatory." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save message to SQLite database using Prisma client
    const newContact = await db.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: (subject || "No Subject").trim(),
        message: message.trim(),
        status: "UNREAD",
      },
    });

    return NextResponse.json(
      { success: true, message: "Contact request submitted successfully.", data: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating contact request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred on the server. Please try again." },
      { status: 500 }
    );
  }
}
