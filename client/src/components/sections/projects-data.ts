/**
 * Contenuti della sezione "Casi studio": i prodotti, con nomi e marchi reali
 * presi dai rispettivi repository e schermate catturate dal software vero
 * (avviato in locale con dati dimostrativi o feed GTFS pubblici, mai dati
 * personali reali). I numeri sono contati sul codice e sui dati dei repo.
 *
 * Immagini: /assets/progetti/<id>/<nome>-<larghezza>.webp, in due misure
 * (`sizes`: piccola per card e telefoni, grande per la galleria).
 */

/** Versione asset: bump per forzare browser/CDN a riscaricare le immagini. */
export const ASSET_V = "1";

export type Shot = {
  /** percorso senza suffisso, es. "/assets/progetti/fleetcare/01-dashboard" */
  file: string;
  kind: "desktop" | "mobile";
  /** larghezze disponibili [piccola, grande] in px */
  sizes: [number, number];
  /** proporzioni dell'immagine (larghezza / altezza) */
  ratio: number;
  /** "Schermata: descrizione" — la parte prima dei due punti fa da titolo */
  alt: string;
  caption: string;
};

/** `color` per il tema scuro, `ink` (più scuro) per il testo su chiaro */
export type Module = { name: string; logo: string; color: string; ink: string; body: string };

export type Project = {
  id: string;
  name: string;
  /** categoria breve per la chip, es. "Piattaforma TPL" */
  kind: string;
  tagline: string;
  description: string;
  /** colore del marchio (accenti, aloni) e versione scura leggibile su chiaro */
  color: string;
  ink: string;
  /** testo su fondo scuro, se il colore del marchio non ha contrasto sufficiente */
  inkDark?: string;
  /** marchio del prodotto; senza, si mostra solo il nome */
  logo?: {
    src: string;
    /** variante per il tema scuro */
    dark?: string;
    /** il marchio va appoggiato su una piastrina chiara o scura */
    plate?: "light" | "dark";
    /** classi di dimensione per la card */
    className?: string;
  };
  /** punti chiave mostrati nella card (solo prodotti principali) */
  highlights?: string[];
  features: string[];
  stack: string[];
  stats?: { value: string; label: string }[];
  modules?: Module[];
  shots: Shot[];
  /** indice della schermata di copertina e (opzionale) di quella da telefono */
  hero: number;
  phone?: number;
  /** cornice della copertina: browser (default) o tablet di bordo */
  frame?: "browser" | "tablet";
  /** nota sotto la galleria */
  note?: string;
};

const P = "/assets/progetti";

export const shotSrc = (s: Shot, w: number) => `${s.file}-${w}.webp?v=${ASSET_V}`;
export const shotSrcSet = (s: Shot) =>
  `${shotSrc(s, s.sizes[0])} ${s.sizes[0]}w, ${shotSrc(s, s.sizes[1])} ${s.sizes[1]}w`;

const desk = (file: string, ratio: number, alt: string, caption: string, sizes: [number, number] = [960, 1920]): Shot => ({
  file: `${P}/${file}`,
  kind: "desktop",
  sizes,
  ratio,
  alt,
  caption,
});
const mob = (file: string, ratio: number, alt: string, caption: string): Shot => ({
  file: `${P}/${file}`,
  kind: "mobile",
  sizes: [390, 780],
  ratio,
  alt,
  caption,
});

