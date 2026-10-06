import { Metadata, ResolvingMetadata } from "next";
import { fetchBlogBySlug } from "@/lib/blogs";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.title;
  // strip HTML and get a short snippet for the description, replacing non-breaking spaces
  const description = post.content ? post.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 160) + "..." : "Read this article on Bilinguistik.";
  const coverImage = post.coverImage || post.image_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: coverImage ? [coverImage] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostClient params={params} />;
}
