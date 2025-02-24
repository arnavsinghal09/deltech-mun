"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { BlogPost } from "../../lib/BlogPost";
import { Button } from "../ui/button";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    // Generate unique IDs based on timestamp and index
    const newPosts: BlogPost[] = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + (page - 1) * 10 + i, // Create truly unique IDs
      title: `Blog Post ${(page - 1) * 10 + i + 1}`,
      author: {
        name: "John Doe",
        avatar: `/public/placeholder.avif`,
      },
      date: new Date().toLocaleDateString(),
      excerpt:
        "This is a short excerpt of the blog post. It gives a brief overview of what the post is about...",
      tags: ["Technology", "Web Development"],
      readingTime: Math.floor(Math.random() * 10) + 5,
      image: `/assets/placeholders/placeholder2.jpg?height=200&width=400&v=${Date.now()}`, // Cache busting
    }));

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      {loading ? (
        <div className="text-center mt-8">
          <p className="text-gray-600">Loading more posts...</p>
        </div>
      ) : (
        <Button
          onClick={fetchPosts}
          className="block mx-auto mt-8"
          variant="default"
          disabled={loading}
        >
          Load More
        </Button>
      )}
    </div>
  );
}
