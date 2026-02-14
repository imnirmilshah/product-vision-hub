import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "AI-Powered Product Recommender",
    description: "ML pipeline for personalized recommendations across 10M+ users.",
    tags: ["Python", "AWS SageMaker", "React"],
    detail: {
      problem: "Users were seeing irrelevant product suggestions, leading to low conversion rates.",
      approach: "Built a collaborative filtering pipeline with real-time feature store on AWS SageMaker.",
      impact: "Increased conversion by 28% and average order value by 15%.",
      stack: ["Python", "SageMaker", "DynamoDB", "React", "Lambda"],
    },
  },
  {
    title: "Cloud Cost Optimizer Dashboard",
    description: "Real-time cost visibility and anomaly detection for enterprise AWS accounts.",
    tags: ["TypeScript", "AWS", "D3.js"],
    detail: {
      problem: "Enterprise clients couldn't track or predict cloud spend across 50+ accounts.",
      approach: "Built a real-time dashboard with anomaly detection using CloudWatch metrics and D3.js visualizations.",
      impact: "Saved clients avg $2M annually in cloud costs.",
      stack: ["TypeScript", "Lambda", "CloudWatch", "D3.js", "DynamoDB"],
    },
  },
  {
    title: "NLP Document Processor",
    description: "Automated document understanding pipeline for legal contracts.",
    tags: ["NLP", "Python", "Textract"],
    detail: {
      problem: "Legal teams spent 40+ hours/week manually reviewing contracts.",
      approach: "Combined AWS Textract with custom NLP models for entity extraction and clause classification.",
      impact: "Reduced review time by 75%, processing 500+ contracts/day.",
      stack: ["Python", "Textract", "Comprehend", "Step Functions", "React"],
    },
  },
  {
    title: "Developer Onboarding Platform",
    description: "Interactive learning platform reducing new-hire ramp-up time.",
    tags: ["React", "Node.js", "GraphQL"],
    detail: {
      problem: "New developers took 3+ months to become productive.",
      approach: "Built a gamified learning platform with guided tutorials, sandboxed environments, and progress tracking.",
      impact: "Cut onboarding time from 12 weeks to 4 weeks.",
      stack: ["React", "Node.js", "GraphQL", "PostgreSQL", "Docker"],
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
            className="text-left bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all group"
          >
            <div className="w-full h-32 bg-secondary/50 rounded-lg mb-4" />
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
