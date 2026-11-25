// Kontrollerar ordbanken och uppgiftsgeneratorn i public/app.js:
//  – 24 ord med engelskt ord, svensk betydelse och grupp; inga dubbletter,
//  – en ritning i koden för varje ord (annars blir rutan tom),
//  – en mening för varje ord med exakt en lucka, och svaret står inte redan i meningen,
//  – meningen innehåller inget annat ord ur banken (annars finns två möjliga svar),
//  – nivå 2 har tre olika engelska ord, rätt ord finns med, inga dubbletter,
//  – nivå 1 och 3 har tre olika bilder, rätt bild finns med,
//  – generatorn ger rätt nivå, rätt svar, tre val, och aldrig samma ord två gånger i rad.
//   node verify.mjs
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./public/app.js", import.meta.url), "utf8");
const start = src.indexOf("var ORD =");
const slut = src.indexOf("SLUT DATA");
if (start < 0 || slut < 0) throw new Error("hittar inte den rena datadelen i app.js");
const ren = src.slice(start, src.lastIndexOf("/*", slut));
const G = eval("(function(){" + ren + "\nreturn {ORD, ORD_ID, MENING, LIKA, RUNDA};})()");

const ritBlock = src.slice(src.indexOf("var RITNING ="), src.indexOf("function bild("));
const ritade = new Set([...ritBlock.matchAll(/^\s{4}([a-z]+):\s*'/gm)].map((m) => m[1]));

let seed = 20261125;
Math.random = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

// generatorn kopieras in efter data-delen
const genKod = src.slice(src.indexOf("function slump("), src.indexOf("/* ------------------------------------------------------------------ *\n   * 6."));
const H = eval("(function(){" + ren + "\n" + genKod + "\nreturn {uppgift, bildVal, ordVal};})()");

let fel = 0;
const kolla = (c, m, p) => { if (!c) { fel++; if (fel <= 40) console.log("FEL", m, JSON.stringify(p)); } };

const ORD = G.ORD, IDS = G.ORD_ID;

kolla(IDS.length === 24, "antal ord", IDS.length);
kolla(new Set(IDS).size === IDS.length, "dubblett i ORD_ID", IDS);
kolla(Object.keys(ORD).length === IDS.length, "ORD och ORD_ID är olika stora", [Object.keys(ORD).length, IDS.length]);

const eng = new Set(), sve = new Set();
for (const id of IDS) {
  const o = ORD[id];
  kolla(!!o, "ord saknas i ORD", id);
  kolla(/^[a-z]+$/.test(o.en), "engelskt ord är inte bara små bokstäver", [id, o.en]);
  kolla(o.en === id, "id och engelskt ord skiljer sig", [id, o.en]);
  kolla(!eng.has(o.en), "engelskt ord dubbelt", o.en);
  kolla(!sve.has(o.sv), "svensk betydelse dubbel", o.sv);
  eng.add(o.en); sve.add(o.sv);
  kolla(typeof o.grupp === "string" && o.grupp.length > 0, "grupp saknas", id);
  kolla(ritade.has(id), "ingen ritning för ordet", id);
  kolla(ritade.size === IDS.length, "ritningar och ord är olika många", [ritade.size, IDS.length]);
}

// meningen: exakt en lucka, svaret står inte i meningen, inget annat ord ur banken finns med
for (const id of IDS) {
  const m = G.MENING[id];
  kolla(typeof m === "string", "mening saknas", id);
  if (typeof m !== "string") continue;
  const antal = (m.match(/___/g) || []).length;
  kolla(antal === 1, "meningen har inte exakt en lucka", [id, antal]);
  kolla(/^[A-Z]/.test(m), "meningen börjar inte med versal", [id, m]);
  kolla(/[.!?]$/.test(m), "meningen slutar inte med skiljetecken", [id, m]);
  const ord = m.toLowerCase().match(/[a-z]+/g) || [];
  kolla(!ord.includes(ORD[id].en), "svaret står redan i meningen", [id, m]);
  for (const annat of IDS) {
    if (annat === id) continue;
    if (ord.includes(ORD[annat].en)) kolla(false, "annat ord ur banken finns i meningen", [id, annat, m]);
  }
}

// nivå 2: minimala par
for (const id of IDS) {
  const l = G.LIKA[id];
  kolla(Array.isArray(l), "LIKA saknas", id);
  if (!Array.isArray(l)) continue;
  kolla(l[0] === ORD[id].en, "LIKA börjar inte med rätt ord", [id, l[0]]);
  kolla(new Set(l).size === l.length, "dubblett i LIKA", [id, l]);
  kolla(l.length >= 3, "LIKA har färre än tre ord", [id, l.length]);
  for (const w of l) kolla(/^[a-z]+$/.test(w), "felaktigt ord i LIKA", [id, w]);
}
kolla(Object.keys(G.LIKA).length === IDS.length, "LIKA täcker inte alla ord", Object.keys(G.LIKA).length);

// generatorn
for (let i = 0; i < 60000; i++) {
  const niva = 1 + (i % 3);
  const p = H.uppgift(niva, null);
  kolla(p.niva === niva, "fel nivå", p.niva);
  kolla(IDS.includes(p.ratt), "rätt svar finns inte", p.ratt);
  kolla(Array.isArray(p.val) && p.val.length === 3, "inte tre val", p.val);
  kolla(new Set(p.val).size === 3, "dubblett bland valen", p.val);
  if (niva === 2) {
    kolla(p.typ === "ord", "nivå 2 ska vara ordval", p.typ);
    kolla(p.val.includes(ORD[p.ratt].en), "rätt ord saknas bland valen", p);
    for (const w of p.val) kolla(/^[a-z]+$/.test(w), "ordvalet är inte ett engelskt ord", w);
  } else {
    kolla(p.typ === "bild", "bildnivå ska vara bildval", p.typ);
    kolla(p.val.includes(p.ratt), "rätt bild saknas bland valen", p);
    for (const id of p.val) kolla(!!ORD[id], "bildvalet är inget ord", id);
  }
  if (niva === 1) kolla(p.fraga.indexOf(ORD[p.ratt].en) >= 0, "nivå 1 skriver inte ordet", p.fraga);
  if (niva === 3) kolla(p.mening === G.MENING[p.ratt], "fel mening för ordet", p);

  const q = H.uppgift(niva, p.ratt);
  kolla(q.ratt !== p.ratt, "samma ord två gånger i rad", [p.ratt, q.ratt]);
}

// alla ord ska kunna bli rätt svar på alla nivåer
for (const niva of [1, 2, 3]) {
  const sedda = new Set();
  for (let i = 0; i < 20000; i++) sedda.add(H.uppgift(niva, null).ratt);
  kolla(sedda.size === IDS.length, "alla ord används inte på nivån", [niva, sedda.size]);
}

console.log(fel === 0 ? "\nOK – 24 ord, 24 ritningar, 24 meningar, 180 000 uppgifter kontrollerade, 0 fel." : "\n" + fel + " fel.");
process.exit(fel ? 1 : 0);