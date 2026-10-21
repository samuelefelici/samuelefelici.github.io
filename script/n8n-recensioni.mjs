// Genera docs/coolify/n8n-recensioni-workflow.json (node script/n8n-recensioni.mjs).
// Il codice dei nodi Code sta qui come funzioni normali, così si legge e si prova.
import { writeFileSync } from "node:fs";

const REPO = "samuelefelici/samuelefelici.github.io";
const FILE = "client/src/data/recensioni.json";
const SITO = "https://samuelefelici.com";

// --- nodi Code (corpo delle funzioni = codice incollato in n8n) ---

function controllaDati() {
  // Pulisce i campi del form e li controlla prima di qualunque altra cosa.
  const b = $input.first().json.body || {};
  const s = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
  const r = {
    c: s(b.c, 80),
    p: s(b.p, 80),
    t: s(b.t, 64).toLowerCase(),
    nome: s(b.nome, 80),
    ruolo: s(b.ruolo, 60),
    azienda: s(b.azienda, 80),
    voto: Math.round(Number(b.voto)),
    // il testo tiene gli a capo, ma non più di una riga vuota di fila
    testo: String(b.testo ?? "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, 800),
  };
  let errore = "";
  if (!r.c || !r.p || !/^[0-9a-f]{32}$/.test(r.t)) errore = "Il link di invito non è completo.";
  else if (!r.nome) errore = "Manca il nome.";
  else if (!(r.voto >= 1 && r.voto <= 5)) errore = "Scegli un voto da 1 a 5 stelle.";
  else if (r.testo.length < 30) errore = "La recensione deve avere almeno 30 caratteri.";
  return [{ json: { ...r, errore } }];
}

function aggiungiRecensione() {
  // Legge il file delle recensioni da GitHub, controlla che l'invito non sia
  // già stato usato e aggiunge la nuova recensione in cima.
  const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const toBytes = (str) => Array.from(unescape(encodeURIComponent(str)), (ch) => ch.charCodeAt(0));
  const fromBytes = (bytes) => {
    let bin = "";
    for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.slice(i, i + 8192));
    return decodeURIComponent(escape(bin));
  };
  function b64encode(str) {
    const b = toBytes(str);
    let out = "";
    for (let i = 0; i < b.length; i += 3) {
      const n = (b[i] << 16) | ((b[i + 1] ?? 0) << 8) | (b[i + 2] ?? 0);
      out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
      out += i + 1 < b.length ? B64[(n >> 6) & 63] : "=";
      out += i + 2 < b.length ? B64[n & 63] : "=";
    }
    return out;
  }
  function b64decode(s) {
    const clean = s.replace(/[^A-Za-z0-9+/]/g, "");
    const bytes = [];
    for (let i = 0; i < clean.length; i += 4) {
      const n = (B64.indexOf(clean[i]) << 18) | (B64.indexOf(clean[i + 1]) << 12) |
        ((B64.indexOf(clean[i + 2]) & 63) << 6) | (B64.indexOf(clean[i + 3]) & 63);
      bytes.push((n >> 16) & 255);
      if (clean[i + 2] !== undefined) bytes.push((n >> 8) & 255);
      if (clean[i + 3] !== undefined) bytes.push(n & 255);
    }
    return fromBytes(bytes);
  }

  const gh = $input.first().json;
  const r = $("Invito valido?").first().json;
  const lista = JSON.parse(b64decode(gh.content || "") || "[]");
  const id = r.t.slice(0, 12);
  if (lista.some((x) => x.id === id)) return [{ json: { usato: true } }];

  const oggi = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" });
  const nuova = { id, nome: r.nome, ruolo: r.ruolo, azienda: r.azienda, progetto: r.p, voto: r.voto, testo: r.testo, data: oggi };
  lista.unshift(nuova);
  return [{
    json: {
      usato: false,
      recensione: nuova,
      github: {
        message: `Recensione di ${r.nome} (${r.p})`,
        content: b64encode(JSON.stringify(lista, null, 2) + "\n"),
        sha: gh.sha,
        branch: "main",
      },
    },
  }];
}

function preparaInvito() {
  // "/invito Mario Rossi | Sipario" scritto al bot Telegram → dati dell'invito.
  const m = $input.first().json.message || {};
  const testo = String(m.text || "").replace(/^\/invito(@\S+)?\s*/i, "");
  const [c, p] = testo.split("|").map((x) => x.trim());
  const mio = String(m.chat?.id) === String($env.TELEGRAM_CHAT_ID);
  return [{ json: { mio, c: c || "", p: p || "", ok: mio && Boolean(c && p) } }];
}

