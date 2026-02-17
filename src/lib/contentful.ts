import { createClient, EntrySkeletonType, EntryFieldTypes } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || "",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
});

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    excerpt: EntryFieldTypes.Text;
    featuredImage: EntryFieldTypes.AssetLink;
    body: EntryFieldTypes.RichText;
    category: EntryFieldTypes.Text;
    publishDate: EntryFieldTypes.Date;
    readTime: EntryFieldTypes.Number;
  };
}

export async function fetchAllPosts() {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    order: ["-fields.publishDate"],
  });
  return response.items;
}

export async function fetchPostBySlug(slug: string) {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  } as any);
  return response.items[0] || null;
}

export function getImageUrl(asset: any): string {
  return `https:${asset.fields.file.url}`;
}

export type BlogPost = Awaited<ReturnType<typeof fetchAllPosts>>[number];
