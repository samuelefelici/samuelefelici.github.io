import { useRef, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { Scene } from "@/components/Scene";
import { Eyebrow } from "@/components/Eyebrow";
import { BrowserFrame, PhoneFrame, ProjectGallery, ProjectLogo, TabletFrame, brandVars } from "@/components/ProjectGallery";
import { featured, others, shotSrc, shotSrcSet, type Project } from "./projects-data";

/*
 * Coreografia (frazioni del progresso della scena, vedi Scene): intro, i
 * quattro prodotti principali uno per volta — in sincrono con le quattro
 * diramazioni colorate del video (blu → arancio → verde → viola) — e infine
 * gli altri progetti. Con 600vh la scena resta pinnata fino a ~0,83.
 * Dissolvenze corte (FADE) così ogni fase ha un tratto in cui sta ferma.
 * L'intro parte da 0: chi arriva dal menu (#cerbero) la trova già visibile.
 */
const HEIGHT_VH = 600;
const FADE = 0.035;
const INTRO: [number, number] = [0, 0.13];
const FEATURED_RANGES: [number, number][] = [
  [0.13, 0.27],
  [0.27, 0.41],
  [0.41, 0.55],
  [0.55, 0.69],
];
const OTHERS: [number, number] = [0.69, 0.88];

type Open = { project: Project; index: number } | null;
/** apre la galleria su una schermata; `el` è il controllo che l'ha aperta (riceve di nuovo il focus alla chiusura) */
type OnOpen = (index: number, el: HTMLElement) => void;

/** Composizione di schermate per la card di un prodotto (desktop). */
function Showcase({ p, onOpen }: { p: Project; onOpen: OnOpen }) {
  const hero = p.shots[p.hero];
  const phone = p.phone !== undefined ? p.shots[p.phone] : undefined;

  if (hero.kind === "mobile") {
    // prodotto mobile-first: tre telefoni a ventaglio, la copertina al centro
    const side = p.shots.filter((s, i) => s.kind === "mobile" && i !== p.hero).slice(0, 2);
    return (
      <div className="relative flex items-end justify-center gap-5">
        {side[0] && (
          <button type="button" onClick={(e) => onOpen(p.shots.indexOf(side[0]), e.currentTarget)} aria-label={`Apri: ${side[0].alt}`} className="w-[30%] max-w-[210px] translate-y-6 -rotate-3 transition hover:-translate-y-0 hover:rotate-0">
            <PhoneFrame shot={side[0]} sizes="210px" />
          </button>
        )}
        <button type="button" onClick={(e) => onOpen(p.hero, e.currentTarget)} aria-label={`Apri: ${hero.alt}`} className="relative z-10 w-[34%] max-w-[240px] transition hover:-translate-y-1">
          <PhoneFrame shot={hero} sizes="240px" />
        </button>
        {side[1] && (
          <button type="button" onClick={(e) => onOpen(p.shots.indexOf(side[1]), e.currentTarget)} aria-label={`Apri: ${side[1].alt}`} className="w-[30%] max-w-[210px] translate-y-6 rotate-3 transition hover:-translate-y-0 hover:rotate-0">
            <PhoneFrame shot={side[1]} sizes="210px" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${phone ? "pr-[13%] pb-[6%]" : ""}`}>
      <button type="button" onClick={(e) => onOpen(p.hero, e.currentTarget)} aria-label={`Apri la galleria di ${p.name}`} className="block w-full text-left transition hover:-translate-y-1">
        {p.frame === "tablet" ? (
          <TabletFrame shot={hero} sizes="(min-width: 1280px) 760px, 55vw" />
        ) : (
          <BrowserFrame shot={hero} title={`${p.name} — ${hero.alt.split(":")[0]}`} sizes="(min-width: 1280px) 760px, 55vw" />
        )}
      </button>
      {phone && (
        <button
          type="button"
          onClick={(e) => onOpen(p.phone!, e.currentTarget)}
          aria-label={`Apri: ${phone.alt}`}
          className="absolute bottom-0 right-0 w-[26%] max-w-[190px] transition hover:-translate-y-1"
        >
          <PhoneFrame shot={phone} sizes="190px" />
        </button>
      )}
    </div>
  );
}

function FeaturedCard({ p, n, onOpen }: { p: Project; n: number; onOpen: OnOpen }) {
  // su telefono: una sola immagine, preferibilmente orizzontale
  const cover = p.shots[p.hero].kind === "desktop" ? p.shots[p.hero] : (p.shots.find((s) => s.kind === "desktop") ?? p.shots[p.hero]);
  return (
    <div className="container mx-auto px-4 md:px-6" style={brandVars(p)}>
      <div className="grid items-center gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* immagine compatta per schermi piccoli (non sugli schermi bassi, es. telefono in orizzontale) */}
        <button
          type="button"
          onClick={(e) => onOpen(p.shots.indexOf(cover), e.currentTarget)}
          aria-label={`Apri la galleria di ${p.name}`}
          className="relative block overflow-hidden rounded-xl border border-border shadow-xl lg:hidden [@media(max-height:500px)]:hidden"
        >
          <img
            src={shotSrc(cover, cover.sizes[0])}
            srcSet={shotSrcSet(cover)}
            sizes="(min-width: 640px) 92vw, 320px"
            alt=""
            loading="lazy"
            decoding="async"
            className={`block h-[min(24vh,220px)] w-full object-cover ${cover.kind === "mobile" ? "object-[50%_12%]" : "object-left-top"}`}
          />
        </button>

        <div className="rounded-3xl border border-border/60 bg-background/90 p-5 shadow-xl backdrop-blur-xl dark:bg-background/70 md:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-5">
            <ProjectLogo p={p} className={p.logo.className} />
            <span className="inline-block rounded-full bg-[color:var(--brand)]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-ink)] dark:text-[color:var(--brand-ink-dark)]">
              0{n} — {p.kind}
            </span>
          </div>
          <h3 id={`titolo-${p.id}`} tabIndex={-1} className="font-heading text-2xl font-bold leading-tight focus:outline-none md:text-4xl">
            {p.name}
          </h3>
          <p className="mt-1.5 font-semibold text-[color:var(--brand-ink)] dark:text-[color:var(--brand-ink-dark)] md:text-lg">{p.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-4 md:text-base [@media(max-height:500px)]:hidden [@media(min-width:768px)_and_(min-height:900px)]:line-clamp-none">
            {p.description}
          </p>
          <ul className="mt-4 hidden space-y-2 [@media(min-width:768px)_and_(min-height:740px)]:block">
            {p.highlights?.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={(e) => onOpen(p.hero, e.currentTarget)}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/50 bg-[color:var(--brand)]/10 px-4 py-2 text-sm font-semibold transition hover:bg-[color:var(--brand)]/20"
            >
              <Images className="h-4 w-4" />
              Guarda le schermate ({p.shots.length})
            </button>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground [@media(min-width:1280px)_and_(min-height:820px)]:block">
              {p.stack.slice(0, 4).join(" · ")}
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${p.color}55, transparent)` }}
          />
          <Showcase p={p} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Open>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openAt = (project: Project) => (index: number, el: HTMLElement) => {
    openerRef.current = el;
    setOpen({ project, index });
  };

  // ancore lungo il binario di scroll: #progetto-<id> porta alla fase giusta
  // (lo scroll fluido le raggiunge con offset -70px, da cui il piccolo
  // anticipo) e data-focus sposta poi il focus sul titolo della fase
  const rail = [...featured.map((p, i) => [p.id, FEATURED_RANGES[i][0]] as const), ["altri", OTHERS[0]] as const].map(
    ([id, from]) => (
      <div
        key={id}
        id={`progetto-${id}`}
        data-focus={`titolo-${id}`}
        aria-hidden
        className="absolute left-0 h-px w-px"
        style={{ top: `${(from + 0.085) * 100}%` }}
      />
    ),
  );

  return (
    <>
      <Scene id="cerbero" heightVh={HEIGHT_VH} rail={rail} fade={FADE}>
        {/* fase 1: intro con l'indice dei progetti */}
        <div data-from={INTRO[0]} data-to={INTRO[1]} className="absolute inset-0 flex items-center pt-16">
          <div className="container mx-auto px-4 text-center md:px-6">
            <Eyebrow className="justify-center [@media(max-height:500px)]:hidden">Casi studio</Eyebrow>
            <h2 className="mt-4 mb-5 font-heading text-4xl font-bold md:text-6xl [@media(max-height:500px)]:mt-0 [@media(max-height:500px)]:mb-4 [@media(max-height:500px)]:text-3xl">
              Software vero, schermate reali
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-foreground/80 md:mb-10 md:text-lg [@media(max-height:620px)]:hidden">
              Una piattaforma per il trasporto pubblico locale con il suo modulo flotta, un navigatore di linea e un
              servizio di prenotazione a chiamata. Accanto, gestionali su misura anche fuori dal TPL.
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {featured.map((p) => (
                <a
                  key={p.id}
                  href={`#progetto-${p.id}`}
                  style={brandVars(p)}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]/60 md:p-4"
                >
                  <span className="flex h-12 items-center md:h-14">
                    <ProjectLogo p={p} className="max-h-12 max-w-[120px] md:max-h-14" />
                  </span>
                  <span className="text-sm font-semibold">{p.name}</span>
                </a>
              ))}
            </div>
            <a
              href="#progetto-altri"
              aria-label={`Vai agli altri progetti: ${others.map((o) => o.name).join(", ")}`}
              className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/75 transition hover:text-accent-foreground dark:hover:text-primary md:text-xs"
            >
              e poi {others.map((o) => o.name).join(" · ")}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* fase 2: i quattro prodotti principali */}
        {featured.map((p, i) => (
          <div
            key={p.id}
            data-from={FEATURED_RANGES[i][0]}
            data-to={FEATURED_RANGES[i][1]}
            className="absolute inset-0 flex items-center pt-16"
          >
            <FeaturedCard p={p} n={i + 1} onOpen={openAt(p)} />
          </div>
        ))}

        {/* fase 3: gli altri progetti */}
        <div data-from={OTHERS[0]} data-to={OTHERS[1]} className="absolute inset-0 flex items-center pt-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-5 text-center md:mb-8">
              <Eyebrow className="justify-center">Altri progetti</Eyebrow>
              <h3 id="titolo-altri" tabIndex={-1} className="mt-3 font-heading text-2xl font-bold focus:outline-none md:text-4xl">
                Su misura, dove serve
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {others.map((p) => {
                const cover = p.shots[p.hero];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={(e) => openAt(p)(p.hero, e.currentTarget)}
                    aria-label={`Apri la galleria di ${p.name}`}
                    aria-describedby={`tagline-${p.id}`}
                    style={brandVars(p)}
                    className="group overflow-hidden rounded-2xl border border-border/60 bg-background/80 text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-[color:var(--brand)]/60"
                  >
                    <div className="relative overflow-hidden border-b border-border/60 [@media(max-height:500px)]:hidden">
                      <img
                        src={shotSrc(cover, cover.sizes[0])}
                        srcSet={shotSrcSet(cover)}
                        sizes="(min-width: 768px) 24vw, 46vw"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`block aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03] ${cover.kind === "mobile" ? "object-[50%_15%]" : "object-left-top"}`}
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        <ProjectLogo p={p} className="h-6 max-w-[96px] md:h-7" />
                        <span className="text-sm font-bold leading-tight md:text-base">{p.name}</span>
                      </div>
                      <p
                        id={`tagline-${p.id}`}
                        className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2 max-sm:hidden md:text-sm [@media(max-height:500px)]:hidden"
                      >
                        {p.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 text-center md:mt-8 [@media(max-height:620px)]:mt-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-semibold text-accent-foreground backdrop-blur-xl transition hover:gap-3 dark:text-primary md:text-base"
              >
                Hai un progetto simile in mente? Parliamone
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Scene>

      <ProjectGallery
        project={open?.project ?? null}
        startIndex={open?.index ?? 0}
        onClose={() => setOpen(null)}
        openerRef={openerRef}
      />
    </>
  );
}
