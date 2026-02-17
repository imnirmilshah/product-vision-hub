import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import CategoryFilter from "@/components/blog/CategoryFilter";
import { fetchAllPosts } from "@/lib/contentful";

export default function BlogLanding() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchAllPosts,
  });

  const filtered = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === "All") return posts;
    return posts.filter((p) => String(p.fields.category) === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      <Helmet>
        <title>Blog — Nirmil</title>
        <meta
          name="description"
          content="Thoughts on product management, AI/ML, cloud infrastructure, and building things that matter."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-display text-[40px] font-bold text-foreground mb-3">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Thoughts on product, AI, cloud, and building things that matter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-10"
          >
            <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <BlogCardSkeleton key={i} />)
              : filtered.map((post, i) => (
                  <motion.div
                    key={post.sys.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
          </div>

          {!isLoading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-16">No posts in this category yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
