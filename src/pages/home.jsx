import AboutSection from "../components/homepage/about";
import Blog from "../components/homepage/blog";
import ContactSection from "../components/homepage/contact";
import Education from "../components/homepage/education";
import Experience from "../components/homepage/experience";
import HeroSection from "../components/homepage/hero-section";
import NeonHacker from "../components/neon-hacker";
import Projects from "../components/homepage/projects";
import Skills from "../components/homepage/skills";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <NeonHacker />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog />
      <ContactSection />
    </div>
  );
}
