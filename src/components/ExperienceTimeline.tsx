import { motion } from "framer-motion";

const experiences = [
  {
    company: "Amazon Web Services",
    role: "Senior Product Manager",
    period: "2021 – Present",
    current: true,
    bullets: [
      "Led product strategy for AI/ML services impacting 100K+ developers",
      "Drove 40% YoY growth in service adoption through data-driven roadmap",
      "Collaborated with 15+ engineering teams across 3 continents",
    ],
  },
  {
    company: "Microsoft",
    role: "Product Manager II",
    period: "2018 – 2021",
    current: false,
    bullets: [
      "Shipped Azure cognitive services features used by 50K+ enterprises",
      "Reduced onboarding friction by 60% through UX research",
      "Built and mentored a team of 4 associate PMs",
    ],
  },
  {
    company: "Salesforce",
    role: "Product Manager",
    period: "2015 – 2018",
    current: false,
    bullets: [
      "Owned the Einstein AI integration roadmap for Sales Cloud",
      "Increased platform engagement by 35% with ML-driven recommendations",
    ],
  },
  {
    company: "Deloitte Digital",
    role: "Business Analyst → Associate PM",
    period: "2010 – 2015",
    current: false,
    bullets: [
      "Transitioned from consulting to product, managing digital transformation for Fortune 500 clients",
      "Delivered 12+ enterprise projects on time across healthcare and finance",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
      >
        Experience
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-12"
      >
        Where I've made impact
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 md:pl-16"
            >
              {/* Dot */}
              <div className={`absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full border-2 ${
                exp.current ? "bg-primary border-primary" : "bg-background border-muted-foreground"
              }`} />

              <div className={`p-5 rounded-xl border ${
                exp.current
                  ? "bg-card border-orange/30 border-l-4 border-l-orange glow-box-cyan"
                  : "bg-card border-border"
              }`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-display font-semibold">{exp.company}</h3>
                  {exp.current && (
                    <span className="text-[10px] font-mono tracking-wider bg-orange/15 text-orange px-2 py-0.5 rounded-full">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{exp.role}</p>
                <p className="text-xs font-mono text-muted-foreground mb-3">{exp.period}</p>
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
