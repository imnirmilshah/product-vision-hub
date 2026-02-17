import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Table, Settings, FileText, Sparkles, Layers, ChevronDown } from "lucide-react";
import CopyButton from "./CopyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const claudeMdContent = `# claude.md — PM Configuration

## Who I Am
- Technical Product Manager at AWS
- Focus: Cloud infrastructure, AI/ML services, pricing

## My Work Context
- Currently working on: Bedrock regional launches, pricing automation
- Team: Cross-functional (engineering, design, sales, legal)
- Methodology: Agile sprints, OKR-driven

## How I Want Claude to Respond
- Be direct and specific, not generic
- Always include metrics and data points
- Format PRDs with: Problem, Users, Success Metrics, Requirements, Timeline
- Challenge my assumptions when they're weak
- Default to tables and structured formats over walls of text

## My Templates
- PRD: [link to template]
- Competitive Analysis: [link]
- OKR Framework: [link]`;

const prdFirstDraft = `I need a PRD for [feature/product]. Context: [2-3 sentences about the problem].
Target users: [who]. Success looks like: [metrics].
Write a complete PRD with: Problem Statement, Target Users, User Stories, 
Success Metrics, Requirements (P0/P1/P2), Technical Considerations, 
Timeline, Open Questions.`;

const prdReview = `Review this PRD and identify: (1) weak or vague requirements, 
(2) missing edge cases, (3) unclear success metrics, 
(4) risks I haven't considered. Be brutally honest.`;

const competitiveAnalysis = `Analyze [Company/Product] vs [competitors]. For each, cover: 
core value prop, pricing model, target segment, key differentiators, 
weaknesses. End with: where is the whitespace opportunity?`;

const advancedUseCases = [
  {
    title: "User Research Synthesis",
    description: "Paste 10 interview transcripts → Claude extracts themes, pain points, quotes, and prioritized insights.",
    prompt: `Here are 10 user interview transcripts. For each, extract:
1. Top 3 pain points (with direct quotes)
2. Feature requests mentioned
3. Emotional sentiment

Then synthesize across all interviews:
- Common themes (ranked by frequency)
- Contradictions between users
- Top 5 actionable insights for the product team`,
  },
  {
    title: "Competitive Landscape",
    description: "Feed competitor pages → Claude generates a structured analysis matrix.",
    prompt: `Analyze these competitors: [list URLs or descriptions].
Create a comparison matrix covering: pricing, target audience, 
key features, differentiators, weaknesses, recent moves.
End with: gaps in the market we can exploit.`,
  },
  {
    title: "OKR Generation",
    description: "Describe your team goals → Claude generates measurable OKRs with key results.",
    prompt: `Our team's mission: [describe]. This quarter's priorities: [list 2-3].
Generate 3 Objectives with 3-4 Key Results each. Key Results must be 
measurable, time-bound, and ambitious but achievable. Include baseline 
and target metrics where possible.`,
  },
  {
    title: "Sprint Planning",
    description: "Paste your backlog → Claude helps prioritize based on impact/effort and dependencies.",
    prompt: `Here's our current backlog: [paste items].
Prioritize using RICE framework (Reach, Impact, Confidence, Effort).
Flag dependencies between items. Recommend what fits in a 2-week sprint 
for a team of [X] engineers. Identify risks and blockers.`,
  },
  {
    title: "Stakeholder Communication",
    description: "Describe the update → Claude drafts exec summary, team update, and customer-facing messaging.",
    prompt: `Context: [describe the update/launch/decision].
Draft three versions:
1. Executive summary (3 bullets, metric-driven, for VP+)
2. Team update (detailed, action items, next steps)
3. Customer-facing announcement (benefits-focused, clear CTA)`,
  },
];

const comparisonData = [
  { capability: "Long Context (200K tokens)", claude: "Best-in-class", chatgpt: "128K", gemini: "1M+", claudeGood: true, chatgptGood: true, geminiGood: true },
  { capability: "Document Analysis", claude: "Excellent", chatgpt: "Good", gemini: "Good", claudeGood: true, chatgptGood: true, geminiGood: true },
  { capability: "Structured Output", claude: "Excellent", chatgpt: "Good", gemini: "Inconsistent", claudeGood: true, chatgptGood: true, geminiGood: false },
  { capability: "Code Generation", claude: "Strong", chatgpt: "Strong", gemini: "Strong", claudeGood: true, chatgptGood: true, geminiGood: true },
  { capability: "PM Workflow Fit", claude: "Purpose-built", chatgpt: "Generic", gemini: "Generic", claudeGood: true, chatgptGood: false, geminiGood: false },
  { capability: "Hallucination Rate", claude: "Lowest", chatgpt: "Medium", gemini: "Medium", claudeGood: true, chatgptGood: false, geminiGood: false },
];

