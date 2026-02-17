import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const stages = [
  {
    label: "Data Collection",
    color: "hsl(var(--orange))",
    desc: "Telemetry, performance metrics, usage patterns",
    details: "AWS CloudWatch + X-Ray collect traces. GCP Cloud Monitoring ingests metrics. Azure Monitor aggregates logs, metrics, and traces across services.",
  },
  {
    label: "Feature Engineering",
    color: "hsl(var(--purple))",
    desc: "Identify which metrics matter",
    details: "SageMaker Feature Store builds reusable features. Vertex AI Feature Store manages feature pipelines. Azure ML automated feature selection surfaces signal from noise.",
  },
  {
    label: "Model Training",
    color: "hsl(var(--cyan))",
    desc: "Predict optimal configurations",
    details: "Aurora ML trains on query history to predict plans. BigQuery ML trains models in-place with SQL. Azure SQL uses regression models on workload patterns.",
  },
  {
    label: "Inference & Action",
    color: "hsl(var(--green))",
    desc: "Real-time tuning decisions",
    details: "Predictive Auto Scaling acts before spikes. GKE Autopilot right-sizes pods. Azure Predictive Autoscale pre-provisions VMs based on learned demand curves.",
  },
  {
    label: "Feedback Loop",
    color: "hsl(328 70% 60%)",
    desc: "Outcomes improve models",
    details: "DevOps Guru learns from incident resolutions. Active Assist refines recs from user acceptance rates. Azure Advisor retrains models based on applied vs. dismissed suggestions.",
  },
];

export default function MLTuningCycle() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Circular layout */}
      <div className="relative w-full max-w-md mx-auto aspect-square mb-8">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* Connection circle */}
          <circle cx="150" cy="150" r="100" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />

          {stages.map((stage, i) => {
            const angle = (i * 360) / stages.length - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 150 + 100 * Math.cos(rad);
            const cy = 150 + 100 * Math.sin(rad);
            const isActive = i === activeIdx;

            return (
              <g key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 22 : 18}
                  fill={isActive ? stage.color : "hsl(var(--secondary))"}
                  stroke={stage.color}
                  strokeWidth={isActive ? 3 : 1.5}
                  style={{ transition: "r 0.3s, fill 0.3s, stroke-width 0.3s" }}
                />
                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={28}
                    fill="none"
                    stroke={stage.color}
                    strokeWidth={1}
                    opacity={0.3}
                    className="animate-pulse-glow"
                  />
                )}
                <text
                  x={cx}
                  y={cy + 38}
                  textAnchor="middle"
                  className="fill-foreground text-[9px] font-sans font-medium"
                >
                  {stage.label}
                </text>
              </g>
            );
          })}

          {/* Curved arrows between nodes */}
          {stages.map((_, i) => {
            const angle1 = (i * 360) / stages.length - 90;
            const angle2 = (((i + 1) % stages.length) * 360) / stages.length - 90;
            const midAngle = (angle1 + angle2) / 2;
            const rad1 = (angle1 * Math.PI) / 180;
            const rad2 = (angle2 * Math.PI) / 180;
            const midRad = (midAngle * Math.PI) / 180;

            const x1 = 150 + 100 * Math.cos(rad1);
            const y1 = 150 + 100 * Math.sin(rad1);
            const x2 = 150 + 100 * Math.cos(rad2);
            const y2 = 150 + 100 * Math.sin(rad2);
            const mx = 150 + 75 * Math.cos(midRad);
            const my = 150 + 75 * Math.sin(midRad);

            return (
              <path
                key={`arrow-${i}`}
                d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>
      </div>

      {/* Stage descriptions */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`bg-card border rounded-md p-4 cursor-pointer transition-all duration-200 ${
              activeIdx === i ? "border-primary/50 glow-box-cyan" : "border-border"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-3 h-3 rounded-full mb-2" style={{ background: stage.color }} />
            <p className="font-sans text-xs font-semibold mb-1">{stage.label}</p>
            <p className="font-display text-[11px] text-muted-foreground leading-snug">{stage.desc}</p>
            {expanded === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="font-display text-[11px] text-foreground mt-2 pt-2 border-t border-border leading-snug"
              >
                {stage.details}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
