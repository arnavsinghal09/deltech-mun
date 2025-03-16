"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import {useBlog} from "../../hooks/use-blog"
import { Skeleton } from "../ui/skeleton";
import { Blog } from "../../lib/blog";

export default function BlogList() {
  const { posts, loading, error, hasMore, fetchPosts } = useBlog({
    pageSize: 10,
    published: true,
  });

  // Initial fetch on component mount
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mx-auto px-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: Blog) => (
          <BlogCard key={post.id} blog={post} />
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {!loading && hasMore && (
        <Button
          onClick={fetchPosts}
          className="block mx-auto mt-8"
          variant="default"
        >
          Load More
        </Button>
      )}

      {loading && !posts.length && (
        <div className="text-center mt-8">
          <p className="text-gray-600">Loading posts...</p>
        </div>
      )}

      {!loading && !hasMore && posts.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">You've reached the end!</p>
        </div>
      )}

      {!loading && !hasMore && posts.length === 0 && (
        <div className="text-center mt-8 p-8 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-gray-600">Check back later for new content.</p>
        </div>
      )}
    </div>
  );
}
