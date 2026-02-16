import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import nirmilPhoto from "@/assets/nirmil-photo.png";

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
  { value: 8, suffix: "+", label: "Years in Product & Data" },
  { value: 10, suffix: "+", label: "Products Shipped" },
  { value: 3, suffix: "", label: "Master's & Bachelor's Degrees" },
];

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
          >
            About
          </motion.p>

          <div className="flex items-start gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-box-cyan">
                <img
                  src={nirmilPhoto}
                  alt="Nirmil Shah — Technical Product Manager at AWS"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold pt-2"
            >
              Product thinker. AI demystifier. Builder.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              I started my career as a data engineer, building the pipelines and
              infrastructure that power data-driven decisions. That foundation gave me
              a deep technical fluency that I carried into Technical Program Management
              and eventually Product Management — where I now shape cloud infrastructure
              products at AWS.
            </p>
            <p>
              With 8+ years in tech, I've shipped multiple products and features across
              cloud and AI. When I'm not deep in roadmaps or exploring the latest LLM
              breakthroughs, you'll find me writing about AI on Medium, mentoring aspiring
              PMs, or debating whether Chipotle's guac is worth the extra charge (it is).
            </p>
          </motion.div>
        </div>
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