/** I quattro prodotti principali, nell'ordine dei colori del video (blu, arancio, verde, viola). */
export const featured: Project[] = [
  {
    id: "cerbero",
    name: "Cerbero",
    kind: "Piattaforma TPL",
    tagline: "Intelligence & analytics per il trasporto pubblico locale",
    description:
      "Piattaforma web per le aziende di TPL: rete, linee, corse e calendari in un unico database del servizio, turni macchina e turni guida ottimizzati con Google OR-Tools CP-SAT, motore tariffario e un agente AI che lavora sui progetti di pianificazione.",
    color: "#1D96DD",
    ink: "#0B5A8E",
    logo: { src: `${P}/cerbero/logo.webp`, className: "h-14 md:h-16" },
    highlights: [
      "Scheduling Engine: turni macchina e guida con CP-SAT, punteggio dello scenario e costi giornalieri",
      "Planner Studio: orario grafico tempo-distanza, varianti di percorso agganciate alle strade, validità e calendari",
      "Fares Engine su GTFS-Fares v2 e assistente AI Argos dentro i progetti di pianificazione",
    ],
    features: [
      "Network Engine / Planner Studio: database vivente del servizio con fermate, linee, varianti di percorso agganciate alle strade, corse e percorrenze",
      "Orario grafico (diagramma tempo-distanza) con più linee sovrapposte e nodi di interscambio, vista libretto e cubo spazio-tempo 3D",
      "Calendario aziendale e matrice di validità: feriale, sabato, festivo, scuole aperte e chiuse",
      "Turni macchina con CP-SAT: abbinamento vetture, deposito, fuori linea, ottimizzazione e Gantt modificabile a trascinamento",
      "Turni guida con CP-SAT (interi, semiunici, spezzati) nel rispetto della normativa, e pipeline integrata mezzi + autisti",
      "Fares Engine: GTFS-Fares v2, polimetriche, cluster tariffari, simulatore what-if e analisi tariffaria",
      "Centrale Operativa con feed GTFS-Realtime e connettore SIRI; stampa di quadri orari e mappe di rete",
      "Argos, agente AI che legge e modifica i progetti di pianificazione con registro delle attività",
    ],
    stack: [
      "React 19 · Vite · Tailwind",
      "Express 5 · Drizzle · PostgreSQL",
      "Python · OR-Tools CP-SAT",
      "Mapbox GL · three.js",
      "GTFS · GTFS-RT · SIRI",
      "Docker · Coolify",
    ],
    stats: [
      { value: "600+", label: "endpoint REST" },
      { value: "~1.050", label: "test automatici (Vitest + pytest)" },
      { value: "57", label: "tabelle nello schema Drizzle" },
      { value: "669 → 29", label: "corse coperte → veicoli, nell'esempio di ottimizzazione" },
    ],
    modules: [
      {
        name: "Analytics Engine",
        logo: "/assets/cerbero-analytic-logo.png",
        color: "#3b82f6",
        ink: "#1D4ED8",
        body: "Traffico, demografia ISTAT, punti di interesse e telemetria di bordo per misurare domanda, copertura e aree sottoservite.",
      },
      {
        name: "Scheduling Engine",
        logo: "/assets/cerbero-scheduling-logo.png",
        color: "#f97316",
        ink: "#C2410C",
        body: "Turni macchina e guida ottimizzati con Google OR-Tools CP-SAT, nel rispetto della normativa e del CCNL.",
      },
      {
        name: "Fares Engine",
        logo: "/assets/cerbero-fares-logo.png",
        color: "#22c55e",
        ink: "#15803D",
        body: "GTFS-Fares v2, cluster tariffari e un oracolo che verifica il prezzo atteso contro l'addebito reale del validatore.",
      },
      {
        name: "Network Engine",
        logo: "/assets/cerbero-network-logo.png",
        color: "#8b5cf6",
        ink: "#6D28D9",
        body: "Scenari su feed GTFS, zone di coincidenza intermodali e generazione del Programma di Esercizio.",
      },
    ],
    shots: [
      desk(
        "cerbero/01-scheduling-vsp",
        2.0426,
        "Scheduling Engine: report dell'ottimizzazione dei turni macchina",
        "Scheduling Engine dopo l'ottimizzazione CP-SAT: 669 corse delle 12 linee urbane di Ancona coperte con 29 veicoli, con punteggio dello scenario, costo giornaliero scomposto per voce e indicatori di efficienza.",
      ),
      desk(
        "cerbero/02-orario-grafico",
        1.7297,
        "Planner Studio: orario grafico tempo-distanza",
        "Orario grafico di Planner Studio: le corse della linea 1/4 sovrapposte alle linee 1/3, 43 e 44 nella fascia di punta del mattino, ognuna col suo colore, con i nodi di interscambio sull'asse delle fermate.",
      ),
      desk(
        "cerbero/03-dashboard-rete",
        2.4615,
        "Dashboard: mappa della rete",
        "Dashboard principale: la rete con i percorsi GTFS colorati per congestione, i punti di interesse e il pannello Stato Rete con linee, fermate, corse e km per tipo di giorno.",
        [960, 1280],
      ),
      desk(
        "cerbero/04-gantt-turni-macchina",
        2.4568,
        "Turni macchina: Gantt delle vetture",
        "Area di lavoro dei turni macchina: il Gantt delle vetture con le corse colorate per linea, i trasferimenti a vuoto e le soste in deposito, modificabile a trascinamento.",
        [960, 1280],
      ),
      desk(
        "cerbero/05-cluster-tariffari",
        1.5403,
        "Fares Engine: cluster tariffari sulla mappa",
        "Partizioni territoriali tariffarie: cluster di fermate generati automaticamente e mostrati sulla mappa della provincia.",
        [960, 1280],
      ),
      desk(
        "cerbero/06-editor-varianti",
        2.0189,
        "Planner Studio: editor delle varianti di linea",
        "Editor delle varianti in Planner Studio: tracciato agganciato alle strade e sequenza delle fermate modificabile, con distanza e durata stimate.",
        [960, 1280],
      ),
      desk(
        "cerbero/07-network-engine",
        2.4838,
        "Network Engine: home del modulo",
        "Home del Network Engine, il database vivente del servizio: modello dati, varianti di linea, percorsi agganciati alla rete stradale e condivisione con il team.",
      ),
      desk(
        "cerbero/08-fares-engine",
        2.0147,
        "Fares Engine: home del modulo",
        "Home del Fares Engine, il motore tariffario per bigliettazione EMV e account-based: tariffe, polimetriche, analisi, simulatore e classifica delle fermate.",
      ),
    ],
    hero: 0,
    note: "Schermate reali dell'applicazione su dati GTFS pubblici della rete di Ancona.",
  },
  {
    id: "fleetcare",
    name: "Cerbero FleetCare",
    kind: "Flotta & manutenzione",
    tagline: "Dalla segnalazione del conducente all'ordine di lavoro",
    description:
      "Il modulo di Cerbero per flotta e officina: i conducenti segnalano un guasto dallo smartphone in pochi tocchi, capo officina e direzione lavorano su triage con priorità e SLA, ordini di lavoro, mezzi fermi, scadenze e costi. PostgreSQL multi-tenant con sicurezza a livello di riga.",
    color: "#F59E0B",
    ink: "#92400E",
    logo: { src: `${P}/fleetcare/logo-light.svg`, dark: `${P}/fleetcare/logo-dark.svg`, className: "h-10 md:h-12" },
    highlights: [
      "PWA del conducente: segnalazione del guasto guidata in 6 passi, con foto e coda offline",
      "Triage per punteggio di priorità P1–P4 con SLA e conversione in ordine di lavoro",
      "Dashboard di disponibilità, mezzi fermi, costi d'officina e controlli automatici sulla qualità dei dati",
    ],
    features: [
      "PWA conducente mobile-first: vettura, area, gruppo, pezzo, posizione e dettagli, con gravità, foto e coda offline",
      "Tassonomia dei componenti in linguaggio da conducente, con sinonimi per la ricerca e pezzi critici per la sicurezza",
      "Triage delle segnalazioni ordinato per priorità (severità, sicurezza, anzianità, duplicati) con SLA",
      "Ordini di lavoro con priorità P1–P4, righe lavoro, ricambi, manodopera e costi",
      "Dashboard di flotta: disponibilità, mezzi in officina e fermi, priorità del giorno e numeri chiave per gruppo",
      "Mezzi fermi, budget di fermo per tipo e deposito, scheda mezzo con storico e manutenzione programmata",
      "Analisi e controlli sulla qualità dei dati con export Excel e report da stampare",
      "Multi-tenant con Row Level Security, ruoli dal conducente alla direzione e accesso unificato con Cerbero",
    ],
    stack: ["Next.js 15 · React 19", "PostgreSQL 16 · RLS", "Drizzle ORM", "Auth.js · SSO Cerbero", "Redis · S3", "Turborepo · Coolify"],
    stats: [
      { value: "99", label: "tabelle, tutte con sicurezza a livello di riga" },
      { value: "560", label: "test automatici" },
      { value: "73", label: "migrazioni SQL" },
      { value: "194", label: "controlli automatici sui dati" },
    ],
    shots: [
      desk(
        "fleetcare/01-dashboard",
        1.6,
        "Dashboard: disponibilità della flotta",
        "La dashboard del responsabile flotta: disponibilità al 95%, mezzi in officina e fermi, priorità del giorno e numeri chiave di flotta, officina e manutenzione.",
      ),
      desk(
        "fleetcare/02-coda-priorita",
        1.6872,
        "Officina: coda per priorità e SLA",
        "La coda del capo officina ordinata per punteggio di priorità P1–P4, con la severità dichiarata dal conducente, gli SLA superati e lo stato di ogni segnalazione.",
      ),
      mob(
        "fleetcare/03-segnalazione-guasto",
        0.4875,
        "App del conducente: segnalazione di un guasto",
        "La PWA del conducente all'ultimo passo: pastiglie freno anteriore destra, pezzo critico per la sicurezza, descrizione, foto e livello di gravità.",
      ),
      desk(
        "fleetcare/04-triage",
        1.6,
        "Triage delle segnalazioni",
        "Il triage delle segnalazioni dei conducenti: coda, segnalazioni gravi, tempo medio di valutazione, andamento nel tempo e mezzi segnalati più spesso.",
      ),
    ],
    hero: 0,
    phone: 2,
    note: "Schermate con i dati dimostrativi del progetto (120 mezzi, sei mesi di storico): nessun dato reale.",
  },
  {
    id: "caronte",
    name: "Caronte",
    kind: "Navigatore di bordo",
    tagline: "Navigation System: guida lungo la corsa esatta",
    description:
      "Navigatore di linea per il trasporto pubblico (PWA): si scelgono data, linea e corsa, l'app aggancia il GPS e guida lungo il tracciato GTFS con prossima fermata, anticipo e ritardo a ogni transito e avviso di fuori percorso. I transiti, riferiti alla corsa e non alla persona, alimentano i tempi di percorrenza e i feed in tempo reale dell'ecosistema Cerbero.",
    color: "#10B981",
    ink: "#065F46",
    logo: { src: `${P}/caronte/logo.webp`, plate: "dark", className: "h-10 md:h-12" },
    highlights: [
      "Navigazione GPS sul tracciato GTFS della corsa, in 3D, con la mappa che ruota col senso di marcia",
      "Prossima fermata, avanzamento e chip in orario / ritardo / anticipo a ogni transito",
      "Layout per smartphone e per tablet di bordo; PWA installabile con schermo sempre acceso e annunci vocali",
    ],
    features: [
      "Scelta guidata in tre passi: calendario dei giorni di servizio, linee con ricerca, corse per orario con filtro andata/ritorno",
      "Navigazione GPS lungo lo shape GTFS: posizione agganciata al percorso e movimento fluido a ogni fotogramma",
      "Pannello prossima fermata con distanza e orario, barra di avanzamento, contatore fermate e velocità",
      "Transiti reali confrontati con l'orario programmato: in orario, ritardo o anticipo in minuti",
      "Avviso di fuori percorso con annuncio vocale; avvio della navigazione solo a orario e con il mezzo sul tracciato",
      "Invio al sistema centrale di posizione e transiti riferiti alla corsa, non alla persona, per misurare i tempi di percorrenza e alimentare i feed in tempo reale",
      "Accesso con verifica email, cancellazione dell'account self-service e conservazione dei dati limitata nel tempo",
    ],
    stack: ["Python · FastAPI", "SQLite · PostgreSQL", "PWA in JavaScript", "Mapbox GL JS v3", "Geolocation · Wake Lock · Web Speech", "Docker · Caddy"],
    stats: [
      { value: "120", label: "linee nel feed GTFS incluso" },
      { value: "3.943", label: "fermate georeferenziate" },
      { value: "12.541", label: "corse programmate" },
      { value: "1.157", label: "tracciati di percorso" },
    ],
    shots: [
      desk(
        "caronte/01-tablet-anteprima",
        1.6,
        "Tablet di bordo: anteprima della corsa",
        "Tablet in orizzontale: la corsa RE1 delle 08:00 da Ancona verso la Riviera del Conero (Marcelli), 50 fermate, con il pannello delle fermate e il pulsante Avvia navigazione.",
      ),
      mob(
        "caronte/02-fermate-ritardi",
        0.4621,
        "Smartphone: prossima fermata e transiti",
        "In corsa sullo smartphone: prossima fermata tra 240 m, avanzamento 7/50 a 38 km/h e i transiti già fatti confrontati con l'orario (in orario, +1 min, −1 min).",
      ),
      desk(
        "caronte/03-tablet-navigazione",
        1.6,
        "Tablet di bordo: navigazione in corsa",
        "Navigazione attiva sul tablet: la mappa segue il mezzo lungo il tracciato e la lista delle fermate segna i transiti reali.",
      ),
      mob(
        "caronte/04-anteprima-percorso",
        0.4621,
        "Smartphone: percorso prima della partenza",
        "Prima della partenza l'autista vede tutto il percorso: il pulsante Avvia navigazione si sblocca solo a orario e con il mezzo sul tracciato.",
      ),
      mob(
        "caronte/05-calendario",
        0.4621,
        "Smartphone: scelta della data",
        "Primo passo: il calendario abilita solo i giorni in cui la rete è in servizio.",
      ),
    ],
    hero: 0,
    phone: 1,
    frame: "tablet",
    note: "GPS simulato lungo una corsa reale del feed GTFS pubblico. Per le catture la mappa di base è ricostruita offline (costa © OpenStreetMap contributors); nell'app lo sfondo è la mappa notturna Mapbox con gli edifici in 3D.",
  },
  {
    id: "chiamaevai",
    name: "Chiama&Vai",
    kind: "Trasporto a chiamata",
    tagline: "Il bus parte se lo chiami tu",
    description:
      "Piattaforma per prenotare il trasporto pubblico a chiamata: il passeggero sceglie da smartphone linea, corsa, giorni e fermate e riceve un biglietto con QR, e la corsa parte solo se qualcuno l'ha prenotata. La stessa applicazione serve amministrazione, biglietteria e presidio del deposito, con le API per i validatori di bordo.",
    color: "#0E9594",
    ink: "#095C5A",
    logo: { src: `${P}/chiamaevai/logo-light.svg`, dark: `${P}/chiamaevai/logo-dark.svg`, className: "h-9 md:h-11" },
    highlights: [
      "Prenotazione mobile-first in pochi passi e biglietto con un unico QR valido su più giorni",
      "Presidio del deposito: le corse prenotate di oggi per turno, aggiornate ogni minuto",
      "Import GTFS versionato, dashboard analitica ed export CSV/XLSX per ogni vista",
    ],
    features: [
      "Wizard di prenotazione: comune, linea, corsa, giorni, salita, discesa e conferma, con il percorso in stile mappa metro",
      "Prenotazione su più giorni con un unico QR di gruppo, convalidabile una volta al giorno",
      "Biglietto digitale, email di conferma e annullamento self-service entro il limite orario",
      "Import GTFS in streaming con versionamento dei feed, report dei conflitti e rollback",
      "Amministrazione di corse prenotabili, comuni, turni, calendario aziendale, utenti e impostazioni",
      "Dashboard analitica con KPI, andamento giornaliero, classifiche e heatmap giorno × ora; export CSV/XLSX",
      "Presidio del deposito in modalità scura ad alto contrasto e foglio turno stampabile",
      "Sicurezza: 2FA per lo staff, password argon2id, limiti ai tentativi, audit trail e diritti GDPR self-service",
    ],
    stack: ["Next.js 15 · React 19", "PostgreSQL · Drizzle ORM", "Auth.js · 2FA TOTP", "Recharts · Leaflet", "Vitest", "Docker · Coolify"],
    stats: [
      { value: "123", label: "linee nel feed GTFS di esempio" },
      { value: "293.879", label: "orari di passaggio importati in streaming" },
      { value: "115", label: "test automatici" },
      { value: "4", label: "aree: utente, amministrazione, biglietteria, presidio" },
    ],
    shots: [
      desk(
        "chiamaevai/01-presidio-oggi",
        1.6,
        "Presidio: le corse prenotate di oggi",
        "Il monitor del presidio: le corse prenotate di oggi raggruppate per turno, con linea, orario, destinazione e numero di prenotazioni. Le corse senza prenotazioni non compaiono e il mezzo resta in deposito.",
      ),
      mob(
        "chiamaevai/02-biglietto-qr",
        0.5417,
        "Smartphone: biglietto con QR",
        "Il biglietto digitale: linea, data, fermate e orari di salita e discesa, con un unico QR per tutti i giorni prenotati.",
      ),
      desk(
        "chiamaevai/03-dashboard-analitica",
        1.8113,
        "Amministrazione: dashboard analitica",
        "La dashboard dell'amministrazione: prenotazioni, utenti attivi, tasso di annullamento e corse risparmiate, con l'andamento giornaliero. Ogni vista si esporta in CSV o XLSX.",
      ),
      mob(
        "chiamaevai/04-rete-linee",
        0.4621,
        "Smartphone: le linee del comune",
        "Le linee a chiamata del comune, ognuna con il percorso espandibile in stile metro, con fermate e orari.",
      ),
      mob(
        "chiamaevai/05-scelta-giorni",
        0.4621,
        "Smartphone: scelta dei giorni",
        "Il calendario rende selezionabili solo i giorni in cui la corsa circola: se ne scelgono più d'uno e si ottiene un solo biglietto.",
      ),
    ],
    hero: 0,
    phone: 1,
    note: "Prenotazioni, passeggeri e numeri della dashboard sono dati dimostrativi; linee e fermate vengono dal feed GTFS pubblico.",
  },
];

