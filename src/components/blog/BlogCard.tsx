import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BlogPost, getImageUrl } from "@/lib/contentful";
import nirmilPhoto from "@/assets/nirmil-photo.png";

const categoryColors: Record<string, string> = {
  "Product Management": "bg-purple/20 text-purple border-purple/30",
  "AI/ML": "bg-cyan/20 text-cyan border-cyan/30",
  Cloud: "bg-green/20 text-green border-green/30",
  Career: "bg-orange/20 text-orange border-orange/30",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const fields = post.fields;
  const category = String(fields.category || "Product Management");
  const colorClass = categoryColors[category] || categoryColors["Product Management"];
  const imageUrl = fields.featuredImage ? getImageUrl(fields.featuredImage) : "/placeholder.svg";
  const date = new Date(String(fields.publishDate)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/blog/${fields.slug}`}>
      <motion.article
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="bg-secondary rounded-2xl border border-border overflow-hidden hover:glow-box-cyan transition-shadow duration-200 h-full flex flex-col"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={String(fields.title)}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <Badge variant="outline" className={`w-fit mb-3 text-xs ${colorClass}`}>
            {category}
          </Badge>
          <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight line-clamp-2 mb-2">
            {String(fields.title)}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-2 mb-4 flex-1">
            {String(fields.excerpt)}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <img src={nirmilPhoto} alt="Nirmil" className="w-6 h-6 rounded-full object-cover" />
            <span>Nirmil</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{Number(fields.readTime)} min read</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
