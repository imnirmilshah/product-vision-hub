import { motion } from "framer-motion";

const PROMPT_LINES = [
  { type: "system", text: "[SYSTEM]: You are a financial analyst. Answer using ONLY the retrieved context below." },
  { type: "divider", text: "" },
  { type: "source", text: "--- Source 1: Spotify Pricing History ---" },
  { type: "data", text: 'US Premium: $9.99 (2011-2023) → $10.99 (Jul 2023) → $11.99 (Jun 2024) → $12.99 (Jun 2025)' },
  { type: "divider", text: "" },
  { type: "source", text: "--- Source 2: Financial Metrics ---" },
  { type: "data", text: "Revenue $4.2B. Gross margin 31.1%. Royalty payouts ~65% of revenue." },
  { type: "divider", text: "" },
  { type: "source", text: "--- Source 3: User Behavior ---" },
  { type: "data", text: "Avg daily listening: 148 min. AI DJ weekly active: 35%. Wrapped 2025: 250M+." },
  { type: "divider", text: "" },
  { type: "source", text: "--- Source 4: Retention Data ---" },
  { type: "data", text: "Monthly churn: ~3.9% (stable through 2023 and 2024 increases)." },
  { type: "divider", text: "" },
  { type: "source", text: "--- Source 5: Competitive Position ---" },
  { type: "data", text: "Spotify 40%, Apple Music 25%, YouTube Music 18%, Amazon 10%." },
  { type: "divider", text: "" },
  { type: "user", text: '[USER]: Spotify increased its monthly subscription 3 times in the past 3 years. Will this cause customer churn?' },
];

export default function Stage6ContextAssembly() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: LangChain prompt templates · Bedrock RetrieveAndGenerate · LlamaIndex</p>

      <div className="bg-secondary/50 rounded-xl p-4 border border-border overflow-hidden max-h-80 overflow-y-auto">
        {PROMPT_LINES.map((line, i) => {
          if (line.type === "divider") return <div key={i} className="h-1" />;
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`text-[11px] font-mono leading-relaxed ${
                line.type === "system" ? "text-primary font-semibold" :
                line.type === "source" ? "text-primary/70" :
                line.type === "user" ? "text-primary font-semibold mt-2" :
                "text-muted-foreground"
              }`}
            >
              {line.text}
            </motion.p>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-3 flex items-center gap-2"
      >
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary">~820 tokens context + 20 token question = 840 tokens sent to LLM</span>
      </motion.div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        The retrieved chunks are formatted into a structured prompt. Notice the system instruction: "Answer using ONLY the retrieved context." This is how RAG prevents hallucination.
      </p>
    </div>
  );
}
