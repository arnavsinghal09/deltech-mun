import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Blog, BlogCardProps } from "@/lib/blog";

export default function BlogCard({ blog, onStatusChange }: BlogCardProps) {
  return (
    <div className="bg-white dark:bg-muted/40 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105">
      {blog.image && (
        <Link href={`/blog/${blog.id}`}>
          <div className="relative w-full h-48">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </Link>
      )}

      <div className={`p-6 ${!blog.image ? "pt-8" : ""}`}>
        <div className="flex items-center mb-4">
          {blog.author?.avatar ? (
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                {blog.author?.name?.charAt(0) || "A"}
              </span>
            </div>
          )}
          <div>
            <div className="font-semibold text-primary">
              {blog.author?.name || "Unknown Author"}
            </div>
            <div className="text-sm text-primary">
              {blog.date ||
                (blog.createdAt &&
                  new Date(blog.createdAt).toLocaleDateString()) ||
                "Unknown date"}
            </div>
          </div>
        </div>

        <Link href={`/blog/${blog.id}`} className="block mb-2">
          <h2 className="text-xl font-bold hover:text-blue-600 transition duration-300">
            {blog.title}
          </h2>
        </Link>

        <div className="text-gray-600 mb-4">{blog.excerpt}</div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {blog.readingTime} min read
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  +{blog.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            href={`/blog/${blog.id}`}
            className="text-blue-600 hover:underline"
          >
            Read More
          </Link>

          {onStatusChange && blog.status && (
            <div className="flex items-center space-x-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  blog.status === "approved"
                    ? "bg-green-500"
                    : blog.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              ></span>
              <span className="text-xs text-gray-500 capitalize">
                {blog.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
