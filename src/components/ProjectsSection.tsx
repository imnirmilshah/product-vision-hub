import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "AWS Pricing Pages & Calculator",
    description: "Automated manual pricing workflow with review checkpoint for enterprise AWS services.",
    tags: ["AWS", "Automation", "Product Management"],
    featured: true,
    featuredLabel: "AWS",
    detail: {
      problem: "Pricing page updates for AWS services required a 63-day manual process involving multiple teams, spreadsheets, and email chains — slowing time-to-market for new service launches.",
      approach: "Designed and shipped an automated pricing workflow with built-in review checkpoints, enabling self-service publishing while maintaining compliance and approval gates.",
      impact: "Eliminated 63 days of manual work per pricing update cycle, accelerating service launch timelines and freeing cross-functional teams for higher-leverage work.",
      stack: ["AWS Internal Tools", "Workflow Automation", "Product Strategy", "Stakeholder Alignment"],
    },
  },
  {
    title: "B2C Conversion Optimization",
    description: "Redesigned funnels + CTA microcopy for 6M+ monthly users across job search platforms.",
    tags: ["A/B Testing", "UX", "Growth"],
    featured: false,
    detail: {
      problem: "Conversion funnels across multiple B2C job platforms were underperforming — generic CTAs like 'Submit' created friction and failed to communicate value to 6M+ monthly users.",
      approach: "Ran systematic A/B tests across funnels, redesigning CTAs with intent-driven microcopy (e.g., 'Submit' → 'Find Your Home') and optimizing multi-step flows for clarity and urgency.",
      impact: "Achieved a 19% conversion lift across optimized funnels, directly increasing qualified lead volume and downstream revenue.",
      stack: ["A/B Testing", "Google Optimize", "Analytics", "UX Research", "Funnel Design"],
    },
  },
  {
    title: "AI Document Intelligence Platform",
    description: "Unified documents + AI search + self-service portal for vendors, contractors, and internal teams.",
    tags: ["AI", "LLM", "AWS Bedrock", "Search"],
    featured: true,
    featuredLabel: "AI",
    detail: {
      problem: "Over 600K documents were scattered across siloed systems with no unified search — vendors, contractors, and internal teams couldn't find what they needed without manual requests.",
      approach: "Built an AI-powered document intelligence platform using LLMs for semantic search, automated categorization, and a self-service portal with role-based access for all stakeholder groups.",
      impact: "Serves 600K+ documents with AI-powered search, reducing document retrieval time by 35% and eliminating manual request workflows for three distinct user groups.",
      stack: ["Amazon Bedrock", "LLM", "Vector Search", "React", "AWS Lambda", "S3"],
    },
  },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
      >
        Projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-12"
      >
        Featured work
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.button
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(i)}
            className={`text-left rounded-2xl p-6 transition-all group border ${
              project.featured
                ? "bg-card border-primary/40 shadow-lg shadow-primary/5 md:col-span-1"
                : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              {project.featured && project.featuredLabel && (
                <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30">{project.featuredLabel}</Badge>
              )}
            </div>
            <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-display text-xl font-bold">{projects[selected].title}</h3>
                <button onClick={() => setSelected(null)} className="p-1 hover:bg-secondary rounded-md" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-primary mb-1">Problem</p>
                  <p className="text-muted-foreground">{projects[selected].detail.problem}</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Approach</p>
                  <p className="text-muted-foreground">{projects[selected].detail.approach}</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Impact</p>
                  <p className="text-muted-foreground">{projects[selected].detail.impact}</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {projects[selected].detail.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
