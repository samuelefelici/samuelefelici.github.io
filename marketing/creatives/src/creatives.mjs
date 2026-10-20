/**
 * Definizione delle creatività: testi, schermate e posizioni per ogni formato.
 *
 * Formati: sq = feed 1080×1080, pt = feed 1080×1350, st = stories/reels 1080×1920
 * (nelle stories testi e CTA restano tra y=250 e y=1670).
 *
 * Schermate: solo quelle di client/public/assets/progetti (dati dimostrativi).
 * Numeri e fatti: solo quelli scritti in client/src/components/sections/projects-data.ts
 * e nelle sezioni del sito. Niente prezzi, clienti o testimonianze.
 *
 * Coordinate in px sul canvas: x/y = angolo in alto a sinistra, w = larghezza,
 * ratio = proporzioni (larghezza/altezza) dell'area schermo, rot = rotazione in gradi.
 */

const CTA_CONSULENZA = { label: 'Richiedi una consulenza', note: 'Risposta media entro 24 ore lavorative' };
const CTA_SCRIVIMI = { label: 'Scrivimi', note: 'Risposta media entro 24 ore lavorative' };
const NOTE_DEMO = 'Schermate reali · dati dimostrativi';

// ---------------------------------------------------------------- schermate
const S = {
  sipOrdini: { type: 'browser', src: 'sipario/01-ordini-fatture-1920.webp', ratio: 1.6, title: 'Sipario · Ordini e fatture' },
  sipReso: { type: 'browser', src: 'sipario/02-dettaglio-reso-1920.webp', ratio: 1.8587, title: 'Sipario · Dettaglio reso' },
  sipPostino: { type: 'phone', src: 'sipario/03-postino-780.webp', ratio: 0.5132, bar: '#E27101' },
  condoRiparto: { type: 'browser', src: 'condominio/02-prospetto-riparto-1920.webp', ratio: 1.6, title: 'CONDO.IT · Prospetto di riparto' },
  condoMorosita: { type: 'browser', src: 'condominio/03-morosita-1920.webp', ratio: 2.4, title: 'CONDO.IT · Morosità e rate' },
  newsDest: { type: 'browser', src: 'newsletter/02-destinatari-1920.webp', ratio: 1.6, title: 'Newsletter · Destinatari' },
  tvPlanning: { type: 'browser', src: 'turnivolontari/04-planning-1920.webp', ratio: 1.6, title: 'Turni Volontari · Planning settimanale' },
  tvBacheca: { type: 'phone', src: 'turnivolontari/02-bacheca-turni-780.webp', bar: '#2A3994' },
  cerbVsp: { type: 'browser', src: 'cerbero/01-scheduling-vsp-1920.webp', ratio: 2.0426, title: 'Cerbero · Scheduling Engine' },
  cerbGantt: { type: 'browser', src: 'cerbero/04-gantt-turni-macchina-1280.webp', ratio: 2.4568, title: 'Cerbero · Turni macchina' },
  fleetDash: { type: 'browser', src: 'fleetcare/01-dashboard-1920.webp', ratio: 1.6, title: 'Cerbero FleetCare · Dashboard flotta' },
  fleetGuasto: { type: 'phone', src: 'fleetcare/03-segnalazione-guasto-780.webp', ratio: 0.4875 },
  caronteTab: { type: 'tablet', src: 'caronte/01-tablet-anteprima-1920.webp', ratio: 1.6 },
  flightTurni: { type: 'browser', src: 'flightmatrix/03-finestra-lavoro-1920.webp', ratio: 2.0, title: 'Flight Matrix · Finestra di lavoro' },
  // indirizzo e numero del negozio sfocati: sono dati reali del cliente, non servono all'annuncio
  beaDove: { type: 'phone', src: 'beatrice/04-dove-siamo-780.webp', redact: [[7, 24.5, 75, 9], [40, 58, 30, 4.2]] },
  beaInsegna: { type: 'phone', src: 'beatrice/02-insegna-780.webp', bar: '#917C53' },
  agHome: { type: 'phone', src: 'agform/05-home-mobile-780.webp', bar: '#EFEEF5' },
};
const at = (shot, pos) => ({ ...shot, ...pos });

// ---------------------------------------------------------------- 1. gestionali
const gestionali = {
  theme: 'dark',
  kicker: 'Gestionali su misura',
  h1: "Da Excel e carta <em>a un'unica app.</em>",
  sub: 'Un gestionale su misura, costruito sul tuo modo di lavorare.',
  cta: CTA_CONSULENZA,
  footNote: NOTE_DEMO,
};

// ---------------------------------------------------------------- 2. tpl
const tpl = {
  theme: 'navy',
  kicker: 'Software per il TPL',
  h1: 'Turni e flotta, <em>sotto controllo.</em>',
  sub: 'Turni macchina e guida ottimizzati e manutenzione della flotta, per il trasporto pubblico.',
  cta: CTA_CONSULENZA,
  footNote: 'Schermate reali · dati GTFS pubblici e dimostrativi',
};
const STAT_TPL = { k: '669 → 29', l: "corse coperte → veicoli,<br>nell'esempio di ottimizzazione" };

