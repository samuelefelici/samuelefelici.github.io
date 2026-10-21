# Marketing e campagne a pagamento

Tutto quello che serve per sponsorizzare il sito: cosa c'è già nel codice, cosa
va attivato su Coolify e sulle piattaforme pubblicitarie, e come misurare.
Gli ID si incollano tutti in un solo posto: `client/src/lib/tracking.ts`.

## Il quadro

| Strumento | Dove gira | A cosa serve | Stato |
| --- | --- | --- | --- |
| Landing `/gestionali/`, `/tpl/`, `/siti/` | sito (GitHub Pages) | una pagina per pubblico, leggera, un solo obiettivo: il form | pronte |
| Umami | Coolify (`stats.samuelefelici.com`) | statistiche anonime senza cookie e senza banner: visite, UTM, eventi, funnel | attivo |
| Meta Pixel | Meta | Lead, Contact, ViewContent, Schedule; pubblici personalizzati | attivo (`1005756371856293`) |
| Meta Conversions API | n8n su Coolify | il Lead arriva a Meta anche quando il browser blocca il Pixel; deduplicato con `event_id` | attivo |
| Avviso a ogni richiesta | n8n su Coolify → Telegram | sai subito che è arrivato un contatto (l'email di Web3Forms resta) | attivo |
| Google Analytics 4 | Google | con consenso | attivo (`G-5YHCDZF5SE`) |
| Google Ads | Google | conversione "Lead" con Consent Mode v2 | mancano ID e etichetta |
| LinkedIn Insight Tag | LinkedIn | pubblico B2B (aziende TPL, PMI), conversione "Lead" | mancano gli ID |
| Prenotazione call | Cal.com cloud (`cal.com/samuelefelici/call-conoscitiva`) | "Prenota una call" apre il calendario invece del form | attivo |
| Pulsante WhatsApp | sito | contatto in un tocco, contato come evento `contact` | attivo (+39 334 126 5750) |
| Video leggero | sito | sotto i 1024 px: 5–9 MB invece di 39–67 MB | attivo |
| Recensioni dei clienti | sito + n8n su Coolify | solo chi riceve un link di invito può scriverla; si pubblica da sola | da attivare (sezione 3b) |
| Kit creatività | `marketing/creatives/` | immagini 1:1, 4:5 e 9:16 e testi per ogni campagna | pronto |

## Eventi misurati

Stessi nomi ovunque, così Umami, GA4 e Meta si leggono insieme.

| Evento | Quando | Meta | GA4 | Umami |
| --- | --- | --- | --- | --- |
| `lead` | form inviato con successo (con `source`: home, gestionali, tpl, siti) | `Lead` (+ CAPI) | `generate_lead` + conversione Ads | ✓ |
| `contact` | clic su telefono, email o WhatsApp (`method`) | `Contact` | ✓ | ✓ |
| `booking_click` | clic su "Prenota una call" (se c'è `bookingUrl`) | `Schedule` | ✓ | ✓ |
| `project_view` | apertura della galleria di un progetto (`project`) | `ViewContent` | ✓ | ✓ |
| `landing_view` | apertura di una landing (`landing`) | evento personalizzato | ✓ | ✓ |

Ogni richiesta dal form porta con sé la **provenienza** (UTM, `gclid`,
`fbclid`, `li_fat_id` o il sito di provenienza) e la **pagina**: la vedi
nell'email di Web3Forms e nell'avviso Telegram.

## 1. Umami (5 minuti)

L'istanza su Coolify esiste già (`stats.agform.it`, script rinominato `s.js`).

1. Pannello Umami → **Settings → Websites → Add website**: nome
   `samuelefelici.com`, dominio `samuelefelici.com`.
2. Copia il **Website ID** in `TRACKING.umami.websiteId`.
3. Facoltativo, consigliato: in Coolify aggiungi al servizio Umami il dominio
   `https://stats.samuelefelici.com` (campo *Domains*, separato da virgola),
   crea il record DNS A verso il server e cambia `TRACKING.umami.src` in
   `https://stats.samuelefelici.com/s.js`. Script sullo stesso dominio = meno
   blocchi degli adblocker.
4. In Umami: report **UTM** e **Attribution** per le campagne, **Funnel**
   `landing_view → lead`, **Goals** su `lead` e `contact`.

Umami è anonimo e senza cookie: parte senza consenso e misura anche chi
rifiuta il banner (di solito la maggioranza).

## 2. n8n: Conversions API di Meta e avviso Telegram

1. Coolify → **+ New → Service → n8n** (con PostgreSQL), dominio per esempio
   `https://n8n.samuelefelici.com`.
2. Variabili d'ambiente del servizio:
   - `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` (il workflow legge le variabili qui sotto)
   - `META_PIXEL_ID=1005756371856293`
   - `META_CAPI_TOKEN=` → Gestione eventi Meta → il Pixel → **Impostazioni →
     API Conversioni → Genera token di accesso**
   - `TELEGRAM_CHAT_ID=` → il tuo ID (scrivi a @userinfobot)
3. Crea un bot con @BotFather e aggiungi in n8n la credenziale **Telegram API**
   con il suo token.
4. **Import from file** → `docs/coolify/n8n-lead-workflow.json`; nel nodo
   *Avviso Telegram* scegli la credenziale; **Activate**.
5. Copia la **Production URL** del nodo *Webhook lead* (es.
   `https://n8n.samuelefelici.com/webhook/lead-sito`) in `TRACKING.leadWebhook`.
6. Prova: invia il form dal sito. Arriva il messaggio su Telegram; se hai
   accettato i cookie, in Gestione eventi → **Panoramica** il Lead compare
   come "Browser e server" e deduplicato.

Il workflow manda a Meta solo i lead con `marketing_consent: true` (cookie di
marketing accettati), con email, telefono e nome cifrati SHA-256 come chiede
Meta. Il webhook accetta richieste solo da `samuelefelici.com`.

**Avviso se il flusso si rompe** (consigliato): importa anche
`docs/coolify/n8n-error-workflow.json`, scegli nel nodo *Avviso errore* la
stessa credenziale Telegram e salva (non serve pubblicarlo). Poi apri il
flusso dei lead → `⋯` → **Settings** → **Error Workflow** → scegli
"Errori flussi → Telegram" → Save. Da quel momento, se un'esecuzione fallisce
(per esempio Meta rifiuta l'evento), ricevi su Telegram il nome del blocco,
il messaggio d'errore e il link all'esecuzione.

Estensioni utili sullo stesso n8n, quando servono: salvare i lead in un
foglio Google o in un CRM (Twenty si installa da Coolify), e ricevere le
prenotazioni di Cal.com via webhook.

## 3. Prenotazione call (Cal.com)

- **Su Coolify**: + New → Service → Cal.com (richiede PostgreSQL e un po' di RAM).
- **Oppure** Cal.com cloud, gratuito per un utente: meno manutenzione.

Crea un evento "Call conoscitiva, 30 minuti", collega il calendario e
incolla il link in `TRACKING.bookingUrl`: "Prenota una call" nel menu e
nelle landing aprirà il calendario, e ogni clic conta come `booking_click`
(`Schedule` per Meta).

## 3b. Recensioni dei clienti

A lavoro finito mandi al cliente un link personale; lui compila il form su
`samuelefelici.com/recensione/` e la recensione compare da sola sul sito
(home, prima dei Contatti, e nelle tre landing). Finché non ce n'è nessuna la
sezione non si vede.

Come funziona: il link contiene nome del cliente, progetto e una firma
(HMAC) che solo n8n sa calcolare, quindi nessuno può inventarsene uno; ogni
link vale una recensione sola. n8n aggiunge la recensione a
`client/src/data/recensioni.json` con un commit su GitHub, e il commit fa
ripartire la pubblicazione del sito (un paio di minuti).

Attivazione (una volta):

1. **Token GitHub**: GitHub → Settings → Developer settings → **Fine-grained
   tokens** → Generate new token. Repository access: solo
   `samuelefelici.github.io`; Permissions → Repository → **Contents: Read and
   write**. Scadenza a piacere (alla scadenza va rigenerato).
2. Coolify → servizio n8n → variabili d'ambiente:
   - `GITHUB_TOKEN_RECENSIONI=` il token del punto 1
   - `RECENSIONI_SECRET=` una stringa casuale lunga (per esempio da
     `openssl rand -hex 32`); se la cambi, i link già mandati smettono di valere
   Poi **Restart** del servizio.
3. n8n → **Import from file** → `docs/coolify/n8n-recensioni-workflow.json`.
   Nei nodi Telegram (*Messaggio al bot*, *Avviso Telegram*, *Manda il link*,
   *Spiega il comando*) scegli la credenziale del bot; in ⋯ → Settings →
   Error Workflow scegli "Errori flussi → Telegram"; **Publish/Activate**.

Usarlo: scrivi al tuo bot Telegram

```
/invito Mario Rossi | Sipario
```

e ti risponde con un messaggio già pronto da inoltrare al cliente (WhatsApp o
email). Quando la recensione arriva ricevi un avviso su Telegram.

Togliere o correggere una recensione: modifica
`client/src/data/recensioni.json` su GitHub (il link è nell'avviso
Telegram) e salva; il sito si aggiorna da solo.

Il codice dei nodi sta in `script/n8n-recensioni.mjs`: se lo modifichi,
rigenera il JSON con `node script/n8n-recensioni.mjs`.

## 4. Piattaforme pubblicitarie

### Meta (solo Instagram)

Tutto sta nel portfolio **Samuele Felici**: account pubblicitario
`249520031414677`, dataset `samuelefelici.com` (`1005756371856293`) e account
Instagram di lavoro **@samuelefelici.dev** (quello personale non va collegato).
Gli annunci girano **solo su Instagram**: nel gruppo di inserzioni scegli
**Posizionamenti manuali** e lascia solo Feed, Storie, Reel (ed Esplora) di
Instagram; togli Facebook, Messenger, Audience Network e Threads.


1. **Business Manager → Sicurezza del brand → Domini**: verifica
   `samuelefelici.com` con il record DNS TXT.
2. Gestione eventi: controlla che arrivino `PageView`, `ViewContent`,
   `Contact`, `Lead`.
3. Campagna con obiettivo **Contatti (Lead)**, luogo della conversione
   **Sito web**, evento **Lead**. Una campagna per landing.
4. Pubblici da creare subito:
   - visitatori del sito negli ultimi 180 giorni (retargeting)
   - chi ha aperto un progetto (`ViewContent`) negli ultimi 60 giorni
   - quando avrai almeno 100 lead: pubblico simile (lookalike) dei `Lead`
5. Creatività e testi pronti: `marketing/creatives/` e `marketing/creatives/COPY.md`.

### LinkedIn (adatto a TPL e PMI)

1. Campaign Manager → **Analizza → Insight Tag**: copia il *Partner ID* in
   `TRACKING.linkedinPartnerId`.
2. **Conversioni → Crea conversione**: tipo *Lead*, metodo *Event-specific*;
   copia l'ID in `TRACKING.linkedinLeadConversion`.
3. Campagna `/tpl/`: settore *Trasporti/Trasporto pubblico*, ruoli come
   responsabile esercizio, pianificazione, direttore d'esercizio.
   Campagna `/gestionali/`: titolari e direttori operativi di PMI.

### Google Ads

Crea una conversione **Lead** (sito web, configurazione manuale con
Google tag). Copia l'ID `AW-…` in `TRACKING.googleAds` e l'**etichetta** in
`TRACKING.googleAdsLead`. Consent Mode v2 è già attivo.

## 5. Link delle campagne (UTM)

Schema: `utm_source` = piattaforma, `utm_medium=paid_social` (o `cpc` per
Google), `utm_campaign` = pubblico, `utm_content` = nome della creatività.

```
https://samuelefelici.com/gestionali/?utm_source=meta&utm_medium=paid_social&utm_campaign=gestionali&utm_content=NOME_IMMAGINE
https://samuelefelici.com/tpl/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=tpl&utm_content=NOME_IMMAGINE
https://samuelefelici.com/siti/?utm_source=meta&utm_medium=paid_social&utm_campaign=siti&utm_content=NOME_IMMAGINE
```

Su Meta puoi usare i parametri dinamici nel campo *Parametri URL*:
`utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`.

## 6. Prima di accendere le campagne

- [ ] `websiteId` di Umami inserito, visite visibili in tempo reale
- [ ] n8n attivo, `leadWebhook` inserito, form di prova arrivato su Telegram
- [ ] Lead di prova visibile in Gestione eventi come browser + server
- [ ] dominio verificato su Meta
- [ ] ID LinkedIn e/o Google Ads inseriti (se usi quei canali)
- [ ] `bookingUrl` e `whatsapp` inseriti (facoltativi ma consigliati)
- [ ] le tre landing provate dal telefono, anche dentro il browser di Instagram
- [ ] informativa privacy riletta (meglio una revisione legale prima di
      spendere: elenca Meta, Google, LinkedIn, n8n e Umami)

## Cosa guardare ogni settimana

- **Costo per lead** per campagna e per creatività (Meta / LinkedIn).
- **Tasso di conversione** di ogni landing: `lead / landing_view` in Umami.
- **Provenienza** dei lead veri (email/Telegram): quali campagne portano
  richieste serie, non solo clic.
- Spegni le creatività con costo per lead doppio rispetto alla media dopo
  qualche migliaio di impressioni; duplica quelle che funzionano su nuovi
  pubblici.
