# Immagini per le inserzioni social

Immagini per le campagne a pagamento su Meta e LinkedIn, generate da un template HTML con Playwright (Chromium).
I testi delle inserzioni, i pubblici e gli URL con UTM sono in [COPY.md](COPY.md).

| Angolo | Feed 1:1 | Feed 4:5 | Stories/Reels 9:16 |
|---|---|---|---|
| `gestionali`: PMI, dal foglio Excel al gestionale su misura | `gestionali-feed-1080x1080.jpg` | `gestionali-feed-1080x1350.jpg` | `gestionali-story-1080x1920.jpg` |
| `tpl`: aziende di trasporto pubblico | `tpl-feed-1080x1080.jpg` | `tpl-feed-1080x1350.jpg` | `tpl-story-1080x1920.jpg` |
| `siti`: negozi e professionisti | `siti-feed-1080x1080.jpg` | `siti-feed-1080x1350.jpg` | `siti-story-1080x1920.jpg` |

Carosello `gestionali` (1080×1080): `gestionali-carousel-1…6-1080x1080.jpg`, cioè aggancio, problema, Sipario, CONDO.IT, Turni Volontari e CTA.

## Rigenerare

Dalla radice del repository:

```bash
npm i --no-save playwright        # una volta sola, se Playwright non è già installato
node marketing/creatives/src/render.mjs            # tutte le immagini
node marketing/creatives/src/render.mjs tpl siti   # solo quelle il cui nome contiene "tpl" o "siti"
```

- Chromium: lo script usa `/opt/pw-browsers/chromium` se esiste. Altrimenti imposta `CHROMIUM_PATH` oppure esegui `npx playwright install chromium`.
- Se Playwright è installato in un'altra cartella, impostala con `PLAYWRIGHT_DIR=/percorso/cartella`.
- Qualità JPG: `JPEG_QUALITY` (default 88).

## Struttura

- `src/creatives.mjs`: **qui si cambiano testi e immagini.** Ogni voce indica il nome del file, il formato (`sq`, `pt` o `st`), il tema (`dark`, `navy` o `light`), i testi e la posizione in px di browser e telefoni.
- `src/template.html`: layout e stile, con i colori del sito presi da `client/src/index.css` (arancio `#FF6E1A` su scuro e `#EB5200` su chiaro, nero caldo `#110F0D`, bianco caldo `#FCFBF9`), il marchio `<sf/>` e le cornici di browser, telefono e tablet.
- `src/fonts/`: Sora (titoli), Manrope (testo) e JetBrains Mono (marchio ed etichette), come sul sito. Sono salvati in locale (licenza OFL) e quindi non serve la rete; se mancano si usano i font di sistema.
- `src/render.mjs`: apre il template per ogni voce, attende font e immagini e salva il JPG in questa cartella.

Le schermate vengono da `client/public/assets/progetti/` e non sono copiate qui.

## Regole seguite

- Testo in italiano, dando del tu. Titolo di 7 parole al massimo, una riga di sottotitolo e un pulsante CTA. Testo sotto circa il 20% dell'immagine, contrasto alto.
- Stories: testi e CTA stanno tra y=250 e y=1670, lasciando liberi 250 px sopra e sotto.
- Si usano solo schermate con dati dimostrativi e fatti o numeri presenti in `projects-data.ts`. Niente prezzi, clienti o testimonianze.
- Nel sito di Beatrice l'indirizzo e il numero di telefono del negozio sono sfocati (`redact` in `creatives.mjs`). Non sono state usate le schermate del biglietto AG form, perché mostrano viso e nome di una persona reale.

## Foto profilo

`profilo-sf-dark-1080.jpg` e `profilo-sf-light-1080.jpg`: il marchio `<sf/>` centrato
su 1080×1080, per Instagram, Facebook e LinkedIn (resta intero nel ritaglio rotondo).
Font JetBrains Mono 800, arancio `#FF6E1A` sul nero e `#EB5200` sul chiaro, come nel sito.
