import { motion } from "framer-motion";
import { TOKENS, TOKEN_COLORS } from "./types";

const VECTOR = ["0.712", "-0.334", "0.891", "0.223", "-0.556", "0.445", "..."];

export default function Stage3Embedding() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: Amazon Titan Embeddings · OpenAI text-embedding-3-large · Cohere Embed v3</p>

      {/* Token pills flying inward */}
      <div className="relative flex items-center justify-center min-h-[200px]">
        {TOKENS.slice(0, 10).map((tok, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 1,
              x: (i - 5) * 50,
              y: (i % 2 === 0 ? -40 : 40),
              scale: 1,
            }}
            animate={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0,
            }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="absolute px-2 py-1 rounded-full text-[10px] font-mono"
            style={{ color: TOKEN_COLORS[i % TOKEN_COLORS.length] }}
          >
            {tok.trim()}
          </motion.span>
        ))}

        {/* Vector card appears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="bg-secondary/70 border border-primary/30 rounded-xl p-5 text-center shadow-[0_0_30px_hsl(var(--cyan)/0.15)]"
        >
          <p className="text-xs font-mono text-primary mb-2">Query Vector</p>
          <div className="flex gap-2 font-mono text-xs text-muted-foreground">
            [{VECTOR.map((v, i) => (
              <span key={i}>{v}{i < VECTOR.length - 1 ? "," : ""}</span>
            ))}]
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">1536 dimensions</p>
        </motion.div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        The embedding model converts your entire question into a single 1536-dimensional vector. This vector captures the MEANING: pricing, subscription, churn, causation. It will be used to search for relevant knowledge next.
      </p>
    </div>
  );
}
