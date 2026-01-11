import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Terminal } from "@/components/terminal/Terminal";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { GlobalMap } from "@/components/map/GlobalMap";
import { Certificates } from "@/components/certificates/Certificates";
import { Timeline } from "@/components/timeline/Timeline";
import { Blog } from "@/components/blog/Blog";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { Contact } from "@/components/contact/Contact";
import { References } from "@/components/references/References";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        id="terminal"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-2xl mx-auto px-6">
          <Terminal className="w-full" />
        </div>
        <ScrollHint targetId="projects" />
      </section>

      <ProjectsGrid />
      <GlobalMap />
      <Certificates />
      <Timeline />
      <Blog />
      <GitHubActivity />
      <Contact />
      <References />
      <Footer />
    </>
  );
}
