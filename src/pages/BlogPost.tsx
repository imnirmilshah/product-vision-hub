import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Github, Linkedin, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug, categoryGradients } from "@/data/blogPosts";

const categoryColors: Record<string, string> = {
  "Product Management": "bg-purple/20 text-purple border-purple/30",
  "AI/ML": "bg-cyan/20 text-cyan border-cyan/30",
  Cloud: "bg-green/20 text-green border-green/30",
  Career: "bg-orange/20 text-orange border-orange/30",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const code = codeLines.join("\n");
      elements.push(
        <div key={elements.length} className="relative my-6">
          <CopyButton text={code} />
          <pre className="bg-muted rounded-lg p-5 overflow-x-auto">
            <code className="font-mono text-sm text-foreground">{code}</code>
          </pre>
        </div>
      );
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={elements.length} className="font-display text-[28px] font-semibold text-foreground mt-12 mb-4">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={elements.length} className="font-display text-[22px] font-semibold text-foreground mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={elements.length}
          className="border-l-[3px] border-primary bg-muted/50 pl-5 py-3 my-6 italic text-secondary-foreground"
        >
          <p>{line.slice(2)}</p>
        </blockquote>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="list-disc pl-6 mb-6 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-secondary-foreground text-lg leading-[1.8]">
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="list-decimal pl-6 mb-6 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-secondary-foreground text-lg leading-[1.8]">
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={elements.length} className="text-secondary-foreground text-lg leading-[1.8] mb-6">
        <InlineMarkdown text={line} />
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle bold, italic, inline code
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-primary">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const allPosts = getAllPosts();
  const post = getPostBySlug(slug || "");

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/blog" className="text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colorClass = categoryColors[post.category] || categoryColors["Product Management"];
  const gradient = categoryGradients[post.category] || "from-purple to-primary";
  const date = new Date(post.publishDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{post.title} — Nirmil</title>
        <meta name="description" content={post.excerpt} />
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
              {post.category}
            </Badge>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>{date}</span>
          </div>

          <h1 className="font-display text-[40px] font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          <div className={`w-full aspect-video rounded-xl mb-8 bg-gradient-to-br ${gradient} opacity-80`} />

          <MarkdownRenderer content={post.body} />

          {/* Author card */}
          <div className="mt-16 p-6 bg-secondary rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg ring-2 ring-primary">
              N
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display font-semibold text-foreground">Nirmil</p>
              <p className="text-sm text-muted-foreground">
                Technical Product Manager at AWS · AI/ML · Builder
              </p>
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
                  to={`/blog/${prevPost.slug}`}
                  className="p-5 bg-secondary rounded-xl border border-border hover:glow-box-cyan transition-shadow group"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <ChevronLeft className="w-3 h-3" /> Previous Post
                  </span>
                  <p className="font-display font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="p-5 bg-secondary rounded-xl border border-border hover:glow-box-cyan transition-shadow group text-right"
                >
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-2">
                    Next Post <ChevronRight className="w-3 h-3" />
                  </span>
                  <p className="font-display font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {nextPost.title}
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
