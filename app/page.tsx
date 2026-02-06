import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WritingSection from "@/components/WritingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ToolsSection />
        <ProjectsSection />
        <WritingSection />
      </main>
      <Footer />
    </>
  );
}
