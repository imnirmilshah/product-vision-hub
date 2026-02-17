import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Archive, Sparkles } from "lucide-react";

const passiveItems = [
  "User writes queries → Database returns results",
  "User defines schemas → Database stores as instructed",
  "User sets scaling rules → Cloud follows rules blindly",
  "User monitors dashboards → Cloud waits for human decisions",
  "User tunes performance manually → Cloud executes configurations",
];

const activeItems = [
  "AI analyzes query patterns → Auto-optimizes indexes",
  "AI understands data relationships → Auto-evolves schema design",
  "AI predicts traffic spikes → Pre-scales before demand hits",
  "AI detects anomalies → Self-heals before users notice",
  "AI runs continuous ML tuning → Auto-optimizes cost and performance",
];

export default function TwoErasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6">
      {/* Passive Era */}
      <motion.div
        animate={isInView ? { scale: 0.97, opacity: 0.85 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-card border border-border rounded-lg p-6 md:p-8"
      >
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
          <Archive className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-sans text-xl font-semibold text-muted-foreground mb-4">Passive Cloud</h3>
        <ul className="space-y-3 mb-6">
          {passiveItems.map((item, i) => (
            <li key={i} className="font-display text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-muted-foreground/50 mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="font-display text-xs text-muted-foreground/60 italic border-t border-border pt-4">
          "A warehouse where you find every item yourself"
        </p>
      </motion.div>

      {/* Active Era */}
      <motion.div
        animate={isInView ? { scale: 1.03 } : { scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-card border border-primary/30 rounded-lg p-6 md:p-8 glow-box-cyan"
      >
        <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-5">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
        <h3 className="font-sans text-xl font-semibold text-primary mb-4">Active Cloud</h3>
        <ul className="space-y-3 mb-6">
          {activeItems.map((item, i) => (
            <li key={i} className="font-display text-sm text-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="font-display text-xs text-muted-foreground italic border-t border-border pt-4">
          "A brilliant librarian who reorganizes based on what you'll need next"
        </p>
      </motion.div>
    </div>
  );
}
