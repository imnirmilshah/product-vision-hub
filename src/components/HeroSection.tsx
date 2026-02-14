import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6"
        >
          Product Manager · AWS · AI Enthusiast
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Hi, I'm{" "}
          <span className="text-primary glow-cyan">Nirmil</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build products people love, demystify AI for everyone, and fuel my days with
          Chipotle bowls and Taco Bell crunchwraps. Currently at AWS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box-cyan px-8">
            <Link to="/blog">Read My Blog</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 px-8">
            <Link to="/ai-pm-skills">Explore AI Skills</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-6"
        >
          <a href="https://github.com/imnirmilshah" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/nirmil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://imnirmilshah.medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
