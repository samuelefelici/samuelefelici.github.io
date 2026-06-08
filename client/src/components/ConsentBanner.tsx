import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PrivacyDialog } from "@/components/PrivacyDialog";
import { loadTracking, hasAnyTracking } from "@/lib/tracking";

const KEY = "cookie-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (v === "granted") {
      loadTracking();
    } else if (v == null && hasAnyTracking()) {
      setVisible(true);
    }
    const open = () => setVisible(true);
    window.addEventListener("open-cookie-consent", open);
    return () => window.removeEventListener("open-cookie-consent", open);
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "granted");
    loadTracking();
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem(KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:max-w-sm z-[60] rounded-xl border border-border bg-card shadow-2xl p-4">
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Uso cookie tecnici e, con il tuo consenso, strumenti di statistica e marketing per migliorare il
        sito. Dettagli nell'{" "}
        <PrivacyDialog
          trigger={<button type="button" className="underline hover:text-primary">informativa privacy</button>}
        />
        .
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={accept} data-testid="button-cookie-accept">Accetta</Button>
        <Button size="sm" variant="outline" onClick={reject} data-testid="button-cookie-reject">Rifiuta</Button>
      </div>
    </div>
  );
}
