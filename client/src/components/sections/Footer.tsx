import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground" data-testid="text-copyright">
          © {new Date().getFullYear()} Samuele Felici. Ancona | Report automatici e Analisi Dati.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy (Placeholder)</a>
          <Button variant="ghost" size="icon" onClick={scrollToTop} aria-label="Torna su" data-testid="button-back-to-top">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
