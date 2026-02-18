import { Helmet } from "react-helmet-async";
import { Linkedin, MapPin, Download } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Nirmil</title>
        <meta name="description" content="Get in touch with Nirmil, Technical Product Manager at AWS. Open to opportunities, collaborations, and conversations about AI and product." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl font-bold mb-3">
                Let's Connect<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Have a question, opportunity, or just want to chat about new Product? Reach out.
              </p>

              <div className="bg-secondary rounded-2xl p-8 border border-border">
                <h2 className="font-display text-xl font-semibold mb-6">Get in Touch</h2>

                <div className="flex flex-col gap-4 mb-8">
                  <a
                    href="https://linkedin.com/in/nirmil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">LinkedIn</p>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">linkedin.com/in/nirmil</p>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Based in the US</span>
                </div>

                <a
                  href="/Nirmil_resume_2026_aws.pdf"
                  download
                  className="w-full h-11 rounded-xl border border-primary/50 text-primary hover:bg-primary/10 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
