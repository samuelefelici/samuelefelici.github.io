# Video delle sezioni (Google Flow)

Carica qui i 7 video, con questi nomi esatti (l'ordine segue le sezioni in `client/src/App.tsx`):

| File             | Sezione del sito        |
| ---------------- | ----------------------- |
| `01-hero.mp4`    | Hero                    |
| `02-servizi.mp4` | Services                |
| `03-cerbero.mp4` | CerberoShowcase         |
| `04-perche-io.mp4` | WhyMe                 |
| `05-timeline.mp4`| Timeline                |
| `06-processo.mp4`| Process                 |
| `07-contatti.mp4`| Contact                 |

Formati opzionali con lo stesso nome base (se presenti vengono usati automaticamente):

- `NN-nome.webm` — versione più leggera, servita al posto dell'mp4 dove supportata
- `NN-nome.jpg` — poster mostrato prima dell'avvio del video

I video vengono riprodotti dal componente `client/src/components/SectionVideo.tsx`
(loop muto, avvio solo quando la sezione entra nel viewport). Se un file manca,
il componente semplicemente non mostra nulla: si può integrare il codice prima
di caricare i video.
