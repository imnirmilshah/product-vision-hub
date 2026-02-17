import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogLanding from "./pages/BlogLanding";
import BlogPost from "./pages/BlogPost";
import AIPMSkills from "./pages/AIPMSkills";
import LLMFundamentals from "./pages/LLMFundamentals";
import CloudRevolution from "./pages/CloudRevolution";

const queryClient = new QueryClient();

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="font-display text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogLanding />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/ai-pm-skills" element={<AIPMSkills />} />
              <Route path="/llm-fundamentals" element={<LLMFundamentals />} />
              <Route path="/cloud-revolution" element={<CloudRevolution />} />
              <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
