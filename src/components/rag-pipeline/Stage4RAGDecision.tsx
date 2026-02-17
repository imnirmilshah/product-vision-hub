import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function Stage4RAGDecision() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: This is where RAG vs. pure LLM diverges</p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Path A — Pure LLM */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-destructive/30 rounded-xl p-5 bg-destructive/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <p className="text-xs font-mono text-destructive">Path A: Pure LLM</p>
          </div>
          <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">
            "Spotify may face some churn... price increases can lead to cancellations... it depends on various factors..."
          </p>
          <div className="flex flex-wrap gap-1">
            {["Hallucination", "No sources", "Outdated data"].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-mono">⚠ {tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Path B — RAG */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="border-2 border-primary/50 rounded-xl p-5 bg-primary/5 shadow-[0_0_20px_hsl(var(--cyan)/0.1)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-primary" />
            <p className="text-xs font-mono text-primary">Path B: RAG Pipeline ← SELECTED</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Retrieve real, sourced data from a vector database before generating. Ground every claim in facts.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-primary to-primary/20 rounded-full origin-left"
          />
        </motion.div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        Without retrieval, LLMs rely solely on training data, which may be outdated, incomplete, or wrong. RAG injects real, sourced data into the LLM's context BEFORE it generates. This is why Amazon Bedrock Knowledge Bases, LangChain, and LlamaIndex exist.
      </p>
    </div>
  );
}
