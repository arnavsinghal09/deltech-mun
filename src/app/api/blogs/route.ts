import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma.config";

export async function GET(request: NextRequest) {
  const client = await clerkClient();
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const published = searchParams.get("published");
  const id = searchParams.get("id");
  const authorId = searchParams.get("authorId");

  try {
    // Build the query based on parameters
    const query: any = {};
    const select = {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
    };

    // Add filters based on query parameters
    if (published !== null) {
      // Convert string to boolean
      query.published = published;
    }

    if (id) {
      query.id = Number(id);
    }

    if (authorId) {
      query.authorId = authorId;
    }
    let blogs;

    if (Object.keys(query).length === 0) {
      console.log("Select before query:", select);
      blogs = await prisma.blog.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: select,
      });
    } else {
      blogs = await prisma.blog.findMany({
        where: query,
        orderBy: {
          createdAt: "desc",
        },
        select,
      });
    }

    const processedBlogs = await Promise.all(
      blogs.map(async (blog: any) => {
        let parsedContent = blog.content;
        try {
          if (typeof blog.content === "string") {
            parsedContent = JSON.parse(blog.content);
          }
        } catch (e) {
          console.error(`Failed to parse content for blog ${blog.id}:`, e);
        }

        // Fetch author details from Clerk
        let authorDetails = null;
        try {
          if (blog.authorId) {
            const user = await client.users.getUser(blog.authorId);
            authorDetails = {
              name:
                `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                "Unknown Author",
              avatar: user.imageUrl || null,
              email: user.emailAddresses[0]?.emailAddress || null,
            };
          }
        } catch (e) {
          console.error(
            `Failed to fetch author details for ${blog.authorId}:`,
            e
          );
          authorDetails = { name: "Unknown Author", avatar: null, email: null };
        }

        return {
          ...blog,
          content: parsedContent,
          author: authorDetails,
          status: blog.published ? "approved" : "pending",
        };
      })
    );

    return NextResponse.json({ blogs: processedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   // Extract query parameters
//   const published = searchParams.get("published");
//   const id = searchParams.get("id");
//   const authorId = searchParams.get("authorId");
//   const client = await clerkClient();
//   try {
//     // Build the query based on parameters
//     const query: any = {};
//     const select = {
//       id: true,
//       title: true,
//       content: true,
//       published: true,
//       createdAt: true,
//       updatedAt: true,
//       authorId: true,
//     };

//     // Add filters based on query parameters
//     if (published !== null) {
//       // Convert string to boolean
//       query.published = published === "true";
//     }

//     if (id) {
//       query.id = Number(id);
//     }

//     if (authorId) {
//       query.authorId = authorId;
//     }

//     let blogs;

//     if (Object.keys(query).length === 0) {
//       blogs = await prisma.blog.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//         select,
//       });
//     } else {
//       blogs = await prisma.blog.findMany({
//         where: query,
//         orderBy: {
//           createdAt: "desc",
//         },
//         select,
//       });
//     }

//     // Process blogs to parse content and fetch author details
//     const processedBlogs = await Promise.all(
//       blogs.map(async (blog) => {
//         let parsedContent = blog.content;
//         try {
//           if (typeof blog.content === "string") {
//             parsedContent = JSON.parse(blog.content);
//           }
//         } catch (e) {
//           console.error(`Failed to parse content for blog ${blog.id}:`, e);
//         }

//         // Fetch author details from Clerk
//         let authorDetails = null;
//         try {
//           if (blog.authorId) {
//             const user = await client.users.getUser(blog.authorId);
//             authorDetails = {
//               name:
//                 `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//                 "Unknown Author",
//               avatar: user.imageUrl || null,
//               email: user.emailAddresses[0]?.emailAddress || null,
//             };
//           }
//         } catch (e) {
//           console.error(
//             `Failed to fetch author details for ${blog.authorId}:`,
//             e
//           );
//           authorDetails = { name: "Unknown Author", avatar: null, email: null };
//         }

//         return {
//           ...blog,
//           content: parsedContent,
//           author: authorDetails,
//           status: blog.published ? "approved" : "pending",
//         };
//       })
//     );

//     return NextResponse.json({ blogs: processedBlogs });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch blogs" },
//       { status: 500 }
//     );
//   }
// }
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
    const blog = await prisma.blog.create({
      data: {
        title,
        content: JSON.stringify(content), // Use JSON.stringify instead of toString()
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

// PUT route to update the "published" field
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Ensure ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Get request body
    const body = await request.json();

    // Check if the request is to update published status
    if (body.published === undefined) {
      return NextResponse.json(
        { error: "Published status is required" },
        { status: 400 }
      );
    }

    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        published: body.published,
        // Add updatedAt timestamp
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        published: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: {
        ...updatedBlog,
        status: updatedBlog.published ? "approved" : "pending",
      },
    });
  } catch (error) {
    console.error("Error updating blog:", error);

    // Handle not found error specifically
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE route to remove a blog
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Ensure ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Check if blog exists before deletion
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete the blog
    await prisma.blog.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      blogId: id,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