/** Gli altri progetti, in griglia. */
export const others: Project[] = [
  {
    id: "argos",
    name: "Argos",
    kind: "Assistente AI",
    tagline: "Assistente AI sui propri documenti, formule comprese, e agente che pianifica il servizio",
    description:
      "Due prodotti in un unico servizio: un assistente conversazionale RAG su documenti tecnici, in cui le formule restano LaTeX dall'ingestione alla risposta, e un agente pianificatore dentro Planner Studio di Cerbero, che propone un piano in card da approvare e lo applica solo se l'operatore lo autorizza, con annullo del turno.",
    color: "#6366F1",
    ink: "#4F46E5",
    inkDark: "#818CF8",
    logo: { src: `${P}/argos/logo.svg`, className: "h-9" },
    features: [
      "Chat RAG sui propri documenti con fonti citate e retrieval filtrato per cliente",
      "Formule LaTeX con KaTeX; grafici, diagrammi e tabelle in un pannello collegato alla risposta",
      "Mappa della conoscenza: documenti per categoria, consiglio di agenti e fonti dati",
      "Agente pianificatore con card approvabili, annullo del turno e revisore indipendente",
      "Connettore MCP per usare Planner Studio dalle app Claude, con chiavi di lettura e scrittura separate",
      "Tetto mensile di token per cliente, anche sul tool-calling dell'agente",
    ],
    stack: ["Python · FastAPI", "PostgreSQL · pgvector", "Embedding bge-m3", "Claude · Llama 3.3", "MCP", "KaTeX · Chart.js · Mermaid"],
    stats: [
      { value: "42", label: "strumenti dell'agente su Planner Studio" },
      { value: "25", label: "sezioni dello smoke test in CI" },
    ],
    shots: [
      desk(
        "argos/01-mappa-conoscenza",
        1.6,
        "Mappa della conoscenza",
        "Il grafo dei documenti per categoria, con il consiglio di agenti al centro e il gruppo delle fonti dati di Cerbero.",
      ),
      desk(
        "argos/02-chat-formule",
        1.6,
        "Chat con formule e grafici",
        "Una risposta sull'headway ottimo di una linea: formule LaTeX, curva dei costi e diagramma decisionale aperti nel pannello laterale.",
      ),
    ],
    hero: 0,
    note: "Conversazione e documenti dimostrativi; per le catture le API sono simulate in locale.",
  },
  {
    id: "whiteboard",
    name: "Whiteboard",
    kind: "Portale interno",
    tagline: "Gli strumenti di programmazione dell'esercizio, in un solo portale con accessi per ruolo",
    description:
      "Portale interno per un'azienda di trasporto pubblico che riunisce cinque strumenti di programmazione nati come macro Excel, app desktop e Streamlit. Il portale gestisce utenti, settori e permessi per strumento e tiene un registro di ogni accesso; il motore di ogni strumento resta separato dalla sua interfaccia.",
    color: "#BC13FE",
    ink: "#8A0DBF",
    inkDark: "#D77BFF",
    features: [
      "Catalogo degli strumenti filtrato per utente: si vede solo ciò che l'amministratore ha concesso",
      "Amministrazione di utenti, settori e permessi per strumento, con registro di accessi e pubblicazioni",
      "Turni Guida: importa i turni dal gestionale, li impagina in A4 e li pubblica come PDF in sola lettura",
      "Shuttle aeroporto, foglio di servizio giornaliero, controllo assenze di fine mese e attestazione 56 giorni (Reg. CE 561/2006)",
      "Privacy by design: i file caricati non restano archiviati e nessuna risorsa arriva da CDN esterne",
      "Un motore, due interfacce: lo stesso codice gira come app desktop Electron e come web app",
    ],
    stack: ["Node.js · Express · SQLite", "Python · FastAPI", "Electron · Puppeteer", "Streamlit", "Docker · Coolify"],
    stats: [
      { value: "5", label: "strumenti nel catalogo" },
      { value: "289", label: "test automatici" },
    ],
    shots: [
      desk(
        "whiteboard/01-catalogo",
        1.6,
        "Catalogo: i tuoi strumenti",
        "La home del portale dopo l'accesso: ogni strumento è una scheda con descrizione e pulsante di apertura, e ciascun utente vede solo quelli che gli sono stati concessi.",
      ),
      desk(
        "whiteboard/02-permessi",
        1.6,
        "Utenti e permessi: chi apre cosa",
        "L'area di amministrazione: per ogni utente ruolo, settore, ultimo accesso e strumenti concessi, modificabili con un clic. Un utente disattivato perde l'accesso subito.",
      ),
      desk(
        "whiteboard/03-turni-guida",
        1.6,
        "Turni Guida: dal file del gestionale al foglio impaginato",
        "Un turno importato dal file di testo del gestionale e impaginato in A4: corse, fermate intermedie, soste e fuorilinea. Si corregge in bozza, poi si esporta in PDF o Excel o si manda in esercizio.",
      ),
    ],
    hero: 0,
    note: "Utenti, permessi e accessi sono dati dimostrativi.",
  },
  {
    id: "flightmatrix",
    name: "Flight Matrix",
    kind: "Pianificazione turni",
    tagline: "Dall'orario voli mensile ai turni guida dello shuttle aeroporto, verificati sulla normativa",
    description:
      "Web app che legge il PDF mensile dell'orario voli, scarta i cargo e costruisce la matrice voli × date per ogni categoria di giorno. Dai voli selezionati genera le corse del bus aeroporto–centro e le compone in turni guida in una Finestra di Lavoro a trascinamento, con ogni turno verificato in tempo reale sulla normativa extraurbana.",
    color: "#0C7A6B",
    ink: "#0A5F54",
    inkDark: "#3FE8A8",
    features: [
      "Lettura del PDF mensile dei voli: colonne dei giorni rilevate da sole, giorni spezzati su due pagine, solo voli passeggeri",
      "Matrice voli × date per categoria di giorno, con filtri per volo, rotta, arrivi/partenze e fasce orarie",
      "Generazione delle corse con anticipi e margini Schengen/extra-Schengen, modificabili rotta per rotta",
      "Finestra di Lavoro: corse trascinabili, selezione a rettangolo, raggruppamento in turni e codifica automatica",
      "Verifica in tempo reale: nastro, lavoro, guida continuativa, sosta inoperosa, fuorilinea e trasferimenti a vuoto",
      "Salvataggio automatico per mese e giorno, con ripiego offline nel browser ed esportazione CSV",
    ],
    stack: ["Python · FastAPI", "pdfplumber", "JavaScript vanilla (SPA)", "SQLAlchemy · PostgreSQL", "Docker · Coolify"],
    stats: [
      { value: "4", label: "tipologie di turno verificate" },
      { value: "11", label: "endpoint API" },
    ],
    shots: [
      desk(
        "flightmatrix/03-finestra-lavoro",
        2.0,
        "Finestra di Lavoro: turni guida verificati",
        "Sedici corse composte in quattro turni guida, tutte coperte. Per ogni turno nastro, lavoro, costo stimato, soste inoperose, trasferimenti a vuoto e fuorilinea, con la tipologia riconosciuta in automatico.",
      ),
      desk(
        "flightmatrix/01-matrice",
        1.6,
        "Matrice voli × date",
        "I voli passeggeri del venerdì letti dal PDF mensile: per ogni volo l'orario tipo e l'orario effettivo di ogni data, con filtri per rotta, movimento e fascia oraria.",
      ),
      desk(
        "flightmatrix/02-genera-corse",
        1.6,
        "Generazione corse: regole Schengen",
        "Prima di generare le corse l'operatore conferma la classificazione delle rotte in arrivo: il bus parte 25′ dopo l'atterraggio per i voli Schengen, 35′ per gli extra-Schengen.",
      ),
    ],
    hero: 0,
    note: "Voli, corse e turni sono dati dimostrativi.",
  },
  {
    id: "controllerie",
    name: "Controllerie",
    kind: "Pianificazione controlli",
    tagline: "Dalle segnalazioni dei conducenti al piano dei controlli a bordo",
    description:
      "Web app per un'azienda di trasporto pubblico: raccoglie le segnalazioni dei conducenti sulle corse critiche, propone con un ottimizzatore le squadre di verifica e le corse da coprire, porta il piano in calendario e ne consuntiva gli esiti con export in PDF.",
    color: "#1EC5FD",
    ink: "#065F87",
    features: [
      "Segnalazioni dei conducenti da mobile, con linea, direzione e tratto presi dal feed GTFS",
      "Assistente di pianificazione con ottimizzatore: squadre, fasce orarie e corse da coprire su mappa",
      "Calendario dei controlli con trascinamento degli orari",
      "Consuntivi per linea ed export PDF",
      "Accesso con matricola, Row Level Security sulle tabelle applicative e reset password con limiti ai tentativi",
    ],
    stack: ["Next.js 16 · React 19", "Supabase · PostgreSQL · RLS", "Leaflet · FullCalendar", "pdf-lib · Vitest"],
    stats: [
      { value: "49", label: "migrazioni SQL" },
      { value: "19", label: "API route" },
    ],
    shots: [
      desk(
        "controllerie/01-assistente-pianificazione",
        2.0147,
        "Assistente di pianificazione",
        "L'ottimizzatore propone le squadre di verifica e le corse da coprire, mostrate sulla mappa delle linee segnalate.",
      ),
      desk(
        "controllerie/02-segnalazioni",
        1.9143,
        "Segnalazioni dei conducenti",
        "Le segnalazioni per zona, con linea, orario, tratto, stato e giorni di validità.",
      ),
    ],
    hero: 0,
    note: "Segnalazioni, nomi e turni sono dati dimostrativi; la mappa è disegnata dai tracciati GTFS.",
  },
  {
    id: "newsletter",
    name: "Newsletter formazione",
    kind: "Email marketing",
    tagline: "Dall'editor a blocchi all'invio all'orario giusto, per ogni contatto",
    description:
      "Gestionale di newsletter e corsi per un ente di formazione ambientale. L'operatore compone l'email a blocchi, sceglie i destinatari per categorie e vede subito quanti sono; il sistema invia all'orario migliore per ciascun contatto e misura clic, disiscrizioni e corsi frequentati dopo l'email.",
    color: "#EC6608",
    ink: "#B54C00",
    inkDark: "#FF9A4D",
    features: [
      "Editor a blocchi (titolo, testo, immagine, pulsante, scheda corso, separatore) con HTML MJML leggibile anche su Outlook",
      "Destinatari per settore, tipo di soggetto, categorie Albo, ruolo, provincia, corsi frequentati e attestati in scadenza, con conteggio immediato",
      "Invio all'orario migliore appreso da clic e aperture, con tetti per contatto e giornalieri per il riscaldamento del dominio",
      "Statistiche: mappa giorno × ora, dispositivi, rendimento per segmento, export CSV e API in sola lettura con dati pseudonimizzati",
      "Privacy by design: disiscrizione con un clic (RFC 8058), centro preferenze, conservazione limitata, 2FA obbligatoria e backup cifrati",
    ],
    stack: ["Next.js 16 · React 19", "PostgreSQL 16", "MJML · Nodemailer", "Amazon SES · Scaleway TEM", "Docker · Coolify"],
    stats: [
      { value: "26", label: "migrazioni SQL" },
      { value: "79", label: "test automatici" },
    ],
    shots: [
      desk(
        "newsletter/01-editor",
        1.6,
        "Editor a blocchi: scrivi e vedi l'email",
        "Blocchi di titolo, testo e scheda corso a sinistra; a destra l'anteprima dell'email come la riceverà il destinatario, con le date delle lezioni e il pulsante di iscrizione.",
      ),
      desk(
        "newsletter/02-destinatari",
        1.6,
        "Destinatari: categorie e conteggio immediato",
        "Si toccano le voci (tipo di soggetto, categorie Albo, settore, provincia…) e il riquadro «Chi la riceve» aggiorna subito numero di contatti e aziende, con un'anteprima dell'elenco.",
      ),
      desk(
        "newsletter/03-statistiche",
        1.6,
        "Statistiche: quando e chi interagisce",
        "Mappa giorno × ora di clic e aperture, quota di smartphone e computer e tasso di clic per tipo di soggetto e settore, per decidere quando e a chi scrivere.",
      ),
    ],
    hero: 0,
    note: "Aziende e contatti sono dati inventati; il marchio del cliente è sostituito.",
  },
  {
    id: "sipario",
    name: "Sipario",
    kind: "Gestionale su misura",
    tagline: "Resi, ordini e fatture per la vendita porta a porta di biglietti teatrali",
    description:
      "Web app installabile sviluppata su misura per un'agenzia di spettacoli teatrali: i postini segnalano resi e cambi di importo dallo smartphone con la foto della busta, la segreteria verifica e inoltra, l'operatrice telefonica registra l'esito. Accanto, ordini e fatture, carichi e scarichi di buste e report mensili.",
    color: "#B70B1C",
    ink: "#9B0A18",
    inkDark: "#F87171",
    logo: { src: `${P}/sipario/logo.webp`, plate: "light", className: "h-8" },
    features: [
      "Tre ruoli con interfacce dedicate: segreteria (desktop), postino (mobile) e operatrice telefonica",
      "Flusso del reso tracciato passo per passo, con storico degli eventi per ogni pratica",
      "Foto della busta scattata in strada, compressa sul telefono e con miniature generate dal server",
      "Ordini e fatture con spunte di gestione e stato calcolato in automatico",
      "Report mensili in Excel e PDF; archiviando una campagna, i dati personali dei clienti vengono anonimizzati",
    ],
    stack: ["React 19 · Vite", "Express 5 · Drizzle · PostgreSQL", "OpenAPI · Orval", "PWA"],
    stats: [
      { value: "76", label: "operazioni API (OpenAPI)" },
      { value: "3", label: "ruoli con interfaccia dedicata" },
    ],
    shots: [
      desk(
        "sipario/01-ordini-fatture",
        1.6,
        "Segreteria: ordini e fatture",
        "Ordini raggruppati per operatrice, con contatori per stato e spunte di gestione che fanno avanzare lo stato in automatico.",
      ),
      desk(
        "sipario/02-dettaglio-reso",
        1.8587,
        "Segreteria: dettaglio di un reso",
        "Una pratica di reso con lo stato di avanzamento, la foto della busta, i motivi, la nota dal campo e la riassegnazione.",
      ),
      mob(
        "sipario/03-postino",
        0.5132,
        "App del postino",
        "L'interfaccia mobile del postino: campagna del giorno, azioni rapide e resi inviati con la miniatura della foto.",
      ),
    ],
    hero: 0,
    note: "Clienti, importi e campagne sono dati dimostrativi.",
  },
  {
    id: "condoit",
    name: "CONDO.IT",
    kind: "Gestionale condominiale",
    tagline: "Gestionale multi-condominio per studi di amministrazione",
    description:
      "Applicazione web per gli studi che amministrano più condomini: anagrafiche e titolarità, tabelle millesimali, contabilità per esercizi con riparto automatico, rate e morosità, assemblee con quorum e verbale, scadenzario e portale del condòmino.",
    color: "#3B82F6",
    ink: "#1D4ED8",
    logo: { src: `${P}/condominio/logo.svg`, className: "h-9" },
    features: [
      "Multi-condominio con switch rapido e dati isolati per studio",
      "Anagrafiche con dati catastali, titolarità, comproprietà e storico dei subentri",
      "Riparto per millesimi (art. 1123 c.c.), prospetto unità × voci e rendiconto (art. 1130-bis c.c.)",
      "Rate, pagamenti e solleciti con interessi di mora",
      "Assemblee: convocazione, deleghe, quorum e votazioni con esito automatico (art. 1136 c.c.), verbale in PDF",
      "Accesso con scena 3D in Three.js e design system progettato per contrasto AA",
    ],
    stack: ["Next.js 15 · React 19", "PostgreSQL · Drizzle ORM", "Auth.js", "pdf-lib · Three.js"],
    stats: [
      { value: "36", label: "tabelle nello schema dati" },
      { value: "10", label: "tipi di documento PDF generati" },
    ],
    shots: [
      desk(
        "condominio/01-login-3d",
        1.6,
        "Accesso con scena 3D",
        "L'accesso: a sinistra una scena isometrica in Three.js con l'edificio che si compone piano per piano, a destra il pannello di login.",
      ),
      desk(
        "condominio/02-prospetto-riparto",
        1.6,
        "Contabilità: prospetto di riparto",
        "Il riparto per millesimi di un esercizio, unità × voci di spesa, con importi, millesimi applicati, totali ed export PDF.",
      ),
      desk(
        "condominio/03-morosita",
        2.4,
        "Morosità e rate",
        "Rate e incassi del condominio: dovuto, incassato e morosità, con rate pagate, scadute e parziali.",
      ),
    ],
    hero: 0,
    note: "Condomini, persone e importi sono dati dimostrativi.",
  },
  {
    id: "turnivolontari",
    name: "Turni Volontari",
    kind: "Gestione turni",
    tagline: "Dalla disponibilità dei volontari alla copertura di ogni turno",
    description:
      "Webapp mobile-first per un'associazione di volontariato di pubblica assistenza: i volontari vedono il calendario, si candidano ai turni scoperti e gestiscono i propri impegni dal telefono. I referenti pianificano la settimana, approvano le candidature e trovano chi può coprire i posti vuoti.",
    color: "#2B3990",
    ink: "#2B3990",
    inkDark: "#8C9BFF",
    features: [
      "Calendario mensile e a lista con filtri per tipo di turno, turni scoperti e «solo i miei»",
      "Candidatura e annullamento con regole verificate nel database: un turno al giorno, nessuna sovrapposizione, abilitazioni richieste, scadenze",
      "Area gestione: planning settimanale, turni da coprire, approvazione delle candidature e assegnazione diretta",
      "«Trova volontari» per i posti vuoti, con richiesta di copertura via WhatsApp",
      "Ruoli e permessi, registro delle operazioni non modificabile e solo dati comuni (nessun dato sanitario)",
    ],
    stack: ["Next.js 15 · React 19", "PostgreSQL · Drizzle ORM", "Auth.js v5", "Tailwind CSS · shadcn/ui", "Docker · Coolify"],
    stats: [
      { value: "157", label: "test automatici" },
      { value: "20", label: "tabelle nel database" },
    ],
    shots: [
      desk(
        "turnivolontari/04-planning",
        1.6,
        "Area gestione: planning settimanale",
        "Griglia della settimana per fascia oraria: posti confermati, candidature in attesa e turni scoperti evidenziati, con i contatori dei turni da coprire e delle candidature da approvare.",
      ),
      mob(
        "turnivolontari/02-bacheca-turni",
        0.4621,
        "Bacheca turni: candidarsi in un tocco",
        "Lista dei turni con orario, tipo e copertura (es. 1/2 · Scoperto); il volontario si candida direttamente dal telefono.",
      ),
      mob(
        "turnivolontari/01-calendario",
        0.4621,
        "Calendario: il mese a colpo d'occhio",
        "Ogni giorno mostra i suoi turni: le barre a righe segnalano i posti ancora da coprire, quelle piene i turni completi.",
      ),
      mob(
        "turnivolontari/03-miei-turni",
        0.4621,
        "I miei turni: prossimo impegno e stato",
        "In evidenza il prossimo turno; sotto, l'elenco con lo stato di ogni candidatura (confermato o in attesa) e la possibilità di annullare.",
      ),
    ],
    hero: 0,
    phone: 1,
    note: "Volontari e turni sono dati dimostrativi; nome e stemma dell'associazione sono sostituiti.",
  },
  {
    id: "beatrice",
    name: "Beatrice",
    kind: "Sito vetrina",
    tagline: "Il sito del negozio: chiama, indicazioni e WhatsApp a un tocco",
    description:
      "Sito di una pagina per una boutique di intimo, calze e abbigliamento donna ad Ancona, pensato prima di tutto per il telefono. Chi lo apre vede subito se il negozio è aperto, come arrivarci e le novità in vetrina; la titolare aggiorna foto e vetrina di stagione da sola, anche dal telefono.",
    color: "#9E8B60",
    ink: "#5E4E24",
    inkDark: "#CDB980",
    features: [
      "«Aperto ora · chiude alle…» calcolato dagli orari del negozio, con le aperture straordinarie di dicembre",
      "Vetrina di stagione che la titolare riempie dal pannello: foto dal telefono, marca, reparto e descrizione",
      "«Chiama», «Indicazioni» e WhatsApp sempre a un tocco; «Chiedi» su ogni capo apre WhatsApp col messaggio pronto",
      "Foto ridimensionate nel browser prima del caricamento, così la pagina resta leggera",
      "Tema chiaro e scuro che segue il telefono, con testi oltre 7:1 di contrasto",
      "Nessun cookie e nessun tracciamento: niente banner da accettare",
    ],
    stack: ["HTML · CSS · JavaScript", "PocketBase", "nginx · Coolify", "Playwright"],
    stats: [
      { value: "17", label: "marche in vetrina" },
      { value: "0", label: "cookie e tracciamenti" },
    ],
    shots: [
      desk(
        "beatrice/01-home",
        1.6,
        "Home: il negozio in breve",
        "Barra con le sezioni, il numero da chiamare e i social; sotto, la foto d'apertura e cosa si trova da Beatrice.",
      ),
      mob(
        "beatrice/02-insegna",
        0.4621,
        "Insegna: il primo schermo",
        "Sul telefono si apre con il solo logo crema sul muro oliva, come l'insegna del negozio; il tondo WhatsApp è già lì.",
      ),
      mob(
        "beatrice/03-vetrina",
        0.4621,
        "Vetrina: le novità in negozio",
        "Le foto che la titolare carica dal pannello, da sfogliare col dito; «Chiedi» apre WhatsApp con il capo già nel messaggio.",
      ),
      mob(
        "beatrice/04-dove-siamo",
        0.4621,
        "Dove siamo: aperto ora?",
        "Indirizzo, stato del negozio aggiornato in tempo reale, Indicazioni e Chiama a tutta larghezza, poi gli orari con il giorno di oggi in evidenza.",
      ),
      desk(
        "beatrice/05-marche",
        1.6,
        "Marche: diciassette loghi",
        "Le marche trattate in negozio, ognuna col suo logo, in versione scura e in versione crema per il tema scuro.",
      ),
    ],
    hero: 0,
    phone: 1,
    note: "Sito pubblicato; le foto sono provvisorie, in attesa di quelle del negozio.",
  },
  {
    id: "agform",
    name: "AG form",
    kind: "Sito e biglietto digitale",
    tagline: "Sito e biglietto da visita digitale per un consulente di formazione finanziata",
    description:
      "Sito di presentazione per un HR Training Manager: chi è, cosa fa, come funziona e un solo invito all'azione, la consulenza gratuita. Accanto c'è un biglietto da visita digitale da aprire col QR o da un link: chi lo riceve chiama, scrive su WhatsApp o salva il contatto in rubrica con un tocco.",
    color: "#2587C1",
    ink: "#1D74A8",
    inkDark: "#2E9BDB",
    features: [
      "Biglietto da visita digitale: email, chiamata, WhatsApp e Partita IVA copiata con un tocco",
      "«Salva in rubrica» scarica il contatto completo di foto, pronto per iPhone e Android",
      "Si installa sul telefono come un'app e si apre direttamente sul biglietto",
      "Statistiche senza cookie con un evento su ogni pulsante: si vede cosa usano i visitatori",
      "SEO in ordine: canonical, Open Graph, sitemap e dati strutturati ProfessionalService",
    ],
    stack: ["HTML · CSS · JavaScript", "nginx · Docker", "Coolify", "Umami"],
    shots: [
      desk(
        "agform/01-home",
        1.6,
        "Home: il messaggio in una riga",
        "«Forma il tuo team. Senza spendere un euro.»: a chi si rivolge, cosa offre e il pulsante per la consulenza gratuita.",
      ),
      mob(
        "agform/03-biglietto",
        0.4621,
        "Biglietto: tutto in un tocco",
        "Foto, ruolo, i quattro contatti rapidi, «Salva in rubrica» e la consulenza gratuita; sotto, le schede Formazione, Fondi, Servizi e HR.",
      ),
      desk(
        "agform/02-servizi",
        1.6,
        "Servizi: cosa faccio per te",
        "Sei servizi numerati, dall'analisi dei bandi al monitoraggio dei risultati, scritti in parole semplici per il titolare d'azienda.",
      ),
      mob(
        "agform/04-biglietto-scuro",
        0.4621,
        "Biglietto: tema scuro",
        "Lo stesso biglietto quando il telefono è in modalità scura: stessi pulsanti, colori ricalibrati.",
      ),
      mob(
        "agform/05-home-mobile",
        0.4621,
        "Home dal telefono",
        "Il primo schermo su smartphone: titolo, sottotitolo e i due pulsanti a tutta larghezza.",
      ),
    ],
    hero: 0,
    phone: 1,
    note: "Sito pubblicato su agform.it, con il biglietto su /biglietto.",
  },
];
