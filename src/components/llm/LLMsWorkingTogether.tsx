import { motion } from "framer-motion";

/* ─── Chain of Thought ─── */
function ChainOfThought() {
  const steps = ["Question", '"Let me think step by step..."', "Step 1: Identify variables", "Step 2: Analyze relationships", "Step 3: Draw conclusion", "Answer"];
  return (
    <div className="mb-10">
      <h3 className="font-sans text-lg font-semibold mb-1">Chain-of-Thought Prompting</h3>
      <p className="text-xs text-muted-foreground mb-4">Breaking reasoning into explicit steps improves accuracy by 30-50% on complex tasks.</p>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${
                i === 1 ? "bg-primary/10 text-primary border-primary/30 italic" : "bg-secondary border-border"
              }`}
            >
              {step}
            </motion.span>
            {i < steps.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ReAct Pattern ─── */
function ReActPattern() {
  const cycles = [
    { label: "Think", color: "hsl(var(--purple))" },
    { label: "Act", color: "hsl(var(--orange))" },
    { label: "Observe", color: "hsl(var(--cyan))" },
    { label: "Think", color: "hsl(var(--purple))" },
    { label: "Act", color: "hsl(var(--orange))" },
    { label: "Observe", color: "hsl(var(--cyan))" },
    { label: "Answer", color: "hsl(var(--green))" },
  ];
  return (
    <div className="mb-10">
      <h3 className="font-sans text-lg font-semibold mb-1">ReAct Pattern</h3>
      <p className="text-xs text-muted-foreground mb-4">Interleaving reasoning with action — each cycle refines the response with new information.</p>
      <div className="flex flex-wrap items-center gap-2">
        {cycles.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border"
              style={{ borderColor: c.color, color: c.color, backgroundColor: c.color.replace(")", " / 0.1)") }}
            >
              {c.label}
            </motion.span>
            {i < cycles.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Decision Framework ─── */
function DecisionFramework() {
  const rows = [
    { metric: "Cost", ft: "$$$ High", pe: "$ Low", rag: "$$ Medium" },
    { metric: "Speed to Deploy", ft: "Weeks", pe: "Minutes", rag: "Days" },
    { metric: "Data Freshness", ft: "Static", pe: "Static", rag: "Real-time" },
    { metric: "Accuracy", ft: "Domain-specific", pe: "General", rag: "Sourced" },
    { metric: "Best For", ft: "Specialized tasks", pe: "Quick iteration", rag: "Current data" },
  ];
  return (
    <div className="mb-10">
      <h3 className="font-sans text-lg font-semibold mb-1">Decision Framework</h3>
      <p className="text-xs text-muted-foreground mb-4">When to use which approach — the PM's cheat sheet.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="bg-secondary">
              <th className="text-left p-3 text-muted-foreground font-normal"></th>
              <th className="text-left p-3 text-primary">Fine-Tuning</th>
              <th className="text-left p-3 text-primary">Prompt Engineering</th>
              <th className="text-left p-3 text-primary">RAG</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-t border-border">
                <td className="p-3 text-foreground font-semibold">{row.metric}</td>
                <td className="p-3 text-muted-foreground">{row.ft}</td>
                <td className="p-3 text-muted-foreground">{row.pe}</td>
                <td className="p-3 text-muted-foreground">{row.rag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Future Timeline ─── */
function FutureOutlook() {
  const milestones = [
    { year: "2024", label: "Single Agents", desc: "Individual AI agents handling specific tasks" },
    { year: "2025", label: "Multi-Agent Orchestration", desc: "Agents coordinating on complex workflows" },
    { year: "2026", label: "Autonomous Workflows", desc: "End-to-end processes with minimal human oversight" },
    { year: "2027+", label: "Self-Improving Networks", desc: "Agent networks that optimize their own performance" },
  ];
  return (
    <div>
      <h3 className="font-sans text-lg font-semibold mb-1">Future Outlook</h3>
      <p className="text-xs text-muted-foreground mb-4">Where AI agent technology is heading.</p>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-4 pl-0"
            >
              <div className="relative z-10 w-8 h-8 rounded-full bg-primary/15 border border-primary flex items-center justify-center text-[10px] font-mono text-primary flex-shrink-0">
                {m.year.slice(2)}
              </div>
              <div>
                <p className="text-sm font-sans font-semibold">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LLMsWorkingTogether() {
  return (
    <div>
      <ChainOfThought />
      <ReActPattern />
      <DecisionFramework />
      <FutureOutlook />
    </div>
  );
}
