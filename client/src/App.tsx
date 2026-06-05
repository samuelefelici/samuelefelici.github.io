import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Portfolio } from "./components/sections/Portfolio";
import { WhyMe } from "./components/sections/WhyMe";
import { Timeline } from "./components/sections/Timeline";
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
        <Portfolio />
        <WhyMe />
        <Timeline />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
