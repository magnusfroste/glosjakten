# Glosjakten – koncept

**Mål (en sak per app):** barnet ska koppla ihop ett engelskt ord med det det betyder, och till slut
förstå ordet inuti en enkel engelsk mening.

**Målgrupp:** engelska åk 4–6 (katalogband 3–6).

**Kärnmekanik (touch först):** ett ord i taget, tre stora tryckytor.
1. Ordet syns och läses upp på engelska → peka på bilden.
2. Bilden syns → peka på rätt engelskt ord bland tre som liknar varandra i stavning
   (cat – car – cap, ship finns inte med men well/…).
3. En enkel engelsk mening med en lucka ("I drink milk from a ___.") → peka på bilden.

**5-minuterssession:** en runda är 8 ord; tre nivåer; "Nästa nivå" och "Spela igen" i slutet.

**Belöning barnet kan berätta om:** antal stjärnor ("8 av 8") och de engelska ord det kan – appen
säger själv "berätta för en vuxen vilka engelska ord du kan nu".

**Vad barnet lär:** 24 vanliga engelska ord ur vardagen (hemmet, kroppen, maten, djuren, skolan),
att höra skillnad på ord som låter och stavas nästan likadant, och att läsa en kort engelsk mening
och förstå vilket ord som fattas.

**Lgr22:**
- EN.4-6.1.1 "Ämnesområden som är välbekanta för eleverna."
- EN.4-6.2.1 "Tydligt talad engelska och enkla texter som är instruerande, beskrivande och
  kontaktskapande, från olika medier."

**Varför det funkar på iPad:** en tumme, tre stora rutor, ingen text att knappa in, ingen
inloggning, inget som rullar. Ordet sägs på engelska och står samtidigt skrivet, så appen fungerar
också i ett klassrum där ljudet är avstängt.

## Testplan (mätbara krav)

| Krav | Mätning | Resultat |
|---|---|---|
| Allt ryms, ingen sidscroll | `scrollHeight-innerHeight` och `scrollWidth-innerWidth` = 0 i 1024×768, 768×1024, 390×844, 1440×900 | 0/0 i alla, på alla tre nivåer |
| Spelbart med bara fingrar | hela rundan med `Input.dispatchTouchEvent` | nivå 1: 8/8, nivå 2: 8/8, nivå 3: 8/8 |
| Tryckytor | minsta kortets höjd | 314 px (iPad liggande), 223 px (390×844), 80 px (ordkort på 390×844) |
| Svensk text i barnets nivå | läs igenom frågor och återkoppling | "Peka på bilden", "Inte det ordet…" – inga engelska instruktioner |
| Återkoppling + nytt försök | två avsiktliga fel | rätt bild lyser, meningen sägs, uppgiften flyttar vidare först efter andra felet, inget går förlorat |
| Ingen inloggning/reklam/länkar ut | granska HTML | inga konton, inga externa länkar, bara kodsnutten från skolappar.com |
| Korrekt fakta | alla 24 meningar och ord kontrollerade av `node verify.mjs` (180 000 uppgifter) | 0 fel |
| Fungerar med ljudet av | ljud av, nivå 3 | frågan står skriven: "A monkey likes to eat a ___." |

## Validering före bygge

Ingen separat agent fanns tillgänglig i denna körning, så valideringen gjordes som en egen hård
granskning mot de tre frågorna: (a) skulle ett barn spela 5 minuter? – ja, 8 ord per runda med
stigande svårighet och en tydlig belöning; (b) träffar det ett verkligt kunskapskrav? – ja,
EN.4-6.1.1 och EN.4-6.2.1, och engelska 4–6 var helt tomt i katalogen (0 av 76 appar);
(c) teknisk risk? – låg: statisk sida, inga bildfiler, allt ritas i SVG, ingen tredjepart.

## Iterationer efter test

1. **Spelet svarade inte alls på tryck** – `S.skarm` sattes aldrig till "spel" i `startaRunda`, så
   `valj()` returnerade direkt. Hittades bara för att rundan spelades med riktiga touch-händelser:
   åtta tryck gav `item: 0`. Rättat.
2. Liggande läge: bildrutorna var 314×643 med en kvadratisk bild i mitten – mest tom yta. Nu är
   rutan kvadratisk (`aspect-ratio: 1`) i liggande läge och bilden fyller den.
3. Nivå 2:s feltext sa "Inte den" om ett ord – nu "Inte det ordet…".
4. Efter rätt svar sägs nu "sun betyder solen" i stället för bara "solen", så det engelska ordet
   hörs en gång till.
5. Nivå 3 visade bara meningen; nu står också "Peka på bilden som saknas i meningen" under, så en
   vuxen som tittar på skärmen vet vad som förväntas utan att lyssna.