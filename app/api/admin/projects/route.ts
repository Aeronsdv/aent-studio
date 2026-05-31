import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Reusable slug generator utility
function slugify(text: string) {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
  };
  
  let result = text.toString();
  for (const key in trMap) {
    result = result.replace(new RegExp(key, 'g'), trMap[key]);
  }

  return result
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w\-]+/g, "")       // Remove all non-word chars except dashes
    .replace(/\-\-+/g, "-")         // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start
    .replace(/-+$/, "");            // Trim - from end
}

// GET: Retrieve all projects for administrative display
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects for admin:", error);
    return NextResponse.json(
      { error: "Failed to load projects." },
      { status: 500 }
    );
  }
}

// POST: Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      titleTr, 
      category, 
      categoryTr, 
      desc, 
      descTr, 
      coverImage, 
      bgGradient, 
      glowColor, 
      demoUrl, 
      githubUrl, 
      published 
    } = body;

    if (!title || !titleTr || !category || !categoryTr || !desc || !descTr) {
      return NextResponse.json(
        { error: "Missing required fields: Title, Category, and Description (both EN and TR) are mandatory." },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title);
    let finalSlug = baseSlug;
    let count = 1;

    // Check slug uniqueness and append a counter if collision occurs
    while (true) {
      const existing = await db.project.findUnique({
        where: { slug: finalSlug },
      });
      if (!existing) break;
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    const newProject = await db.project.create({
      data: {
        title: title.trim(),
        titleTr: titleTr.trim(),
        slug: finalSlug,
        category: category.trim(),
        categoryTr: categoryTr.trim(),
        desc: desc.trim(),
        descTr: descTr.trim(),
        coverImage: coverImage ? coverImage.trim() : null,
        bgGradient: bgGradient ? bgGradient.trim() : "from-blue-600 via-indigo-500 to-purple-600",
        glowColor: glowColor ? glowColor.trim() : "rgba(59, 130, 246, 0.4)",
        demoUrl: demoUrl ? demoUrl.trim() : null,
        githubUrl: githubUrl ? githubUrl.trim() : null,
        published: published === undefined ? true : !!published,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project successfully created in database.",
      data: newProject,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing project or toggle its publish state
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { 
      id, 
      title, 
      titleTr, 
      category, 
      categoryTr, 
      desc, 
      descTr, 
      coverImage, 
      bgGradient, 
      glowColor, 
      demoUrl, 
      githubUrl, 
      published 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required for editing." },
        { status: 400 }
      );
    }

    const existingProject = await db.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "The requested project could not be found." },
        { status: 404 }
      );
    }

    // Build update object based on what was passed
    const updateData: Record<string, string | boolean | null> = {};
    if (title !== undefined) {
      updateData.title = title.trim();
      // Generate new slug if title changed
      if (title.trim() !== existingProject.title) {
        const baseSlug = slugify(title);
        let finalSlug = baseSlug;
        let count = 1;
        while (true) {
          const existing = await db.project.findFirst({
            where: { slug: finalSlug, id: { not: id } },
          });
          if (!existing) break;
          finalSlug = `${baseSlug}-${count}`;
          count++;
        }
        updateData.slug = finalSlug;
      }
    }
    if (titleTr !== undefined) updateData.titleTr = titleTr.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (categoryTr !== undefined) updateData.categoryTr = categoryTr.trim();
    if (desc !== undefined) updateData.desc = desc.trim();
    if (descTr !== undefined) updateData.descTr = descTr.trim();
    if (coverImage !== undefined) updateData.coverImage = coverImage ? coverImage.trim() : null;
    if (bgGradient !== undefined) updateData.bgGradient = bgGradient.trim();
    if (glowColor !== undefined) updateData.glowColor = glowColor.trim();
    if (demoUrl !== undefined) updateData.demoUrl = demoUrl ? demoUrl.trim() : null;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl ? githubUrl.trim() : null;
    if (published !== undefined) updateData.published = !!published;

    const updatedProject = await db.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Project successfully updated.",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required for deletion." },
        { status: 400 }
      );
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
