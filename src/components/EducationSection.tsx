import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "MS Project Management",
    school: "New England College, NH",
  },
  {
    degree: "MS Data Science",
    school: "New Jersey Institute of Technology, NJ",
  },
  {
    degree: "BS Electronics & Communication",
    school: "Gujarat Technological University, India",
  },
];

const certifications = [
  "Certified Scrum Master (CSM) — 2023",
  "Certified Scrum Product Owner (CSPO) — 2023",
];

export default function EducationSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3"
      >
        Education
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-8"
      >
        Academic Background
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 flex items-start gap-3"
          >
            <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-semibold text-sm">{edu.degree}</p>
              <p className="text-xs text-muted-foreground mt-1">{edu.school}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-mono px-4 py-2 rounded-full"
          >
            <Award className="w-3.5 h-3.5" />
            {cert}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
