import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    subtitle: "Open Source & Projects",
    href: "https://github.com/imnirmilshah",
    borderColor: "border-l-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    subtitle: "Professional Network",
    href: "https://linkedin.com/in/nirmil",
    borderColor: "border-l-[#0A66C2]",
  },
  {
    icon: BookOpen,
    label: "Medium",
    subtitle: "Articles & Insights",
    href: "https://imnirmilshah.medium.com",
    borderColor: "border-l-[hsl(var(--green))]",
  },
];

export default function SocialBar() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-4">
        {socials.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 p-5 rounded-lg bg-card border border-border ${s.borderColor} border-l-4 hover:bg-secondary/50 transition-all group`}
          >
            <s.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="font-semibold text-sm">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.subtitle}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
