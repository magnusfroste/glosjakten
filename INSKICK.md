# Inskick – Glosjakten

| Fält | Värde |
|---|---|
| Titel | Glosjakten – engelska ord och bilder |
| Kort beskrivning | Hör och läs ett engelskt ord och peka på rätt bild. Nivå 1: ordet syns och läses upp, barnet pekar på bilden. Nivå 2: bilden syns, barnet pekar på rätt engelskt ord bland tre som stavas nästan likadant (cat – car – cap). Nivå 3: en enkel engelsk mening med en lucka, till exempel "I drink milk from a ___." Tjugofyra ord ur vardagen, tre nivåer, åtta ord per runda. Engelska åk 4–6, gratis och utan inloggning. |
| URL | https://glosjakten.shipholm.dev |
| Ämne / årskurs / typ / enhet | Språk / 3–6 / Öva / Alla enheter |
| Lgr22 | EN.4-6.1.1 – "Ämnesområden som är välbekanta för eleverna." · EN.4-6.2.1 – "Tydligt talad engelska och enkla texter som är instruerande, beskrivande och kontaktskapande, från olika medier." |
| Kortbild | `public/kort.png` (1200×900, nivå 3: "I ride my ___ to the park." med tre bilder) |
| Katalog-id | bbcc6d8a-c3f6-4611-9a29-477fb3489809 (status pending, bild `/images/3e9d3f7afe517289996fd868bfd27363.png`, curriculum satt, check_app 15/15) |
| Repo | github.com/magnusfroste/glosjakten @ 5a848d8 |

## Faktaunderlag

Orden är vanliga engelska nybörjarord: sol, måne, stjärna, moln, regn, träd, blomma, äpple, banan,
fisk, fågel, katt, hund, hus, bil, cykel, båt, boll, bok, klocka, kopp, hatt, sko, säng. Varje ord
har en svensk betydelse i appen ("sun – solen"), och varje mening är en enkel beskrivande eller
instruerande sats med exakt en lucka. Inga påståenden om världen som behöver en källa; det som
kontrolleras maskinellt är att rätt ord alltid är det enda rimliga svaret:
`node verify.mjs` prövar 180 000 genererade uppgifter och kontrollerar att meningen inte innehåller
något annat ord ur banken och att svaret inte redan står i meningen.

Källor: Skolverket, läroplanen för grundskolan (Lgr22), kursplanen i engelska – citerad ordagrant på
startskärmen under "Läroplanskoppling (Lgr22)".

## Kategorier

- Språk `187c640e-c43c-4e3b-ab02-248cf25b2472`
- 3–6 `96778e6a-30a9-4546-ac42-1882c6f96138`
- Öva `897f49cc-0333-4611-ade0-1017494deb42`
- Alla enheter `39d19ce9-f042-49e5-bbb0-b32a742e715c`