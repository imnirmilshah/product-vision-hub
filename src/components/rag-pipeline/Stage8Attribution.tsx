import { motion } from "framer-motion";

const CITATIONS = [
  { claim: "65% of every dollar", source: "Spotify Q4 2024 Earnings Report", num: 1 },
  { claim: "churn held at ~3.9%", source: "Spotify Retention Data, 2022-2025", num: 2 },
  { claim: "148 minutes daily", source: "Spotify User Behavior Analytics", num: 3 },
  { claim: "$12.99/month", source: "Spotify Pricing History, June 2025", num: 4 },
  { claim: "40% of global streaming", source: "Competitive Landscape Analysis", num: 5 },
];

export default function Stage8Attribution() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: Citation generation · Guardrails · Confidence scoring</p>

      <div className="space-y-2 mb-6">
        {CITATIONS.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3 text-xs"
          >
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-mono text-[10px] shrink-0">{c.num}</span>
            <span className="font-mono text-foreground">"{c.claim}"</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-muted-foreground italic">{c.source}</span>
          </motion.div>
        ))}
      </div>

      {/* Confidence score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-secondary/50 rounded-xl p-4 border border-border"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground">Confidence Score</span>
          <span className="text-sm font-mono font-bold text-primary">94%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "94%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">Based on retrieval relevance and source coverage</p>
      </motion.div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        Production RAG systems don't just answer — they show their work. Every claim traces to a source. Source attribution builds trust, enables fact-checking, and satisfies compliance.
      </p>
    </div>
  );
}
