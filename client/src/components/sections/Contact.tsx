import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, MapPin, Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    objective: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contatto Freelance: ${formData.name}`);
    const body = encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\nObiettivo: ${formData.objective}\n\nMessaggio:\n${formData.message}`);
    window.location.href = `mailto:samuele.felici@hotmail.it?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Iniziamo a fare ordine?</h2>
            <p className="text-muted-foreground">
              Scrivimi per una valutazione gratuita del tuo caso. Rispondo solitamente entro 24 ore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Contatti</h3>
                  <div className="space-y-4">
                    <a href="mailto:samuele.felici@hotmail.it" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                      <Mail className="w-5 h-5" />
                      samuele.felici@hotmail.it
                    </a>
                    <a href="https://linkedin.com/in/samuelefelici" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
                      <Linkedin className="w-5 h-5" />
                      LinkedIn Profile
                    </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      Ancona (Disponibile da remoto)
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    "Preferisco una soluzione semplice che funziona oggi a una perfetta che non arriva mai."
                  </p>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nome</label>
                <Input 
                  id="name" 
                  placeholder="Il tuo nome" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="la-tua@email.it" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="objective" className="text-sm font-medium">Che obiettivo hai? (es. pulizia Excel, report vendite)</label>
                <Input 
                  id="objective" 
                  placeholder="Breve descrizione dell'obiettivo" 
                  required 
                  value={formData.objective}
                  onChange={(e) => setFormData({...formData, objective: e.target.value})}
                  data-testid="input-objective"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Messaggio (opzionale)</label>
                <Textarea 
                  id="message" 
                  placeholder="Qualche dettaglio in più sui dati che hai..." 
                  className="min-h-[100px]" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  data-testid="textarea-message"
                />
              </div>
              <Button type="submit" className="w-full gap-2" data-testid="button-submit">
                Invia Richiesta <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
