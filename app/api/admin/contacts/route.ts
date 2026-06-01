import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Retreive contact submissions with search and status filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "ALL", "UNREAD", "READ", "ARCHIVED"
    const search = searchParams.get("q") || ""; // Search term

    const whereClause: {
      status?: string;
      OR?: Array<{
        name?: { contains: string; signupCase: undefined };
        email?: { contains: string };
        subject?: { contains: string };
        message?: { contains: string };
      }>;
    } = {};

    // Apply status filter if provided
    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    // Apply keyword search on Name, Email, Subject, or Message if provided
    if (search.trim() !== "") {
      whereClause.OR = [
        { name: { contains: search, signupCase: undefined } }, // SQLite search is case-insensitive by default
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const contacts = await db.contact.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact requests." },
      { status: 500 }
    );
  }
}

// PATCH: Update status of a submission (e.g. UNREAD -> READ -> ARCHIVED)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required for updating contact status." },
        { status: 400 }
      );
    }

    const validStatuses = ["UNREAD", "READ", "ARCHIVED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status state. Must be UNREAD, READ, or ARCHIVED." },
        { status: 400 }
      );
    }

    const updatedContact = await db.contact.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: `Message status updated to ${status}.`,
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return NextResponse.json(
      { error: "Failed to update contact request status." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a contact submission
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required to perform deletion." },
        { status: 400 }
      );
    }

    await db.contact.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Message successfully deleted from database.",
    });
  } catch (error) {
    console.error("Error deleting contact request:", error);
    return NextResponse.json(
      { error: "Failed to delete contact request." },
      { status: 500 }
    );
  }
}
