import { motion } from "framer-motion";

const eras = [
  { years: "2020–2023", label: "Assisted", desc: "AI recommends, humans approve", brightness: 0.4, isCurrent: false },
  { years: "2024–2025", label: "Semi-Autonomous", desc: "AI acts within guardrails, humans set policy", brightness: 0.7, isCurrent: true },
  { years: "2026–2028", label: "Autonomous Ops", desc: "AI manages end-to-end, humans set objectives", brightness: 0.9, isCurrent: false },
  { years: "2029+", label: "Self-Evolving", desc: "AI designs new architectures, discovers optimizations", brightness: 1, isCurrent: false },
];

export default function FutureTimeline() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[600px] relative px-4">
        {/* Horizontal connecting line */}
        <div className="absolute top-8 left-[10%] right-[10%] h-px bg-border" />

        <div className="flex justify-between relative">
          {eras.map((era, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex flex-col items-center text-center w-1/4"
            >
              {/* "We are here" label */}
              <div className="h-6 mb-1">
                {era.isCurrent && (
                  <span className="text-[10px] font-sans font-bold text-primary whitespace-nowrap">We are here</span>
                )}
              </div>

              {/* Dot */}
              <div className="relative mb-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    era.isCurrent ? "bg-primary border-primary" : "border-muted-foreground/40"
                  }`}
                  style={{ opacity: era.isCurrent ? 1 : era.brightness }}
                />
                {era.isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Content */}
              <p className="font-mono text-[11px] text-muted-foreground mb-1">{era.years}</p>
              <p className="font-sans text-sm font-semibold mb-1" style={{ opacity: era.brightness }}>
                {era.label}
              </p>
              <p className="font-display text-xs text-muted-foreground leading-snug max-w-[140px]">{era.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
