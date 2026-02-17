import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ComponentInfo {
  id: string;
  label: string;
  y: number;
  height: number;
  color: string;
  simple: string;
  technical: string;
  isLoop?: boolean;
}

const COMPONENTS: ComponentInfo[] = [
  {
    id: "input",
    label: "Input Text",
    y: 20,
    height: 40,
    color: "hsl(var(--foreground))",
    simple: "Your raw text (a sentence, question, or document) enters the model.",
    technical: "Raw string input tokenized via BPE into integer token IDs from a fixed vocabulary (typically 32K to 100K tokens).",
  },
  {
    id: "token-embed",
    label: "Token Embedding",
    y: 80,
    height: 40,
    color: "hsl(var(--orange))",
    simple: "Each word (token) gets converted into a list of numbers that capture its meaning.",
    technical: "Learned lookup table W_e ∈ ℝ^{V×d_model} maps each token ID to a dense d_model-dimensional vector. GPT-4 uses d_model ≈ 12288.",
  },
  {
    id: "pos-encode",
    label: "Positional Encoding",
    y: 140,
    height: 40,
    color: "hsl(var(--orange))",
    simple: "The model learns WHERE each word appears in the sentence. Word order matters!",
    technical: "Adds positional signal: PE(pos,2i) = sin(pos/10000^{2i/d}), PE(pos,2i+1) = cos(pos/10000^{2i/d}). Modern models use RoPE (Rotary Position Embeddings).",
  },
  {
    id: "attention",
    label: "Multi-Head Attention",
    y: 210,
    height: 44,
    color: "hsl(var(--purple))",
    simple: "This is where the model figures out which words are related to which. It looks at every word and decides what to pay attention to.",
    technical: "Computes scaled dot-product attention across h parallel heads: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V. Each head learns different relationship patterns in the sequence.",
    isLoop: true,
  },
  {
    id: "norm1",
    label: "Add & Norm",
    y: 270,
    height: 34,
    color: "hsl(var(--green))",
    simple: "A cleanup step that adds the original input back in and normalizes, keeping training stable.",
    technical: "Residual connection x + Sublayer(x) followed by LayerNorm: LN(x) = γ · (x-μ)/σ + β. Pre-norm (before sublayer) is now standard in modern architectures.",
    isLoop: true,
  },
  {
    id: "ffn",
    label: "Feed-Forward Network",
    y: 320,
    height: 44,
    color: "hsl(var(--cyan))",
    simple: "After understanding relationships, this layer processes each position independently, like thinking about what each word means on its own.",
    technical: "Two-layer MLP with GELU: FFN(x) = GELU(xW₁ + b₁)W₂ + b₂. Hidden dimension typically 4× model dimension. SwiGLU variant used in Llama/PaLM.",
    isLoop: true,
  },
  {
    id: "norm2",
    label: "Add & Norm",
    y: 380,
    height: 34,
    color: "hsl(var(--green))",
    simple: "Another cleanup step, same as before. Residual connection keeps the gradient flowing.",
    technical: "Second residual + LayerNorm. The skip connections are critical. Without them, gradients vanish in deep networks (96+ layers in GPT-4).",
    isLoop: true,
  },
  {
    id: "output-prob",
    label: "Output Probabilities",
    y: 450,
    height: 40,
    color: "hsl(var(--foreground))",
    simple: "The model calculates the probability of every possible next word and picks the most likely one.",
    technical: "Final linear projection to vocabulary size + softmax: P(token) = softmax(h_L · W_e^T). Temperature τ scales logits: softmax(z/τ). Top-p (nucleus) sampling truncates the distribution.",
  },
  {
    id: "output",
    label: "Generated Text",
    y: 510,
    height: 40,
    color: "hsl(var(--foreground))",
    simple: "The final answer appears, one token at a time, each building on everything before it.",
    technical: "Autoregressive decoding: each token generated is appended to the sequence and fed back. KV-cache stores prior attention states to avoid recomputation. Speculative decoding can 2-3× throughput.",
  },
];

const BOX_WIDTH = 220;
const SVG_WIDTH = 300;
const SVG_HEIGHT = 570;

export default function TransformerDiagram() {
  const [technical, setTechnical] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hovered = COMPONENTS.find((c) => c.id === hoveredId);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <Label htmlFor="detail-toggle" className="text-xs font-mono text-muted-foreground">Simple</Label>
        <Switch id="detail-toggle" checked={technical} onCheckedChange={setTechnical} />
        <Label htmlFor="detail-toggle" className="text-xs font-mono text-muted-foreground">Technical</Label>
      </div>

      <div className="relative flex flex-col md:flex-row items-start gap-6">
        {/* SVG Diagram */}
        <div className="w-full md:w-auto flex-shrink-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full max-w-[320px] mx-auto md:mx-0"
            style={{ minWidth: 260 }}
          >
            {/* Arrows between components */}
            {COMPONENTS.slice(0, -1).map((comp, i) => {
              const next = COMPONENTS[i + 1];
              const startY = comp.y + comp.height;
              const endY = next.y;
              return (
                <line
                  key={`arrow-${i}`}
                  x1={SVG_WIDTH / 2}
                  y1={startY}
                  x2={SVG_WIDTH / 2}
                  y2={endY}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  opacity={0.4}
                />
              );
            })}

            {/* Loop bracket for × N layers */}
            <rect
              x={SVG_WIDTH / 2 + BOX_WIDTH / 2 + 8}
              y={COMPONENTS[3].y - 4}
              width={20}
              height={COMPONENTS[6].y + COMPONENTS[6].height - COMPONENTS[3].y + 8}
              rx={4}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              opacity={0.5}
            />
            <text
              x={SVG_WIDTH / 2 + BOX_WIDTH / 2 + 18}
              y={(COMPONENTS[3].y + COMPONENTS[6].y + COMPONENTS[6].height) / 2 + 4}
              fill="hsl(var(--primary))"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
              textAnchor="middle"
            >
              ×N
            </text>

            {/* Component boxes */}
            {COMPONENTS.map((comp) => {
              const x = (SVG_WIDTH - BOX_WIDTH) / 2;
              const isHovered = hoveredId === comp.id;
              return (
                <g
                  key={comp.id}
                  onMouseEnter={() => setHoveredId(comp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={x}
                    y={comp.y}
                    width={BOX_WIDTH}
                    height={comp.height}
                    rx={8}
                    fill={comp.color.replace(")", " / 0.12)")}
                    stroke={isHovered ? "hsl(var(--primary))" : comp.color.replace(")", " / 0.4)")}
                    strokeWidth={isHovered ? 2 : 1}
                  />
                  <text
                    x={SVG_WIDTH / 2}
                    y={comp.y + comp.height / 2 + 4}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {comp.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tooltip card */}
        <div className="flex-1 min-h-[120px]">
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-secondary border border-border rounded-xl p-5 shadow-lg"
              >
                <p className="text-sm font-mono font-semibold text-primary mb-2">{hovered.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {technical ? hovered.technical : hovered.simple}
                </p>
                {hovered.isLoop && (
                  <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                    Repeated × N layers (GPT-4: ~120 layers)
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-secondary/50 border border-border/50 rounded-xl p-5 text-center"
              >
                <p className="text-sm text-muted-foreground font-mono">
                  ← Hover any component to learn more
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
