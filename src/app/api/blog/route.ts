// app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma.config";

// GET all blogs or filter by query params
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const authorId = searchParams.get("authorId");

    let where: any = {};

    // Add filters if they exist
    if (published !== null) {
      where.published = published === "true";
    }

    if (authorId) {
      where.authorId = authorId;
    }

    const blogs = await prisma.blog.findMany();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // const { userId } = getAuth(request); // Get userId from Clerk

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { userId, title, content, published = false } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create the blog post with relationships
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        published,
        authorId: userId,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}
