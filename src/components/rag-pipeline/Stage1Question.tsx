import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SPOTIFY_QUESTION } from "./types";

export default function Stage1Question() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    setSent(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(SPOTIFY_QUESTION.slice(0, i));
      if (i >= SPOTIFY_QUESTION.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => setSent(true), 600);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2 font-mono">Infrastructure: User Interface · API Gateway</p>
      <div className={`bg-secondary/50 rounded-xl p-6 font-mono text-sm border transition-all duration-500 ${done && !sent ? "border-primary/60 shadow-[0_0_20px_hsl(var(--cyan)/0.2)]" : "border-border"}`}>
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> User Query
        </div>
        <p className="leading-relaxed text-foreground">
          {displayed}
          <span className={`inline-block w-0.5 h-4 bg-primary ml-0.5 ${done ? "animate-pulse" : ""}`} />
        </p>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end mt-4"
          >
            <motion.button
              animate={sent ? { scale: 0.95, opacity: 0.6 } : {}}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-mono"
            >
              <Send className="w-3 h-3" /> {sent ? "Sent" : "Send"}
            </motion.button>
          </motion.div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        Every LLM interaction starts here. A question in natural language. The system now needs to understand what's being asked, find relevant data, reason over it, and generate a coherent answer.
      </p>
    </div>
  );
}
