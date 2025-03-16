export interface Author {
  name: string;
  avatar: string | null;
  email?: string | null;
}

export interface Blog {
  id: string;
  title: string;
  content: any;

  // Author information
  author: Author;
  authorId?: string;

  // Dates
  createdAt?: string;
  updatedAt?: string;
  date?: string; // Formatted date string

  // Derived fields
  excerpt: string;
  readingTime: number;

  // Meta information
  tags: string[];
  image?: string;

  // Status information
  published?: boolean;
  status?: "pending" | "approved" | "rejected";
}




export interface BlogRawData {
  id: string;
  title: string;
  content: any; // Raw content before processing
  published?: boolean;
  authorId?: string;
  author?: Author;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  image?: string;
  status?: string;
}

export interface BlogCardProps {
  blog: Blog;
  onStatusChange?: (
    blogId: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => Promise<void>;
}

export interface BlogHookOptions {
  initialPage?: number;
  pageSize?: number;
  authorId?: string;
  published?: boolean;
}

type BlogStatus = "pending" | "approved" | "rejected";

