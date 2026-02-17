import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Github, Linkedin, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextRenderer from "@/components/blog/RichTextRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { fetchPostBySlug, fetchAllPosts, getImageUrl } from "@/lib/contentful";
import nirmilPhoto from "@/assets/nirmil-photo.png";

const categoryColors: Record<string, string> = {
  "Product Management": "bg-purple/20 text-purple border-purple/30",
  "AI/ML": "bg-cyan/20 text-cyan border-cyan/30",
  Cloud: "bg-green/20 text-green border-green/30",
  Career: "bg-orange/20 text-orange border-orange/30",
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  const { data: allPosts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchAllPosts,
  });

  const currentIndex = allPosts?.findIndex((p) => String(p.fields.slug) === slug) ?? -1;
  const prevPost = currentIndex > 0 ? allPosts![currentIndex - 1] : null;
  const nextPost = allPosts && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-[720px] space-y-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="w-full aspect-video rounded-xl" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Back to blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const fields = post.fields;
  const category = String(fields.category || "Product Management");
  const colorClass = categoryColors[category] || categoryColors["Product Management"];
  const imageUrl = fields.featuredImage ? getImageUrl(fields.featuredImage) : null;
  const date = new Date(String(fields.publishDate)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{String(fields.title)} — Nirmil</title>
        <meta name="description" content={String(fields.excerpt)} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 max-w-[720px]"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>

          <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
            <Badge variant="outline" className={`text-xs ${colorClass}`}>
              {category}
            </Badge>
            <span>{Number(fields.readTime)} min read</span>
            <span>·</span>
            <span>{date}</span>
          </div>

          <h1 className="font-display text-[40px] font-bold text-foreground leading-tight mb-6">
            {String(fields.title)}
          </h1>

          {imageUrl && (
            <img src={imageUrl} alt={String(fields.title)} className="w-full rounded-xl mb-8" loading="lazy" />
          )}

          <RichTextRenderer document={fields.body as any} />

          {/* Author card */}
          <div className="mt-16 p-6 bg-secondary rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-4">
            <img src={nirmilPhoto} alt="Nirmil" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display font-semibold text-foreground">Nirmil</p>
              <p className="text-sm text-muted-foreground">Product manager building at the intersection of AI and cloud.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/imnirmilshah" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://linkedin.com/in/nirmil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://imnirmilshah.medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                <BookOpen className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Prev/Next */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.fields.slug}`}
                  className="p-5 bg-secondary rounded-xl border border-border hover:glow-box-cyan transition-shadow group"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <ChevronLeft className="w-3 h-3" /> Previous Post
                  </span>
                  <p className="font-display font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {String(prevPost.fields.title)}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.fields.slug}`}
                  className="p-5 bg-secondary rounded-xl border border-border hover:glow-box-cyan transition-shadow group text-right"
                >
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-2">
                    Next Post <ChevronRight className="w-3 h-3" />
                  </span>
                  <p className="font-display font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {String(nextPost.fields.title)}
                  </p>
                </Link>
              )}
            </div>
          )}
        </motion.article>
      </main>
      <Footer />
    </>
  );
}