function linkInvito() {
  const d = $input.first().json;
  const t = String(d.firma).slice(0, 32);
  const link = `${SITO}/recensione/?c=${encodeURIComponent(d.c)}&p=${encodeURIComponent(d.p)}&t=${t}`;
  return [{ json: { ...d, link } }];
}

// --- costruzione del workflow ---

const code = (fn, consts = {}) => {
  const head = Object.entries(consts).map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`).join("\n");
  const src = fn.toString();
  const body = src.slice(src.indexOf("{") + 1, src.lastIndexOf("}")).replace(/^\n/, "").replace(/^  /gm, "");
  return (head ? head + "\n" : "") + body.trimEnd();
};

const firma = (name, pos, value) => ({
  parameters: {
    action: "hmac",
    type: "SHA256",
    value,
    dataPropertyName: "firma",
    secret: "={{ $env.RECENSIONI_SECRET }}",
    encoding: "hex",
  },
  name, type: "n8n-nodes-base.crypto", typeVersion: 1, position: pos,
});

const ifNode = (name, pos, left, op) => ({
  parameters: {
    conditions: {
      options: { caseSensitive: true, typeValidation: "loose" },
      conditions: [{ id: `c-${name.length}-${pos[0]}`, leftValue: left, rightValue: op.right ?? "", operator: op.operator }],
      combinator: "and",
    },
    options: {},
  },
  name, type: "n8n-nodes-base.if", typeVersion: 2, position: pos,
});

const rispondi = (name, pos, status, body) => ({
  parameters: {
    respondWith: "json",
    responseBody: body,
    options: { responseCode: status },
  },
  name, type: "n8n-nodes-base.respondToWebhook", typeVersion: 1.1, position: pos,
});

const githubHeaders = {
  parameters: [
    { name: "Authorization", value: "=Bearer {{ $env.GITHUB_TOKEN_RECENSIONI }}" },
    { name: "Accept", value: "application/vnd.github+json" },
    { name: "X-GitHub-Api-Version", value: "2022-11-28" },
  ],
};
const fileUrl = `https://api.github.com/repos/${REPO}/contents/${FILE}`;

const nodes = [
  // ramo 1: il form del sito
  {
    parameters: {
      httpMethod: "POST",
      path: "recensione",
      responseMode: "responseNode",
      options: { allowedOrigins: "https://samuelefelici.com,https://www.samuelefelici.com" },
    },
    name: "Webhook recensione", type: "n8n-nodes-base.webhook", typeVersion: 2, position: [0, 0],
    webhookId: "5b1f3a2e-7c41-4d8e-9a60-2f3c9b7e1d01",
  },
  { parameters: { jsCode: code(controllaDati) }, name: "Controlla dati", type: "n8n-nodes-base.code", typeVersion: 2, position: [220, 0] },
  ifNode("Dati validi?", [440, 0], "={{ $json.errore }}", { operator: { type: "string", operation: "empty", singleValue: true } }),
  rispondi("Dati non validi", [660, 200], 400, "={{ JSON.stringify({ ok: false, errore: $json.errore }) }}"),
  firma("Firma invito", [660, 0], "={{ $json.c + '|' + $json.p }}"),
  ifNode("Invito valido?", [880, 0], "={{ $json.firma.slice(0, 32) === $json.t }}", { operator: { type: "boolean", operation: "true", singleValue: true } }),
  rispondi("Invito non valido", [1100, 200], 403, '={{ JSON.stringify({ ok: false, errore: "Questo link di invito non è valido: chiedimi un link nuovo." }) }}'),
  {
    parameters: {
      url: `=${fileUrl}?ref=main`,
      sendHeaders: true,
      headerParameters: githubHeaders,
      options: {},
    },
    name: "Leggi recensioni", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1100, 0],
  },
  { parameters: { jsCode: code(aggiungiRecensione) }, name: "Aggiungi recensione", type: "n8n-nodes-base.code", typeVersion: 2, position: [1320, 0] },
  ifNode("Invito già usato?", [1540, 0], "={{ $json.usato }}", { operator: { type: "boolean", operation: "true", singleValue: true } }),
  rispondi("Già usato", [1760, -200], 409, '={{ JSON.stringify({ ok: false, errore: "Con questo link è già stata lasciata una recensione. Per modificarla scrivimi a info@samuelefelici.com." }) }}'),
  {
    parameters: {
      method: "PUT",
      url: `=${fileUrl}`,
      sendHeaders: true,
      headerParameters: githubHeaders,
      sendBody: true,
      specifyBody: "json",
      jsonBody: "={{ JSON.stringify($json.github) }}",
      options: {},
    },
    name: "Pubblica sul sito", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1760, 0],
  },
  rispondi("Fatto", [1980, -100], 200, '={{ JSON.stringify({ ok: true }) }}'),
  {
    parameters: {
      chatId: "={{ $env.TELEGRAM_CHAT_ID }}",
      text: "=⭐ Nuova recensione pubblicata ({{ $('Aggiungi recensione').first().json.recensione.voto }}/5)\n👤 {{ $('Aggiungi recensione').first().json.recensione.nome }} · {{ $('Aggiungi recensione').first().json.recensione.progetto }}\n💬 {{ $('Aggiungi recensione').first().json.recensione.testo }}\n\nPer toglierla: " + `https://github.com/${REPO}/edit/main/${FILE}`,
      additionalFields: { appendAttribution: false },
    },
    name: "Avviso Telegram", type: "n8n-nodes-base.telegram", typeVersion: 1.2, position: [1980, 100],
  },

  // ramo 2: creare un invito scrivendo al bot "/invito Cliente | Progetto"
  {
    parameters: { updates: ["message"], additionalFields: {} },
    name: "Messaggio al bot", type: "n8n-nodes-base.telegramTrigger", typeVersion: 1.1, position: [0, 500],
    webhookId: "8d2c6e4a-1b5f-4c3e-8f7a-6e9d0c2b4a12",
  },
  { parameters: { jsCode: code(preparaInvito) }, name: "Leggi comando", type: "n8n-nodes-base.code", typeVersion: 2, position: [220, 500] },
  ifNode("Comando valido?", [440, 500], "={{ $json.ok }}", { operator: { type: "boolean", operation: "true", singleValue: true } }),
  firma("Firma link", [660, 400], "={{ $json.c + '|' + $json.p }}"),
  { parameters: { jsCode: code(linkInvito, { SITO }) }, name: "Crea link", type: "n8n-nodes-base.code", typeVersion: 2, position: [880, 400] },
  {
    parameters: {
      chatId: "={{ $env.TELEGRAM_CHAT_ID }}",
      text: "=Link per la recensione di {{ $json.c }} ({{ $json.p }}). Inoltralo al cliente:\n\nCiao {{ $json.c.split(' ')[0] }}, grazie ancora per aver lavorato con me! Se ti va, mi lasci due righe su com'è andata? Ci vuole un minuto: {{ $json.link }}",
      additionalFields: { appendAttribution: false, disable_web_page_preview: true },
    },
    name: "Manda il link", type: "n8n-nodes-base.telegram", typeVersion: 1.2, position: [1100, 400],
  },
  ifNode("È il mio account?", [660, 600], "={{ $json.mio }}", { operator: { type: "boolean", operation: "true", singleValue: true } }),
  {
    parameters: {
      chatId: "={{ $env.TELEGRAM_CHAT_ID }}",
      text: "Per creare un invito scrivi:\n/invito Nome Cliente | Progetto\n\nes. /invito Mario Rossi | Sipario",
      additionalFields: { appendAttribution: false },
    },
    name: "Spiega il comando", type: "n8n-nodes-base.telegram", typeVersion: 1.2, position: [880, 600],
  },
];

