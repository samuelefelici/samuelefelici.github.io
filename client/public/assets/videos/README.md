# Video di sfondo scroll-driven (Google Flow)

Questi video sono lo **sfondo animato del sito**: `ScrollVideoLayer`
(`client/src/components/ScrollVideoLayer.tsx`) li mostra a tutto schermo
dietro al contenuto e ne aggancia il tempo di riproduzione allo scroll
(scrubbing). Ogni sezione ha il suo video; superata la sezione si passa al
successivo in dissolvenza.

| Nome base | Sezione (id) |
| --- | --- |
| `01-hero` | `#hero` |
| `02-servizi` | `#services` |
| `03-cerbero` | `#cerbero` |
| `04-perche-io` | `#about` |
| `05-timeline` | `#competenze` |
| `06-processo` | `#process` |
| `07-contatti` | `#contact` |

Per ogni scena servono tre file: `.webm` (VP9, servito ai browser moderni),
`.mp4` (H.264, fallback Safari) e `.jpg` (poster).

## Encoding: keyframe fitti obbligatori

Lo scrubbing fa seek continui: senza keyframe ravvicinati il browser deve
decodificare troppi frame a ogni salto e l'animazione scatta. Quando
sostituisci un video, ricodificalo così (partendo dal file esportato da
Flow):

```bash
# webm — keyframe ogni 8 frame
ffmpeg -i sorgente.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 -g 8 \
  -deadline good -cpu-used 4 -row-mt 1 NN-nome.webm

# mp4 fallback — keyframe ogni 12 frame
ffmpeg -i sorgente.mp4 -an -c:v libx264 -crf 24 -preset fast -g 12 \
  -movflags +faststart -pix_fmt yuv420p NN-nome.mp4

# poster
ffmpeg -i NN-nome.mp4 -frames:v 1 -q:v 3 NN-nome.jpg
```
