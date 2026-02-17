import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RAGPipelineSection from "@/components/RAGPipelineSection";
import TransformerDiagram from "@/components/llm/TransformerDiagram";
import AgentsSection from "@/components/llm/AgentsSection";
import LLMsWorkingTogether from "@/components/llm/LLMsWorkingTogether";

const SectionLabel = ({ children }: { children: string }) => (
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
  >
    {children}
  </motion.p>
);

const SectionHeading = ({ children }: { children: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="font-sans text-3xl md:text-4xl font-bold mb-6"
  >
    {children}
  </motion.h2>
);

export default function LLMFundamentals() {
  return (
    <>
      <Helmet>
        <title>LLM Fundamentals | Nirmil</title>
        <meta name="description" content="Interactive guide to LLM architecture, RAG pipelines, transformers, AI agents, and how they work together. Built by a PM at AWS." />
      </Helmet>
      <Navbar />
      <main id="main-content">
        {/* ─── Hero ─── */}
        <section className="relative bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-4xl md:text-5xl font-bold mb-4"
            >
              Understanding Large Language Models
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              From transformers to AI agents: the technical foundations every PM needs
            </motion.p>
          </div>
        </section>

        {/* ─── Section 1: Transformer Architecture ─── */}
        <section className="container mx-auto px-4 py-20">
          <SectionLabel>Architecture</SectionLabel>
          <SectionHeading>The Transformer: The Engine Behind Every LLM</SectionHeading>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Every modern LLM (GPT-4, Claude, Gemini, Llama) is built on the transformer architecture. Toggle between simple and technical explanations.
          </p>
          <TransformerDiagram />
        </section>

        {/* ─── Section 2: RAG Pipeline (reuse existing) ─── */}
        <div className="border-t border-border">
          <RAGPipelineSection />
        </div>

        {/* ─── Section 3: AI Agents ─── */}
        <section className="container mx-auto px-4 py-20 border-t border-border">
          <SectionLabel>AI Agents</SectionLabel>
          <SectionHeading>From LLMs to Autonomous Agents</SectionHeading>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
            LLMs are the brain. Agents add perception, planning, action, and memory, turning a text generator into an autonomous system.
          </p>
          <AgentsSection />
        </section>

        {/* ─── Section 4: LLMs Working Together ─── */}
        <section className="container mx-auto px-4 py-20 border-t border-border">
          <SectionLabel>Advanced</SectionLabel>
          <SectionHeading>Making LLMs Work Smarter</SectionHeading>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
            Prompting strategies, reasoning patterns, and choosing the right approach for your use case.
          </p>
          <LLMsWorkingTogether />
        </section>
      </main>
      <Footer />
    </>
  );
}
