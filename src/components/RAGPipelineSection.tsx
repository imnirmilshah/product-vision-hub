import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { STAGES } from "./rag-pipeline/types";
import Stage1Question from "./rag-pipeline/Stage1Question";
import Stage2Tokenization from "./rag-pipeline/Stage2Tokenization";
import Stage3Embedding from "./rag-pipeline/Stage3Embedding";
import Stage4RAGDecision from "./rag-pipeline/Stage4RAGDecision";
import Stage5VectorSearch from "./rag-pipeline/Stage5VectorSearch";
import Stage6ContextAssembly from "./rag-pipeline/Stage6ContextAssembly";
import Stage7Inference from "./rag-pipeline/Stage7Inference";
import Stage8Attribution from "./rag-pipeline/Stage8Attribution";

const STAGE_COMPONENTS = [
  Stage1Question,
  Stage2Tokenization,
  Stage3Embedding,
  Stage4RAGDecision,
  Stage5VectorSearch,
  Stage6ContextAssembly,
  Stage7Inference,
  Stage8Attribution,
];

const STAGE_DURATIONS = [4000, 3000, 3000, 3500, 4000, 3500, 5000, 4000];

const SUMMARY_STEPS = [
  "User Question",
  "BPE Tokenization (20 tokens)",
  "Query Embedding (1536-dim)",
  "RAG Decision",
  "Vector Search (cosine, top-k)",
  "Context Assembly (840 tokens)",
  "Transformer Inference",
  "Sourced Response + Citations",
];

export default function RAGPipelineSection() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const play = useCallback(() => {
    setPlaying(true);
    setStage(0);
    setHasPlayed(true);

    let current = 0;
    const advance = () => {
      if (current < 7) {
        timerRef.current = setTimeout(() => {
          current++;
          setStage(current);
          advance();
        }, STAGE_DURATIONS[current]);
      } else {
        timerRef.current = setTimeout(() => setPlaying(false), STAGE_DURATIONS[7]);
      }
    };
    advance();
  }, []);

  useEffect(() => {
    if (inView && !hasPlayed) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        play();
      } else {
        setStage(7);
        setHasPlayed(true);
      }
    }
  }, [inView, hasPlayed, play]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const replay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    play();
  };

  const StageComponent = STAGE_COMPONENTS[stage];

  return (
    <section ref={ref} className="container mx-auto px-4 py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
      >
        Interactive Demo
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-2"
      >
        Inside the LLM: How AI Answers a Business Question
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-muted-foreground mb-2 max-w-3xl"
      >
        A live, step-by-step walkthrough of the full RAG pipeline: from a single question to a sourced, reasoned analysis.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs text-muted-foreground mb-8 max-w-3xl"
      >
        This is not a simplified metaphor. This is how modern LLMs actually work, from Amazon Bedrock to Claude to GPT-4. Each step below maps to real infrastructure you can deploy today.
      </motion.p>

      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={((stage + 1) / 8) * 100} className="h-1.5" />
      </div>

      {/* Stage tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STAGES.map((s, i) => (
          <button
            key={i}
            onClick={() => { if (!playing) setStage(i); }}
            className={`text-xs px-3 py-1.5 rounded-full font-mono transition-all ${
              stage === i
                ? "bg-primary text-primary-foreground"
                : i <= stage
                ? "bg-primary/15 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {s.num}. {s.title}
          </button>
        ))}
      </div>

      {/* Stage info */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-lg mb-1">
          Step {STAGES[stage].num}: {STAGES[stage].title}
        </h3>
        <p className="text-sm text-muted-foreground">{STAGES[stage].desc}</p>
      </div>

      {/* Stage content */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StageComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Summary bar */}
      {stage === 7 && !playing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-secondary/50 rounded-xl p-4 border border-border"
        >
          <p className="text-xs font-mono text-primary mb-3">The Complete LLM + RAG Architecture</p>
          <div className="flex flex-wrap items-center gap-1">
            {SUMMARY_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-1">
                <motion.span
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary"
                >
                  {step}
                </motion.span>
                {i < SUMMARY_STEPS.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            You just watched the same pipeline that powers Claude, ChatGPT, Amazon Bedrock, and every production RAG system. Nirmil builds products on this architecture at AWS.
          </p>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex gap-3 mt-8">
        <Button onClick={replay} variant="outline" size="sm" className="gap-2" disabled={playing}>
          <RotateCcw className="w-3 h-3" />
          Replay Pipeline
        </Button>
      </div>
    </section>
  );
}
