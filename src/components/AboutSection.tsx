import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Products Shipped" },
  { value: 50, suffix: "+", label: "Teams Led" },
];

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
          >
            About Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold mb-6"
          >
            Product thinker. AI demystifier. Builder.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a product manager at AWS who's passionate about making AI and cloud
              technology accessible to everyone. With over 15 years in tech, I've shipped
              products used by millions, led cross-functional teams across continents, and
              helped organizations navigate their cloud transformation journeys.
            </p>
            <p>
              When I'm not deep in roadmaps or exploring the latest LLM breakthroughs,
              you'll find me writing about AI on Medium, mentoring aspiring PMs, or
              debating whether Chipotle's guac is worth the extra charge (it is).
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 rounded-2xl bg-card border border-border aspect-square flex items-center justify-center"
        >
          <div className="text-center text-muted-foreground">
            <div className="w-24 h-24 mx-auto rounded-full bg-secondary mb-4" />
            <p className="text-sm">Photo</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-6 mt-16 max-w-lg"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl md:text-4xl font-display font-bold text-primary">
              <Counter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
