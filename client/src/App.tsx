import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Portfolio } from "./components/sections/Portfolio";
import { CerberoShowcase } from "./components/sections/CerberoShowcase";
import { WhyMe } from "./components/sections/WhyMe";
import { Timeline } from "./components/sections/Timeline";
import { Process } from "./components/sections/Process";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { ConsentBanner } from "./components/ConsentBanner";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // scroll fluido anche per i link ancora (#sezione)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -70 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans text-foreground">
      {/* bagliori soft di sfondo (coi colori del brand) */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] left-[4%] w-[32rem] h-[32rem] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute top-[45%] right-[2%] w-[28rem] h-[28rem] rounded-full bg-[#8b5cf6]/[0.06] blur-3xl" />
        <div className="absolute bottom-[6%] left-[28%] w-[26rem] h-[26rem] rounded-full bg-[#22c55e]/[0.05] blur-3xl" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <CerberoShowcase />
        <WhyMe />
        <Timeline />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
}

export default App;
