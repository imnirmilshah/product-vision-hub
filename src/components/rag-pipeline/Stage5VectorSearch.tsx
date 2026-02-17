import { motion } from "framer-motion";

const CLUSTERS = [
  { label: "Pricing & Revenue", color: "hsl(var(--orange))", score: 0.91, x: 20, y: 25, items: ["$12.99", "$4.2B revenue", "Premium"] },
  { label: "Cost Pressure", color: "hsl(var(--purple))", score: 0.82, x: 75, y: 20, items: ["royalties 65%", "$1B+ content", "margin 31.1%"] },
  { label: "User Engagement", color: "hsl(var(--cyan))", score: 0.87, x: 60, y: 65, items: ["148 min/day", "AI DJ 35%", "Wrapped 250M+"] },
  { label: "Churn & Retention", color: "hsl(var(--green))", score: 0.94, x: 15, y: 70, items: ["churn 3.9%", "switching costs", "habit loops"] },
  { label: "Competition", color: "hsl(265 70% 70%)", score: 0.78, x: 45, y: 45, items: ["Spotify 40%", "Apple 25%", "YouTube 18%"] },
];

export default function Stage5VectorSearch() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: Amazon Bedrock Knowledge Bases · Pinecone · pgvector · OpenSearch</p>

      <div className="relative w-full h-72 bg-secondary/30 rounded-xl overflow-hidden">
        {/* Query vector */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground z-10 shadow-[0_0_10px_hsl(var(--foreground)/0.5)]"
        />

        {/* Search radius */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-primary"
        />

        {/* Clusters */}
        {CLUSTERS.map((cluster, ci) => (
          <motion.div
            key={cluster.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + ci * 0.15 }}
            className="absolute"
            style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cluster.color, opacity: 0.7 - d * 0.15 }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">{cluster.label}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + ci * 0.1 }}
                className="text-[10px] font-mono font-bold"
                style={{ color: cluster.color }}
              >
                {cluster.score}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Score breakdown */}
      <div className="mt-4 space-y-1">
        {[...CLUSTERS].sort((a, b) => b.score - a.score).map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + i * 0.1 }}
            className="flex items-center gap-2 text-xs"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="font-mono text-muted-foreground w-28">{c.label}</span>
            <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.score * 100}%` }}
                transition={{ delay: 2.2 + i * 0.1, duration: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: c.color }}
              />
            </div>
            <span className="font-mono text-xs" style={{ color: c.color }}>{c.score}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        The query vector is compared against every stored vector using cosine similarity. Closest matches are retrieved, not by keyword, but by meaning. This runs in milliseconds using HNSW indexing across millions of vectors.
      </p>
    </div>
  );
}
