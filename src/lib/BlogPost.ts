export interface BlogPost {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  image: string;
}
