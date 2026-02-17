export interface StageInfo {
  num: number;
  title: string;
  desc: string;
}

export const STAGES: StageInfo[] = [
  { num: 1, title: "The Question", desc: "A question enters the system: the Spotify pricing query." },
  { num: 2, title: "Tokenization", desc: "The LLM reads your question. Byte-Pair Encoding splits text into subword tokens." },
  { num: 3, title: "Query Embedding", desc: "Your question becomes a single 1536-dimensional vector capturing meaning." },
  { num: 4, title: "The RAG Decision", desc: "Does the LLM know enough on its own? The system chooses retrieval over hallucination." },
  { num: 5, title: "Vector Search", desc: "Semantic search finds relevant knowledge, not by keyword, but by meaning." },
  { num: 6, title: "Context Assembly", desc: "Retrieved data assembles into the structured prompt the LLM actually sees." },
  { num: 7, title: "Transformer Inference", desc: "The transformer reasons over context and generates a sourced analyst report." },
  { num: 8, title: "Source Attribution", desc: "Every claim traces to a source: trust through transparency." },
];

export const SPOTIFY_QUESTION = "Spotify increased its monthly subscription 3 times in the past 3 years. Will this cause customer churn?";

export const TOKENS = [
  "Sp", "otify", " increased", " its", " monthly", " subscription",
  " 3", " times", " in", " the", " past", " 3", " years", ".",
  " Will", " this", " cause", " customer", " churn", "?"
];

export const TOKEN_COLORS = [
  "hsl(var(--cyan))",
  "hsl(var(--green))",
  "hsl(var(--orange))",
  "hsl(var(--purple))",
  "hsl(187 80% 65%)",
  "hsl(150 60% 55%)",
  "hsl(28 90% 65%)",
  "hsl(265 70% 70%)",
];
