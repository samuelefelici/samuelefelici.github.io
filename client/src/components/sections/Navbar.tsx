import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@assets/logo_1771503161578.png";

const navItems = [
  { name: "Servizi", href: "#services" },
  { name: "Chi Sono", href: "#about" },
  { name: "Esperienza", href: "#timeline" },
  { name: "Processo", href: "#process" },
  { name: "Contatti", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm border-b py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src={logo} alt="SF Logo" className="h-10 w-10 object-contain group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold font-heading tracking-tight text-primary">
            Samuele Felici<span className="text-foreground">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </a>
          ))}
          <Button variant="default" size="sm" asChild data-testid="button-nav-call">
            <a href="#contact">Prenota una Call</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg md:hidden p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-foreground py-2 border-b border-border/50 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Button className="w-full mt-2" asChild>
            <a href="#contact" onClick={() => setIsOpen(false)}>Prenota una Call</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
