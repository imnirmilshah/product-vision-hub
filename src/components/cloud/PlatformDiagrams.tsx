import { useState } from "react";
import { motion } from "framer-motion";

interface ServiceNode {
  name: string;
  desc: string;
  tooltip: string;
}

interface Platform {
  name: string;
  hub: string;
  accentColor: string;
  accentHsl: string;
  services: ServiceNode[];
}

const platforms: Platform[] = [
  {
    name: "AWS",
    hub: "AWS AI-Native Operations",
    accentColor: "hsl(36 100% 50%)",
    accentHsl: "36 100% 50%",
    services: [
      { name: "Aurora ML", desc: "Auto query optimization", tooltip: "Automatically applies ML to predict and optimize query plans, eliminating manual DBA tuning." },
      { name: "Redshift", desc: "Auto workload mgmt", tooltip: "ML-driven workload management automatically routes, prioritizes, and scales queries." },
      { name: "DynamoDB", desc: "Adaptive capacity", tooltip: "Instantly reallocates throughput to hot partitions without manual intervention." },
      { name: "SageMaker", desc: "AutoML pipelines", tooltip: "Automated model building, training, and deployment with minimal ML expertise required." },
      { name: "DevOps Guru", desc: "ML anomaly detection", tooltip: "ML-powered operational insights that detect anomalies before they impact users." },
      { name: "Predictive Scaling", desc: "Traffic forecasting", tooltip: "Uses ML to predict traffic patterns and pre-provisions capacity ahead of demand spikes." },
      { name: "Bedrock", desc: "Foundation models + RAG", tooltip: "Managed access to foundation models with built-in RAG via Knowledge Bases." },
      { name: "Trusted Advisor", desc: "Cost & perf recs", tooltip: "AI-generated recommendations for cost optimization, security, and performance." },
      { name: "CodeWhisperer", desc: "AI-assisted IaC", tooltip: "AI code generation for infrastructure-as-code, reducing configuration errors." },
    ],
  },
  {
    name: "Google Cloud",
    hub: "GCP Active Intelligence",
    accentColor: "hsl(217 89% 61%)",
    accentHsl: "217 89% 61%",
    services: [
      { name: "AlloyDB AI", desc: "Vector search, auto-indexing", tooltip: "PostgreSQL-compatible with built-in vector search and ML-driven index optimization." },
      { name: "BigQuery ML", desc: "In-database ML", tooltip: "Train and run ML models directly in BigQuery using SQL — no data movement needed." },
      { name: "Cloud Spanner", desc: "Auto-sharding", tooltip: "Globally distributed database that automatically shards and rebalances data." },
      { name: "Vertex AI", desc: "AutoML & feature store", tooltip: "End-to-end ML platform with automated model training and managed feature store." },
      { name: "Cloud Run", desc: "Traffic prediction", tooltip: "Serverless compute that predicts traffic patterns for instant cold-start elimination." },
      { name: "Ops Suite AIOps", desc: "Intelligent monitoring", tooltip: "AI-powered log analysis and metric correlation for faster root cause detection." },
      { name: "Gemini Code Assist", desc: "AI dev tools", tooltip: "AI coding assistant integrated across GCP for infrastructure and application code." },
      { name: "Active Assist", desc: "AI recommendations", tooltip: "Proactive recommendations for cost, security, and performance across all GCP services." },
      { name: "GKE Autopilot", desc: "AI-optimized scaling", tooltip: "Fully managed Kubernetes that auto-provisions and scales based on workload needs." },
    ],
  },
  {
    name: "Azure",
    hub: "Azure Intelligent Cloud",
    accentColor: "hsl(207 100% 42%)",
    accentHsl: "207 100% 42%",
    services: [
      { name: "SQL Intelligent Perf", desc: "Auto-tuning", tooltip: "Automatic index management, query plan correction, and performance recommendations." },
      { name: "Cosmos DB", desc: "Auto-scale & indexing", tooltip: "Globally distributed database with automatic throughput scaling and index optimization." },
      { name: "Synapse", desc: "Serverless optimization", tooltip: "Intelligent query distribution and caching across distributed data warehouse workloads." },
      { name: "Azure ML", desc: "AutoML pipelines", tooltip: "Automated machine learning for model selection, hyperparameter tuning, and deployment." },
      { name: "Predictive Autoscale", desc: "Demand forecasting", tooltip: "ML-based prediction of compute demand with pre-emptive scaling actions." },
      { name: "Monitor AIOps", desc: "Anomaly detection", tooltip: "AI-powered detection of unusual patterns in metrics, logs, and traces." },
      { name: "GitHub Copilot", desc: "AI-assisted IaC", tooltip: "AI pair programmer for infrastructure code, Bicep templates, and ARM configurations." },
      { name: "Azure Advisor", desc: "Optimization engine", tooltip: "Personalized recommendations for reliability, security, performance, and cost." },
      { name: "Azure OpenAI", desc: "Foundation models", tooltip: "Enterprise access to GPT-4, DALL-E, and Whisper with built-in safety and compliance." },
    ],
  },
];

