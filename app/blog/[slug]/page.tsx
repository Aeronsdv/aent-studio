import { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { marked } from "marked"
import BlogPostClient from "./blog-post-client"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate dynamic SEO Metadata on the server for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  const post = await db.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.published) {
    return {
      title: "Article Not Found | Aent Studio",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${post.title} | Aent Journal`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  // Query database securely on server side
  const post = await db.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.published) {
    notFound()
  }

  // Pre-parse markdown to HTML on server side for fast loading and zero client bundle size
  const htmlContent = await marked.parse(post.content)

  // Serialize blog post for client component ingestion
  const serializedPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    coverImage: post.coverImage,
    published: post.published,
    author: post.author,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
  }

  return (
    <BlogPostClient 
      post={serializedPost} 
      htmlContent={htmlContent} 
    />
  )
}
