import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Retrieve all published blog posts for public display, sorted by creation date
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching published blog posts for public site:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts." },
      { status: 500 }
    );
  }
}
