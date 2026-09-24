import { supabase } from "./supabaseClient";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
  // Computed fields for UI convenience
  coverImage?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  readTime?: string;
}

export function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return baseSlug || "blog-post-" + Date.now();
}

export function formatBlogPost(raw: any): BlogPost {
  const createdAt = raw.created_at ? new Date(raw.created_at) : new Date();
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = raw.content ? raw.content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";
  const excerpt = raw.content
    ? raw.content.replace(/[#*`_]/g, "").slice(0, 150).trim() + "..."
    : "";

  const coverImage =
    raw.image_url && raw.image_url.trim() !== ""
      ? raw.image_url
      : "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop";

  return {
    id: raw.id,
    title: raw.title || "",
    slug: raw.slug || "",
    content: raw.content || "",
    image_url: raw.image_url || "",
    category: raw.category || "Document Guide",
    created_at: raw.created_at || new Date().toISOString(),
    coverImage,
    excerpt,
    author: "Bilinguistik Editorial Team",
    publishedAt: formattedDate,
    readTime,
  };
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs from Supabase:", error.message);
      return [];
    }

    return (data || []).map(formatBlogPost);
  } catch (err) {
    console.error("Exception fetching blogs:", err);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error("Error fetching blog by slug from Supabase:", error.message);
      return null;
    }

    return formatBlogPost(data);
  } catch (err) {
    console.error("Exception fetching blog by slug:", err);
    return null;
  }
}

export async function createBlog(blog: {
  title: string;
  slug?: string;
  content: string;
  image_url: string;
  category: string;
}): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  try {
    const slug = blog.slug || generateSlug(blog.title);
    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title: blog.title,
          slug,
          content: blog.content,
          image_url: blog.image_url,
          category: blog.category,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog in Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: formatBlogPost(data) };
  } catch (err: any) {
    console.error("Exception creating blog:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}

export async function updateBlog(
  id: string,
  blog: {
    title: string;
    slug?: string;
    content: string;
    image_url: string;
    category: string;
  }
): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  try {
    const slug = blog.slug || generateSlug(blog.title);
    const { data, error } = await supabase
      .from("blogs")
      .update({
        title: blog.title,
        slug,
        content: blog.content,
        image_url: blog.image_url,
        category: blog.category,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog in Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: formatBlogPost(data) };
  } catch (err: any) {
    console.error("Exception updating blog:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}

export async function deleteBlogById(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog from Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Exception deleting blog:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}
