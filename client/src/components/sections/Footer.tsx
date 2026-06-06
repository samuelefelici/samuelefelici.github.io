import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground" data-testid="text-copyright">
          © {new Date().getFullYear()} Samuele Felici. Ancona | Sviluppo software & siti web.
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="GitHub">
            <a href="https://github.com/samuelefelici" target="_blank" rel="noopener noreferrer" data-testid="link-footer-github">
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
            <a href="https://www.linkedin.com/in/samuele-felici-a58197139/" target="_blank" rel="noopener noreferrer" data-testid="link-footer-linkedin">
              <Linkedin className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Email">
            <a href="mailto:info@samuelefelici.com" data-testid="link-footer-email">
              <Mail className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollToTop} aria-label="Torna su" data-testid="button-back-to-top">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
