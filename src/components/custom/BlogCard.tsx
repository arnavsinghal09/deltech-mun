import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-primary">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-gray-500">By {post.author}</span>
        <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}

