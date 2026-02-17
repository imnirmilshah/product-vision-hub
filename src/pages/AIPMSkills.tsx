import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Zap, Wrench, Building, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/ai-pm/StepGuide";
import WorkflowDiagram from "@/components/ai-pm/WorkflowDiagram";
import { Button } from "@/components/ui/button";

const whyCards = [
  {
    icon: Zap,
    title: "The Shifting Landscape",
    body: "AI is compressing product development cycles from months to weeks. PMs who leverage AI tools ship faster, write better specs, and make data-driven decisions with less manual research. The role isn't being replaced. It's being amplified.",
  },
  {
    icon: Wrench,
    title: "The PM's AI Toolkit",
    body: "From ideation (brainstorming with Claude) to research (synthesizing user interviews) to specs (generating PRDs) to launch (writing release notes), AI creates leverage at every stage. The PMs who win are the ones who know which tool to use when.",
  },
  {
    icon: Building,
    title: "Real Talk: How I Use AI at AWS",
    body: "At AWS, I use Claude daily: drafting PRDs, analyzing competitive landscapes, synthesizing stakeholder feedback, and even debugging technical specs. This isn't theoretical. These are workflows I run every week.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

export default function AIPMSkills() {
  return (
    <>
      <Helmet>
        <title>AI PM Skills | Nirmil</title>
        <meta name="description" content="A practical guide to using Claude AI for product management: setup, claude.md, PRD creation, and advanced PM workflows." />
      </Helmet>

      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-secondary/50 py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1 {...fadeUp} className="font-sans text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Product Management
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="font-display text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              How Claude AI transforms the PM workflow: a practical, hands-on guide
            </motion.p>
            <motion.p {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="text-sm text-muted-foreground font-display">
              By Nirmil · Technical PM at AWS
            </motion.p>
          </div>
        </section>

        {/* Module A: Why AI for PMs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">
              THE SHIFT
            </motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">
              Why AI for Product Managers
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {whyCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-card border border-border rounded-lg p-6 hover:glow-box-cyan transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold mb-3">{card.title}</h3>
                    <p className="font-display text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Module B: Step Guide */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">
              STEP-BY-STEP GUIDE
            </motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">
              From Zero to Claude Power User
            </motion.h2>
            <StepGuide />
          </div>
        </section>

        {/* Module C: Workflow */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">
              THE WORKFLOW
            </motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">
              From PRD to Product
            </motion.h2>
            <WorkflowDiagram />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 {...fadeUp} className="font-sans text-2xl md:text-3xl font-bold mb-8">
              Download the PM's AI Toolkit
            </motion.h2>
            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <Download className="w-4 h-4" />
                PRD Template
              </Button>
              <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <Download className="w-4 h-4" />
                Prompt Library
              </Button>
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-box-cyan">
                <Download className="w-4 h-4" />
                claude.md Starter File
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
