import { motion } from "framer-motion";
import { Layout, Terminal, Brain } from "lucide-react";

const skillGroups = [
  {
    icon: Layout,
    title: "Product Management",
    color: "cyan",
    skills: ["Roadmapping", "Cross-Functional Leadership", "Go-to-Market Strategy", "OKRs & KPIs", "Agile/Scrum", "Stakeholder Alignment", "A/B Testing", "Product Launch Readiness"],
  },
  {
    icon: Terminal,
    title: "Technical",
    color: "green",
    skills: ["AWS (Bedrock, SageMaker, Lambda, S3, DynamoDB)", "Snowflake", "BigQuery", "Kafka", "Python", "SQL", "Terraform", "API Design", "System Architecture"],
  },
  {
    icon: Brain,
    title: "AI / ML",
    color: "purple",
    skills: ["LLM Architecture", "Prompt Engineering", "RAG Pipelines", "AI Agents", "RLHF", "Embeddings & Vector DBs", "GenAI (Claude, LLaMA)", "NLP/TF-IDF", "Multi-Modal AI"],
  },
];

const colorMap: Record<string, string> = {
  cyan: "hover:bg-[hsl(var(--cyan)/0.15)] hover:text-[hsl(var(--cyan))]",
  green: "hover:bg-[hsl(var(--green)/0.15)] hover:text-[hsl(var(--green))]",
  purple: "hover:bg-[hsl(var(--purple)/0.15)] hover:text-[hsl(var(--purple))]",
};

const iconColorMap: Record<string, string> = {
  cyan: "text-cyan",
  green: "text-green",
  purple: "text-purple",
};

export default function SkillsSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
      >
        Expertise
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-12"
      >
        What I Bring to the Table
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <group.icon className={`w-5 h-5 ${iconColorMap[group.color]}`} />
              <h3 className="font-display font-semibold">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground transition-colors cursor-default ${colorMap[group.color]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
