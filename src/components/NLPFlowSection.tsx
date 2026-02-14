import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { RotateCcw, Play, Edit3 } from "lucide-react";

const DEFAULT_TEXT = "My name is Nirmil, I started as a data engineer, now I'm a Product Manager at AWS, and I love Chipotle and demystifying AI.";

const STAGES = [
  { num: 1, title: "Raw Text Input", desc: "The raw text enters the pipeline — every NLP journey starts with words." },
  { num: 2, title: "Tokenization", desc: "Text splits into subword tokens — the atomic units an LLM understands." },
  { num: 3, title: "Embeddings", desc: "Tokens become high-dimensional vectors — numbers that encode meaning." },
  { num: 4, title: "Attention", desc: "Tokens attend to each other — the model learns which words relate." },
  { num: 5, title: "Vector Database", desc: "Vectors are stored in a semantic space — similar meanings cluster together." },
  { num: 6, title: "Retrieval", desc: "A query searches the vector space — finding the most relevant context." },
  { num: 7, title: "Generated Response", desc: "The LLM generates a natural language answer from retrieved context." },
];

// Simple subword tokenizer
function tokenize(text: string) {
  const words = text.split(/(\s+)/);
  const tokens: { text: string; color: string }[] = [];
  const colors = [
    "hsl(var(--cyan))",
    "hsl(var(--green))",
    "hsl(var(--orange))",
    "hsl(var(--purple))",
    "hsl(187 80% 65%)",
    "hsl(150 60% 55%)",
    "hsl(28 90% 65%)",
    "hsl(265 70% 70%)",
  ];
  let ci = 0;
  for (const w of words) {
    if (/^\s+$/.test(w)) continue;
    if (w.length > 5) {
      const mid = Math.ceil(w.length / 2);
      tokens.push({ text: w.slice(0, mid), color: colors[ci++ % colors.length] });
      tokens.push({ text: w.slice(mid), color: colors[ci++ % colors.length] });
    } else {
      tokens.push({ text: w, color: colors[ci++ % colors.length] });
    }
  }
  return tokens;
}

function fakeEmbedding() {
  return Array.from({ length: 4 }, () => (Math.random() * 2 - 1).toFixed(4));
}

const ATTENTION_PAIRS = [
  [0, 2],
  [5, 7],
  [10, 14],
  [3, 12],
];

const CLUSTERS = [
  { label: "Identity", x: 20, y: 30 },
  { label: "Food", x: 70, y: 25 },
  { label: "AI", x: 55, y: 70 },
  { label: "Preferences", x: 25, y: 65 },
];

// Stage 1 — Typewriter
function Stage1({ text, onEdit }: { text: string; onEdit: (t: string) => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="bg-secondary/50 rounded-xl p-6 font-mono text-sm min-h-[100px]">
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Edit3 className="w-3 h-3" /> Input text
      </div>
      <p className="leading-relaxed">
        {displayed}
        <span className={`inline-block w-0.5 h-4 bg-primary ml-0.5 ${done ? "animate-blink" : ""}`} />
      </p>
    </div>
  );
}

// Stage 2 — Tokens
function Stage2({ tokens }: { tokens: ReturnType<typeof tokenize> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 20 }}
          className="px-3 py-1.5 rounded-full text-xs font-mono border"
          style={{ borderColor: tok.color, color: tok.color, backgroundColor: `${tok.color}15` }}
        >
          {tok.text}
        </motion.span>
      ))}
    </div>
  );
}