const comparisonData = [
  { capability: "Auto-Scaling", aws: "Predictive Auto Scaling", gcp: "Cloud Run Autopilot", azure: "Predictive Autoscale" },
  { capability: "DB Optimization", aws: "Aurora ML, DevOps Guru", gcp: "AlloyDB AI, BigQuery ML", azure: "SQL Intelligent Perf" },
  { capability: "AI Ops", aws: "DevOps Guru", gcp: "Operations Suite", azure: "Azure Monitor AIOps" },
  { capability: "Foundation Models", aws: "Bedrock", gcp: "Vertex AI", azure: "Azure OpenAI" },
  { capability: "Cost Optimization", aws: "Trusted Advisor", gcp: "Active Assist", azure: "Azure Advisor" },
];

function PlatformCard({ platform }: { platform: Platform }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Accent bar */}
      <div className="h-1.5" style={{ background: platform.accentColor }} />

      <div className="p-6 md:p-8">
        {/* Hub */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border-2 font-sans font-semibold text-sm"
            style={{ borderColor: platform.accentColor, color: platform.accentColor }}
          >
            {platform.hub}
          </div>
        </div>

        {/* Service nodes grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
          {platform.services.map((service, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="bg-secondary border border-border rounded-md p-3 cursor-pointer transition-all duration-200 hover:border-primary/50 hover:glow-box-cyan"
              >
                <p className="font-sans text-xs font-semibold mb-0.5">{service.name}</p>
                <p className="font-display text-[11px] text-muted-foreground leading-tight">{service.desc}</p>
              </div>
              {hoveredIdx === i && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 left-0 right-0 top-full mt-1 bg-popover border border-border rounded-md p-3 shadow-lg"
                >
                  <p className="font-display text-xs text-popover-foreground leading-relaxed">{service.tooltip}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-[10px] font-display text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-4 h-0 border-t border-muted-foreground inline-block" /> Data Flow</span>
          <span className="flex items-center gap-1"><span className="w-4 h-0 border-t border-dashed border-muted-foreground inline-block" /> AI Signal</span>
          <span className="flex items-center gap-1"><span className="w-4 h-0 border-t border-primary inline-block" style={{ boxShadow: "0 0 4px hsl(var(--primary))" }} /> Auto-Optimization</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlatformDiagrams() {
  return (
    <div className="space-y-6">
      {platforms.map((p) => (
        <PlatformCard key={p.name} platform={p} />
      ))}

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary">
              <th className="text-left p-3 font-sans font-semibold text-foreground">Capability</th>
              <th className="text-left p-3 font-sans font-semibold" style={{ color: "hsl(36 100% 50%)" }}>AWS</th>
              <th className="text-left p-3 font-sans font-semibold" style={{ color: "hsl(217 89% 61%)" }}>Google Cloud</th>
              <th className="text-left p-3 font-sans font-semibold" style={{ color: "hsl(207 100% 42%)" }}>Azure</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3 font-sans font-medium text-foreground">{row.capability}</td>
                <td className="p-3 font-display text-muted-foreground">{row.aws}</td>
                <td className="p-3 font-display text-muted-foreground">{row.gcp}</td>
                <td className="p-3 font-display text-muted-foreground">{row.azure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
