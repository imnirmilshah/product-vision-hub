import { motion } from "framer-motion";
import { Briefcase, Code, Brain } from "lucide-react";

const skillGroups = [
  {
    icon: Briefcase,
    title: "Product Management",
    color: "cyan",
    skills: ["Roadmap Strategy", "User Research", "A/B Testing", "OKRs & KPIs", "Stakeholder Mgmt", "Go-to-Market", "Agile / Scrum", "Data-Driven Decisions"],
  },
  {
    icon: Code,
    title: "Technical",
    color: "green",
    skills: ["AWS", "Python", "TypeScript", "System Design", "APIs & Microservices", "CI/CD", "SQL", "Cloud Architecture"],
  },
  {
    icon: Brain,
    title: "AI / ML",
    color: "purple",
    skills: ["LLMs & GPT", "Prompt Engineering", "RAG Pipelines", "Vector Databases", "NLP", "Computer Vision", "ML Ops", "Responsible AI"],
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
        Skills & Expertise
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-12"
      >
        What I bring to the table
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
