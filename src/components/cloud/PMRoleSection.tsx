import { motion } from "framer-motion";
import { Crosshair, Activity, Settings } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const cards = [
  {
    icon: Crosshair,
    title: "From Specs to Outcomes",
    old: { label: "Old PRD", text: '"Use PostgreSQL r5.xlarge, 3 read replicas"' },
    now: { label: "New PRD", text: '"Support 10K concurrent users at <100ms p99 latency within $5K/month"' },
    note: "The cloud figures out the how.",
  },
  {
    icon: Activity,
    title: "From Dashboards to Intelligence Feeds",
    old: { label: "Before", text: "Manually reviewing CloudWatch dashboards for anomalies" },
    now: { label: "Now", text: '"API latency increased 23% due to schema drift. Auto-remediated. No user impact."' },
    note: "AI-generated insights replace manual monitoring.",
  },
  {
    icon: Settings,
    title: "From Capacity Planning to Autonomous Optimization",
    old: { label: "Before", text: "Quarterly capacity reviews with engineering teams" },
    now: { label: "Now", text: "PMs set guardrails and objectives. AI optimizes continuously within boundaries." },
    note: "Real-time optimization replaces periodic planning.",
  },
];

export default function PMRoleSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-card border border-border rounded-lg p-6 hover:glow-box-cyan transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-sans text-lg font-semibold mb-4">{card.title}</h3>

            {/* Old */}
            <div className="mb-3">
              <span className="font-sans text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">{card.old.label}</span>
              <p className="font-mono text-xs text-muted-foreground bg-secondary rounded-md p-2 mt-1 leading-relaxed">{card.old.text}</p>
            </div>

            {/* Arrow */}
            <div className="text-center text-muted-foreground text-xs my-1">↓</div>

            {/* New */}
            <div className="mb-3">
              <span className="font-sans text-[10px] font-bold tracking-wider text-primary uppercase">{card.now.label}</span>
              <p className="font-mono text-xs text-foreground bg-primary/10 border border-primary/20 rounded-md p-2 mt-1 leading-relaxed">{card.now.text}</p>
            </div>

            <p className="font-display text-xs text-muted-foreground italic">{card.note}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
