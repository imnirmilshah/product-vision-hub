import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BlogPost, categoryGradients } from "@/data/blogPosts";

const categoryColors: Record<string, string> = {
  "Product Management": "bg-purple/20 text-purple border-purple/30",
  "AI/ML": "bg-cyan/20 text-cyan border-cyan/30",
  Cloud: "bg-green/20 text-green border-green/30",
  Career: "bg-orange/20 text-orange border-orange/30",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const colorClass = categoryColors[post.category] || categoryColors["Product Management"];
  const gradient = categoryGradients[post.category] || "from-purple to-primary";
  const date = new Date(post.publishDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="bg-secondary rounded-2xl border border-border overflow-hidden hover:glow-box-cyan transition-shadow duration-200 h-full flex flex-col"
      >
        <div className="aspect-video overflow-hidden">
          {post.heroImage ? (
            <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-80 rounded-t-xl`} />
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <Badge variant="outline" className={`w-fit mb-3 text-xs ${colorClass}`}>
            {post.category}
          </Badge>
          <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              N
            </div>
            <span>Nirmil</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
