# Video di sfondo scroll-driven (Google Flow)

Lo sfondo del sito è **un unico video master** (`master.webm` / `master.mp4` +
poster `master.jpg`): i 7 filmati delle scene, in 720p, concatenati con
dissolvenze di 0,5 s già renderizzate nel file. `ScrollVideoLayer` mappa ogni
scena su un segmento temporale del master e ne muove `currentTime` con lo
scroll; le transizioni tra scene avvengono *dentro* il video, senza costi a
runtime.

## Mappa dei segmenti (secondi nel master)

| Scena | Sorgente | Tratto "solo" |
| --- | --- | --- |
| `#hero` | `01-hero.mp4` | 0 – 9,5 |
| `#services` | `02-servizi.mp4` | 10 – 19 |
| `#cerbero` | `03-cerbero.mp4` | 19,5 – 28,5 |
| `#about` | `04-perche-io.mp4` | 29 – 38 |
| `#competenze` | `05-timeline.mp4` | 38,5 – 47,5 |
| `#process` | `06-processo.mp4` | 48 – 57 |
| `#contact` | `07-contatti.mp4` | 57,5 – 66,9 |

Tra un tratto e il successivo c'è la finestra di dissolvenza da 0,5 s.
Se cambi durate o numero di clip, aggiorna `SEGMENTS` in
`client/src/components/ScrollVideoLayer.tsx`.

I file `01-*.mp4` … `07-*.mp4` sono le sorgenti originali esportate da
Google Flow (1080p): servono solo per rigenerare il master.

## Rigenerare il master

Con i 7 mp4 sorgente in questa cartella:

```bash
# 1) concatenazione con dissolvenze, 720p, intermedio ad alta qualità
ffmpeg -i 01-hero.mp4 -i 02-servizi.mp4 -i 03-cerbero.mp4 -i 04-perche-io.mp4 \
  -i 05-timeline.mp4 -i 06-processo.mp4 -i 07-contatti.mp4 -filter_complex "\
[0:v]scale=1280:720,fps=24,format=yuv420p[v0];[1:v]scale=1280:720,fps=24,format=yuv420p[v1];\
[2:v]scale=1280:720,fps=24,format=yuv420p[v2];[3:v]scale=1280:720,fps=24,format=yuv420p[v3];\
[4:v]scale=1280:720,fps=24,format=yuv420p[v4];[5:v]scale=1280:720,fps=24,format=yuv420p[v5];\
[6:v]scale=1280:720,fps=24,format=yuv420p[v6];\
[v0][v1]xfade=transition=fade:duration=0.5:offset=9.5[x1];\
[x1][v2]xfade=transition=fade:duration=0.5:offset=19[x2];\
[x2][v3]xfade=transition=fade:duration=0.5:offset=28.5[x3];\
[x3][v4]xfade=transition=fade:duration=0.5:offset=38[x4];\
[x4][v5]xfade=transition=fade:duration=0.5:offset=47.5[x5];\
[x5][v6]xfade=transition=fade:duration=0.5:offset=57[out]" \
  -map "[out]" -an -c:v libx264 -crf 16 -preset fast -g 12 master-src.mp4

# 2) versioni web con keyframe fitti (indispensabili per lo scrubbing)
ffmpeg -i master-src.mp4 -an -c:v libvpx-vp9 -crf 33 -b:v 0 -g 8 \
  -deadline good -cpu-used 4 -row-mt 1 master.webm
ffmpeg -i master-src.mp4 -an -c:v libx264 -crf 23 -preset slow -g 12 \
  -movflags +faststart -pix_fmt yuv420p master.mp4
ffmpeg -i master-src.mp4 -frames:v 1 -q:v 3 master.jpg

rm master-src.mp4
```