const setupSteps = [
  "Create an Anthropic account at console.anthropic.com",
  "Navigate to Claude Projects — create a new project",
  "Set up your project context and instructions",
  "Get your API key for programmatic access",
  "Install Claude for desktop or bookmark claude.ai",
];

const steps = [
  { icon: Bot, label: "Meet Claude" },
  { icon: Settings, label: "Setup Walkthrough" },
  { icon: FileText, label: "Understanding claude.md" },
  { icon: Sparkles, label: "claude.md in Action" },
  { icon: Table, label: "Creating PRDs" },
  { icon: Layers, label: "Advanced Use Cases" },
];

export default function StepGuide() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex gap-8 lg:gap-12">
      {/* Left: Progress Tracker */}
      <div className="hidden md:flex flex-col items-center gap-0 pt-2 sticky top-24 self-start">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <button
              onClick={() => setActiveStep(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-sans font-bold transition-all duration-300 ${
                i === activeStep
                  ? "bg-primary text-primary-foreground glow-box-cyan"
                  : i < activeStep
                  ? "bg-primary/80 text-primary-foreground"
                  : "border-2 border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-12 transition-colors ${i < activeStep ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile step selector */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 mb-4 w-full">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
              i === activeStep
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i + 1}. {step.label}
          </button>
        ))}
      </div>

      {/* Right: Step Content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeStep === 0 && <StepMeetClaude />}
            {activeStep === 1 && <StepSetup />}
            {activeStep === 2 && <StepClaudeMd />}
            {activeStep === 3 && <StepComparison />}
            {activeStep === 4 && <StepPRDs />}
            {activeStep === 5 && <StepAdvanced />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="text-sm font-display text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className="text-sm font-display text-primary hover:text-primary/80 disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function StepMeetClaude() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-4">Meet Claude</h3>
      <p className="font-display text-muted-foreground leading-relaxed mb-8">
        Claude is Anthropic's AI assistant — and it's become the secret weapon for product managers who want to move fast without cutting corners. 
        Unlike generic chatbots, Claude excels at long-context analysis, structured output, and nuanced reasoning — exactly what PMs need.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              <th className="text-left p-3 font-sans font-semibold text-foreground rounded-tl-lg">Capability</th>
              <th className="text-left p-3 font-sans font-semibold text-foreground">Claude</th>
              <th className="text-left p-3 font-sans font-semibold text-foreground">ChatGPT</th>
              <th className="text-left p-3 font-sans font-semibold text-foreground rounded-tr-lg">Gemini</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <tr key={i} className="border-b border-border">
                <td className="p-3 font-display text-muted-foreground">{row.capability}</td>
                <td className="p-3 font-display">
                  <span className="text-primary">✅</span> {row.claude}
                </td>
                <td className="p-3 font-display">
                  <span className={row.chatgptGood ? "text-primary" : "text-orange"}>
                    {row.chatgptGood ? "✅" : "⚠️"}
                  </span>{" "}
                  {row.chatgpt}
                </td>
                <td className="p-3 font-display">
                  <span className={row.geminiGood ? "text-primary" : "text-orange"}>
                    {row.geminiGood ? "✅" : "⚠️"}
                  </span>{" "}
                  {row.gemini}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StepSetup() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-4">Setup Walkthrough</h3>
      <div className="space-y-6">
        {setupSteps.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-sans font-bold flex-shrink-0">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="font-display text-foreground mb-3">{step}</p>
              <div className="bg-secondary rounded-lg h-32 flex items-center justify-center border border-border">
                <span className="text-sm text-muted-foreground font-display">Screenshot placeholder</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepClaudeMd() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-2">Understanding claude.md</h3>
      <p className="font-sans text-lg font-semibold text-primary mb-4">The File That Changes Everything</p>
      <p className="font-display text-muted-foreground leading-relaxed mb-6">
        claude.md is a system prompt file — custom instructions that persist across every conversation in a Claude project.
        It tells Claude who you are, what you work on, your preferences, and how to respond. Think of it as Claude's memory about you.
      </p>

      <div className="relative bg-secondary rounded-lg border border-border p-5 mb-6 overflow-x-auto">
        <CopyButton text={claudeMdContent} />
        <pre className="font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap pr-10">
          {claudeMdContent}
        </pre>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3 items-start">
          <span className="text-lg">🧠</span>
          <p className="font-display text-muted-foreground">
            <span className="text-foreground font-semibold">Persistent context:</span> Claude remembers your role, projects, and preferences
          </p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-lg">🎯</span>
          <p className="font-display text-muted-foreground">
            <span className="text-foreground font-semibold">Tailored responses:</span> No more explaining your context every conversation
          </p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-lg">⚡</span>
          <p className="font-display text-muted-foreground">
            <span className="text-foreground font-semibold">Faster iteration:</span> Go from question to PM-ready output in one turn
          </p>
        </div>
      </div>
    </div>
  );
}

function StepComparison() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-4">claude.md in Action</h3>
      <p className="font-display text-muted-foreground leading-relaxed mb-6">
        The difference between generic AI output and PM-ready output comes down to context. Here's the same prompt — with and without claude.md:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Without */}
        <div className="bg-secondary rounded-lg border-l-[3px] border-l-orange p-5">
          <p className="text-xs font-sans font-bold text-orange uppercase tracking-wider mb-3">Without claude.md</p>
          <div className="font-mono text-xs leading-relaxed text-muted-foreground space-y-2">
            <p className="text-foreground">User: Write a PRD for a new feature</p>
            <p>Claude: A PRD typically includes... [generic template with placeholder text, no specifics, reads like a Wikipedia article]</p>
          </div>
        </div>

        {/* With */}
        <div className="bg-secondary rounded-lg border-l-[3px] border-l-primary p-5 glow-box-cyan">
          <p className="text-xs font-sans font-bold text-primary uppercase tracking-wider mb-3">With claude.md</p>
          <div className="font-mono text-xs leading-relaxed text-muted-foreground space-y-2">
            <p className="text-foreground">User: Write a PRD for a new feature</p>
            <p>Claude: Based on your Bedrock regional launch context, here's a PRD:</p>
            <p className="text-foreground font-semibold">Problem: Lighthouse customers in AP-Southeast need Sonnet 3.5 access but regional dependencies are blocking deployment...</p>
            <p className="text-foreground font-semibold">Success Metrics:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Launch within 15 days of target</li>
              <li>Zero P1 incidents in first 30 days</li>
              <li>90% Lighthouse customer activation in week 1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPRDs() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-2">Creating PRDs with Claude</h3>
      <p className="font-sans text-lg font-semibold text-primary mb-6">From Blank Page to PRD in Minutes</p>

      {/* Mini workflow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {["Rough Idea", "First Draft", "Your Review", "Refined Draft", "Stakeholder-Ready"].map((step, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <div className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium ${
              i === 1 || i === 3 ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"
            }`}>
              {step}
              {(i === 1 || i === 3) && <span className="ml-1 text-[10px]">(Claude)</span>}
            </div>
            {i < 4 && <span className="text-muted-foreground text-xs">→</span>}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {[
          { title: "PRD First Draft", content: prdFirstDraft },
          { title: "PRD Review & Strengthen", content: prdReview },
          { title: "Competitive Analysis", content: competitiveAnalysis },
        ].map((tmpl, i) => (
          <div key={i}>
            <p className="font-sans font-semibold text-sm mb-2">Template {i + 1} — "{tmpl.title}"</p>
            <div className="relative bg-secondary rounded-lg border border-border p-5 overflow-x-auto">
              <CopyButton text={tmpl.content} />
              <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap pr-10">
                {tmpl.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAdvanced() {
  return (
    <div>
      <h3 className="font-sans text-2xl font-bold mb-4">Advanced PM Use Cases</h3>
      <p className="font-display text-muted-foreground leading-relaxed mb-6">
        Five powerful workflows that turn Claude into your PM co-pilot. Click to expand each.
      </p>

      <Accordion type="single" collapsible className="space-y-2">
        {advancedUseCases.map((uc, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg bg-secondary px-4">
            <AccordionTrigger className="font-sans font-semibold text-sm hover:no-underline">
              {uc.title}
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-display text-muted-foreground text-sm mb-3">{uc.description}</p>
              <div className="relative bg-background rounded-lg border border-border p-4">
                <CopyButton text={uc.prompt} />
                <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap pr-10">
                  {uc.prompt}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