// Stage 3 — Embeddings
function Stage3({ tokens }: { tokens: ReturnType<typeof tokenize> }) {
  const embeddings = useRef(tokens.map(() => fakeEmbedding()));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {tokens.slice(0, 8).map((tok, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: i * 0.06 }}
          className="bg-secondary/50 border border-border rounded-lg p-3"
        >
          <p className="text-xs font-mono mb-2" style={{ color: tok.color }}>{tok.text}</p>
          <div className="space-y-0.5">
            {embeddings.current[i].map((v, j) => (
              <p key={j} className="text-[10px] font-mono text-muted-foreground">{v}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Stage 4 — Attention
function Stage4({ tokens }: { tokens: ReturnType<typeof tokenize> }) {
  const maxIdx = tokens.length - 1;
  const validPairs = ATTENTION_PAIRS.filter(([a, b]) => a <= maxIdx && b <= maxIdx);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-8">
        {tokens.slice(0, 16).map((tok, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            className="px-2 py-1 rounded text-xs font-mono relative z-10"
            style={{ color: tok.color }}
            data-token-idx={i}
          >
            {tok.text}
          </motion.span>
        ))}
      </div>
      <div className="space-y-2">
        {validPairs.map(([a, b], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center gap-2 text-xs"
          >
            <span className="font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">{tokens[a]?.text}</span>
            <motion.div
              className="flex-1 h-px bg-gradient-to-r from-primary/60 to-primary/20"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">{tokens[b]?.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Stage 5 — Vector DB Constellation
function Stage5() {
  const dots = useRef(
    Array.from({ length: 20 }, () => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      cluster: Math.floor(Math.random() * 4),
    }))
  );

  const clusterColors = [
    "hsl(var(--cyan))",
    "hsl(var(--orange))",
    "hsl(var(--purple))",
    "hsl(var(--green))",
  ];

  return (
    <div className="relative w-full h-64 bg-secondary/30 rounded-xl overflow-hidden">
      {dots.current.map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: clusterColors[dot.cluster],
          }}
        />
      ))}
      {CLUSTERS.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="absolute text-[10px] font-mono text-muted-foreground"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}

// Stage 6 — Retrieval
function Stage6() {
  return (
    <div className="relative w-full h-64 bg-secondary/30 rounded-xl overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute w-40 h-40 rounded-full border-2 border-primary"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute w-64 h-64 rounded-full border border-primary/50"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <p className="font-mono text-xs text-primary mb-2">Query</p>
        <p className="font-mono text-sm">"What does Nirmil do?"</p>
      </motion.div>
      {/* Nearest neighbors */}
      {[
        { x: -60, y: -40, label: "product manager" },
        { x: 50, y: -30, label: "AWS" },
        { x: -40, y: 40, label: "AI enthusiast" },
      ].map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.15 }}
          className="absolute text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded"
          style={{
            left: `calc(50% + ${n.x}px)`,
            top: `calc(50% + ${n.y}px)`,
          }}
        >
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}

// Stage 7 — Generated Response
function Stage7() {
  const response = "Nirmil is a Senior Product Manager at AWS who specializes in AI/ML services. He's passionate about demystifying AI for product managers and is known for his love of Chipotle and Taco Bell.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(response.slice(0, i));
      if (i >= response.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary/50 rounded-xl p-6 font-mono text-sm border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary">▶</span>
        <span className="text-xs text-muted-foreground">Generated Response</span>
      </div>
      <p className="leading-relaxed text-foreground">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-blink" />
      </p>
    </div>
  );
}

export default function NLPFlowSection() {
  const [stage, setStage] = useState(0);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const tokens = tokenize(text);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const stageDurations = [3000, 2500, 2500, 3000, 2500, 3000, 4000];

  const play = useCallback(() => {
    setPlaying(true);
    setStage(0);
    setHasPlayed(true);

    let current = 0;
    const advance = () => {
      if (current < 6) {
        timerRef.current = setTimeout(() => {
          current++;
          setStage(current);
          advance();
        }, stageDurations[current]);
      } else {
        setPlaying(false);
      }
    };
    advance();
  }, []);

  // Auto-play on scroll into view
  useEffect(() => {
    if (inView && !hasPlayed) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        play();
      } else {
        setStage(6);
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

  const renderStage = () => {
    switch (stage) {
      case 0: return <Stage1 text={text} onEdit={setText} />;
      case 1: return <Stage2 tokens={tokens} />;
      case 2: return <Stage3 tokens={tokens} />;
      case 3: return <Stage4 tokens={tokens} />;
      case 4: return <Stage5 />;
      case 5: return <Stage6 />;
      case 6: return <Stage7 />;
      default: return null;
    }
  };

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
        className="font-display text-3xl md:text-4xl font-bold mb-4"
      >
        The Live NLP Flow
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-muted-foreground mb-8 max-w-2xl"
      >
        Watch how AI processes text — from raw words to a generated answer, in 7 stages.
      </motion.p>

      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={((stage + 1) / 7) * 100} className="h-1.5" />
      </div>

      {/* Stage tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STAGES.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              if (!playing) setStage(i);
            }}
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
          Stage {STAGES[stage].num}: {STAGES[stage].title}
        </h3>
        <p className="text-sm text-muted-foreground">{STAGES[stage].desc}</p>
      </div>

      {/* Stage content */}
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-8">
        <Button onClick={replay} variant="outline" size="sm" className="gap-2" disabled={playing}>
          <RotateCcw className="w-3 h-3" />
          Replay Animation
        </Button>
        {!playing && !hasPlayed && (
          <Button onClick={play} size="sm" className="gap-2">
            <Play className="w-3 h-3" />
            Start Demo
          </Button>
        )}
      </div>
    </section>
  );
}
