import { motion } from "framer-motion";

const experiences = [
  {
    company: "Amazon Web Services",
    role: "Technical Product Manager",
    period: "July 2024 – Present",
    location: "Herndon, VA",
    current: true,
    bullets: [
      "Owned end to end launch readiness for the regional Bedrock GTM. Accelerated Sonnet 3.5 and Nova availability by 15 days, unblocking Lighthouse customers preventing potential customer churn",
      "Expanded internal tooling into an AI document intelligence product (Claude Sonnet 3.5) by defining requirements and building an automated metadata pipeline improving search precision by 35% and self-service document access by 19%",
      "Conducted discovery with 70+ enterprise customers to identify global service availability and feature parity as critical unmet needs.Validated product-market fit with 500K+ monthly page visits and 35K+ report downloads; roadmapping a 'Notify Me' CTA to build a demand funnel and data-driven regional rollout prioritization framework.",
      "Instrumented SQL performance telemetry to surface that enterprise customers lacked automated storage tuning, creating cascading impacts on pricing predictability and workload performance; used observed latency and error rate signals to define requirements and partner with data science to build an ML-based adaptive tuning engine. Reduced transaction latency by 13%, improved data durability to 99.999%, and eliminated manual tuning overhead for enterprise-scale workloads",
    ],
  },
  {
    company: "Career Now Brands",
    role: "Data Product Manager",
    period: "Oct 2021 – July 2024",
    location: "Royal Oak, MI",
    current: false,
    bullets: [
      "Designed scalable data products integrating Snowflake, Kafka, and BigQuery for real-time B2B ad decisioning",
      "Delivered AI-enhanced attribution using GenAI models (LLaMA, Phi), increasing cross-channel precision by 19%",
      "Reduced reporting ops costs by $100K through real-time dashboards and automated pipelines",
    ],
  },
  {
    company: "Career Now Brands",
    role: "Data Engineer",
    period: "Sep 2020 – Oct 2021",
    location: "Royal Oak, MI",
    current: false,
    bullets: [
      "Built ELT pipelines on Snowflake using Matillion, Airflow, Python; decreased CPU utilization by 30%",
      "Implemented RAG pipelines and RLHF workflows to enhance model performance",
    ],
  },
  {
    company: "ACMEUNIVERSE i-TECH",
    role: "Product Manager / Data Engineer",
    period: "Jun 2016 – Jul 2018",
    location: "Ahmedabad, India",
    current: false,
    bullets: [
      "Led team of data analysts delivering market insights that increased revenue by 17%",
      "Built data pipelines using Python, PySpark, Hadoop; conducted NLP extraction with TF-IDF vectorization",
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
        Where I've Been
      </motion.h2>

      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 md:pl-16"
            >
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
                <p className="text-xs font-mono text-muted-foreground mb-3">{exp.period} · {exp.location}</p>
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
