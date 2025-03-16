import { useState, useCallback, useEffect } from "react";
import { Blog, BlogRawData, BlogHookOptions, Author } from "../lib/blog";

interface UseBlogReturn {
  posts: Blog[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchPosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  createPost: (postData: Partial<BlogRawData>) => Promise<Blog | null>;
  updatePost: (
    id: string,
    postData: Partial<BlogRawData>
  ) => Promise<Blog | null>;
  togglePublished: (id: string, published: boolean) => Promise<Blog | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export const useBlog = ({
  initialPage = 1,
  pageSize = 10,
  authorId,
  published,
}: BlogHookOptions = {}): UseBlogReturn => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const deriveExcerpt = useCallback((content: any): string => {
    if (!content) return "No content available...";

    try {
      // Handle string content
      if (typeof content === "string") {
        try {
          // Try to parse as JSON first
          const parsed = JSON.parse(content);
          content = parsed;
        } catch {
          // If not JSON, treat as plain text
          return (
            content.substring(0, 150) + (content.length > 150 ? "..." : "")
          );
        }
      }

      // Handle TipTap JSON structure
      if (content.type === "doc" && Array.isArray(content.content)) {
        // Extract text from paragraphs
        const paragraphText = extractTextFromNodes(content.content);
        return (
          paragraphText.substring(0, 150) +
          (paragraphText.length > 150 ? "..." : "")
        );
      }

      // Legacy format with blocks array
      if (content.blocks && Array.isArray(content.blocks)) {
        const textBlocks = content.blocks
          .filter((block: any) => block.type === "paragraph")
          .map((block: any) => block.data?.text || "")
          .join(" ");
        return (
          textBlocks.substring(0, 150) + (textBlocks.length > 150 ? "..." : "")
        );
      }

      return "Preview not available...";
    } catch (e) {
      console.error("Error generating excerpt:", e);
      return "Preview not available...";
    }
  }, []);

  const extractTextFromNodes = useCallback((nodes: any[]): string => {
    if (!Array.isArray(nodes)) return "";

    return nodes
      .reduce((text, node) => {
        if (node.text) {
          return text + " " + node.text;
        }

        if (node.content && Array.isArray(node.content)) {
          return text + " " + extractTextFromNodes(node.content);
        }

        return text;
      }, "")
      .trim();
  }, []);

  const calculateReadingTime = useCallback(
    (content: any): number => {
      try {
        let text = "";

        // Handle string content
        if (typeof content === "string") {
          try {
            // Try to parse as JSON first
            const parsed = JSON.parse(content);
            content = parsed;
          } catch {
            // If not JSON, treat as plain text
            text = content;
          }
        }

        // Handle TipTap JSON structure
        if (content.type === "doc" && Array.isArray(content.content)) {
          text = extractTextFromNodes(content.content);
        }

        // Legacy format with blocks array
        if (content.blocks && Array.isArray(content.blocks)) {
          text = content.blocks
            .filter((block: any) => block.type === "paragraph")
            .map((block: any) => block.data?.text || "")
            .join(" ");
        }

        // Calculate based on average reading speed (200 words per minute)
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(wordCount / 200));
      } catch (e) {
        console.error("Error calculating reading time:", e);
        return 1;
      }
    },
    [extractTextFromNodes]
  );

  /**
   * Transforms raw blog data into the Blog interface with derived properties
   */
  const transformBlogData = useCallback(
    (blog: BlogRawData): Blog => {
      return {
        ...blog,
        status: blog.status as "pending" | "approved" | "rejected" | undefined, // Ensure correct type
        date: new Date(blog.createdAt).toLocaleDateString(),
        excerpt: deriveExcerpt(blog.content),
        readingTime: calculateReadingTime(blog.content),
        tags: blog.tags || ["General"],
        image: blog.image || undefined,
        author: blog.author || {
          name: "Unknown Author",
          avatar: null,
        },
      };
    },
    [deriveExcerpt, calculateReadingTime]
  );

  const fetchPosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Build API URL with query parameters
      let url = `/api/blogs?page=${page}&limit=${pageSize}`;

      if (authorId) {
        url += `&authorId=${authorId}`;
      }

      if (published !== undefined) {
        url += `&published=${published}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();

      if (!data.blogs || !Array.isArray(data.blogs)) {
        throw new Error("Invalid response format");
      }

      // Transform and add derived properties
      const newPosts = data.blogs.map(transformBlogData);

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load blog posts"
      );
    } finally {
      setLoading(false);
    }
  }, [loading, page, pageSize, authorId, published, transformBlogData]);

  //Refreshes posts from the beginning

  const refreshPosts = useCallback(async () => {
    setPosts([]);
    setPage(initialPage);
    setHasMore(true);
    await fetchPosts();
  }, [fetchPosts, initialPage]);

  //Creates a new blog post

  const createPost = useCallback(
    async (postData: Partial<BlogRawData>): Promise<Blog | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create post: ${response.status}`);
        }

        const data = await response.json();
        const newPost = transformBlogData(data.blog);

        // Add to posts list if it matches current filter criteria
        if (
          (!authorId || newPost.authorId === authorId) &&
          (published === undefined || newPost.published === published)
        ) {
          setPosts((prevPosts) => [newPost, ...prevPosts]);
        }

        return newPost;
      } catch (error) {
        console.error("Error creating post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to create blog post"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [authorId, published, transformBlogData]
  );

  // Updates an existing blog post

  const updatePost = useCallback(
    async (
      id: string,
      postData: Partial<BlogRawData>
    ): Promise<Blog | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/blogs?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update post: ${response.status}`);
        }

        const data = await response.json();
        const updatedPost = transformBlogData(data.blog);

        // Update in the posts list
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );

        return updatedPost;
      } catch (error) {
        console.error("Error updating post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to update blog post"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [transformBlogData]
  );

  //Toggles the published status of a blog post

  const togglePublished = useCallback(
    async (id: string, published: boolean): Promise<Blog | null> => {
      return updatePost(id, { published });
    },
    [updatePost]
  );

  //Deletes a blog post

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status}`);
      }

      // Remove from posts list
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete blog post"
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
    refreshPosts,
    createPost,
    updatePost,
    togglePublished,
    deletePost,
  };
};

export default useBlog;
