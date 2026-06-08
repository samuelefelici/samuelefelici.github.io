/**
 * Configurazione tracciamento.
 * Lascia vuoto ciò che non usi: se sono tutti vuoti, NON viene caricato nulla
 * e il banner cookie non compare. Incolla gli ID quando attivi gli strumenti.
 */
export const TRACKING = {
  ga4: "G-5YHCDZF5SE",        // Google Analytics 4 — es. "G-XXXXXXXXXX"
  googleAds: "",  // Google Ads — es. "AW-XXXXXXXXXX"
  metaPixel: "1005756371856293",  // Meta (Facebook) Pixel
};

export function hasAnyTracking(): boolean {
  return Boolean(TRACKING.ga4 || TRACKING.googleAds || TRACKING.metaPixel);
}

/** Da chiamare quando il form viene inviato con successo: segnala un "Lead" a Meta e Google. */
export function trackLead(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...a: unknown[]) => void;
    gtag?: (...a: unknown[]) => void;
  };
  if (typeof w.fbq === "function") w.fbq("track", "Lead");
  if (typeof w.gtag === "function") w.gtag("event", "generate_lead");
}

let loaded = false;

/** Carica gli script di tracciamento (da chiamare SOLO dopo il consenso). */
export function loadTracking(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  // --- Google (Analytics 4 + Ads) tramite gtag.js ---
  const googleIds = [TRACKING.ga4, TRACKING.googleAds].filter(Boolean);
  if (googleIds.length) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`;
    document.head.appendChild(s);

    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    googleIds.forEach((id) => w.gtag("config", id, { anonymize_ip: true }));
  }

  // --- Meta (Facebook) Pixel ---
  if (TRACKING.metaPixel) {
    const w = window as unknown as Record<string, unknown> & { fbq?: unknown; _fbq?: unknown };
    if (!w.fbq) {
      const n: unknown = function () {
        const fn = n as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
        // eslint-disable-next-line prefer-rest-params
        fn.callMethod ? fn.callMethod.apply(fn, arguments as unknown as unknown[]) : fn.queue.push(arguments);
      };
      const fn = n as { push: unknown; loaded: boolean; version: string; queue: unknown[] };
      fn.push = n;
      fn.loaded = true;
      fn.version = "2.0";
      fn.queue = [];
      w.fbq = n;
      if (!w._fbq) w._fbq = n;

      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(t);
    }
    const fbq = w.fbq as (...a: unknown[]) => void;
    fbq("init", TRACKING.metaPixel);
    fbq("track", "PageView");
  }
}
