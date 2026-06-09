import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
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
    <div className="relative isolate min-h-screen font-sans text-foreground">
      <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none site-bg">
        <div className="site-bg__gradient" />
        <div className="site-bg__grid" />
        <div className="site-bg__blob site-bg__blob--a" />
        <div className="site-bg__blob site-bg__blob--b" />
        <div className="site-bg__blob site-bg__blob--c" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <CerberoShowcase />
          <WhyMe />
          <Timeline />
          <Process />
          <Contact />
        </main>
        <Footer />
        <ConsentBanner />
      </div>
    </div>
  );
}

export default App;
