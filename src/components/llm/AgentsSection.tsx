import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Headphones, Terminal, Search, BarChart3 } from "lucide-react";

/* ─── 3.1 Agent Loop ─── */
const LOOP_NODES = [
  { label: "Perception", angle: -90, desc: "The agent receives input — a user query, sensor data, or an event trigger. It parses and understands what's being asked." },
  { label: "Reasoning", angle: -18, desc: "Using the LLM as its 'brain,' the agent analyzes the input, considers context, and determines what information it needs." },
  { label: "Planning", angle: 54, desc: "The agent breaks the task into steps — which tools to call, in what order, and what to do with results." },
  { label: "Action", angle: 126, desc: "The agent executes — calling APIs, querying databases, running code, or generating text." },
  { label: "Memory", angle: 198, desc: "Results are stored in short-term (conversation) and long-term (vector DB) memory for future reference." },
];

function AgentLoop() {
  const [active, setActive] = useState<number | null>(null);
  const [animIdx, setAnimIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAnimIdx((p) => (p + 1) % 5), 2000);
    return () => clearInterval(id);
  }, []);

  const radius = 100;
  const cx = 140;
  const cy = 130;

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <svg viewBox="0 0 280 260" className="w-full max-w-[300px] mx-auto md:mx-0 flex-shrink-0">
        {/* Connecting circle */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="4 3" />
        {/* Traveling dot */}
        <motion.circle
          r={4}
          fill="hsl(var(--primary))"
          cx={cx + radius * Math.cos((LOOP_NODES[0].angle * Math.PI) / 180)}
          cy={cy + radius * Math.sin((LOOP_NODES[0].angle * Math.PI) / 180)}
          animate={{
            cx: cx + radius * Math.cos(((LOOP_NODES[animIdx].angle) * Math.PI) / 180),
            cy: cy + radius * Math.sin(((LOOP_NODES[animIdx].angle) * Math.PI) / 180),
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
        />
        {/* Nodes */}
        {LOOP_NODES.map((node, i) => {
          const x = cx + radius * Math.cos((node.angle * Math.PI) / 180);
          const y = cy + radius * Math.sin((node.angle * Math.PI) / 180);
          const isActive = active === i || animIdx === i;
          return (
            <g key={node.label} onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer" }}>
              <circle
                cx={x}
                cy={y}
                r={22}
                fill={isActive ? "hsl(var(--primary) / 0.15)" : "hsl(var(--secondary))"}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={isActive ? 2 : 1}
              />
              <text x={x} y={y + 3} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={8} fontFamily="JetBrains Mono, monospace">
                {node.label.slice(0, 4)}
              </text>
              <text x={x} y={y + 36} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={9} fontFamily="JetBrains Mono, monospace">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex-1 min-h-[80px]">
        {active !== null ? (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary border border-border rounded-xl p-4"
          >
            <p className="text-sm font-mono font-semibold text-primary mb-1">{LOOP_NODES[active].label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{LOOP_NODES[active].desc}</p>
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground font-mono">Click any node to learn more</p>
        )}
      </div>
    </div>
  );
}

/* ─── 3.2 Tool Use ─── */
const TOOLS = [
  { label: "Search API", emoji: "🔍" },
  { label: "Calculator", emoji: "🧮" },
  { label: "Database", emoji: "🗄️" },
  { label: "Code Executor", emoji: "⚡" },
];

function ToolUse() {
  const steps = ["Agent receives question", "Decides which tool", "Calls external API", "Receives result", "Incorporates into response"];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary border border-border"
            >
              {step}
            </motion.span>
            {i < steps.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border text-xs font-mono"
          >
            <span>{tool.emoji}</span>
            <span>{tool.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── 3.3 RAG Compact ─── */
function RAGCompact() {
  const steps = ["User Query", "Embed", "Vector Search", "Retrieved Docs", "LLM + Context", "Response"];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20"
            >
              {step}
            </motion.span>
            {i < steps.length - 1 && <span className="text-primary text-xs">→</span>}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 font-mono">
        You saw this in detail in Section 2 above — this is the compressed view.
      </p>
    </div>
  );
}

/* ─── 3.4 Multi-Agent Systems ─── */
function MultiAgent() {
  const agents = [
    { label: "Research Agent", color: "hsl(var(--cyan))" },
    { label: "Code Agent", color: "hsl(var(--green))" },
    { label: "Analysis Agent", color: "hsl(var(--orange))" },
  ];
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="px-6 py-3 rounded-xl bg-primary/15 border-2 border-primary text-sm font-mono text-primary glow-box-cyan"
      >
        Orchestrator Agent
      </motion.div>
      <div className="flex gap-1 text-muted-foreground text-xs">
        <span>↙</span><span>↓</span><span>↘</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="px-4 py-2 rounded-xl bg-secondary border text-xs font-mono"
            style={{ borderColor: agent.color, color: agent.color }}
          >
            {agent.label}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-1 text-muted-foreground text-xs">
        <span>↗</span><span>↑</span><span>↖</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="px-4 py-2 rounded-xl bg-secondary border border-border text-xs font-mono text-muted-foreground"
      >
        Synthesized Final Response
      </motion.div>
    </div>
  );
}

/* ─── 3.5 Applications ─── */
const APPS = [
  { icon: Headphones, label: "Customer Support Agent", desc: "Resolves tickets, escalates edge cases, learns from resolution patterns.", example: "Zendesk AI, Intercom Fin" },
  { icon: Terminal, label: "Code Assistant", desc: "Writes, reviews, and debugs code within IDE context.", example: "GitHub Copilot, Cursor, Amazon Q Developer" },
  { icon: Search, label: "Research Agent", desc: "Synthesizes papers, reports, and data into structured analysis.", example: "Perplexity, Elicit, Consensus" },
  { icon: BarChart3, label: "Data Analyst Agent", desc: "Queries databases, generates visualizations, finds insights.", example: "Amazon Q in QuickSight, Tableau GPT" },
];

function Applications() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {APPS.map((app, i) => (
        <motion.div
          key={app.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-secondary rounded-xl p-4 border border-border"
        >
          <app.icon className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-sans font-semibold mb-1">{app.label}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
          <p className="text-[10px] font-mono text-primary mt-2">{app.example}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Export ─── */
export default function AgentsSection() {
  const subs = [
    { title: "The Agent Loop", subtitle: "Perception → Reasoning → Planning → Action → Memory", component: <AgentLoop /> },
    { title: "Tool Use & Function Calling", subtitle: "How agents interact with external systems", component: <ToolUse /> },
    { title: "RAG as the Knowledge Layer", subtitle: "The retrieval pipeline powers agent memory", component: <RAGCompact /> },
    { title: "Multi-Agent Orchestration", subtitle: "Specialized agents working together", component: <MultiAgent /> },
    { title: "Real-World Applications", subtitle: "Agents deployed in production today", component: <Applications /> },
  ];

  return (
    <div className="space-y-12">
      {subs.map((sub, i) => (
        <motion.div
          key={sub.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-sans text-xl font-semibold mb-1">
            <span className="text-primary font-mono text-sm mr-2">3.{i + 1}</span>
            {sub.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{sub.subtitle}</p>
          {sub.component}
        </motion.div>
      ))}
    </div>
  );
}
