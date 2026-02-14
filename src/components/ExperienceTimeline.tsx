import { motion } from "framer-motion";

const experiences = [
  {
    company: "Amazon Web Services",
    role: "Product Manager",
    period: "2022 – Present",
    current: true,
    bullets: [
      "Driving product strategy for cloud and AI/ML services",
      "Shipped multiple features improving developer experience across AWS",
      "Bridging deep technical expertise with customer-centric product vision",
    ],
  },
  {
    company: "Previous Company",
    role: "Technical Program Manager",
    period: "2020 – 2022",
    current: false,
    bullets: [
      "Managed complex cross-functional programs spanning engineering and product",
      "Drove execution of large-scale cloud migration initiatives",
      "Transitioned from TPM to Product Management track",
    ],
  },
  {
    company: "Tech Company",
    role: "Data Engineer → TPM",
    period: "2017 – 2020",
    current: false,
    bullets: [
      "Built and maintained data pipelines processing millions of records daily",
      "Designed ETL architectures and data models for analytics platforms",
      "Grew into program management, leading technical delivery end-to-end",
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
