import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../../lib/BlogPost";
import React from "react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white dark:bg-muted/40 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105">
      <Link href={`/blog/${post.id}`}>
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-primary">{post.author.name}</p>
            <p className="text-sm text-primary">{post.date}</p>
          </div>
        </div>
        <Link href={`/blog/${post.id}`} className="block mb-2">
          <h2 className="text-xl font-bold hover:text-blue-600 transition duration-300">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between sm:space-x-4 items-center">
          <div className="flex space-x-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="p-2 bg-background text-sm rounded-xl hover:bg-gray-300 dark:hover:bg-muted/50 transition duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {post.readingTime} min read
          </div>
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="block mt-4 text-blue-600 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
