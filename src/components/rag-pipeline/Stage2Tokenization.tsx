import { motion } from "framer-motion";
import { TOKENS, TOKEN_COLORS } from "./types";

const callouts: Record<number, string> = {
  0: 'Even "Spotify" splits into subwords — the tokenizer learned these fragments during training',
  6: "Numbers are individual tokens — processed as symbols, not quantities",
  18: "This single token carries heavy semantic weight — it drives what gets retrieved",
};

export default function Stage2Tokenization() {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 font-mono">Infrastructure: tiktoken · SentencePiece · Claude Tokenizer</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {TOKENS.map((tok, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.3, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
            className="px-3 py-1.5 rounded-full text-xs font-mono border"
            style={{
              borderColor: TOKEN_COLORS[i % TOKEN_COLORS.length],
              color: TOKEN_COLORS[i % TOKEN_COLORS.length],
              backgroundColor: `${TOKEN_COLORS[i % TOKEN_COLORS.length]}15`,
            }}
          >
            {tok.trim() || tok}
          </motion.span>
        ))}
      </div>
      <div className="space-y-2">
        {Object.entries(callouts).map(([idx, text], i) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.2 }}
            className="flex items-start gap-2 text-xs"
          >
            <span className="font-mono px-2 py-0.5 rounded bg-primary/10 text-primary shrink-0">
              "{TOKENS[Number(idx)].trim()}"
            </span>
            <span className="text-muted-foreground">→ {text}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        LLMs don't read words — they read tokens. Byte-Pair Encoding breaks text into subword units. This 20-word question becomes {TOKENS.length} tokens. Claude and GPT-4 each have ~100K token vocabularies.
      </p>
    </div>
  );
}
