import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Retrieve all roadmap items for public display, sorted chronologically
export async function GET() {
  try {
    const items = await db.roadmapItem.findMany({
      orderBy: {
        targetDate: "asc",
      },
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching roadmap items for public site:", error);
    return NextResponse.json(
      { error: "Failed to load roadmap milestones." },
      { status: 500 }
    );
  }
}
