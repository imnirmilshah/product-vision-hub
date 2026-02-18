import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, BookOpen, Mail, MapPin, Download, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendContactEmail } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const validate = useCallback(() => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = async () => {
    if (!validate() || sending || cooldown > 0) return;
    setSending(true);
    try {
      await sendContactEmail(form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setCooldown(30);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try nirmilshah1@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full h-12 px-4 rounded-lg bg-tertiary border text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
      errors[field] ? "border-destructive focus:ring-destructive/40" : "border-border focus:ring-primary/40 focus:border-primary"
    }`;

  const socialLinks = [
    { icon: Github, label: "GitHub", value: "github.com/imnirmilshah", href: "https://github.com/imnirmilshah" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/nirmil", href: "https://linkedin.com/in/nirmil" },
    { icon: BookOpen, label: "Medium", value: "medium.com/@imnirmilshah", href: "https://imnirmilshah.medium.com" },
    { icon: Mail, label: "Email", value: "nirmilshah1@gmail.com", href: "mailto:nirmilshah1@gmail.com" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact | Nirmil</title>
        <meta name="description" content="Get in touch with Nirmil, Technical Product Manager at AWS. Open to opportunities, collaborations, and conversations about AI and product." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Left — Form (60%) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl font-bold mb-3">
                Let's Connect<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Have a question, opportunity, or just want to chat about AI? Reach out.
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={inputClass("name")}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={inputClass("email")}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className={inputClass("name")}
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your message..."
                    className={`w-full min-h-[160px] px-4 py-3 rounded-lg bg-tertiary border text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-y ${
                      errors.message ? "border-destructive focus:ring-destructive/40" : "border-border focus:ring-primary/40 focus:border-primary"
                    }`}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={sending || cooldown > 0}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : cooldown > 0 ? (
                    `Send again in ${cooldown}s...`
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Right — Info Panel (40%) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="bg-secondary rounded-2xl p-8 border border-border">
                <h2 className="font-display text-xl font-semibold mb-6">Get in Touch</h2>

                <div className="flex flex-col gap-4 mb-8">
                  {socialLinks.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-tertiary flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
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
