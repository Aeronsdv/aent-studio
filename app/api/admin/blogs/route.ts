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

// GET: Retreive all blog posts for administrative display
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    console.error("Error fetching blog posts for admin:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts." },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, summary, content, coverImage, published } = body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, summary, and content are mandatory." },
        { status: 400 }
      );
    }

    let baseSlug = slugify(title);
    let finalSlug = baseSlug;
    let count = 1;

    // Check slug uniqueness and append a counter if collision occurs
    while (true) {
      const existing = await db.blogPost.findUnique({
        where: { slug: finalSlug },
      });
      if (!existing) break;
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    const newPost = await db.blogPost.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        summary: summary.trim(),
        content: content.trim(),
        coverImage: coverImage ? coverImage.trim() : null,
        published: !!published,
        author: "Aent Studio",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post successfully created in database.",
      data: newPost,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing blog post or toggle its publish state
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, title, summary, content, coverImage, published } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog post ID is required for editing." },
        { status: 400 }
      );
    }

    const existingPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "The requested blog post could not be found." },
        { status: 404 }
      );
    }

    // Build update object based on what was passed
    const updateData: any = {};
    if (title !== undefined) {
      updateData.title = title.trim();
      // Generate new slug if title changed
      if (title.trim() !== existingPost.title) {
        let baseSlug = slugify(title);
        let finalSlug = baseSlug;
        let count = 1;
        while (true) {
          const existing = await db.blogPost.findFirst({
            where: { slug: finalSlug, id: { not: id } },
          });
          if (!existing) break;
          finalSlug = `${baseSlug}-${count}`;
          count++;
        }
        updateData.slug = finalSlug;
      }
    }
    if (summary !== undefined) updateData.summary = summary.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (coverImage !== undefined) updateData.coverImage = coverImage ? coverImage.trim() : null;
    if (published !== undefined) updateData.published = !!published;

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Blog post successfully updated.",
      data: updatedPost,
    });
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required for deletion." },
        { status: 400 }
      );
    }

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}