const link = (to) => ({ node: to, type: "main", index: 0 });
const connections = {
  "Webhook recensione": { main: [[link("Controlla dati")]] },
  "Controlla dati": { main: [[link("Dati validi?")]] },
  "Dati validi?": { main: [[link("Firma invito")], [link("Dati non validi")]] },
  "Firma invito": { main: [[link("Invito valido?")]] },
  "Invito valido?": { main: [[link("Leggi recensioni")], [link("Invito non valido")]] },
  "Leggi recensioni": { main: [[link("Aggiungi recensione")]] },
  "Aggiungi recensione": { main: [[link("Invito già usato?")]] },
  "Invito già usato?": { main: [[link("Già usato")], [link("Pubblica sul sito")]] },
  "Pubblica sul sito": { main: [[link("Fatto"), link("Avviso Telegram")]] },
  "Messaggio al bot": { main: [[link("Leggi comando")]] },
  "Leggi comando": { main: [[link("Comando valido?")]] },
  "Comando valido?": { main: [[link("Firma link")], [link("È il mio account?")]] },
  "Firma link": { main: [[link("Crea link")]] },
  "Crea link": { main: [[link("Manda il link")]] },
  "È il mio account?": { main: [[link("Spiega il comando")], []] },
};

const workflow = { name: "Recensioni sito", nodes, connections, settings: { executionOrder: "v1" } };
writeFileSync(new URL("../docs/coolify/n8n-recensioni-workflow.json", import.meta.url), JSON.stringify(workflow, null, 2) + "\n");
console.log(`ok: ${nodes.length} nodi`);

export { controllaDati, aggiungiRecensione, preparaInvito, linkInvito };
