# samuelefelici.com — GitHub Pages

## Struttura
- index.html
- css/styles.css
- js/main.js
- assets/cv.pdf (carica qui il tuo CV)
- sitemap.xml
- robots.txt
- CNAME

## Pubblicazione su GitHub Pages
1. Crea un repo su GitHub (es: `samuelefelici.github.io` oppure `samuelefelici.com`)
2. Carica questi file nella root del repo
3. Vai su **Settings → Pages**
4. In **Build and deployment** seleziona:
   - Source: Deploy from a branch
   - Branch: main / root
5. Attendi che GitHub Pages pubblica il sito

## Dominio personalizzato
1. In **Settings → Pages → Custom domain**, inserisci: `samuelefelici.com`
2. Assicurati che il file `CNAME` contenga `samuelefelici.com`
3. Nel pannello DNS del dominio crea:
   - 4 record A verso GitHub Pages:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - record CNAME `www` → `samuelefelici.github.io` (opzionale)

## CV
Sostituisci `assets/cv.pdf` con il tuo file reale (stesso nome).