// ---------------------------------------------------------------- 3. siti
const siti = {
  theme: 'light',
  kicker: 'Siti per negozi e professionisti',
  h1: 'Il tuo negozio, <em>a un tocco.</em>',
  sub: 'Siti veloci pensati per il telefono: chi ti trova ti chiama, ti scrive o ti raggiunge.',
  cta: CTA_SCRIVIMI,
  footNote: 'Schermate reali di siti realizzati',
};
const TAP_CHIAMA = { icon: 'phone', label: 'Chiama', color: '#EB5200' };
const TAP_WA = { icon: 'chat', label: 'WhatsApp', color: '#1FA855' };
const TAP_DIR = { icon: 'pin', label: 'Indicazioni', color: '#1D74A8' };
const PILLS_SITI = ['«Aperto ora», dagli orari del negozio', 'Vetrina aggiornabile dal telefono', 'Zero cookie, zero banner'];

// ---------------------------------------------------------------- elenco
export const creatives = [
  // ===== gestionali
  {
    name: 'gestionali-feed-1080x1080', format: 'sq', ...gestionali,
    devices: [at(S.sipOrdini, { x: 300, y: 540, w: 860 }), at(S.sipPostino, { x: 64, y: 570, w: 270, z: 6 })],
  },
  {
    name: 'gestionali-feed-1080x1350', format: 'pt', ...gestionali,
    devices: [at(S.sipOrdini, { x: 290, y: 580, w: 900 }), at(S.sipPostino, { x: 64, y: 640, w: 300, z: 6 })],
    badges: [{ x: 600, y: 1150, t: '3 ruoli, 3 interfacce', l: 'segreteria, postino, operatrice' }],
  },
  {
    name: 'gestionali-story-1080x1920', format: 'st', ...gestionali, ctaAt: 'bottom', ctaPos: { w: 560 },
    devices: [
      at(S.condoRiparto, { x: 220, y: 720, w: 920, z: 3 }),
      at(S.sipOrdini, { x: 40, y: 960, w: 820, z: 5 }),
      at(S.sipPostino, { x: 710, y: 1030, w: 310, z: 6 }),
    ],
  },

  // ===== tpl
  {
    name: 'tpl-feed-1080x1080', format: 'sq', ...tpl,
    devices: [at(S.cerbVsp, { x: 260, y: 570, w: 880 }), at(S.fleetGuasto, { x: 64, y: 600, w: 250, z: 6 })],
    badges: [{ x: 640, y: 880, ...STAT_TPL }],
  },
  {
    name: 'tpl-feed-1080x1350', format: 'pt', ...tpl,
    devices: [at(S.cerbVsp, { x: 250, y: 600, w: 920 }), at(S.fleetGuasto, { x: 64, y: 640, w: 290, z: 6 })],
    badges: [{ x: 600, y: 1130, ...STAT_TPL }],
  },
  {
    name: 'tpl-story-1080x1920', format: 'st', ...tpl, ctaAt: 'bottom', ctaPos: { w: 560 },
    devices: [
      at(S.caronteTab, { x: 220, y: 720, w: 860, z: 3 }),
      at(S.cerbVsp, { x: 40, y: 1010, w: 840, z: 5 }),
      at(S.fleetGuasto, { x: 740, y: 1060, w: 290, z: 6 }),
    ],
    badges: [{ x: 64, y: 1290, z: 16, ...STAT_TPL }],
  },

  // ===== siti
  {
    name: 'siti-feed-1080x1080', format: 'sq', ...siti,
    devices: [at(S.agHome, { x: 800, y: 520, w: 250, rot: 6, z: 4 }), at(S.beaDove, { x: 530, y: 470, w: 290, z: 6 })],
    taps: [
      { ...TAP_CHIAMA, x: 64, y: 560 },
      { ...TAP_WA, x: 130, y: 670 },
      { ...TAP_DIR, x: 64, y: 780 },
    ],
  },
  {
    name: 'siti-feed-1080x1350', format: 'pt', ...siti,
    devices: [at(S.agHome, { x: 810, y: 640, w: 260, rot: 6, z: 4 }), at(S.beaDove, { x: 560, y: 570, w: 310, z: 6 })],
    taps: [
      { ...TAP_CHIAMA, x: 64, y: 620 },
      { ...TAP_WA, x: 120, y: 730 },
      { ...TAP_DIR, x: 64, y: 840 },
    ],
    pills: { x: 64, y: 1000, items: PILLS_SITI },
  },
  {
    name: 'siti-story-1080x1920', format: 'st', ...siti, ctaAt: 'bottom', ctaPos: { w: 560 },
    devices: [
      at(S.beaInsegna, { x: 80, y: 770, w: 290, rot: -6, z: 4 }),
      at(S.agHome, { x: 710, y: 770, w: 290, rot: 6, z: 4 }),
      at(S.beaDove, { x: 380, y: 715, w: 320, z: 6 }),
    ],
    taps: [
      { ...TAP_CHIAMA, x: 40, y: 1080, z: 20 },
      { ...TAP_WA, x: 700, y: 1180, z: 20 },
      { ...TAP_DIR, x: 40, y: 1280, z: 20 },
    ],
  },

  // ===== carosello gestionali (feed quadrato)
  {
    name: 'gestionali-carousel-1-1080x1080', format: 'sq', theme: 'dark', kicker: 'Gestionali su misura',
    h1: 'Il tuo gestionale <em>è un file Excel?</em>',
    sub: 'Tre casi reali di processi usciti dai fogli sparsi.',
    files: [
      { name: 'ordini_2026.xlsx', x: 120, y: 560, rot: -4, struck: true },
      { name: 'ordini_2026_DEF.xlsx', x: 360, y: 670, rot: 3, struck: true },
      { name: 'ordini_2026_DEF_v2.xlsx', x: 90, y: 790, rot: -2, struck: true },
      { name: 'copia di ordini (3).xlsx', x: 330, y: 905, rot: 4, struck: true },
    ],
    swipe: { text: 'Scorri', r: 64, b: 64 },
  },
  {
    name: 'gestionali-carousel-2-1080x1080', format: 'sq', theme: 'dark', kicker: 'Il problema',
    h1: 'Dove si perde <em>il tempo?</em>',
    pains: {
      x: 64, y: 330, w: 952,
      items: ['Dati ricopiati a mano tra fogli diversi', 'Informazioni sparse tra email e telefonate', 'Numeri che arrivano tardi, a fine mese'],
    },
    answer: { x: 64, y: 760, text: 'Un unico sistema, costruito sul tuo processo.' },
    swipe: { text: 'Scorri', r: 64, b: 64 },
  },
  {
    name: 'gestionali-carousel-3-1080x1080', format: 'sq', theme: 'dark', kicker: 'Caso studio 1/3',
    label: 'Sipario · gestionale su misura',
    h2: "Resi e ordini,<br><em>dalla strada all'ufficio.</em>",
    facts: { x: 64, y: 400, items: ['3 ruoli, ognuno con la sua interfaccia', 'Foto della busta scattata dallo smartphone', 'Report mensili in Excel e PDF'] },
    devices: [at(S.sipReso, { x: 330, y: 610, w: 820 }), at(S.sipPostino, { x: 64, y: 640, w: 250, z: 6 })],
    footNote: NOTE_DEMO,
  },
  {
    name: 'gestionali-carousel-4-1080x1080', format: 'sq', theme: 'dark', kicker: 'Caso studio 2/3',
    label: 'CONDO.IT · gestionale condominiale',
    h2: 'Riparto per millesimi, <em>in automatico.</em>',
    facts: { x: 64, y: 400, items: ['Più condomini, dati isolati per studio', 'Rate, pagamenti e solleciti con interessi di mora', '10 tipi di documento PDF generati'] },
    devices: [at(S.condoRiparto, { x: 64, y: 610, w: 760, z: 4 }), at(S.condoMorosita, { x: 420, y: 790, w: 700, z: 5 })],
    footNote: NOTE_DEMO,
  },
  {
    name: 'gestionali-carousel-5-1080x1080', format: 'sq', theme: 'dark', kicker: 'Caso studio 3/3',
    label: 'Turni Volontari · gestione turni',
    h2: 'I turni scoperti, <em>coperti dal telefono.</em>',
    facts: { x: 64, y: 400, items: ['Candidatura ai turni scoperti in un tocco', 'Planning settimanale e approvazioni', 'Richiesta di copertura via WhatsApp'] },
    devices: [at(S.tvPlanning, { x: 300, y: 610, w: 860 }), at(S.tvBacheca, { x: 64, y: 640, w: 250, z: 6 })],
    footNote: NOTE_DEMO,
  },
  {
    name: 'gestionali-carousel-6-1080x1080', format: 'sq', theme: 'dark', kicker: 'Come lavoro',
    h1: 'Il prossimo può essere <em>il tuo processo.</em>',
    steps: {
      x: 64, y: 390, w: 952,
      items: [
        ['01', 'Analisi', 'Chi fa cosa, dove si perde tempo, quali controlli servono'],
        ['02', 'Alternative', 'Più strade, con costi e tempi a confronto'],
        ['03', 'Sviluppo', 'Rilasci frequenti che puoi provare subito'],
      ],
    },
    cta: CTA_CONSULENZA, ctaAt: 'bottom', ctaPos: { b: 64 },
  },
];
