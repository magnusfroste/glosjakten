/* Glosjakten – engelska ord och bilder, engelska åk 4–6.

   Lgr22 EN.4-6.1.1: "Ämnesområden som är välbekanta för eleverna."
   Lgr22 EN.4-6.2.1: "Tydligt talad engelska och enkla texter som är instruerande,
   beskrivande och kontaktskapande, från olika medier."

   Ett ord i taget. Nivå 1: ordet visas och läses upp på engelska, barnet pekar på
   bilden. Nivå 2: bilden visas, barnet pekar på rätt engelskt ord bland tre.
   Nivå 3: en enkel engelsk mening med en lucka, barnet pekar på bilden som passar.
   Allt som sägs står också skrivet (många klassrum har ljudet avstängt).
   Fel svar kostar inget: Kotten funderar och barnet får en chans till.

   Orden är vanliga engelska nybörjarord (kroppen, hemmet, mat, djur, skolan).
   Inga påhittade ord; ingen översättning visas före svaret. */

(function () {
  "use strict";

  /* ================================================================== *
   * DATA – ren data, kontrollerad av verify.mjs                          *
   * ================================================================== */
  var ORD = {
    sun:    { en: "sun",    sv: "solen",   grupp: "himmel" },
    moon:   { en: "moon",   sv: "månen",   grupp: "himmel" },
    star:   { en: "star",   sv: "stjärnan", grupp: "himmel" },
    cloud:  { en: "cloud",  sv: "molnet",  grupp: "himmel" },
    rain:   { en: "rain",   sv: "regnet",  grupp: "himmel" },
    tree:   { en: "tree",   sv: "trädet",  grupp: "ute" },
    flower: { en: "flower", sv: "blomman", grupp: "ute" },
    apple:  { en: "apple",  sv: "äpplet",  grupp: "mat" },
    banana: { en: "banana", sv: "bananen", grupp: "mat" },
    fish:   { en: "fish",   sv: "fisken",  grupp: "djur" },
    bird:   { en: "bird",   sv: "fågeln",  grupp: "djur" },
    cat:    { en: "cat",    sv: "katten",  grupp: "djur" },
    dog:    { en: "dog",    sv: "hunden",  grupp: "djur" },
    house:  { en: "house",  sv: "huset",   grupp: "hem" },
    car:    { en: "car",    sv: "bilen",   grupp: "färd" },
    bike:   { en: "bike",   sv: "cykeln",  grupp: "färd" },
    boat:   { en: "boat",   sv: "båten",   grupp: "färd" },
    ball:   { en: "ball",   sv: "bollen",  grupp: "lek" },
    book:   { en: "book",   sv: "boken",   grupp: "skola" },
    clock:  { en: "clock",  sv: "klockan", grupp: "hem" },
    cup:    { en: "cup",    sv: "koppen",  grupp: "mat" },
    hat:    { en: "hat",    sv: "hatten",  grupp: "kläder" },
    shoe:   { en: "shoe",   sv: "skon",    grupp: "kläder" },
    bed:    { en: "bed",    sv: "sängen",  grupp: "hem" }
  };

  var ORD_ID = ["sun", "moon", "star", "cloud", "rain", "tree", "flower", "apple",
    "banana", "fish", "bird", "cat", "dog", "house", "car", "bike", "boat", "ball",
    "book", "clock", "cup", "hat", "shoe", "bed"];

  /* Nivå 3: en enkel mening per ord, med exakt en lucka. Meningen läses upp på
     engelska och skrivs ut; bilderna är svarsalternativ. */
  var MENING = {
    sun:    "The ___ is shining in the sky.",
    moon:   "At night the ___ is bright.",
    star:   "You can see a ___ twinkling at night.",
    cloud:  "A white ___ floats in the sky.",
    rain:   "The ___ falls from the sky.",
    tree:   "The ___ has green leaves.",
    flower: "This ___ smells nice.",
    apple:  "I eat a red ___ every day.",
    banana: "A monkey likes to eat a ___.",
    fish:   "A ___ swims in the water.",
    bird:   "A ___ can fly.",
    cat:    "The ___ says meow.",
    dog:    "The ___ says woof.",
    house:  "We live in a ___.",
    car:    "We drive to school in a ___.",
    bike:   "I ride my ___ to the park.",
    boat:   "A ___ sails on the sea.",
    ball:   "Throw the ___ to me.",
    book:   "I read a ___ before I sleep.",
    clock:  "The ___ shows what time it is.",
    cup:    "I drink milk from a ___.",
    hat:    "I wear a ___ on my head.",
    shoe:   "I put a ___ on my foot.",
    bed:    "I sleep in my ___."
  };

  /* Nivå 2: ord som liknar varandra i stavning eller betydelse. */
  var LIKA = {
    sun: ["sun", "son", "star"], moon: ["moon", "sun", "morning"],
    star: ["star", "stair", "sun"], cloud: ["cloud", "cold", "clock"],
    rain: ["rain", "train", "run"], tree: ["tree", "three", "free"],
    flower: ["flower", "floor", "flyer"], apple: ["apple", "able", "apply"],
    banana: ["banana", "bandana", "band"], fish: ["fish", "dish", "fist"],
    bird: ["bird", "bread", "beard"], cat: ["cat", "car", "cap"],
    dog: ["dog", "dot", "dig"], house: ["house", "horse", "mouse"],
    car: ["car", "cart", "card"], bike: ["bike", "bake", "book"],
    boat: ["boat", "coat", "boot"], ball: ["ball", "bell", "bill"],
    book: ["book", "look", "cook"], clock: ["clock", "clerk", "cloak"],
    cup: ["cup", "cap", "cop"], hat: ["hat", "hot", "hit"],
    shoe: ["shoe", "show", "shoes"], bed: ["bed", "bad", "bud"]
  };

  var RUNDA = 8;

  /* ================================================================== *
   * SLUT DATA                                                            *
   * ================================================================== */

  /* ------------------------------------------------------------------ *
   * 2. Kotten (samma figur som i familjen, fem uttryck)                  *
   * ------------------------------------------------------------------ */
  function kottenInner(uttryck) {
    var F = "#b07d4b", M = "#8a5f36", O = "#2b2118", mun, ogen = "", extra = "";
    if (uttryck === "hejar") { mun = '<path d="M22 36 q8 8 16 0" fill="none" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    else if (uttryck === "firar") {
      mun = '<path d="M21 34 q9 12 18 0" fill="#fff"/><path d="M21 34 q9 12 18 0" fill="none" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round"/>';
      extra = '<path d="M10 12 l3 6M50 12 l-3 6M30 6 v5" stroke="#e8a33d" stroke-width="2.2" stroke-linecap="round" fill="none"/>';
    }
    else if (uttryck === "tanker") { mun = '<path d="M24 37 h11" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>'; ogen = '<circle cx="46" cy="24" r="4" fill="none" stroke="' + M + '" stroke-width="1.6" opacity=".5"/>'; }
    else if (uttryck === "funderar") { mun = '<path d="M22 38 q8 -6 16 0" fill="none" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    else { mun = '<path d="M22 34 q8 8 16 0" fill="none" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    var oga = '<circle cx="23" cy="24" r="5.2" fill="#fff"/><circle cx="37" cy="24" r="5.2" fill="#fff"/>' +
      '<circle cx="24" cy="24.6" r="2.5" fill="' + O + '"/><circle cx="36" cy="24.6" r="2.5" fill="' + O + '"/>';
    return extra +
      '<path d="M30 6 q9 4 12 12 q9 12 4 24 q-4 12 -16 14 q-12 -2 -16 -14 q-5 -12 4 -24 q3 -8 12 -12z" fill="' + F + '"/>' +
      '<path d="M19 20 q11 -5 22 0M16 30 q14 -5 28 0M16 40 q14 -4 28 0" stroke="' + M + '" stroke-width="1.7" fill="none" opacity=".85" stroke-linecap="round"/>' +
      oga + ogen + mun;
  }
  function kottenSvg(uttryck, klass) {
    return '<svg class="' + (klass || "") + '" viewBox="0 0 60 60" aria-hidden="true">' + kottenInner(uttryck) + '</svg>';
  }

  /* ------------------------------------------------------------------ *
   * 3. Bilder, ritade i kod – 24 ord, en bild per ord                    *
   * ------------------------------------------------------------------ */
  var K = "#ffffff", B = "#2b5d8a", G = "#e8a33d", R = "#c9503f";
  var RITNING = {
    sun: '<circle cx="50" cy="50" r="20" fill="#f2b33d"/>' +
      '<g stroke="#f2b33d" stroke-width="6" stroke-linecap="round">' +
      '<path d="M50 12v10M50 78v10M12 50h10M78 50h10M23 23l7 7M70 70l7 7M77 23l-7 7M30 70l-7 7"/></g>',
    moon: '<circle cx="50" cy="50" r="27" fill="#f0d98a"/>' +
      '<circle cx="63" cy="43" r="24" fill="' + K + '"/>',
    star: '<polygon points="50,12 60,38 88,40 66,58 73,86 50,71 27,86 34,58 12,40 40,38" fill="' + G + '"/>',
    cloud: '<circle cx="36" cy="50" r="16" fill="#dfe7ec"/><circle cx="58" cy="44" r="20" fill="#dfe7ec"/>' +
      '<circle cx="70" cy="56" r="14" fill="#dfe7ec"/><rect x="36" y="52" width="38" height="18" rx="9" fill="#dfe7ec"/>',
    rain: '<circle cx="38" cy="42" r="13" fill="#dfe7ec"/><circle cx="56" cy="36" r="16" fill="#dfe7ec"/>' +
      '<circle cx="66" cy="46" r="11" fill="#dfe7ec"/><rect x="38" y="42" width="32" height="14" rx="7" fill="#dfe7ec"/>' +
      '<g stroke="#4f8fbf" stroke-width="5" stroke-linecap="round"><path d="M42 66l-4 10M56 66l-4 10M70 66l-4 10"/></g>',
    tree: '<rect x="44" y="62" width="12" height="26" rx="5" fill="#8a5f36"/>' +
      '<circle cx="50" cy="44" r="24" fill="#4f8f5b"/><circle cx="34" cy="56" r="15" fill="#4f8f5b"/>' +
      '<circle cx="66" cy="56" r="15" fill="#4f8f5b"/>',
    flower: '<path d="M50 52v34" stroke="#4f8f5b" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M50 72 q-16 -4 -20 8 q16 4 20 -8z" fill="#4f8f5b"/>' +
      '<g fill="#e07a8b"><circle cx="50" cy="26" r="11"/><circle cx="72" cy="40" r="11"/>' +
      '<circle cx="63" cy="64" r="11"/><circle cx="37" cy="64" r="11"/><circle cx="28" cy="40" r="11"/></g>' +
      '<circle cx="50" cy="46" r="10" fill="#f2b33d"/>',
    apple: '<circle cx="50" cy="58" r="26" fill="#cd4b3f"/>' +
      '<path d="M50 32 q2 -12 4 -16" stroke="#8a5f36" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M56 22 q16 -8 18 6 q-14 6 -18 -6z" fill="#4f8f5b"/>',
    banana: '<path d="M22 30 q6 42 48 44 q10 1 12 -6 q-34 -6 -42 -40 q-2 -6 -10 -4 q-8 2 -8 6z" fill="#f2ce4b" stroke="#d9b02f" stroke-width="3"/>',
    fish: '<ellipse cx="48" cy="52" rx="28" ry="17" fill="#4f8fbf"/>' +
      '<polygon points="20,52 4,38 4,66" fill="#3f7ba8"/>' +
      '<circle cx="64" cy="46" r="3.2" fill="#14181f"/><path d="M32 42 q8 -8 16 0" stroke="#3f7ba8" stroke-width="3" fill="none"/>',
    bird: '<circle cx="48" cy="50" r="22" fill="#5b8fd6"/><circle cx="38" cy="46" r="9" fill="#7aa8e6"/>' +
      '<polygon points="70,46 86,52 70,58" fill="#e8a33d"/>' +
      '<circle cx="60" cy="40" r="2.8" fill="#14181f"/><polygon points="24,52 8,42 12,60" fill="#3f6fa8"/>' +
      '<path d="M44 70 v8M56 70 v8" stroke="#e8a33d" stroke-width="4" stroke-linecap="round"/>',
    cat: '<polygon points="28,32 32,10 48,24" fill="#9a8a7a"/><polygon points="72,32 68,10 52,24" fill="#9a8a7a"/>' +
      '<circle cx="50" cy="52" r="26" fill="#b3a394"/>' +
      '<circle cx="40" cy="48" r="3.4" fill="#14181f"/><circle cx="60" cy="48" r="3.4" fill="#14181f"/>' +
      '<polygon points="50,56 46,61 54,61" fill="#c9503f"/>' +
      '<g stroke="#14181f" stroke-width="2" stroke-linecap="round"><path d="M50 62 q-6 6 -12 2M50 62 q6 6 12 2M26 54h-12M26 60h-12M74 54h12M74 60h12"/></g>',
    dog: '<ellipse cx="20" cy="48" rx="10" ry="20" fill="#7a5c3e"/><ellipse cx="80" cy="48" rx="10" ry="20" fill="#7a5c3e"/>' +
      '<circle cx="50" cy="50" r="26" fill="#a8815a"/>' +
      '<circle cx="40" cy="45" r="3.4" fill="#14181f"/><circle cx="60" cy="45" r="3.4" fill="#14181f"/>' +
      '<ellipse cx="50" cy="62" rx="11" ry="8" fill="#f0e2d2"/><circle cx="50" cy="58" r="4.6" fill="#14181f"/>' +
      '<path d="M50 62 v5" stroke="#14181f" stroke-width="2.4" stroke-linecap="round"/>',
    house: '<rect x="24" y="46" width="52" height="40" fill="#e8d3b0"/>' +
      '<polygon points="50,14 90,48 10,48" fill="#c9503f"/>' +
      '<rect x="58" y="62" width="14" height="24" fill="#8a5f36"/>' +
      '<rect x="30" y="56" width="14" height="13" fill="#8ec3e0"/>',
    car: '<rect x="12" y="46" width="76" height="26" rx="8" fill="#4f8fbf"/>' +
      '<path d="M30 46 l8 -14 h24 l8 14z" fill="#8ec3e0"/>' +
      '<circle cx="30" cy="74" r="9" fill="#2b3440"/><circle cx="70" cy="74" r="9" fill="#2b3440"/>' +
      '<circle cx="30" cy="74" r="3.6" fill="#c8cfd6"/><circle cx="70" cy="74" r="3.6" fill="#c8cfd6"/>',
    bike: '<circle cx="26" cy="66" r="17" fill="none" stroke="#2b3440" stroke-width="5"/>' +
      '<circle cx="74" cy="66" r="17" fill="none" stroke="#2b3440" stroke-width="5"/>' +
      '<path d="M26 66 L46 40 L66 66 M46 40 L74 66 M46 40 L60 40" stroke="#c9503f" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 40 h12" stroke="#2b3440" stroke-width="5" stroke-linecap="round"/>',
    boat: '<path d="M14 62 h72 l-14 20 h-44z" fill="#8a5f36"/>' +
      '<rect x="48" y="16" width="5" height="46" fill="#2b3440"/>' +
      '<polygon points="53,20 84,56 53,56" fill="#f5f0e6" stroke="#d9cfc0" stroke-width="2"/>' +
      '<path d="M8 84 q10 6 20 0 q10 6 20 0 q10 6 20 0 q10 6 20 0" stroke="#4f8fbf" stroke-width="4" fill="none"/>',
    ball: '<circle cx="50" cy="50" r="32" fill="#f5f0e6" stroke="#2b3440" stroke-width="4"/>' +
      '<polygon points="50,34 64,44 59,60 41,60 36,44" fill="#2b3440"/>' +
      '<path d="M50 18 v16M18 50 h18M82 50 h-18M32 76 l9 -16M68 76 l-9 -16" stroke="#2b3440" stroke-width="4"/>',
    book: '<path d="M50 30 q-18 -10 -34 -4 v46 q16 -6 34 4 q18 -10 34 -4 v-46 q-16 -6 -34 4z" fill="#f5f0e6" stroke="#2b3440" stroke-width="3"/>' +
      '<path d="M50 30 v46" stroke="#2b3440" stroke-width="3"/>' +
      '<g stroke="#b9ab92" stroke-width="2.4"><path d="M24 40 h18M24 50 h18M58 40 h18M58 50 h18"/></g>',
    clock: '<circle cx="50" cy="52" r="30" fill="#f5f0e6" stroke="#2b3440" stroke-width="4"/>' +
      '<path d="M50 52 V32 M50 52 l14 8" stroke="#2b3440" stroke-width="5" stroke-linecap="round"/>' +
      '<g stroke="#b9ab92" stroke-width="3" stroke-linecap="round"><path d="M50 26v4M50 74v4M24 52h4M72 52h4"/></g>' +
      '<rect x="42" y="16" width="16" height="6" rx="3" fill="#2b3440"/>',
    cup: '<path d="M22 34 h44 l-6 48 h-32z" fill="#f5f0e6" stroke="#2b3440" stroke-width="3"/>' +
      '<path d="M66 44 q18 0 18 14 q0 14 -18 14" fill="none" stroke="#2b3440" stroke-width="4"/>' +
      '<ellipse cx="44" cy="34" rx="22" ry="7" fill="#c9a27a"/>',
    hat: '<path d="M30 54 q0 -34 20 -34 q20 0 20 34z" fill="#4f8fbf"/>' +
      '<ellipse cx="50" cy="56" rx="36" ry="9" fill="#3f7ba8"/>' +
      '<rect x="28" y="44" width="44" height="8" rx="4" fill="#e8a33d"/>',
    shoe: '<path d="M10 68 q0 -14 18 -14 h20 q12 0 18 8 l16 6 q12 4 8 14 h-80z" fill="#8a5f36"/>' +
      '<path d="M10 76 h80 v8 h-80z" fill="#2b3440"/>' +
      '<g stroke="#f5f0e6" stroke-width="3" stroke-linecap="round"><path d="M32 58 l8 10M44 56 l8 10"/></g>',
    bed: '<rect x="10" y="28" width="10" height="58" rx="4" fill="#8a5f36"/>' +
      '<rect x="80" y="42" width="10" height="44" rx="4" fill="#8a5f36"/>' +
      '<rect x="16" y="58" width="70" height="16" rx="5" fill="#f5f0e6" stroke="#2b3440" stroke-width="3"/>' +
      '<rect x="22" y="46" width="24" height="14" rx="6" fill="#8ec3e0"/>' +
      '<path d="M46 50 h34 a6 6 0 0 1 6 6 v2 h-40z" fill="#c9a27a"/>'
  };

  function bild(id) {
    return '<svg viewBox="0 0 100 100" aria-hidden="true" class="ordbild">' + (RITNING[id] || "") + '</svg>';
  }

  /* ------------------------------------------------------------------ *
   * 4. Ljud – WebAudio och talsyntes, skapas vid första gesten           *
   * ------------------------------------------------------------------ */
  var ac = null, ljudPa = true;
  function ljud(frekvens, langd, typ) {
    if (!ljudPa) return;
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = typ || "sine"; o.frequency.value = frekvens;
      g.gain.value = 0.001; o.connect(g); g.connect(ac.destination);
      var t = ac.currentTime;
      g.gain.exponentialRampToValueAtTime(0.11, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + langd);
      o.start(t); o.stop(t + langd + 0.02);
    } catch (e) { }
  }
  function tal(text, sprak) {
    if (!ljudPa || !text) return;
          try { if (window.__rost && window.__rost(text, true)) return; } catch (e) { }
    try {
      if (!("speechSynthesis" in window)) return;
      var u = new SpeechSynthesisUtterance(text);
      u.lang = sprak || "sv-SE"; u.rate = sprak === "en-GB" ? 0.85 : 0.95; u.volume = 0.9;
      var roster = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      for (var i = 0; i < roster.length; i++) {
        if (roster[i].lang && roster[i].lang.toLowerCase().indexOf((sprak || "sv-SE").slice(0, 2)) === 0) { u.voice = roster[i]; break; }
      }
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    } catch (e) { }
  }
  function sag(text) { tal(text, "sv-SE"); }
  function sagEng(text) { tal(text, "en-GB"); }
  function spar(namn, varde) { try { if (window.skolappar && window.skolappar.event) window.skolappar.event(namn, varde); } catch (e) { } }

  /* ------------------------------------------------------------------ *
   * 5. Uppgifter                                                        *
   * ------------------------------------------------------------------ */
  var S = { niva: 1, item: 0, ratt: 0, fel: 0, p: null, klar: false, skarm: "start", pausad: false };

  function slump(n) { return Math.floor(Math.random() * n); }

  function blanda(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = slump(i + 1), t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }

  /* Tre bilder där en är rätt. Felbilderna kommer från samma grupp när det går,
     annars från hela listan, så att valet kräver att barnet kan ordet. */
  function bildVal(ratt) {
    var grupp = ORD[ratt].grupp;
    var nara = ORD_ID.filter(function (id) { return id !== ratt && ORD[id].grupp === grupp; });
    var langt = ORD_ID.filter(function (id) { return id !== ratt && ORD[id].grupp !== grupp; });
    var val = [ratt];
    if (nara.length) val.push(nara[slump(nara.length)]);
    var kvar = blanda(langt);
    while (val.length < 3 && kvar.length) { var k = kvar.pop(); if (val.indexOf(k) < 0) val.push(k); }
    return blanda(val);
  }

  /* Tre engelska ord där ett är rätt: minimala par (cat/car/cap) i nivå 2. */
  function ordVal(ratt) {
    var nara = (LIKA[ratt] || []).filter(function (w) { return w !== ORD[ratt].en; });
    var val = [ORD[ratt].en];
    var k = blanda(nara);
    while (val.length < 3 && k.length) { var w = k.pop(); if (val.indexOf(w) < 0) val.push(w); }
    var alla = blanda(ORD_ID).map(function (id) { return ORD[id].en; });
    while (val.length < 3 && alla.length) { var w2 = alla.pop(); if (val.indexOf(w2) < 0) val.push(w2); }
    return blanda(val);
  }

  function uppgift(niva, forra) {
    var id = ORD_ID[slump(ORD_ID.length)];
    if (forra && ORD_ID.length > 1) { var v = 0; while (id === forra && v++ < 40) id = ORD_ID[slump(ORD_ID.length)]; }
    if (niva === 1) return { niva: 1, ratt: id, fraga: "Peka på " + ORD[id].en, ord: ORD[id].en, typ: "bild", val: bildVal(id) };
    if (niva === 2) return { niva: 2, ratt: id, fraga: "Vilket ord passar?", ord: ORD[id].en, typ: "ord", val: ordVal(id) };
    return { niva: 3, ratt: id, fraga: "Peka på ordet som saknas", mening: MENING[id], ord: ORD[id].en, typ: "bild", val: bildVal(id) };
  }

  /* ------------------------------------------------------------------ *
   * 6. Ruta och återkoppling                                            *
   * ------------------------------------------------------------------ */
  function el(id) { return document.getElementById(id); }

  function ritaFraga() {
    var p = S.p;
    if (!p) return;
    if (p.niva === 3) {
      el("fraga").innerHTML = '<span class="mening">' + p.mening.replace("___", '<span class="lucka">___</span>') +
        '</span><span class="fraga-sv">Peka på bilden som saknas i meningen</span>';
    } else if (p.niva === 2) {
      el("fraga").innerHTML = '<span class="fraga-ord">Vilket ord passar?</span><span class="fraga-sv">Peka på det engelska ordet för bilden.</span>';
    } else {
      el("fraga").innerHTML = '<span class="fraga-ord">' + p.ord + '</span><span class="fraga-sv">Peka på bilden</span>';
    }
  }

  function ritaBrada() {
    var p = S.p, b = el("brada");
    b.innerHTML = "";
    if (p.niva === 2) {
      /* bilden stor, tre ord */
      var v = document.createElement("div");
      v.className = "uppgiftsbild";
      v.innerHTML = bild(p.ratt);
      b.appendChild(v);
      var rad = document.createElement("div");
      rad.className = "ordrad";
      p.val.forEach(function (w) {
        var kn = document.createElement("button");
        kn.className = "kort ordkort";
        kn.type = "button";
        kn.dataset.val = w;
        kn.textContent = w;
        kn.setAttribute("aria-label", "Ordet " + w);
        kn.addEventListener("click", function () { valj(w); });
        rad.appendChild(kn);
      });
      b.appendChild(rad);
    } else {
      var grid = document.createElement("div");
      grid.className = "kortrad";
      p.val.forEach(function (id) {
        var kn = document.createElement("button");
        kn.className = "kort bildkort";
        kn.type = "button";
        kn.dataset.val = id;
        kn.innerHTML = bild(id);
        kn.setAttribute("aria-label", "Bild " + (ORD[id] ? ORD[id].sv : id));
        kn.addEventListener("click", function () { valj(id); });
        grid.appendChild(kn);
      });
      b.appendChild(grid);
    }
  }

  function ritaStjarnor() {
    var s = "";
    for (var i = 0; i < RUNDA; i++) s += i < S.ratt ? "★" : "☆";
    el("stjarnor").textContent = s;
    el("stjarnor").setAttribute("aria-label", S.ratt + " av " + RUNDA + " rätt");
  }

  function ritaPrickar() {
    var h = "";
    for (var i = 0; i < RUNDA; i++) h += "<i" + (i < S.item ? ' class="klar"' : "") + "></i>";
    el("prickar").innerHTML = h;
  }

  function ritaSvar(text) { el("svar").textContent = text || ""; }

  function kottenByt(uttryck) {
    var k = el("kotten");
    if (k) k.innerHTML = kottenSvg(uttryck);
  }

  function markera(varde, klass) {
    var kort = el("brada").querySelectorAll(".kort");
    for (var i = 0; i < kort.length; i++) {
      if (kort[i].dataset.val === varde) kort[i].classList.add(klass);
    }
  }

  function rättSvarText(p) {
    var o = ORD[p.ratt];
    if (p.niva === 3) return o.en + " – " + o.sv;
    return o.en + " – " + o.sv;
  }

  function valj(varde) {
    if (S.skarm !== "spel" || S.klar || S.pausad || !S.p) return;
    var p = S.p;
    var ratt = p.niva === 2 ? ORD[p.ratt].en : p.ratt;
    if (varde === ratt) {
      S.ratt++; S.item++;
      markera(varde, "ratt");
      kottenByt("firar");
      ljud(780, 0.14, "sine");
      setTimeout(function () { ljud(1040, 0.18, "sine"); }, 130);
      ritaSvar(rättSvarText(p) + " ✓");
      sag(ORD[p.ratt].en + " betyder " + ORD[p.ratt].sv + ".");
      ritaStjarnor(); ritaPrickar();
      setTimeout(function () {
        if (S.item >= RUNDA) { rundaKlar(); return; }
        nyUppgift();
      }, 1150);
    } else {
      S.fel++;
      markera(varde, "fel");
      kottenByt("funderar");
      ljud(190, 0.16, "triangle");
      ritaSvar(p.niva === 2 ? "Inte det ordet. Titta på bilden och försök en gång till." : "Inte den bilden. Lyssna igen och försök en gång till.");
      sag(p.niva === 2 ? "Inte det ordet. Försök en gång till." : "Inte den bilden. Försök en gång till.");
      spar("hint");
      setTimeout(function () {
        if (S.klar) return;
        if (S.fel >= 2) {
          markera(ratt, "ratt");
          kottenByt("tanker");
          sag("Det här är " + ORD[p.ratt].sv + ".");
          ritaSvar("Rätt är " + rättSvarText(p) + ". Kotten visar.");
          setTimeout(function () {
            S.item++; S.fel = 0;
            if (S.item >= RUNDA) { rundaKlar(); return; }
            nyUppgift();
          }, 1800);
        } else {
          kottenByt("glad");
          sag(p.niva === 3 ? p.mening.replace("___", p.ord) : p.ord);
        }
      }, 900);
    }
  }

  function visaOverlay(titel, text, knapptext, vidare, medNiva) {
    var ov = el("overlay");
    el("ov-bild").innerHTML = kottenSvg("firar");
    el("ov-titel").textContent = titel;
    el("ov-text").textContent = text;
    var b = el("ov-nasta");
    b.textContent = knapptext;
    b.onclick = function () { ov.hidden = true; vidare(); };
    var n = el("ov-niva");
    n.hidden = !medNiva;
    n.onclick = function () { ov.hidden = true; startaRunda(S.niva + 1); };
    ov.hidden = false;
  }

  function rundaKlar() {
    S.klar = true; S.pausad = true;
    sag(S.ratt + " av " + RUNDA + " rätt.");
    spar("round_done", Math.round(S.ratt / RUNDA * 100));
    if (S.niva < 3) {
      visaOverlay(S.ratt + " av " + RUNDA + " rätt", "Bra jobbat! Nu blir det lite svårare – orden står med bokstäver.", "Nästa nivå", function () { startaRunda(S.niva + 1); }, false);
    } else {
      visaOverlay(S.ratt + " av " + RUNDA + " rätt", "Du har klarat alla tre nivåerna. Berätta för en vuxen vilka engelska ord du kan nu!", "Spela igen", function () { startaRunda(1); }, false);
    }
  }

  function nyUppgift() {
    S.fel = 0; S.klar = false; S.pausad = false;
    var p = uppgift(S.niva, S.p ? S.p.ratt : null);
    S.p = p;
    ritaFraga(); ritaBrada(); ritaPrickar(); ritaStjarnor();
    kottenByt("glad"); ritaSvar("");
    if (S.niva === 1) setTimeout(function () { if (S.p === p && !S.klar) sagEng(p.ord); }, 350);
    if (S.niva === 3) setTimeout(function () { if (S.p === p && !S.klar) sagEng(p.mening.replace("___", "hmm")); }, 350);
    if (S.niva === 2) setTimeout(function () { if (S.p === p && !S.klar) sag("Vilket ord passar?"); }, 350);
  }

  function startaRunda(niva) {
    S.niva = Math.min(3, Math.max(1, niva)); S.item = 0; S.ratt = 0; S.fel = 0; S.p = null; S.klar = false; S.skarm = "spel";
    el("startskarm").hidden = true;
    el("spel").hidden = false;
    el("overlay").hidden = true;
    spar("round_start"); spar("level", S.niva);
    if (S.niva === 2) setTimeout(function () { sag("Nu ser du bilden. Peka på det engelska ordet som passar."); }, 1500);
    if (S.niva === 3) setTimeout(function () { sag("Nu är det en mening med ett ord som saknas. Peka på bilden som passar."); }, 1500);
    nyUppgift();
  }

  function tipsa() {
    if (S.skarm !== "spel" || S.klar || !S.p) return;
    var p = S.p;
    if (p.niva === 2) sag("Vilket ord passar? " + p.ord);
    else if (p.niva === 3) sagEng(p.mening.replace("___", p.ord));
    else sagEng(p.ord);
    spar("hint");
    kottenByt("tanker");
    setTimeout(function () { if (!S.klar) kottenByt("glad"); }, 2200);
  }

  function ritaLjudIkon() {
    el("ljudikon").innerHTML = ljudPa
      ? '<path d="M4 9h3l4-3v12l-4-3H4z"/><path d="M15 8a5 5 0 0 1 0 8"/>'
      : '<path d="M4 9h3l4-3v12l-4-3H4z"/><path d="M15 9l5 6M20 9l-5 6"/>';
  }

  function bind() {
    el("spela").addEventListener("click", function () { ljud(600, 0.1); startaRunda(1); });
    el("hjalp").addEventListener("click", tipsa);
    el("ljud").addEventListener("click", function () {
      ljudPa = !ljudPa;
      if (!ljudPa && "speechSynthesis" in window) { try { window.speechSynthesis.cancel(); } catch (e) { } }
      ritaLjudIkon(); spar("sound_off");
    });
    document.addEventListener("keydown", function (e) {
      if (S.skarm !== "spel" || S.klar || !S.p) return;
      if (e.key >= "1" && e.key <= "3") {
        var kort = el("brada").querySelectorAll(".kort");
        var i = Number(e.key) - 1;
        if (kort[i]) kort[i].click();
      }
      if (e.key === "h" || e.key === "?") tipsa();
      if (e.key === " ") { e.preventDefault(); tipsa(); }
    });
  }

  function init() {
    bind(); ritaLjudIkon(); ritaStjarnor(); ritaPrickar(); kottenByt("glad");
    S.skarm = "spel";
    window.__game = {
      S: S, ORD: ORD, ORD_ID: ORD_ID, MENING: MENING, LIKA: LIKA, RUNDA: RUNDA,
      uppgift: uppgift, valj: valj, startaRunda: startaRunda, nyUppgift: nyUppgift,
      ritaBrada: ritaBrada, ritaFraga: ritaFraga, bildVal: bildVal, ordVal: ordVal,
      tipsa: tipsa, rundaKlar: rundaKlar
    };
    S.skarm = "start";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();