import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "Why Prices Went Up",
    border: "hsl(var(--orange))",
    text: "Spotify raised US Premium to $12.99/month in 2025, the third increase in three years after a decade at $9.99. The driver is structural: royalty payouts consume 65% of revenue and grew 15% YoY. At 31.1% gross margin, Spotify approaches profitability, but only if pricing keeps pace with costs.",
  },
  {
    title: "Why Churn Won't Spike",
    border: "hsl(var(--green))",
    text: "Four moats make Spotify nearly price-inelastic. First, switching costs: years of Discover Weekly training, playlists, and history don't transfer. Second, $12.99/month is less than one coffee per week. Third, churn held at ~3.9% through both 2023 and 2024 increases. Fourth, 148 min daily listening, 35% AI DJ adoption, 250M+ Wrapped participants.",
  },
  {
    title: "The Competitive Lock",
    border: "hsl(265 70% 70%)",
    text: "Spotify holds 40% of global streaming. No competitor matches its personalization. Discover Weekly, AI DJ, and daylist create a taste profile that compounds with every listen, a data moat. Switching means starting music intelligence from zero.",
  },
  {
    title: "The PM Takeaway",
    border: "hsl(var(--cyan))",
    text: "Pricing power isn't extracted, it's earned. Spotify built switching costs and deepened engagement for a decade before exercising leverage. Build the moat first. Then raise the drawbridge.",
  },
];

const ATTENTION_PAIRS = [
  { a: "3 times", b: "$9.99 → $12.99" },
  { a: "cause churn", b: "churn 3.9% stable" },
  { a: "churn", b: "switching costs" },
  { a: "subscription", b: "royalties 65%" },
];

export default function Stage7Inference() {
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    SECTIONS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleSections(i + 1), 1200 + i * 800));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: Claude 3.5 Sonnet · GPT-4 · Amazon Bedrock · Llama 3</p>

      {/* Attention connections */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ATTENTION_PAIRS.map((pair, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-1.5 text-[10px]"
          >
            <span className="font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">{pair.a}</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-primary"
            >↔</motion.span>
            <span className="font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">{pair.b}</span>
          </motion.div>
        ))}
      </div>

      {/* Generated report */}
      <div className="bg-secondary/50 rounded-xl p-5 border border-primary/20">
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-display font-semibold text-sm mb-4"
        >
          Spotify Pricing Analysis: Three Increases, Zero Churn Impact
        </motion.h4>

        <div className="space-y-3">
          {SECTIONS.map((section, i) => (
            i < visibleSections && (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pl-3 text-xs leading-relaxed text-muted-foreground"
                style={{ borderLeft: `2px solid ${section.border}` }}
              >
                <p className="font-mono text-foreground text-[11px] font-semibold mb-1">{section.title}</p>
                <p>{section.text}</p>
              </motion.div>
            )
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        The transformer generated this token-by-token. Each new word conditioned on the full context window. It REASONED over injected context in real-time, connecting pricing to costs, churn stability to product lock-in, and engagement to competitive moats.
      </p>
    </div>
  );
}
