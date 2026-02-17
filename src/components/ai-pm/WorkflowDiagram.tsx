import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Search, FileText, Palette, ListTodo, Rocket } from "lucide-react";
import CopyButton from "./CopyButton";

const nodes = [
  {
    icon: Lightbulb,
    label: "Ideation",
    claudeAssisted: false,
    description: "Brainstorm features, identify opportunities, and define the problem space.",
    prompt: "Here's a problem our users face: [describe]. Brainstorm 10 potential solutions, ranked by feasibility and impact.",
    output: "A prioritized list of solution ideas with trade-off analysis.",
  },
  {
    icon: Search,
    label: "Research",
    claudeAssisted: true,
    description: "Claude synthesizes user interviews, competitor data, and market signals into actionable insights.",
    prompt: "Analyze these 5 competitor products: [list]. Create a feature comparison matrix and identify whitespace opportunities.",
    output: "Structured competitive analysis with gap identification.",
  },
  {
    icon: FileText,
    label: "PRD",
    claudeAssisted: true,
    description: "Claude generates a complete PRD draft from your context, ready for stakeholder review.",
    prompt: "Write a PRD for [feature]. Include: problem, users, stories, metrics, P0-P2 requirements, timeline, risks.",
    output: "Full PRD document with structured sections and measurable success criteria.",
  },
  {
    icon: Palette,
    label: "Design Review",
    claudeAssisted: false,
    description: "Review designs against PRD requirements. Ensure UX aligns with user stories.",
    prompt: "Review this design against the PRD requirements. Flag any gaps, missing states, or accessibility concerns.",
    output: "Design review checklist with actionable feedback.",
  },
  {
    icon: ListTodo,
    label: "Sprint Planning",
    claudeAssisted: true,
    description: "Claude helps break the PRD into sprint-sized chunks, prioritized by dependencies and impact.",
    prompt: "Break this PRD into engineering tasks for a 2-week sprint. Flag dependencies and estimate complexity (S/M/L).",
    output: "Sprint backlog with prioritized tickets and dependency map.",
  },
  {
    icon: Rocket,
    label: "Launch",
    claudeAssisted: false,
    description: "Ship the feature, monitor metrics, and communicate the update to stakeholders.",
    prompt: "Draft a launch announcement for [feature]: exec summary, team update, and customer-facing blog post.",
    output: "Three communication pieces ready for different audiences.",
  },
];

export default function WorkflowDiagram() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div>
      {/* Horizontal node row */}
      <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={i} className="flex items-center flex-shrink-0">
              <button
                onClick={() => setActiveNode(activeNode === i ? null : i)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    node.claudeAssisted
                      ? "bg-primary/15 border-2 border-primary glow-box-cyan"
                      : "bg-secondary border-2 border-border"
                  } ${activeNode === i ? "scale-110" : "group-hover:scale-105"}`}
                >
                  <Icon className={`w-5 h-5 ${node.claudeAssisted ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className={`text-xs font-sans font-medium text-center ${
                  activeNode === i ? "text-primary" : "text-muted-foreground"
                }`}>
                  {node.label}
                </span>
              </button>
              {i < nodes.length - 1 && (
                <div className="w-6 lg:w-12 h-[2px] border-t-2 border-dashed border-border mx-1 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {activeNode !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 bg-secondary rounded-lg border border-border p-6">
              <h4 className="font-sans text-lg font-bold mb-2">{nodes[activeNode].label}</h4>
              <p className="font-display text-muted-foreground text-sm mb-4">{nodes[activeNode].description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-sans font-semibold text-primary uppercase tracking-wider mb-2">Example Prompt</p>
                  <div className="relative bg-background rounded-lg border border-border p-4">
                    <CopyButton text={nodes[activeNode].prompt} />
                    <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap pr-10">
                      {nodes[activeNode].prompt}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold text-primary uppercase tracking-wider mb-2">Expected Output</p>
                  <div className="bg-background rounded-lg border border-border p-4">
                    <p className="font-display text-sm text-muted-foreground">{nodes[activeNode].output}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
