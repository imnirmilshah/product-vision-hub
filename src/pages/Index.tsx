import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialBar from "@/components/SocialBar";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationSection from "@/components/EducationSection";
import RAGPipelineSection from "@/components/RAGPipelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <SocialBar />
        <AboutSection />
        <SkillsSection />
        <ExperienceTimeline />
        <EducationSection />
        <RAGPipelineSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
