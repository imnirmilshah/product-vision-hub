import { Github, Linkedin, BookOpen, Download } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-semibold mb-1">Nirmil<span className="text-primary">.</span></p>
            <p className="text-xs text-muted-foreground">Built with curiosity · © {new Date().getFullYear()}</p>
          </div>

          <div className="flex items-center gap-4">
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

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-3 h-3" />
            Download Resume
          </Button>
        </div>
      </div>
    </footer>
  );
}
