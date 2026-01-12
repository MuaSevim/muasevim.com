import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Terminal } from "@/components/terminal/Terminal";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Experiences } from "@/components/experiences/Experiences";
import { Certificates } from "@/components/certificates/Certificates";
import { Blog } from "@/components/blog/Blog";
import { Contact } from "@/components/contact/Contact";
import { References } from "@/components/references/References";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        id="terminal"
        className="relative min-h-screen flex items-center justify-center bg-white"
      >
        <div className="w-full max-w-2xl mx-auto px-6">
          <Terminal className="w-full" />
        </div>
        <ScrollHint targetId="projects" />
      </section>

      <ProjectsGrid />
      <Experiences />
      <Certificates />
      <References />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
