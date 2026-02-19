import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { WhyMe } from "./components/sections/WhyMe";
import { Timeline } from "./components/sections/Timeline";
import { UseCases } from "./components/sections/UseCases";
import { Process } from "./components/sections/Process";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyMe />
        <Timeline />
        <UseCases />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
