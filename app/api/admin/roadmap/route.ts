import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Retrieve all roadmap items for admin display, ordered by targetDate
export async function GET() {
  try {
    const items = await db.roadmapItem.findMany({
      orderBy: {
        targetDate: "asc",
      },
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching roadmap items for admin:", error);
    return NextResponse.json(
      { error: "Failed to load roadmap milestones." },
      { status: 500 }
    );
  }
}

// POST: Create a new roadmap item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      titleTr, 
      description, 
      descriptionTr, 
      quarter, 
      quarterTr, 
      targetDate, 
      status, 
      bgGradient, 
      glowColor 
    } = body;

    if (!title || !titleTr || !description || !descriptionTr || !quarter || !quarterTr || !targetDate) {
      return NextResponse.json(
        { error: "Missing required fields: Title, Description, Quarter (both EN and TR), and Target Date are mandatory." },
        { status: 400 }
      );
    }

    const parsedDate = new Date(targetDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid target date format." },
        { status: 400 }
      );
    }

    const newItem = await db.roadmapItem.create({
      data: {
        title: title.trim(),
        titleTr: titleTr.trim(),
        description: description.trim(),
        descriptionTr: descriptionTr.trim(),
        quarter: quarter.trim(),
        quarterTr: quarterTr.trim(),
        targetDate: parsedDate,
        status: status || "PLANNED",
        bgGradient: bgGradient ? bgGradient.trim() : "from-orange-500 to-amber-500",
        glowColor: glowColor ? glowColor.trim() : "rgba(249, 115, 22, 0.4)",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Roadmap milestone successfully created.",
      data: newItem,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to create roadmap milestone." },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing roadmap item
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { 
      id, 
      title, 
      titleTr, 
      description, 
      descriptionTr, 
      quarter, 
      quarterTr, 
      targetDate, 
      status, 
      bgGradient, 
      glowColor 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Roadmap ID is required for editing." },
        { status: 400 }
      );
    }

    const existingItem = await db.roadmapItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "The requested roadmap milestone could not be found." },
        { status: 404 }
      );
    }

    // Build update object based on what was passed
    const updateData: Record<string, string | Date | null> = {};
    if (title !== undefined) updateData.title = title.trim();
    if (titleTr !== undefined) updateData.titleTr = titleTr.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (descriptionTr !== undefined) updateData.descriptionTr = descriptionTr.trim();
    if (quarter !== undefined) updateData.quarter = quarter.trim();
    if (quarterTr !== undefined) updateData.quarterTr = quarterTr.trim();
    
    if (targetDate !== undefined) {
      const parsedDate = new Date(targetDate);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid target date format." },
          { status: 400 }
        );
      }
      updateData.targetDate = parsedDate;
    }
    
    if (status !== undefined) updateData.status = status;
    if (bgGradient !== undefined) updateData.bgGradient = bgGradient.trim();
    if (glowColor !== undefined) updateData.glowColor = glowColor.trim();

    const updatedItem = await db.roadmapItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Roadmap milestone successfully updated.",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to update roadmap milestone." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a roadmap item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Roadmap ID is required for deletion." },
        { status: 400 }
      );
    }

    await db.roadmapItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Roadmap milestone deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to delete roadmap milestone." },
      { status: 500 }
    );
  }
}
