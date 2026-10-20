/**
 * Configurazione tracciamento e strumenti marketing.
 * Lascia vuoto ciò che non usi. Guida all'attivazione (Coolify compreso):
 * docs/MARKETING.md.
 *
 * - Umami è senza cookie e anonimo: parte sempre, senza banner.
 * - GA4, Google Ads, Meta Pixel e LinkedIn partono solo dopo il consenso.
 */
export const TRACKING = {
  ga4: "G-5YHCDZF5SE", // Google Analytics 4 — es. "G-XXXXXXXXXX"
  googleAds: "", // Google Ads — es. "AW-XXXXXXXXXX"
  googleAdsLead: "", // etichetta della conversione "Lead" di Google Ads — es. "AbCdEfGh123"
  metaPixel: "1005756371856293", // Meta (Facebook / Instagram) Pixel
  linkedinPartnerId: "", // LinkedIn Insight Tag — es. "1234567"
  linkedinLeadConversion: "", // ID della conversione "Lead" in Campaign Manager — es. "12345678"
  umami: {
    // istanza Umami su Coolify (stats.samuelefelici.com); websiteId dal pannello Umami
    src: "https://stats.samuelefelici.com/s.js",
    websiteId: "65b8a454-634d-4b97-a8de-0ce9d1eb247c",
  },
  // webhook n8n su Coolify: riceve ogni richiesta del form e la inoltra a
  // Meta (Conversions API), Telegram/email e CRM — vedi docs/coolify/
  leadWebhook: "",
  // pagina di prenotazione (Cal.com su Coolify): se c'è, "Prenota una call" la apre
  bookingUrl: "",
  // numero WhatsApp in formato internazionale senza "+" (es. "393341265750"):
  // se c'è, compare il pulsante WhatsApp in basso a destra
  whatsapp: "",
};

/** Link per "Prenota una call": la pagina di prenotazione se c'è, altrimenti il form. */
export const callLink = TRACKING.bookingUrl
  ? { href: TRACKING.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
  : { href: "#contact" };

/** Strumenti che richiedono il consenso (fanno comparire il banner). */
export function hasAnyTracking(): boolean {
  return Boolean(TRACKING.ga4 || TRACKING.googleAds || TRACKING.metaPixel || TRACKING.linkedinPartnerId);
}

type Trackers = {
  fbq?: (...a: unknown[]) => void;
  gtag?: (...a: unknown[]) => void;
  lintrk?: (...a: unknown[]) => void;
  umami?: { track: (name: string, data?: Record<string, unknown>) => void };
};

const win = () => window as unknown as Trackers & Record<string, unknown>;

/** Evento standard di Meta per ciascun evento del sito; gli altri vanno come evento personalizzato. */
const META_EVENTS: Record<string, string> = {
  contact: "Contact",
  project_view: "ViewContent",
  booking_click: "Schedule",
};

/**
 * Un evento, a tutti gli strumenti attivi. I nomi sono in snake_case e
 * uguali ovunque, così i report di Umami, GA4 e Meta si leggono insieme.
 */
export function track(name: string, data: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  const w = win();
  w.umami?.track(name, data);
  if (typeof w.gtag === "function") w.gtag("event", name, data);
  if (typeof w.fbq === "function") {
    const std = META_EVENTS[name];
    if (std) w.fbq("track", std, data);
    else w.fbq("trackCustom", name, data);
  }
}

/** ID univoco del lead: lo stesso va al Pixel e alla Conversions API, che così non lo contano due volte. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** Da chiamare quando il form viene inviato con successo: un "Lead" per ogni strumento. */
export function trackLead(eventId: string, source: string): void {
  if (typeof window === "undefined") return;
  const w = win();
  w.umami?.track("lead", { source });
  if (typeof w.fbq === "function") w.fbq("track", "Lead", { content_name: source }, { eventID: eventId });
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", { source });
    if (TRACKING.googleAds && TRACKING.googleAdsLead)
      w.gtag("event", "conversion", {
        send_to: `${TRACKING.googleAds}/${TRACKING.googleAdsLead}`,
        transaction_id: eventId,
      });
  }
  if (typeof w.lintrk === "function" && TRACKING.linkedinLeadConversion)
    w.lintrk("track", { conversion_id: Number(TRACKING.linkedinLeadConversion) });
}

function readCookie(name: string): string {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

export function hasMarketingConsent(): boolean {
  try {
    return localStorage.getItem("cookie-consent") === "granted";
  } catch {
    return false;
  }
}

/**
 * Inoltra la richiesta al webhook n8n (se configurato). Non blocca il form:
 * l'email arriva comunque da Web3Forms. Gli identificativi di Meta (_fbp,
 * _fbc) esistono solo con il consenso, e il workflow manda a Meta solo i
 * lead con `marketing_consent: true`.
 */
export function sendLeadToWebhook(lead: Record<string, string>, eventId: string): void {
  if (!TRACKING.leadWebhook) return;
  const body = JSON.stringify({
    ...lead,
    event_id: eventId,
    event_time: Math.floor(Date.now() / 1000),
    page_url: window.location.href,
    provenienza: getAttribution(),
    marketing_consent: hasMarketingConsent(),
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    user_agent: navigator.userAgent,
  });
  fetch(TRACKING.leadWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* il lead è già arrivato via email: il webhook è un di più */
  });
}

/** Clic su telefono, email, WhatsApp e prenotazione: un evento per tipo. Si installa una volta sola. */
let clicksInstalled = false;
function trackClicks(): void {
  if (clicksInstalled) return;
  clicksInstalled = true;
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    if (TRACKING.bookingUrl && href.startsWith(TRACKING.bookingUrl)) {
      track("booking_click", { where: a.dataset.where ?? "" });
      return;
    }
    const method = href.startsWith("tel:")
      ? "telefono"
      : href.startsWith("mailto:")
        ? "email"
        : /wa\.me|whatsapp/.test(href)
          ? "whatsapp"
          : null;
    if (method) track("contact", { method });
  });
}

/*
 * Provenienza della visita (UTM e ID clic degli annunci), letta all'arrivo e
 * tenuta per la sessione: viaggia solo dentro il messaggio del form, così ogni
 * richiesta dice da quale campagna arriva. Nessun cookie.
 */
const ATTR_KEY = "provenienza";
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "li_fat_id"];

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

/** Umami: senza cookie né dati personali, parte all'avvio senza consenso. */
export function loadUmami(): void {
  if (typeof window === "undefined" || !TRACKING.umami.websiteId) return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = TRACKING.umami.src;
  s.dataset.websiteId = TRACKING.umami.websiteId;
  s.dataset.domains = "samuelefelici.com,www.samuelefelici.com";
  document.head.appendChild(s);
  trackClicks();
}

let loaded = false;

/** Carica gli script di tracciamento con cookie (da chiamare SOLO dopo il consenso). */
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

  // --- LinkedIn Insight Tag ---
  if (TRACKING.linkedinPartnerId) {
    const w = window as unknown as Record<string, unknown> & { lintrk?: unknown };
    w._linkedin_partner_id = TRACKING.linkedinPartnerId;
    w._linkedin_data_partner_ids = [TRACKING.linkedinPartnerId];
    if (!w.lintrk) {
      const q: unknown[] = [];
      const l = function (a: unknown, b: unknown) {
        q.push([a, b]);
      } as ((a: unknown, b: unknown) => void) & { q: unknown[] };
      l.q = q;
      w.lintrk = l;
    }
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(s);
  }

  trackClicks();
}
