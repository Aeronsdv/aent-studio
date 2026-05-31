import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Retrieve all published projects for public display
export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching published projects for public site:", error);
    return NextResponse.json(
      { error: "Failed to load projects." },
      { status: 500 }
    );
  }
}
