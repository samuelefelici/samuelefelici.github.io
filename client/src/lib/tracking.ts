/**
 * Configurazione tracciamento.
 * Lascia vuoto ciò che non usi: se sono tutti vuoti, NON viene caricato nulla
 * e il banner cookie non compare. Incolla gli ID quando attivi gli strumenti.
 */
export const TRACKING = {
  ga4: "G-5YHCDZF5SE",        // Google Analytics 4 — es. "G-XXXXXXXXXX"
  googleAds: "",  // Google Ads — es. "AW-XXXXXXXXXX"
  googleAdsLead: "",  // etichetta della conversione "Lead" di Google Ads — es. "AbCdEfGh123"
  metaPixel: "1005756371856293",  // Meta (Facebook) Pixel
};

export function hasAnyTracking(): boolean {
  return Boolean(TRACKING.ga4 || TRACKING.googleAds || TRACKING.metaPixel);
}

type Trackers = {
  fbq?: (...a: unknown[]) => void;
  gtag?: (...a: unknown[]) => void;
};

/** Da chiamare quando il form viene inviato con successo: segnala un "Lead" a Meta e Google. */
export function trackLead(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Trackers;
  if (typeof w.fbq === "function") w.fbq("track", "Lead");
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead");
    if (TRACKING.googleAds && TRACKING.googleAdsLead)
      w.gtag("event", "conversion", { send_to: `${TRACKING.googleAds}/${TRACKING.googleAdsLead}` });
  }
}

/** Clic su telefono, email o WhatsApp: per Meta è un "Contact", per GA4 un evento "contact". */
function trackContactClicks(): void {
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    const method = href.startsWith("tel:")
      ? "telefono"
      : href.startsWith("mailto:")
        ? "email"
        : /wa\.me|whatsapp/.test(href)
          ? "whatsapp"
          : null;
    if (!method) return;
    const w = window as unknown as Trackers;
    if (typeof w.fbq === "function") w.fbq("track", "Contact", { method });
    if (typeof w.gtag === "function") w.gtag("event", "contact", { method });
  });
}

/*
 * Provenienza della visita (UTM e ID clic degli annunci), letta all'arrivo e
 * tenuta per la sessione: viaggia solo dentro il messaggio del form, così ogni
 * richiesta dice da quale campagna arriva. Nessun cookie.
 */
const ATTR_KEY = "provenienza";
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const q = new URLSearchParams(window.location.search);
    const found = ATTR_PARAMS.filter((k) => q.get(k)).map((k) => `${k}=${q.get(k)}`);
    if (found.length) sessionStorage.setItem(ATTR_KEY, found.join(" · "));
    else if (!sessionStorage.getItem(ATTR_KEY) && document.referrer && !document.referrer.includes(window.location.host))
      sessionStorage.setItem(ATTR_KEY, `referrer=${new URL(document.referrer).host}`);
  } catch {
    /* sessionStorage non disponibile */
  }
}

export function getAttribution(): string {
  try {
    return sessionStorage.getItem(ATTR_KEY) ?? "diretto";
  } catch {
    return "diretto";
  }
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
    // Consent Mode v2: gli script partono solo dopo il consenso, e a Google
    // va detto esplicitamente (senza, in UE le conversioni Ads non si usano)
    w.gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
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

  trackContactClicks();
}
