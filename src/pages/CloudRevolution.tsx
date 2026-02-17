import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TwoErasSection from "@/components/cloud/TwoErasSection";
import PlatformDiagrams from "@/components/cloud/PlatformDiagrams";
import MLTuningCycle from "@/components/cloud/MLTuningCycle";
import PMRoleSection from "@/components/cloud/PMRoleSection";
import FutureTimeline from "@/components/cloud/FutureTimeline";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

export default function CloudRevolution() {
  return (
    <>
      <Helmet>
        <title>The Cloud Revolution | Nirmil</title>
        <meta name="description" content="How cloud infrastructure is shifting from passive to active intelligence. AWS, GCP, and Azure AI-native tools compared." />
      </Helmet>

      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-secondary/50 py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1 {...fadeUp} className="font-sans text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto">
              The Cloud Revolution: From Passive to Active Intelligence
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="font-display text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              How cloud infrastructure is evolving from responding to requests to proactively managing, optimizing, and self-healing with AI
            </motion.p>
          </div>
        </section>

        {/* Section 1 — The Two Eras */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">THE SHIFT</motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">The Two Eras of Cloud</motion.h2>
            <TwoErasSection />
          </div>
        </section>

        {/* Section 2 — Platform Diagrams */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">PLATFORM DEEP DIVE</motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">The AI-Native Cloud Stack: AWS vs. GCP vs. Azure</motion.h2>
            <PlatformDiagrams />
          </div>
        </section>

        {/* Section 3 — ML Tuning */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">CONTINUOUS TUNING</motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">The Self-Optimizing Cloud</motion.h2>
            <MLTuningCycle />
          </div>
        </section>

        {/* Section 4 — PM's Role */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">FOR PRODUCT MANAGERS</motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">How PMs Think Differently in the Active Cloud Era</motion.h2>
            <PMRoleSection />
          </div>
        </section>

        {/* Section 5 — Future Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.p {...fadeUp} className="text-xs font-sans font-bold tracking-[3px] text-primary uppercase mb-4">THE FUTURE</motion.p>
            <motion.h2 {...fadeUp} className="font-sans text-3xl font-bold mb-10">The Road to Autonomous Infrastructure</motion.h2>
            <FutureTimeline />

            {/* Blockquote */}
            <motion.blockquote
              {...fadeUp}
              className="mt-16 bg-secondary/50 border-l-4 border-primary rounded-r-lg p-6 md:p-8"
            >
              <p className="font-sans text-lg md:text-xl font-semibold leading-relaxed text-foreground">
                "The best database administrator of the future won't be a person. It will be an AI that never sleeps, continuously learns from every query, and optimizes for outcomes humans haven't even thought to measure yet."
              </p>
            </motion.blockquote>

            {/* CTAs */}
            <motion.div {...fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <Link to="/ai-pm-skills">
                  Learn AI PM Skills <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <Link to="/llm-fundamentals">
                  Understand the AI Behind It <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
