"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/custom/BlogCard";
import useBlog from "@/hooks/use-blog";
import { Blog } from "@/lib/blog";

const BlogApproval = () => {
  // Use the blog hook with published=false to get pending blogs
  const { posts, loading, error, refreshPosts, updatePost } = useBlog({
    published: false,
    pageSize: 50, // Increase page size to get more blogs at once
  });

  // Handle status change
  const handleStatusChange = async (
    blogId: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    try {
      // Update the blog status
      await updatePost(blogId, { status: newStatus });

      // If the status changes to "approved", also publish the blog
      if (newStatus === "approved") {
        await updatePost(blogId, { published: true });
      }

      // Refresh posts after status change
      await refreshPosts();
    } catch (err) {
      console.error("Failed to update blog status:", err);
    }
  };

  // Filter blogs by status
  const pendingBlogs = posts.filter(
    (blog) => blog.status === "pending" || !blog.status
  );
  const approvedBlogs = posts.filter((blog) => blog.status === "approved");
  const rejectedBlogs = posts.filter((blog) => blog.status === "rejected");

  // Calculate counts
  const pendingCount = pendingBlogs.length;
  const approvedCount = approvedBlogs.length;
  const rejectedCount = rejectedBlogs.length;

  if (loading && posts.length === 0) {
    return <div className="p-6 text-center">Loading blogs...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={refreshPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Approval</h1>
        <button
          onClick={refreshPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingBlogs.length > 0 ? (
            pendingBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No pending blogs</p>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {approvedBlogs.length > 0 ? (
            approvedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No approved blogs</p>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {rejectedBlogs.length > 0 ? (
            rejectedBlogs.map((blog: any) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No rejected blogs</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogApproval;
