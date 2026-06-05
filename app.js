




const STATUSES = ['Ikke startet','Pågår','Til review','Ferdig','Blokkert'];
const FREDAG_PCTS = (function(){ var a=['']; for(var i=0;i<=100;i+=5) a.push(i+'%'); return a; })();
const STATUS_COLORS = {
  'Ikke startet': {bg:'var(--gray-bg)',  color:'var(--gray)'},
  'Pågår':        {bg:'var(--amber-bg)', color:'var(--amber)'},
  'Til review':   {bg:'var(--blue-bg)',  color:'var(--blue)'},
  'Ferdig':       {bg:'var(--green-bg)', color:'var(--green)'},
  'Blokkert':     {bg:'var(--red-bg)',   color:'var(--red)'}
};
const STATUS_BAR = {
  'Ikke startet':'#B4B2A9','Pågår':'#EF9F27','Til review':'#378ADD','Ferdig':'#1D9E75','Blokkert':'#E24B4A'
};

const SECTIONS_DATA = {"0 Generell": {"": [{"id": "GEN-00-1", "name": "Pris for tilbudsfase"}, {"id": "GEN-00-2", "name": "Fremdriftsplan I tilbudsfase"}, {"id": "GEN-00-3", "name": "Gjennomgang av veilinje"}, {"id": "GEN-00-4", "name": "Fremdriftsplan"}, {"id": "GEN-00-5", "name": "Pris for prosjektering"}, {"id": "GEN-00-6", "name": "Søknader-liste"}, {"id": "GEN-00-7", "name": "CV for nøkkelpersonell"}, {"id": "GEN-00-8", "name": "Beslutnigsnotater"}]}, "1 Sprengning og masseflytting": {"1. Mengder": [{"id": "FAG-01-11", "name": "m³ sprengning (fast berg)\nm³ løsmasser (jord, morene, myr etc.)\nm³ overmasser (avdekking)\nMassebalanse: overskudd / underskudd (m³)"}], "2. Berg og sprengningsforhold": [{"id": "FAG-01-21", "name": "Bergtype / hardhet\nAndel dårlig berg (%)"}, {"id": "FAG-01-23", "name": "Oppsprekking / svakhetssoner"}, {"id": "FAG-01-24", "name": "Krav til sprengning:\n-  kontursprengning (ja/nei)\n- restriksjoner (vibrasjon, nærhet til bygg)"}], "3. Geometri og uttak": [{"id": "FAG-01-31", "name": "Skjæringshøyder og lengder"}, {"id": "FAG-01-32", "name": "Pallhøyder (hvis aktuelt)"}, {"id": "FAG-01-33", "name": "Helninger i skjæring"}], "4. Løsmasser": [{"id": "FAG-01-41", "name": "Type masser (jord / leire / myr / blokk)\nOmfang per massetype (m³)\nBehov for masseutskifting/stabilisering"}], "5. Massehåndtering og transport": [{"id": "FAG-01-51", "name": "Andel masser til gjenbruk/deponi"}, {"id": "FAG-01-52", "name": "Krav til deponi plassering/evt.miljøkrav"}], "6. Oppfylling og gjenbruk": [{"id": "FAG-01-61", "name": "m³ masser til fylling"}, {"id": "FAG-01-62", "name": "Krav til massetyper (sprengstein / kult / jord)"}, {"id": "FAG-01-63", "name": "Krav til lagvis oppbygging og komprimering"}], "7. Midlertidige arbeider": [{"id": "FAG-01-71", "name": "Rigg og adkomst for masseflytting"}, {"id": "FAG-01-72", "name": "Midlertidige masselagre"}, {"id": "FAG-01-73", "name": "Håndtering av vann i skjæring"}], "8. Usikkerheter": [{"id": "FAG-01-81", "name": "Hva som ikke er prosjektert"}, {"id": "FAG-01-82", "name": "Variasjon i berg/løsmasser"}, {"id": "FAG-01-83", "name": "Uavklarte deponiløsninger"}]}, "2 Tunneler": {"1. Vurdering av veilinja- optimaliseringsmuligheter": [{"id": "FAG-02-11", "name": "Plan og lengdeprofil (hele tunnelen)"}, {"id": "FAG-02-12", "name": "Vurdering av plassering av lavbrekk og høybrekk"}, {"id": "FAG-02-13", "name": "Tverrfall og stigning"}, {"id": "FAG-02-14", "name": "Antall og plassering:\n-\tPortaler\n-\thavarinisjer \n-\tstopplommer\n-\t tekniske bygg\n-\t Tverrforbindelser\n-\t SOS-kiosker"}], "2. Ingeniørgeologi – vurdering": [{"id": "FAG-02-21", "name": "Ingeniørgeologisk rapport- gjennomgang og vurdering"}, {"id": "FAG-02-22", "name": "Bergkvalitet langs hele traseen (Q/RMR)"}, {"id": "FAG-02-23", "name": "Sonekart (svakhetssoner)"}, {"id": "FAG-02-24", "name": "Vanninntrenging (mengder/soner)"}, {"id": "FAG-02-25", "name": "Overdekning"}], "3. Sikring og vann-/frostsikring": [{"id": "FAG-02-31", "name": "Sikringsklasser (fordelt på lengder)"}, {"id": "FAG-02-32", "name": "Omfang injeksjon (for-/etterinjeksjon)"}, {"id": "FAG-02-33", "name": "Vann- og frostsikring:\n- type (membran/PE-skum)\n- drenssystem/omfang"}], "4. Vann og drenering": [{"id": "FAG-02-41", "name": "Forventede vannmengder inn i tunnel"}, {"id": "FAG-02-42", "name": "Drenssystem og føring ut (prinsipp + omfangt)"}, {"id": "FAG-02-43", "name": "Håndtering av vann i anleggsfase"}, {"id": "FAG-02-44", "name": "Plassering trekkerør"}], "5. Elektro og tekniske installasjoner": [{"id": "FAG-02-51", "name": "Ventilasjon (type, plassering, omfang)"}, {"id": "FAG-02-52", "name": "Belysning (omfang)"}, {"id": "FAG-02-53", "name": "Sikkerhetsutstyr iht. N500"}, {"id": "FAG-02-54", "name": "Nødutganger/tverrforbindelser"}, {"id": "FAG-02-55", "name": "SRO detaljer"}, {"id": "FAG-02-56", "name": "Skiltliste"}, {"id": "FAG-02-57", "name": "SOS-kiosker (hvis ikke mengde påvirker vesentlig)"}], "6. Mengder og kalkylegrunnlag": [{"id": "FAG-02-61", "name": "Sprengning (m³)"}, {"id": "FAG-02-62", "name": "Sikring (fordelt på klasser/lengder)"}, {"id": "FAG-02-63", "name": "Betong (portaler, tekniske bygg hvis relevant)"}, {"id": "FAG-02-64", "name": "Usikkerhetsnivå per post"}], "7. Usikkerheter og forutsetninger": [{"id": "FAG-02-71", "name": "Andel dårlig berg (%)"}, {"id": "FAG-02-72", "name": "Behov for spesielle tiltak (frysing, spunt etc.)"}, {"id": "FAG-02-73", "name": "Hva som ikke er prosjektert"}], "8. Overvann i tunnel": [{"id": "FAG-02-81", "name": "Prinsipp for håndtering av overvann"}, {"id": "FAG-02-82", "name": "Sedimenteringsbasseng:\n- kapasitet\n- behov"}]}, "3 Tunnelportaler": {"1. Geometri og omfang": [{"id": "FAG-03-11", "name": "Plassering av portal (tegning)"}, {"id": "FAG-03-12", "name": "Portaltype (rett, skrå, utkraget etc.)"}, {"id": "FAG-03-13", "name": "Lengde og bredde"}, {"id": "FAG-03-14", "name": "Terrengtilpasning"}], "2. Portal- og frontkonstruksjon": [{"id": "FAG-03-21", "name": "Type konstruksjon (plasstøpt / prefab / naturstein etc.)"}, {"id": "FAG-03-22", "name": "Hoveddimensjoner"}], "3. Skjæringer ved portal": [{"id": "FAG-03-31", "name": "Omfang jord vs. fjell"}, {"id": "FAG-03-33", "name": "Sikringsomfang:\n- bolting\n- nett\n- sprøytebetong"}], "4. Sikring ved innslag": [{"id": "FAG-03-41", "name": "Sikringsklasser og lengder i portalsone"}, {"id": "FAG-03-42", "name": "Omfang injeksjon"}], "5. Grunnforhold og fundamentering": [{"id": "FAG-03-51", "name": "Grunnforhold ved portal"}, {"id": "FAG-03-52", "name": "Behov for tiltak (utskifting, fundamentering etc.)"}], "6. Vann og drenering": [{"id": "FAG-03-61", "name": "Vanninnsig (omfang)"}, {"id": "FAG-03-62", "name": "Drensløsning (prinsipp og mengde)"}], "7. Byggefase": [{"id": "FAG-03-71", "name": "Tilkomst/riggforhold"}, {"id": "FAG-03-72", "name": "Behov for midlertidig sikring"}], "8. Mengder": [{"id": "FAG-03-81", "name": "Sprengning (m³ jord/fjell)\nSikring (fordelt på typer/lengder)\nBetong portal\nMasser (ut/inn)"}], "9. Usikkerheter": [{"id": "FAG-03-91", "name": "Andel dårlig berg ved portal"}, {"id": "FAG-03-92", "name": "Behov for spesielle tiltak"}, {"id": "FAG-03-93", "name": "Hva som ikke er prosjektert"}]}, "4 Vei i dagen": {"1. Geometri og linjeføring": [{"id": "FAG-04-11", "name": "Vurdering av veilinja- optimaliseringsmulingheter\nPlan og lengdeprofil\nTverrprofil (bredder, skulder)\nStigning og tverrfall"}], "2. Vegoppbygning": [{"id": "FAG-04-21", "name": "Dimensjonert overbygning:\n- lagtykkelser\n- materialtyper"}], "3. Masse og terreng": [{"id": "FAG-04-31", "name": "Massebalanse\nOmfang jord vs. fjell (m³)\nFyllinger og skjæringer (høyder/helninger)"}], "4. Grunnforhold – vurdering": [{"id": "FAG-04-41", "name": "Hovedtype grunn (jord/fjell/myr)"}, {"id": "FAG-04-42", "name": "Behov for:\n- masseutskifting\n- stabilisering"}], "5. Drenering og overvann": [{"id": "FAG-04-51", "name": "Grøfter (omfang og type)"}, {"id": "FAG-04-52", "name": "Stikkrenner (dimensjon og antall)"}], "6. Erosjon og sikring": [{"id": "FAG-04-61", "name": "Erosjonssikring (mengde/type)"}, {"id": "FAG-04-62", "name": "Sikring i skjæringer (omfang)"}], "7. Sideanlegg og utstyr (kun mengdestyrende)": [{"id": "FAG-04-71", "name": "-\tRekkverk (type og lengder)\n-\tSkilt og oppmerking\n-\tBelysning (hvis aktuelt)\n-\tFartsdempende tiltak / øvrig vegutstyr"}], "8. Kryss og tilkoblinger": [{"id": "FAG-04-81", "name": "Kun hvis egne mengder:\n-omfang/areal"}], "9. Byggefase": [{"id": "FAG-04-91", "name": "Midlertidige løsninger"}], "10. Mengder og kalkylegrunnlag": [{"id": "FAG-04-101", "name": "-\tJord/fjell (m³)\n-\tVegoppbygning (m²/m³)\n-\tGrøfter/rør\n-\tTegninger med målbare poster"}], "11. Usikkerheter / forutsetninger": [{"id": "FAG-04-111", "name": "Hva som ikke er prosjektert"}, {"id": "FAG-04-112", "name": "Poster med høy usikkerhet"}]}, "5 Konstruksjoner/bruer": {"0. Felles krav – alle bruer": [{"id": "K-FELLES-01", "name": "QTO – Betong (m³)
- Overbygning
- Underbygning
- Fundament / landkar
- Murer der de inngår i bruløsningen"}, {"id": "K-FELLES-02", "name": "QTO – Slakkarmering (kg)
- Per hovedkomponent (overbygning / underbygning / fundament)"}, {"id": "K-FELLES-03", "name": "QTO – Spennarmering (kg)
- Per hovedkomponent"}, {"id": "K-FELLES-04", "name": "QTO – Stål tonn (bærende stål)
- Kun der aktuelt: K500, K540, K700 opsjon stålbjelker
- Bjelker og tverravstivninger separat"}, {"id": "K-FELLES-05", "name": "Konsept- og gjennomførbarhetsnotat per bru
- Konseptvalg (regulert + optimalisert)
- Byggbarhet / rask gjennomføring
- Midlertidige arbeider som kan bli dimensjonerende
- Fundamenteringsprinsipp på overordnet nivå"}], "1. K300 – Grundelandsvatnet bru": [{"id": "K300-01", "name": "Konseptgjennomgang – bedre løsning
- Norconsult utarbeider 1–2 alternative skisser på prinsippnivå
- Regulert løsning: platebru i spennarmert betong"}, {"id": "K300-02", "name": "QTO – regulert og alternativ løsning
- Betong (m³)
- Slakkarmering (kg)
- Spennarmering (kg)"}], "2. K400 – Audnedalen bru (FFB)": [{"id": "K400-01", "name": "Optimalisering av FFB-søyler
- Tverrsnitt og produksjonsmetode
- OBS: byggefasen (vind/dynamikk) kan være styrende – kontroller dette eksplisitt"}, {"id": "K400-02", "name": "Alternativ spennfordeling: kutte akse 2
- Ny fordeling: 136 + 236 + 136 m
- Konsekvens for terreng / fylling
⚠️ Krever mer fylling – Stangeland Maskin AS må ta stilling"}, {"id": "K400-03", "name": "Byggbarhet og midlertidige arbeider
- Konsekvens av endret spennfordeling
- Adkomst og rigg ved søyler"}, {"id": "K400-04", "name": "QTO – regulert og alternativ løsning
- Betong (m³)
- Slakkarmering (kg)
- Spennarmering (kg)"}], "3. K500 – Faksevatnet bru": [{"id": "K500-01", "name": "Byggbarhetsgjennomgang av regulert samvirkebruløsning
- Identifiser hva som gjør reis krevende
- Regulert: samvirkebru, stålbjelker med betongplate"}, {"id": "K500-02", "name": "Alternativ: ett spenn – prinsippskisse
- Geometri, fundamentering / landkar
- Montasjeprinsipp
- QTO-konsekvenser"}, {"id": "K500-03", "name": "QTO – regulert og ett-spenns alternativ
- Betong (m³)
- Slakkarmering (kg)
- Spennarmering (kg)
- Stål tonn"}], "4. K540 – Høylandsbekken bru": [{"id": "K540-01", "name": "Ingen optimalisering foreløpig – kun mengdeverifisering
QTO:
- Betong (m³)
- Slakkarmering (kg)
- Stål tonn
- Evt. spennarmering (kg) dersom det inngår"}], "5. K600 – Lene bruer (oppstrøms + nedstrøms)": [{"id": "K600-01", "name": "Byggbarhetsvurdering av regulert løsning
- Regulert oppstrøms: ett spenn, 34 m, betongplatebru
- Regulert nedstrøms: to spenn 26+26 m
- Adkomst, rigg og midlertidige tiltak ved bekk
- Vurder midlertidig rørlegging / midlertidig bru / fylling"}, {"id": "K600-02", "name": "Alternativstudie: oppstrøms bru lengre, mindre mur
- 1–2 skissealternativer på prinsippnivå
- Endret spenn / landkarlokalisering og konsekvens for terreng
- Konsekvens for mur (mål: reduksjon)
- Konsekvens for fremdrift og midlertidige arbeider"}, {"id": "K600-03", "name": "QTO – begge bruer (regulert og alternativ)
- Betong (m³)
- Slakkarmering (kg)
- Spennarmering (kg)"}], "6. K700 – Optedal bru (kritisk linje)": [{"id": "K700-01", "name": "⚡ KRITISK LINJE – rask og enkel gjennomføring er premiss
Optimalisert hovedløsning – ikke betongkasse
- Minst ett alternativ til kassebru (f.eks. samvirke stålbjelker + betongdekke)
- Regulert: kassebru i spennarmert betong, 5 spenn (34+40+56+40+34 m)"}, {"id": "K700-02", "name": "Byggbarhet for rask gjennomføring
- Montasjeprinsipp
- Minimale midlertidige arbeider
- Konsekvens for støttemur ved østre landkar (ca. 340 m, maks 12 m høyde)"}, {"id": "K700-03", "name": "Opsjon: stålbjelkeløsning med samvirke
- Separat opsjonsbeskrivelse for tilbudet
- Fire langsgående parallelle stålbjelker + betongdekke"}, {"id": "K700-04", "name": "QTO – regulert kassebru (prissammenligning) + optimalisert løsning (faktisk tilbud)
- Betong (m³)
- Slakkarmering (kg)
- Spennarmering (kg)
- Stål tonn ved stålalternativ"}]}, "6 Faunapassasje Viltlokk": {"1. Geometri og løsning- vurdering": [{"id": "FAG-06-11", "name": "Brutype\n-\t\tMaterialvalg\n-\t\tHoveddimensjoner (prinsippsnitt)\nLengde, bredde og fri høyde (tegnet og målsatt)"}], "2. Geometri og valgt løsning": [{"id": "FAG-06-12", "name": "Lengde, bredde og fri høyde (tegnet og målsatt)"}], "3. Grunnforhold og fundamentering": [{"id": "FAG-06-21", "name": "Grunnforhold og fundamenteringsmetode\nBehov for:\n-\tmasseutskifting\n-\tstabilisering"}], "4. Drenering og vann": [{"id": "FAG-06-31", "name": "Dreneringsløsning (omfang), eventuell vannføring gjennom passasjen"}], "5. Lokk, terreng og vegetasjon": [{"id": "FAG-06-41", "name": "-\tOppbygning (lag og tykkelser)\n-\tOmfang terrengforming (m³)\n-\tOmfang vegetasjon (m²)\n-\tGjerder/ledesystemer (lengder)"}], "6. Byggefase": [{"id": "FAG-06-51", "name": "-\tMassebalanse\n-\tMidlertidige løsninger"}], "7. Usikkerheter": [{"id": "FAG-06-71", "name": "-\tHva som ikke er prosjektert\n-\tPoster med høy usikkerhet"}]}, "7 Kulvert (vei)": {"1. Dimensjon og type": [{"id": "FAG-07-11", "name": "-\tKonsepytvurdering\n-\tKulverttype\n-\tDimensjon (Ø / B x H)\n-\tLengde"}], "2. Vannføring": [{"id": "FAG-07-21", "name": "-\tDimensjonerende vannføring (Qdim/Q200)\n-\tKoter innløp/utløp"}], "3. Grunnforhold": [{"id": "FAG-07-31", "name": "-\tGrunnforhold (jord/fjell/myr)\n-\tBehov for masseutskifting eller tiltak"}], "4. Innløp/utløp og sikring": [{"id": "FAG-07-41", "name": "-\tOmfang erosjonssikring\n-\tSteinstørrelser"}], "5. Vegoppbygning over kulvert": [{"id": "FAG-07-51", "name": "-\tOverdekning\n-\tLagtykkelser"}], "6. Byggefase": [{"id": "FAG-07-61", "name": "Hvordan vann håndteres under bygging"}], "7. Mengder (må være kalkulerbare)": [{"id": "FAG-07-71", "name": "-\tGraving (m³)\n-\tTilbakefylling\n-\tErosjonssikring"}], "8. Usikkerheter": [{"id": "FAG-07-81", "name": "Hva som ikke er prosjektert"}]}, "8 Omlegging av bekk": {"1. Hydrologi / hydraulikk": [{"id": "FAG-08-11", "name": "Dimensjonerende vannføring (Q200 + klimafaktor)"}, {"id": "FAG-08-12", "name": "Fall og hastigheter"}], "2. Geometri nytt bekkeløp": [{"id": "FAG-08-21", "name": "-\tLengde\n-\tBredde og dybde\n-\tSkråninger\n-\tTverrsnitt"}], "3. Erosjonssikring": [{"id": "FAG-08-31", "name": "-\tOmfang (bunn/sider/innløp/utløp)\n-\tSteinstørrelser"}], "4. Geoteknikk": [{"id": "FAG-08-41", "name": "-\tStabilitet langs trasé\n-\tRisiko for undergraving"}], "5. Midlertidig bekk (anleggsfase)": [{"id": "FAG-08-51", "name": "Trase og lengde, kapasitet"}], "6. Restriksjoner": [{"id": "FAG-08-61", "name": "Tidsvinduer (gyting/yngel)"}], "7. Mengder / kalkylegrunnlag": [{"id": "FAG-08-71", "name": "-\tGraving (m³)\n-\tStein/plastring\n-\tSubstrat\n-\tVegetasjon"}], "8. Usikkerheter / forutsetninger": [{"id": "FAG-08-81", "name": "Hva som ikke er prosjektert"}]}, "9 Åpent Sedimentasjonsbasseng": {"1. Dimensjon og omfang": [{"id": "9-01", "name": "-\tBassengvolum (m³)\n-\tDybde\n-\tAreal/utstrekning"}], "3. Oppbygning": [{"id": "9-02", "name": "-\tTverrsnitt/prinsipp (skråninger, bunntype)\n-\tMassetyper (jord/stein)"}], "4. Tetting": [{"id": "9-03", "name": "-\tType (membran / naturlig)\n-\tOmfang (m²)"}], "5. Innløp og utløp": [{"id": "9-04", "name": "-\tPrinsipp og dimensjon\n-\tErosjonssikring (omfang)"}], "6. Grunnforhold": [{"id": "9-05", "name": "-\tGrunnforhold (jord/myr/fjell)\n-\tBehov for masseutskifting eller tiltak"}], "7. Byggefase": [{"id": "9-06", "name": "Midlertidig vannhåndtering"}], "8. Mengder": [{"id": "9-07", "name": "-\tGraving (m³)\n-\tMasser (fylling/oppbygging)\n-\tTetting (m²)\n-\tErosjonssikring"}], "9. Usikkerheter": [{"id": "9-08", "name": "Hva som ikke er prosjektert"}]}, "10 Lukket sedimentasjonsbasseng": {"1. Type og omfang": [{"id": "10-01", "name": "-\tLøsningstype (prefab / plasstøpt)\n-\tVolum (m³)\n-\tAntall kammer"}], "2. Geometri og dimensjoner": [{"id": "10-02", "name": "-\tLengde / bredde / høyde\n-\tKoter (bunn / topp / inn-/utløp)"}], "3. Konstruksjon": [{"id": "10-03", "name": "-\tBetong (m³)\n-\tArmering (kg)\n-\tLokk/dekke (type og dimensjon)\n-\tKrav til tetthet"}], "4. Rør og tilkoblinger": [{"id": "10-04", "name": "-\tInnløp/utløp (antall og dimensjon)\n-\tKoter inn-/utløp\n-\tKummer/inspeksjonspunkter"}], "5. Grunnforhold og fundamentering": [{"id": "10-05", "name": "Behov for:\n-Masseutskifting\n-fundamentplate / peler\nJord / fjell"}], "6. Graving og tilbakefylling": [{"id": "10-06", "name": "-\tm³ graving\n-\tm³ tilbakefylling\n-\tKrav til masser og komprimering"}], "8. Mengder (må være kalkulerbare)": [{"id": "10-07", "name": "-\tBetong (m³)\n-\tArmering (kg)\n-\tGraving / tilbakefylling (m³)\n-\tRør (m / dimensjoner)\n-\tKummer (antall)"}], "9. Usikkerheter": [{"id": "10-08", "name": "-\tHva som ikke er prosjektert\n-\tValg av løsning (prefab vs. plasstøpt hvis ikke avklart)\n-\tGrunnforhold"}]}, "11  Ankomstveier": {"1. Geometri og omfang": [{"id": "11-01", "name": "-\tLengde\n-\tPlan og profil\n-\tStigning\n-\tTverrprofil (bredde)"}], "2. Oppbygning av vei": [{"id": "11-02", "name": "-\tLagtykkelser\n-\tMaterialtyper"}], "3. Grunnforhold langs trasé": [{"id": "11-03", "name": "-\tJord / fjell\n-\tBehov for:\n-\tutskifting\n-\tsprengning\n-\tEventuelle myrområder"}], "4. Drenering": [{"id": "11-04", "name": "-\tGrøfter (dimensjon og sidevalg)\n-\tStikkrenner (antall, dimensjon, plassering)"}], "5. Masse og terreng": [{"id": "11-05", "name": "-\tOmfang jord / fjell (m³)\n-\tFyllinger og skjæringer (høyder/helninger)\n-\tSikringsomfang:\n-\t\tbolting\n-\t\terosjonssikring"}], "6. Kryssing og tilkobling": [{"id": "11-06", "name": "Omfang tiltak på eksisterende vei"}], "7. Mengder": [{"id": "11-07", "name": "-\tGraving (m³ jord/fjell)\n-\tOppbygging (m³)\n-\tLengde vei\n-\tStikkrenner (antall/dimensjon)"}]}, "12 Passering av myr/ bevarfing av myra": {"1. Omfang": [{"id": "12-01", "name": "-\tLengde og bredde myrområder\n-\tMektighet (dybde pr. område)"}], "2. Grunnundersøkelser- vurdering": [{"id": "12-02", "name": "-\tHovedtype og styrke (bløt/myk)\n-\tSetningspotensial"}], "3. Valgt håndteringsmetode per område": [{"id": "12-03", "name": "Metode pr. område:\n-\tmasseutskifting (omfang)\n-\tforbelastning\n-\tlettfylling\n-\tstabilisering"}], "4. Dimensjonering og nivå": [{"id": "12-04", "name": "-\tUtskiftningsdybde (m)\n-\tSideutslag (bredde)\n-\tOppbygning av fylling"}], "6. Fremdrift (kritisk kostdriver)": [{"id": "12-05", "name": "Krav til ventetid (forbelastning)"}], "7. Setninger og fremdrift": [{"id": "12-06", "name": "-\tForventede setninger\n-\tKrav til ventetid (ved forbelastning)\n-\tKrav til dokumentasjon"}], "8. Byggefase": [{"id": "12-07", "name": "Behov for midlertidige tiltak:\n-\tgeonett\n-\tforsterkning"}], "9. Mengder": [{"id": "12-08", "name": "-\tm³ myr som fjernes\n-\tm³ tilførte masser\n-\tMengder stabilisering / lettfylling"}], "10. Usikkerheter": [{"id": "12-09", "name": "-\tHva som ikke er prosjektert\n-\tVariasjon i dybder/forhold"}]}, "13 Overvannhåntering": {"1. Geometrii": [{"id": "13-01", "name": "Dimensjoner på: \n-\trør (Ø + lengder)\n-\tgrøfter (bredde/dybde)\n-\tkummer"}], "2. Basseng:": [{"id": "13-02", "name": "Dimensjoner på:\n-\tvolum (m³)\n-\tareal og dybde"}], "3. Utslippspunkter": [{"id": "13-03", "name": "-\tAntall og plassering\n-\tErosjonssikring (omfang)"}], "4. Erosjonssikring (mengder)": [{"id": "13-04", "name": "-\tOmfang\n-\tType\n-\tSteinstørrelser"}], "5. Sedimentasjonsbasseng (åpen og lukket)": [{"id": "13-05", "name": "-\tVolum (m³)\n-\tInn-/utløp (omfang)\n-\tTetting (type og omfang)"}], "6. Flom og sikkerhet": [{"id": "13-06", "name": "vurdering  på at løsning tåler Q200"}], "7. Midlertidig håndtering": [{"id": "13-07", "name": "-\tHvordan overvann håndteres i anlegg\n-\tVurdering om må bygges midlertidige løsninger"}], "8. Usikkerheter": [{"id": "13-08", "name": "-\tHva som ikke er prosjektert\n-\tForutsetninger som kan påvirke dimensjon/mengder"}]}, "14 Skredsikring": {"1. Omfang": [{"id": "14-01", "name": "-\tLengder og høyder på berørte strekninger\n-\tType skred (stein/jord/snø)"}], "2. Konkrete tiltak per sone": [{"id": "14-02", "name": "Hvilket tiltak hvor:\n- rensk\n- bolting\n- nett\n- fanggjerder\n- voller / grøfter"}], "3. Bolting og sikring i skrent": [{"id": "14-03", "name": "-\tAntall bolter pr. m² / pr. profil\n-\tBoltetyper og lengder\n-\tOmfang av rensk m²"}], "4. Fanggjerder / skredgjerder": [{"id": "14-04", "name": "-\tPlassering (skisse/prinsipp)\n-\tLengde og høyde\n-\tEnergiopptak (kJ-klasse)"}], "5. Voller og grøfter": [{"id": "14-05", "name": "-\tGeometri (høyde/bredde/lengde)\n-\tMassetype"}], "7 Mengder": [{"id": "14-06", "name": "Mengder:\n-\tm² rensk\n-\tm bolting\n-\tm fanggjerde\n-\tm³ voll/grøft"}], "8. Usikkerheter": [{"id": "14-07", "name": "-\tHva som ikke er prosjektert\n-\tVariasjon i omfang per sone"}]}, "15 Støttemurer": {"1. Geometri og omfang": [{"id": "15-01", "name": "-\tLengde og høyde pr. mur\n-\tTopp- og bunnkoter"}], "2. Murtype og konstruksjon": [{"id": "15-02", "name": "-\tValgt murtype (plasstøpt, prefab, gabion, spunt etc.)\n-\tPrinsippsnitt med dimensjoner\n-\tMaterialvalg"}], "3. Geoteknikk og fundamentering – vurdering": [{"id": "15-03", "name": "-\tJord / fjell\n-\tBehov for tiltak:\n-\t\tmasseutskifting\n-\t\tstabilisering\""}], "4. Drenering": [{"id": "15-04", "name": "-\tDrensløsning bak mur\n-\tFilterlag (type og tykkelse)"}], "5. Sikring og overflate": [{"id": "15-05", "name": "-\tErosjonssikring ved fot/topp\n-\tOverflatebehandling"}], "6. Byggefase": [{"id": "15-06", "name": "Midlertidig sikring (type/omfang)"}], "7. Mengder": [{"id": "15-07", "name": "-\tBetong (m³)\n-\tArmering (kg)\n-\tGraving og tilbakefylling (m³)\n-\tDrenslag/filter"}], "8. Usikkerheter": [{"id": "15-08", "name": "-\tHva som ikke er prosjektert\n-\tVariasjon i grunnforhold langs mur"}]}, "16 Bekkeklulvert": {"1. Dimensjon og omfang": [{"id": "16-01", "name": "Kulverttype\nDimensjon (B x H / Ø)\nLengde"}], "2. Erosjonssikring (stor kostdriver)": [{"id": "16-02", "name": "Omfang (innløp/utløp/bunn/sider)\nSteinstørrelser"}], "3. Grunnforhold vurdering": [{"id": "16-03", "name": "-\tJord/fjell/myr\n-\tBehov for masseutskifting eller tiltak"}], "4. Fiskekrav (hvis aktuelt)": [{"id": "16-04", "name": "Krav til bunn (substrat)\nEventuelle krav til vannhastighet/dybde"}], "5. Byggefase": [{"id": "16-05", "name": "Midlertidig vannhåndtering\nBehov for midlertidig bekk"}], "6. Mengder (må være gitt eller beregnbare)": [{"id": "16-06", "name": "Graving (m³)\nTilbakefylling\nErosjonssikring\nSubstrat"}]}};

let tasks = [];
let undersecOpen = {};
let vacations = [];
let vacIdCounter = 1;
let vacTimelineOffset = -7;
let vacTimelineDays = 70;
let idCounter = 0;
let sectionOpen = {};
let projectLinks = [
  { id: 1, label: 'Konkurransegrunnlag', url: '' },
  { id: 2, label: 'Tegningshefte', url: '' }
];
let linkIdCounter = 3;
let linkEditId = null;
let modelLinks = [
  { id: 1, label: 'Modell', url: '' }
];
let modelIdCounter = 2;
let linkEditGroup = 'doc';
let filters = {valgte:false, frist:false, pågår:false, irrelevant:false};
let activeTab = 'liste';
let kanbanView = 'tidslinje';


function initTasksFromSaved() {
  // Used when reloading saved state — only the saved tasks are restored,
  // not auto-generated default underkapitler.
  Object.keys(SECTIONS_DATA).forEach(function(sec) {
    sectionOpen[sec] = true;
    undersecOpen[sec] = undersecOpen[sec] || {};
  });
  // tasks array stays empty here — loadSaved() will fill it
}

function initTasks() {
  Object.entries(SECTIONS_DATA).forEach(function(entry) {
    var sec = entry[0], subs = entry[1];
    sectionOpen[sec] = true;
    undersecOpen[sec] = undersecOpen[sec] || {};
    if (sec === '0 Generell') {
      // Generell: tasks lie directly under section, no underkapittel
      Object.entries(subs).forEach(function(e) {
        var sub = e[0], items = e[1];
        items.forEach(function(item) {
          tasks.push({
            id: idCounter++, excelId: item.id,
            section: sec, undersec: '', sub: sub, name: item.name,
            selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: '', irrelevant: false
          });
        });
      });
    } else {
      // Other sections: auto-create the first underkapittel
      var m = sec.match(/^\d+/);
      var firstName = m ? (m[0] + '.1') : '1';
      Object.entries(subs).forEach(function(e) {
        var sub = e[0], items = e[1];
        items.forEach(function(item) {
          tasks.push({
            id: idCounter++, excelId: item.id,
            section: sec, undersec: firstName, sub: sub, name: item.name,
            selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: '', irrelevant: false
          });
        });
      });
      undersecOpen[sec][firstName] = true;
    }
  });
}

function loadSaved() {
  try {
    var saved = localStorage.getItem('bestillingsliste_v4');
    if (!saved) return;
    var data = JSON.parse(saved);

    // Restore section structure (handles renames)
    if (data.SECTIONS_DATA) {
      Object.keys(SECTIONS_DATA).forEach(function(k){ delete SECTIONS_DATA[k]; });
      Object.assign(SECTIONS_DATA, data.SECTIONS_DATA);
    }

    // Restore undersec open/closed state
    if (data.undersecOpen) Object.assign(undersecOpen, data.undersecOpen);

    // Restore section open/closed state (with migration of old names)
    if (data.sectionOpen) {
      var migrations = {'0 Tema': '0 Generell'};
      Object.keys(data.sectionOpen).forEach(function(k) {
        var key = migrations[k] || k;
        sectionOpen[key] = data.sectionOpen[k];
      });
    }

    // Restore vacations
    if (data.vacations) {
      vacations = data.vacations;
      vacIdCounter = data.vacIdCounter || (Math.max.apply(null, [0].concat(vacations.map(function(v){return v.id||0;}))) + 1);
    }

    // Restore document links
    if (data.projectLinks) {
      projectLinks = data.projectLinks;
      linkIdCounter = data.linkIdCounter || (Math.max.apply(null, [0].concat(projectLinks.map(function(l){return l.id||0;}))) + 1);
    }

    // Restore model links
    if (data.modelLinks) {
      modelLinks = data.modelLinks;
      modelIdCounter = data.modelIdCounter || (Math.max.apply(null, [0].concat(modelLinks.map(function(l){return l.id||0;}))) + 1);
    }

    // Restore tasks
    if (data.tasks) {
      if (tasks.length === 0) {
        // Reload from saved (initTasksFromSaved was used) — push all tasks fresh
        data.tasks.forEach(function(s) {
          tasks.push({
            id: s.id, excelId: s.excelId || '',
            section: s.section, undersec: s.undersec || '', sub: s.sub || '',
            name: s.name,
            selected: !!s.selected,
            frist: s.frist || '', timer: s.timer || '',
            status: s.status || 'Ikke startet',
            link: s.link || '', comment: s.comment || '',
            ansvar: s.ansvar || '', fredagstatus: s.fredagstatus || '',
            eier: s.eier || '',
            irrelevant: !!s.irrelevant
          });
          if (s.id >= idCounter) idCounter = s.id + 1;
        });
      } else {
        // Initial load — merge user-editable fields into existing tasks
        data.tasks.forEach(function(s) {
          var t = tasks.find(function(t){ return t.id===s.id; });
          if (t) {
            if (s.frist    !== undefined) t.frist    = s.frist;
            if (s.timer    !== undefined) t.timer    = s.timer;
            if (s.status   !== undefined) t.status   = s.status;
            if (s.link     !== undefined) t.link     = s.link;
            if (s.comment  !== undefined) t.comment  = s.comment;
            if (s.ansvar       !== undefined) t.ansvar       = s.ansvar;
            if (s.eier         !== undefined) t.eier         = s.eier;
            if (s.fredagstatus !== undefined) t.fredagstatus = s.fredagstatus;
            if (s.selected !== undefined) t.selected = s.selected;
            if (s.name     !== undefined) t.name     = s.name;
            if (s.undersec !== undefined) t.undersec = s.undersec;
            if (s.irrelevant !== undefined) t.irrelevant = s.irrelevant;
          }
        });
        // Restore custom-added tasks (excelId === '')
        data.tasks.forEach(function(s) {
          if (s.excelId === '' && !tasks.find(function(t){ return t.id===s.id; })) {
            tasks.push(s);
            if (s.id >= idCounter) idCounter = s.id + 1;
          }
        });
      }
    }
  } catch(e) {}
}

function saveData() {
  try { localStorage.setItem('bestillingsliste_v4', JSON.stringify({tasks, sectionOpen, undersecOpen, SECTIONS_DATA, vacations, vacIdCounter, projectLinks, linkIdCounter, modelLinks, modelIdCounter})); showToast('Lagret'); }
  catch(e) { showToast('Kunne ikke lagre'); }
}

/* ── Lenke-strip ── */
function renderLinks() {
  var el = document.getElementById('link-strip');
  if (!el) return;
  var html = '<span class="link-strip-label">Dokumenter</span>';
  projectLinks.forEach(function(l) {
    var label = esc(l.label || 'Uten navn');
    if (l.url) {
      html += '<a class="link-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener" title="' + esc(l.url) + '">'
            + '<span class="link-chip-icon">🔗</span>'
            + '<span class="link-chip-text">' + label + '</span>'
            + '<button class="link-chip-edit" title="Rediger" onclick="event.preventDefault();event.stopPropagation();linkOpenEditor(' + l.id + ',\'doc\')">✎</button>'
            + '</a>';
    } else {
      html += '<button class="link-chip empty" title="Lim inn lenke" onclick="linkOpenEditor(' + l.id + ',\'doc\')">'
            + '<span class="link-chip-icon">＋</span>'
            + '<span class="link-chip-text">' + label + '</span>'
            + '</button>';
    }
  });
  html += '<button class="link-add-btn" onclick="linkOpenEditor(null,\'doc\')"><span>＋</span> Legg til lenke</button>';
  el.innerHTML = html;
}

function renderModelLinks() {
  var el = document.getElementById('model-strip');
  if (!el) return;
  var html = '<span class="model-strip-label">Modell</span>';
  modelLinks.forEach(function(l) {
    var label = esc(l.label || 'Uten navn');
    if (l.url) {
      html += '<a class="model-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener" title="' + esc(l.url) + '">'
            + '<span class="model-chip-icon">🧊</span>'
            + '<span class="model-chip-text">' + label + '</span>'
            + '<button class="model-chip-edit" title="Rediger" onclick="event.preventDefault();event.stopPropagation();linkOpenEditor(' + l.id + ',\'model\')">✎</button>'
            + '</a>';
    } else {
      html += '<button class="model-chip empty" title="Lim inn modell-lenke" onclick="linkOpenEditor(' + l.id + ',\'model\')">'
            + '<span class="model-chip-icon">🧊</span>'
            + '<span class="model-chip-text">' + label + '</span>'
            + '</button>';
    }
  });
  html += '<button class="model-add-btn" onclick="linkOpenEditor(null,\'model\')"><span>＋</span> Legg til modell</button>';
  el.innerHTML = html;
}

function linkGroupArr() { return linkEditGroup === 'model' ? modelLinks : projectLinks; }
function renderLinkGroup() { if (linkEditGroup === 'model') renderModelLinks(); else renderLinks(); }

function linkOpenEditor(id, group) {
  linkEditGroup = group || 'doc';
  linkEditId = id;
  var arr = linkGroupArr();
  var link = (id != null) ? arr.find(function(l){ return l.id === id; }) : null;
  var isModel = linkEditGroup === 'model';
  document.getElementById('link-edit-title').textContent = link
    ? (isModel ? 'Rediger modell-lenke' : 'Rediger lenke')
    : (isModel ? 'Ny modell-lenke' : 'Ny lenke');
  document.getElementById('link-edit-label').value = link ? (link.label || '') : (isModel ? 'Modell' : '');
  document.getElementById('link-edit-url').value = link ? (link.url || '') : '';
  document.getElementById('link-del-btn').style.display = link ? 'inline-block' : 'none';
  document.getElementById('link-overlay').classList.add('show');
  setTimeout(function(){ document.getElementById('link-edit-url').focus(); }, 30);
}

function linkCloseEditor() {
  document.getElementById('link-overlay').classList.remove('show');
  linkEditId = null;
}

function linkSaveEditor() {
  var label = document.getElementById('link-edit-label').value.trim();
  var url = document.getElementById('link-edit-url').value.trim();
  if (!label) { showToast('Skriv inn et navn'); return; }
  if (url && !/^https?:\/\//i.test(url)) { url = 'https://' + url; }
  var arr = linkGroupArr();
  if (linkEditId != null) {
    var link = arr.find(function(l){ return l.id === linkEditId; });
    if (link) { link.label = label; link.url = url; }
  } else if (linkEditGroup === 'model') {
    modelLinks.push({ id: modelIdCounter++, label: label, url: url });
  } else {
    projectLinks.push({ id: linkIdCounter++, label: label, url: url });
  }
  renderLinkGroup();
  linkCloseEditor();
  saveData();
  scheduleAutoSave();
}

function linkDeleteCurrent() {
  if (linkEditId == null) return;
  if (linkEditGroup === 'model') {
    modelLinks = modelLinks.filter(function(l){ return l.id !== linkEditId; });
  } else {
    projectLinks = projectLinks.filter(function(l){ return l.id !== linkEditId; });
  }
  renderLinkGroup();
  linkCloseEditor();
  saveData();
  scheduleAutoSave();
}

function clearAll() {
  if (!confirm('Nullstille alle valg, frister og statuser?')) return;
  tasks.forEach(t => { t.selected=false; t.frist=''; t.timer=''; t.status='Ikke startet'; t.link=''; t.comment=''; t.ansvar=''; t.fredagstatus=''; t.eier=''; });
  saveData(); render();
  if (activeTab==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (activeTab==='dashboard') renderDashboard();
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function switchTab(t) {
  activeTab = t;
  ['liste','kanban','dashboard','ukeplan','ferie'].forEach(function(x) {
    var te = document.getElementById('tab-'+x);
    var pe = document.getElementById('panel-'+x);
    if(te) te.classList.toggle('active', t===x);
    if(pe) pe.style.display = t===x ? '' : 'none';
  });
  if (t==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (t==='dashboard') renderDashboard();
  if (t==='ukeplan') renderUkeplan();
  if (t==='ferie') vacRender();
}

function toggleFilter(f) {
  filters[f] = !filters[f];
  document.getElementById('f-'+f).classList.toggle('on', filters[f]);
  render();
}

function toggleSection(s) { sectionOpen[s] = !sectionOpen[s]; render(); }

function change(id, field, val) {
  const t = tasks.find(t=>t.id===id);
  if (t) t[field] = val;
  scheduleAutoSave();
  updateStats();
  if (activeTab==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (activeTab==='dashboard') renderDashboard();
  if (activeTab==='ukeplan') renderUkeplan();
}

function toggleSelect(id) {
  const t = tasks.find(t=>t.id===id);
  if (t) t.selected = !t.selected;
  scheduleAutoSave();
  render();
}

function toggleIrrelevant(id) {
  const t = tasks.find(t=>t.id===id);
  if (!t) return;
  t.irrelevant = !t.irrelevant;
  scheduleAutoSave();
  render();
}

function getToday() { return new Date().toISOString().split('T')[0]; }


function _jsAttr(s) { return '\'' + String(s).replace(/\\/g,'\\\\').replace(/'/g,'\\\'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') + '\''; }

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeName(name) {
  const parts = (name||'').split('\n').map(l=>l.trim()).filter(Boolean);
  if (parts.length <= 1) return '<span class="task-title">'+esc(name)+'</span>';
  return '<span class="task-title">'+esc(parts[0])+'</span><ul class="task-bullets">'
    + parts.slice(1).map(l=>'<li>'+esc(l.replace(/^[-\u2013\u2022]\s*/,''))+'</li>').join('')
    + '</ul>';
}

function render() {
  updateStats();
  var q=document.getElementById('search').value.toLowerCase().trim();
  var today=getToday();
  var html='';

  Object.keys(SECTIONS_DATA).forEach(function(secName) {
    var isGen = secName === '0 Generell';
    var SEC_HUE = [210,160,25,280,340,195,135,50,305,170,0,240,90,320,60,185,265];
    var hue = SEC_HUE[Object.keys(SECTIONS_DATA).indexOf(secName) % SEC_HUE.length];
    var secColor = 'hsl('+hue+',55%,42%)';
    var secKey = encodeURIComponent(secName);
    var open = sectionOpen[secName];
    var allSecSel = tasks.filter(function(t){return t.section===secName;}).length>0
      && tasks.filter(function(t){return t.section===secName;}).every(function(t){return t.selected;});
    var selCount = tasks.filter(function(t){return t.section===secName&&t.selected;}).length;
    var totalInSec = tasks.filter(function(t){return t.section===secName;}).length;

    html += '<div class="section-block">';
    html += '<div class="section-header" style="--sec-color:'+secColor+'" onclick="toggleSection(decodeURIComponent(\''+secKey+'\'))">';
    html += '<span class="chevron '+(open?'open':'')+'">&#9654;</span>';
    html += '<input type="checkbox" class="sec-cb"'+(allSecSel?' checked':'')
      +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
      +' onchange="handleSecCb(this)"'
      +' style="width:14px;height:14px;cursor:pointer;accent-color:var(--accent);flex-shrink:0;margin-right:2px"'
      +' onclick="event.stopPropagation()">';
    html += '<span class="section-name" style="color:'+secColor+'"'
      +' ondblclick="startEditSecName(this,decodeURIComponent(\''+secKey+'\'))"'
      +' title="Dobbeltklikk for \u00e5 redigere">'+esc(secName)+'</span>';
    html += '<span class="sec-edit-hint" ondblclick="startEditSecName(this.previousElementSibling,decodeURIComponent(\''+secKey+'\'))">&#9998;</span>';
    if(selCount>0) html += '<span class="sec-badge sec-sel">'+selCount+' valgt</span>';
    html += '<span class="sec-badge sec-count">'+totalInSec+'</span>';
    html += '</div>';

    if(open){
      html += '<div class="task-rows">';
      if(isGen){
        var genItems = _filterTasks(tasks.filter(function(t){return t.section===secName;}), q, today);
        html += _renderSubGroups(genItems, secName, hue, today, '');
        html += '<button class="sub-add-btn" style="margin:6px 12px;display:inline-block"'
          +' onclick="addTask(\'0 Generell\',\'\',\'\')">+ Legg til post</button>';
      } else {
        var undersecs = [];
        tasks.filter(function(t){return t.section===secName;}).forEach(function(t){
          if(undersecs.indexOf(t.undersec)<0) undersecs.push(t.undersec);
        });
        if(undersecs.length>0){
          undersecs.forEach(function(usec){
            var uAll = tasks.filter(function(t){return t.section===secName&&t.undersec===usec;});
            var uVis = _filterTasks(uAll, q, today);
            var uSel = uAll.filter(function(t){return t.selected;}).length;
            var uOpen = !undersecOpen[secName] || undersecOpen[secName][usec] !== false;
            var lc = 'hsl('+hue+',45%,55%)';
            html += '<div class="undersec-block" style="--undersec-color:'+lc+'">';
            html += '<div class="undersec-header">';
            html += '<span class="undersec-chevron '+(uOpen?'open':'')+'"'
              +' onclick="toggleUndersec('+_jsAttr(secName)+','+_jsAttr(usec)+')">&#9654;</span>';
            html += '<span class="undersec-name"'
              +' ondblclick="startEditUndersecName(this,'+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Dobbeltklikk for \u00e5 redigere navn">'+esc(usec)+'</span>';
            html += '<span class="undersec-edit-hint"'
              +' onclick="startEditUndersecName(this.previousElementSibling,'+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Rediger navn">&#9998;</span>';
            if(uSel>0) html += '<span class="undersec-badge">'+uSel+' valgt</span>';
            html += '<span class="undersec-badge">'+uVis.length+'/'+uAll.length+'</span>';
            html += '<button class="undersec-del-btn"'
              +' onclick="deleteUndersec('+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Slett underkapittel">\u00d7</button>';
            html += '</div>';
            if(uOpen) html += '<div>'+_renderSubGroups(uVis, secName, hue, today, usec)+'</div>';
            html += '</div>';
          });
        }
        html += '<button class="add-undersec-btn" onclick="addUndersec('+_jsAttr(secName)+')">'
          +'<span style="font-size:18px;line-height:1;margin-top:-1px">+</span>'
          +' Legg til nytt underkapittel</button>';
      }
      html += '</div>';
    }
    html += '</div>';
  });

  document.getElementById('list-area').innerHTML = html;

  setTimeout(function(){
    document.querySelectorAll('.sec-cb,.sub-cb').forEach(function(cb){
      var sec=cb.getAttribute('data-sec'), sub=cb.getAttribute('data-sub');
      var its = sub
        ? tasks.filter(function(t){return t.section===sec&&t.sub===sub;})
        : tasks.filter(function(t){return t.section===sec;});
      var cnt = its.filter(function(t){return t.selected;}).length;
      cb.indeterminate = cnt>0 && cnt<its.length;
    });
  }, 0);
}

function _filterTasks(list, q, today) {
  return list.filter(function(t){
    if(q && !t.name.toLowerCase().includes(q) && !(t.excelId||'').toLowerCase().includes(q)) return false;
    if(filters.valgte && !t.selected) return false;
    if(filters.frist && !(t.frist&&t.frist<today&&t.status!=='Ferdig')) return false;
    if(filters['pågår'] && t.status!=='Pågår') return false;
    if(filters.irrelevant && t.irrelevant) return false;
    return true;
  });
}

function _renderSubGroups(items, secName, hue, today, undersec) {
  if(items.length===0) return '<div class="empty-state">Ingen poster matcher filter</div>';
  var html='';
  var subs=[];
  items.forEach(function(t){if(subs.indexOf(t.sub)<0) subs.push(t.sub);});
  subs.forEach(function(sub){
    var si = items.filter(function(t){return t.sub===sub;});
    if(sub){
      var sc2='hsl('+hue+',45%,38%)';
      var allS=si.length>0&&si.every(function(t){return t.selected;});
      html += '<div class="sub-header" style="--sub-accent:'+sc2+'">';
      html += '<input type="checkbox" class="sub-cb"'+(allS?' checked':'')
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' onchange="handleSubCb(this)" title="Velg alle">';
      html += '<span class="sub-name"'
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' ondblclick="startEditSubName(this)">'+esc(sub)+'</span>';
      html += '<span class="sub-edit-hint" ondblclick="startEditSubName(this.previousElementSibling)">&#9998;</span>';
      html += '<span class="sub-count">'+si.length+'</span>';
      html += '<button class="sub-add-btn"'
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' data-undersec="'+(undersec||'').replace(/"/g,'&quot;')+'"'
        +' onclick="handleSubAdd(this)">+ Legg til post</button>';
      html += '</div>';
    }
    si.forEach(function(t){
      var ov=t.frist&&t.frist<today&&t.status!=='Ferdig';
      var sc=STATUS_COLORS[t.status]||{bg:'',color:''};
      html += '<div class="task-row'+(t.selected?' selected':'')+(t.irrelevant?' task-irrelevant':'')+'" id="row-'+t.id+'">';
      html += '<input type="checkbox" class="cb" '+(t.selected?'checked':'')+' onchange="toggleSelect('+t.id+')">';
      html += '<div class="task-name-cell">';
      html += '<div class="name-display-wrap" id="namedisplay-'+t.id+'">';
      html += '<div class="task-name-content">'+makeName(t.name)+'</div>';
      html += '<button class="pencil-btn" onclick="startEditName('+t.id+')" title="Rediger (PIN kreves)">&#9998;</button>';
      if(!t.excelId) html += '<button class="delete-btn" onclick="deleteTask('+t.id+')" title="Slett">\u00d7</button>';
      html += '<button class="irrelevant-btn'+(t.irrelevant?' is-irrelevant':'')+'" onclick="toggleIrrelevant('+t.id+')" title="'+(t.irrelevant?'Merk som relevant':'Merk som ikke relevant')+'">'+(t.irrelevant?'&#10003; Ikke relevant':'&#8416; Ikke relevant')+'</button>';
      html += '</div>';
      html += '<div class="name-edit-wrap" id="nameedit-'+t.id+'">';
      html += '<textarea class="name-edit-input" rows="3"'
        +' onblur="commitEditName('+t.id+',this.value)"'
        +' onkeydown="if(event.key===\'Escape\')cancelEditName('+t.id+')">'+esc(t.name)+'</textarea>';
      html += '</div>';
      html += '</div>';
      html += '<input type="text" class="comment-input ansvar-input" placeholder="Ansvar\u2026" value="'+esc(t.ansvar)+'"'
        +' onchange="change('+t.id+',\'ansvar\',this.value)">';
      html += '<div class="locked-field-wrap" onclick="requestLockedEdit('+t.id+',\'frist\',this)">';
      html += '<div class="locked-display" style="'+(ov?'border-color:var(--red);background:var(--red-bg)':'')+'">';
      html += t.frist ? '<span style="'+(ov?'color:var(--red)':'')+'">&#128197; '+t.frist+'</span>'
                      : '<span class="ld-placeholder">Sett frist\u2026</span>';
      html += '</div>';
      if(t.frist) html += '<span class="lock-icon">&#128274;</span>';
      html += '</div>';
      html += '<div class="locked-field-wrap" onclick="requestLockedEdit('+t.id+',\'timer\',this)">';
      html += '<div class="locked-display">';
      html += t.timer ? '<span>&#9201; '+t.timer+'t</span>' : '<span class="ld-placeholder">Timer\u2026</span>';
      html += '</div>';
      if(t.timer) html += '<span class="lock-icon">&#128274;</span>';
      html += '</div>';
      html += '<select class="status-sel" style="background:'+sc.bg+';color:'+sc.color+'"'
        +' onchange="this.style.background=STATUS_COLORS[this.value].bg;this.style.color=STATUS_COLORS[this.value].color;change('+t.id+',\'status\',this.value)">';
      STATUSES.forEach(function(s){ html += '<option'+(t.status===s?' selected':'')+'>'+s+'</option>'; });
      html += '</select>';
      html += '<select class="status-sel fredag-input" onchange="change('+t.id+',\'fredagstatus\',this.value)">';
      FREDAG_PCTS.forEach(function(p){ html += '<option value="'+p+'"'+(t.fredagstatus===p?' selected':'')+'>'+(p===''?'\u2013':p)+'</option>'; });
      html += '</select>';
      html += '<div class="link-cell">';
      html += '<input type="text" class="link-input" placeholder="https://\u2026" value="'+esc(t.link)+'"'
        +' onchange="change('+t.id+',\'link\',this.value)" onblur="updateLinkBtn('+t.id+')">';
      if(t.link) html += '<a class="link-btn" href="'+esc(t.link)+'" target="_blank" style="display:inline-block">\u2197</a>';
      html += '</div>';
      html += '<input type="text" class="comment-input" placeholder="Kommentar\u2026" value="'+esc(t.comment)+'"'
        +' onchange="change('+t.id+',\'comment\',this.value)">';
      html += '</div>';
    });
  });
  return html;
}

function updateLinkBtn(id) {
  var t=tasks.find(t=>t.id===id), row=document.getElementById('row-'+id);
  if(!row||!t) return;
  var cell=row.querySelector('.link-cell'), btn=cell.querySelector('.link-btn');
  if(t.link&&!btn){ var a=document.createElement('a'); a.className='link-btn'; a.href=t.link; a.target='_blank'; a.textContent='\u2197'; a.style.display='inline-block'; cell.appendChild(a); }
  else if(!t.link&&btn){ btn.remove(); }
  else if(btn){ btn.href=t.link; }
}

function updateStats() {
  var sel=tasks.filter(t=>t.selected), total=tasks.length;
  var ferdig=tasks.filter(t=>t.status==='Ferdig').length;
  var totalTimer=sel.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  var pct=total>0?Math.round(ferdig/total*100):0;
  var today=getToday();
  var overdue=tasks.filter(t=>t.selected&&t.frist&&t.frist<today&&t.status!=='Ferdig').length;
  document.getElementById('stats-bar').innerHTML =
    '<div class="stat"><div class="stat-label">Valgte poster</div><div class="stat-value">'+sel.length+'</div><div class="stat-sub">av '+total+' totalt</div></div>'
    +'<div class="stat"><div class="stat-label">Budsjetterte timer</div><div class="stat-value">'+(totalTimer>0?totalTimer:'\u2013')+'</div><div class="stat-sub">for valgte poster</div></div>'
    +'<div class="stat"><div class="stat-label">Fremdrift</div><div class="stat-value">'+pct+'%</div><div class="progress-wrap"><div class="progress-fill" style="width:'+pct+'%"></div></div></div>'
    +'<div class="stat"><div class="stat-label">Utl\u00f8pt frist</div><div class="stat-value" style="'+(overdue>0?'color:var(--red)':'')+'">'+overdue+'</div><div class="stat-sub">poster</div></div>';
  var selTimer=sel.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  document.getElementById('summary-bar').innerHTML =
    '<span>Valgt: <strong>'+sel.length+'</strong> poster</span>'
    +(selTimer>0?'<span>Budsjett: <strong>'+selTimer+' timer</strong></span>':'')
    +'<span>Ferdigstilt: <strong>'+ferdig+'/'+total+'</strong></span>'
    +(overdue>0?'<span class="overdue-flag">\u26A0 '+overdue+' poster med utl\u00f8pt frist</span>':'')
    +'<span style="margin-left:auto;color:var(--text3);font-size:11px">Auto-lagret ved endring</span>';
}

function switchKanbanView(v) {
  kanbanView=v;
  document.getElementById('ksub-tidslinje').classList.toggle('active',v==='tidslinje');
  document.getElementById('ksub-brett').classList.toggle('active',v==='brett');
  document.getElementById('kview-tidslinje').style.display=v==='tidslinje'?'':'none';
  document.getElementById('kview-brett').style.display=v==='brett'?'':'none';
  if(v==='tidslinje') renderTimeline(); else renderKanban();
}

function renderKanban() {
  var today=getToday(), cols={};
  STATUSES.forEach(function(s){ cols[s]=[]; });
  tasks.filter(t=>t.selected).forEach(function(t){ if(!cols[t.status]) cols[t.status]=[]; cols[t.status].push(t); });
  var html='';
  STATUSES.forEach(function(status) {
    var items=cols[status]||[], sc=STATUS_COLORS[status];
    html+='<div class="k-col"><div class="k-col-header"><span class="k-col-title" style="color:'+sc.color+'">'+status+'</span><span class="k-cnt">'+items.length+'</span></div>';
    if(items.length===0) html+='<div class="k-empty">Ingen poster</div>';
    items.forEach(function(t){
      var overdue=t.frist&&t.frist<today&&status!=='Ferdig';
      html+='<div class="k-card" onclick="switchTab(\'liste\')"><div class="k-section">'+esc(t.section)+'</div><div class="k-name">'+esc(t.name.split('\n')[0])+'</div><div class="k-meta">'+(t.frist?'<span class="k-date '+(overdue?'overdue':'')+'">'+t.frist+'</span>':'')+(t.timer?'<span class="k-timer">'+t.timer+'t</span>':'')+'</div></div>';
    });
    html+='</div>';
  });
  document.getElementById('kanban-area').innerHTML=html;
}

function renderTimeline() {
  var selected=tasks.filter(t=>t.selected), withDate=selected.filter(t=>t.frist), noDate=selected.filter(t=>!t.frist);
  var infoEl=document.getElementById('tl-info'), areaEl=document.getElementById('tl-area');
  if(selected.length===0){ infoEl.textContent='Velg poster i bestillingslisten for \u00e5 vise dem i tidslinjen.'; infoEl.className='tl-info warn'; areaEl.innerHTML=''; return; }
  if(withDate.length===0){ infoEl.textContent=selected.length+' poster valgt \u2013 sett frist for \u00e5 vise i tidslinjen.'; infoEl.className='tl-info warn'; areaEl.innerHTML=''; return; }
  infoEl.textContent=withDate.length+' poster med frist vises.'+(noDate.length>0?' '+noDate.length+' mangler frist.':''); infoEl.className='tl-info';
  var today=getToday(), dates=withDate.map(t=>new Date(t.frist));
  var minDate=new Date(Math.min.apply(null,dates)), maxDate=new Date(Math.max.apply(null,dates));
  var d1=minDate.getDay(); minDate.setDate(minDate.getDate()-(d1===0?6:d1-1)-7);
  var d2=maxDate.getDay(); maxDate.setDate(maxDate.getDate()+(d2===0?0:7-d2)+7);
  var weeks=[],cur=new Date(minDate);
  while(cur<=maxDate){ weeks.push(new Date(cur)); cur.setDate(cur.getDate()+7); }
  function getWeek(d){ var dt=new Date(d); dt.setHours(0,0,0,0); dt.setDate(dt.getDate()+3-(dt.getDay()+6)%7); var w1=new Date(dt.getFullYear(),0,4); return 1+Math.round(((dt-w1)/86400000-3+(w1.getDay()+6)%7)/7); }
  function pct(date){ return Math.max(0,Math.min(100,(new Date(date)-minDate)/(maxDate-minDate)*100)); }
  var lastMonth=-1;
  var weekCells=weeks.map(function(w){ var wn=getWeek(w),mo=w.getMonth(),label='U'+wn; if(mo!==lastMonth){ label=w.toLocaleString('no',{month:'short'}).replace('.','')+'<br><span style="font-size:9px;opacity:.7">U'+wn+'</span>'; lastMonth=mo; } return '<div class="tl-month" style="min-width:52px;max-width:72px">'+label+'</div>'; }).join('');
  var gridCells=weeks.map(function(){ return '<div class="tl-cell" style="min-width:52px;max-width:72px"></div>'; }).join('');
  var todayPct=pct(today), todayLine=todayPct>0&&todayPct<100?'<div class="tl-today-line" style="left:'+todayPct+'%"></div>':'';
  var bySection={};
  Object.keys(SECTIONS_DATA).forEach(function(s){ bySection[s]=[]; });
  withDate.forEach(function(t){ if(!bySection[t.section]) bySection[t.section]=[]; bySection[t.section].push(t); });
  var bodyHtml='';
  Object.keys(SECTIONS_DATA).forEach(function(s){
    var items=bySection[s]; if(!items||items.length===0) return;
    bodyHtml+='<div class="tl-sec-header"><div class="tl-sec-name">'+esc(s)+'</div><div class="tl-sec-line"></div></div>';
    items.forEach(function(t){
      var p=pct(t.frist),overdue=t.frist<today&&t.status!=='Ferdig',barColor=STATUS_BAR[t.status]||'#B4B2A9';
      var marker='<div class="tl-dot" style="left:calc('+p+'% - 5px);background:'+barColor+'" title="'+esc(t.name.split('\n')[0])+'"></div>';
      var bar=''; if(t.status==='P\u00e5g\u00e5r'||t.status==='Til review'){ var sp=Math.max(0,todayPct-1),w=Math.max(0.5,p-sp); bar='<div class="tl-bar" style="left:'+sp+'%;width:'+w+'%;background:'+barColor+';opacity:.25"></div>'; }
      bodyHtml+='<div class="tl-row'+(overdue?' overdue':'')+'" onclick="switchTab(\'liste\')"><div class="tl-task-name"><span class="status-dot" style="background:'+barColor+'"></span><span>'+esc(t.name.split('\n')[0])+'</span></div><div class="tl-grid" style="position:relative">'+gridCells+todayLine+bar+marker+'</div></div>';
    });
  });
  var legendHtml='<div class="tl-legend">'+Object.entries(STATUS_BAR).map(function(e){ return '<div class="tl-leg-item"><div class="tl-leg-dot" style="background:'+e[1]+'"></div>'+e[0]+'</div>'; }).join('')+'<div class="tl-leg-item"><div style="width:10px;height:2px;background:var(--red);opacity:.5;margin-top:1px"></div>I dag</div></div>';
  areaEl.innerHTML=legendHtml+'<div class="tl-container"><div class="tl-header"><div class="tl-label-col">Post</div><div class="tl-months">'+weekCells+'</div></div><div class="tl-body">'+bodyHtml+'</div></div>';
}

function renderDashboard() {
  var today=getToday(),total=tasks.length,ferdig=tasks.filter(t=>t.status==='Ferdig').length;
  var pct=total>0?Math.round(ferdig/total*100):0;
  var overdue=tasks.filter(t=>t.frist&&t.frist<today&&t.status!=='Ferdig');
  var totalTimer=tasks.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  var ferdigTimer=tasks.filter(t=>t.status==='Ferdig').reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  var timerPct=totalTimer>0?Math.round(ferdigTimer/totalTimer*100):0;
  var statusData=[{label:'Ferdig',val:ferdig,color:'#1D9E75'},{label:'P\u00e5g\u00e5r',val:tasks.filter(t=>t.status==='P\u00e5g\u00e5r').length,color:'#EF9F27'},{label:'Til review',val:tasks.filter(t=>t.status==='Til review').length,color:'#378ADD'},{label:'Blokkert',val:tasks.filter(t=>t.status==='Blokkert').length,color:'#E24B4A'},{label:'Ikke startet',val:tasks.filter(t=>t.status==='Ikke startet').length,color:'#B4B2A9'}];
  var r=52,cx=64,cy=64,circ=2*Math.PI*r,off=0;
  var slices=statusData.map(function(d){ var dash=(total>0?d.val/total:0)*circ; var s='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+d.color+'" stroke-width="18" stroke-dasharray="'+dash+' '+(circ-dash)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 '+cx+' '+cy+')" opacity="'+(d.val===0?0.1:1)+'"/>'; off+=dash; return s; }).join('');
  var secBars=Object.keys(SECTIONS_DATA).map(function(sn){ var items=tasks.filter(t=>t.section===sn),done=items.filter(t=>t.status==='Ferdig').length,p=items.length>0?Math.round(done/items.length*100):0; return {name:sn.replace(/^\d+\s*/,''),done:done,total:items.length,pct:p}; });
  var in28=new Date(); in28.setDate(in28.getDate()+28);
  var upcoming=tasks.filter(t=>t.frist&&t.frist>=today&&new Date(t.frist)<=in28&&t.status!=='Ferdig').sort(function(a,b){ return a.frist.localeCompare(b.frist); }).slice(0,8);
  var active=tasks.filter(t=>t.status!=='Ikke startet').slice(0,10);
  var html='<div class="dash-card"><div class="dash-card-title">Fremdrift</div><div class="dash-ring-wrap"><svg width="128" height="128" viewBox="0 0 128 128"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--surface2)" stroke-width="18"/>'+slices+'<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="22" font-weight="300" fill="var(--text)">'+pct+'%</text><text x="'+cx+'" y="'+(cy+20)+'" text-anchor="middle" font-size="9" fill="var(--text3)">ferdigstilt</text></svg><div class="dash-ring-legend">'+statusData.map(function(d){ return '<div class="dash-leg-row"><div class="dash-leg-dot" style="background:'+d.color+'"></div><span>'+d.label+'</span><span class="dash-leg-val">'+d.val+'</span></div>'; }).join('')+'</div></div></div>';
  html+='<div class="dash-card"><div class="dash-card-title">Fremdrift per fagomr\u00e5de</div><div class="dash-bar-list">'+secBars.map(function(s){ return '<div><div class="dash-bar-label"><span>'+esc(s.name)+'</span><span>'+s.done+'/'+s.total+'</span></div><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+s.pct+'%;background:#1D9E75"></div></div></div>'; }).join('')+'</div></div>';
  html+='<div class="dash-card"><div class="dash-card-title">Utl\u00f8pt frist ('+overdue.length+')</div>'+(overdue.length===0?'<div class="dash-empty">Ingen poster med utl\u00f8pt frist</div>':'<div class="dash-overdue-list">'+overdue.map(function(t){ return '<div class="dash-overdue-item"><span class="dash-overdue-name">'+esc(t.name.split('\n')[0])+'</span><span class="dash-overdue-date">'+t.frist+'</span></div>'; }).join('')+'</div>')+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Kommende frister</div>'+(upcoming.length===0?'<div class="dash-empty">Ingen frister de neste 4 ukene</div>':upcoming.map(function(t){ var d=Math.round((new Date(t.frist)-new Date(today))/86400000); return '<div class="dash-activity-row"><div class="dash-act-dot" style="background:'+(STATUS_BAR[t.status]||'#B4B2A9')+'"></div><span class="dash-act-name">'+esc(t.name.split('\n')[0])+'</span><span style="font-size:10px;color:var(--text3);white-space:nowrap">'+t.frist+' <span style="color:'+(d<=3?'var(--red)':'var(--text2)')+'">('+(d)+'d)</span></span></div>'; }).join(''))+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Timebudsjett</div><div class="dash-big-num">'+(totalTimer>0?totalTimer:'\u2013')+'</div><div class="dash-sub">timer totalt</div>'+(totalTimer>0?'<div style="margin-top:16px"><div class="dash-bar-label"><span>Ferdigstilt</span><span>'+ferdigTimer+'t av '+totalTimer+'t ('+timerPct+'%)</span></div><div class="dash-bar-track" style="height:10px"><div class="dash-bar-fill" style="width:'+timerPct+'%;background:#1D9E75;height:100%"></div></div></div>':'')+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Aktive poster</div>'+(active.length===0?'<div class="dash-empty">Ingen aktive poster</div>':active.map(function(t){ var sc=STATUS_COLORS[t.status]||{bg:'',color:''}; return '<div class="dash-activity-row"><div class="dash-act-dot" style="background:'+(STATUS_BAR[t.status]||'#B4B2A9')+'"></div><span class="dash-act-name">'+esc(t.name.split('\n')[0])+'</span><span class="dash-act-status" style="background:'+sc.bg+';color:'+sc.color+'">'+t.status+'</span></div>'; }).join(''))+'</div>';
  document.getElementById('dash-area').innerHTML=html;
}


// ── Ukeplan ──────────────────────────────────────────────────────────────
function renderUkeplan() {
  var today = getToday();
  var selected = tasks.filter(function(t){ return t.selected; });
  var withDate = selected.filter(function(t){ return t.frist; });
  var infoEl = document.getElementById('uk-info');
  var boardEl = document.getElementById('uk-board');
  var legendEl = document.getElementById('uk-legend');

  if (selected.length === 0) {
    infoEl.textContent = 'Velg poster i bestillingslisten for å vise dem i ukeplanen.';
    boardEl.innerHTML = ''; legendEl.innerHTML = ''; return;
  }
  if (withDate.length === 0) {
    infoEl.textContent = selected.length + ' poster valgt – sett frist på poster for å vise dem i ukeplanen.';
    boardEl.innerHTML = ''; legendEl.innerHTML = ''; return;
  }
  infoEl.textContent = withDate.length + ' poster med frist.' + (selected.length - withDate.length > 0 ? ' ' + (selected.length - withDate.length) + ' mangler frist.' : '');

  // Section colours for notes
  var SEC_COLORS = [
    {bg:'#FFF9C4',color:'#5C4A00',border:'#F5D000'},
    {bg:'#E8F5E9',color:'#1B4A1F',border:'#66BB6A'},
    {bg:'#E3F2FD',color:'#0D3A6B',border:'#42A5F5'},
    {bg:'#FCE4EC',color:'#6A0E2A',border:'#EC407A'},
    {bg:'#F3E5F5',color:'#3A0A5A',border:'#AB47BC'},
    {bg:'#FFF3E0',color:'#5A2800',border:'#FFA726'},
    {bg:'#E0F7FA',color:'#00363A',border:'#26C6DA'},
    {bg:'#F1F8E9',color:'#1B3A00',border:'#9CCC65'},
    {bg:'#FBE9E7',color:'#5A1000',border:'#FF7043'},
    {bg:'#E8EAF6',color:'#1A237E',border:'#5C6BC0'},
    {bg:'#EFEBE9',color:'#3E2723',border:'#A1887F'},
    {bg:'#E0F2F1',color:'#00251A',border:'#26A69A'},
    {bg:'#FAFAFA',color:'#212121',border:'#BDBDBD'},
    {bg:'#FFF8E1',color:'#4A3000',border:'#FFD54F'},
    {bg:'#E8F5E9',color:'#003300',border:'#43A047'},
    {bg:'#E3F2FD',color:'#001A3A',border:'#1E88E5'},
    {bg:'#FCE4EC',color:'#4A0020',border:'#E91E63'},
  ];
  var secNames = Object.keys(SECTIONS_DATA);
  var secColorMap = {};
  secNames.forEach(function(s,i){ secColorMap[s] = SEC_COLORS[i % SEC_COLORS.length]; });

  // Build legend
  legendEl.innerHTML = secNames.filter(function(s){
    return withDate.some(function(t){ return t.section===s; });
  }).map(function(s){
    var c = secColorMap[s];
    return '<div class="uk-leg"><div class="uk-leg-dot" style="background:'+c.border+'"></div>'
      + '<span>'+esc(s.replace(/^\d+\s+/,''))+'</span></div>';
  }).join('');

  // Build week buckets
  function getMonday(d) {
    var dt = new Date(d); var day = dt.getDay();
    dt.setDate(dt.getDate() - (day===0?6:day-1)); return dt.toISOString().split('T')[0];
  }
  function getWeekNum(d) {
    var dt = new Date(d); dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate()+3-(dt.getDay()+6)%7);
    var w1 = new Date(dt.getFullYear(),0,4);
    return 1+Math.round(((dt-w1)/86400000-3+(w1.getDay()+6)%7)/7);
  }
  function addDays(dateStr, n) {
    var d = new Date(dateStr); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0];
  }
  function fmtDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleString('no',{day:'numeric',month:'short'});
  }

  // Overdue bucket
  var overdueItems = withDate.filter(function(t){ return t.frist < today && t.status !== 'Ferdig'; });

  // Collect all mondays from tasks
  var mondays = [];
  withDate.forEach(function(t){
    var m = getMonday(t.frist);
    if(mondays.indexOf(m)<0) mondays.push(m);
  });
  mondays.sort();

  // Extend to show current week even if no tasks
  var thisMonday = getMonday(today);
  if(mondays.indexOf(thisMonday)<0 && mondays.length>0) {
    // Insert current week if it's between first and last
    if(thisMonday>=mondays[0] && thisMonday<=mondays[mondays.length-1]) {
      mondays.push(thisMonday); mondays.sort();
    }
  }

  var STATUS_NOTE_BG = {
    'Ikke startet':'rgba(0,0,0,0)','Pågår':'rgba(239,159,39,.15)',
    'Til review':'rgba(55,138,221,.15)','Ferdig':'rgba(29,158,117,.15)','Blokkert':'rgba(226,75,74,.15)'
  };

  var html = '';

  // Overdue column
  if (overdueItems.length > 0) {
    html += '<div class="uk-week-col uk-overdue-col">';
    html += '<div class="uk-overdue-header"><div class="uk-overdue-label">&#9888; Utl&#248;pt frist</div></div>';
    overdueItems.forEach(function(t){
      var c = secColorMap[t.section]||SEC_COLORS[0];
      html += makeNote(t, c, true, today);
    });
    html += '</div>';
  }

  // Week columns
  mondays.forEach(function(monday) {
    var sunday = addDays(monday, 6);
    var isCurrent = monday === thisMonday;
    var weekNum = getWeekNum(monday);
    var colItems = withDate.filter(function(t){
      return getMonday(t.frist)===monday && !(t.frist<today && t.status!=='Ferdig');
    });

    html += '<div class="uk-week-col'+(isCurrent?' is-current':'')+'">';
    html += '<div class="uk-week-header">';
    html += '<div class="uk-week-label">'+(isCurrent?'&#9679; ':'')+' Uke '+weekNum+'</div>';
    html += '<div class="uk-week-dates">'+fmtDate(monday)+' – '+fmtDate(sunday)+'</div>';
    if(colItems.length>0) html += '<div class="uk-week-count">'+colItems.length+' poster</div>';
    html += '</div>';

    if(colItems.length===0){
      html += '<div class="uk-empty">Ingen poster</div>';
    } else {
      // Sort: Blokkert first, then Pågår, then rest
      colItems.sort(function(a,b){
        var order={'Blokkert':0,'Pågår':1,'Til review':2,'Ikke startet':3,'Ferdig':4};
        return (order[a.status]||3)-(order[b.status]||3);
      });
      colItems.forEach(function(t){
        var c = secColorMap[t.section]||SEC_COLORS[0];
        html += makeNote(t, c, false, today);
      });
    }
    html += '</div>';
  });

  boardEl.innerHTML = html;
}

function makeNote(t, c, forceOverdue, today) {
  var overdue = forceOverdue || (t.frist && t.frist < today && t.status !== 'Ferdig');
  var sc = STATUS_COLORS[t.status]||{bg:'var(--gray-bg)',color:'var(--gray)'};
  var nameLine = t.name.split('\n')[0];
  var extraLines = t.name.split('\n').slice(1).filter(function(l){ return l.trim(); });

  var html = '<div class="uk-note'+(overdue?' overdue':'')+'"'
    + ' style="background:'+c.bg+';color:'+c.color+';border-top-color:'+c.border+(overdue?'':'')+'"'
    + ' onclick="switchTab(\'liste\')" title="'+esc(t.name)+'">';
  html += '<div class="uk-note-section">'+esc(t.section.replace(/^\d+\s+/,''))+'</div>';
  html += '<div class="uk-note-name">'+esc(nameLine);
  if(extraLines.length>0){
    html += '<ul style="margin:4px 0 0 12px;padding:0;font-size:11px;opacity:.75;list-style:disc">';
    extraLines.slice(0,3).forEach(function(l){
      html += '<li>'+esc(l.replace(/^[-–•]\s*/,''))+'</li>';
    });
    if(extraLines.length>3) html += '<li>…</li>';
    html += '</ul>';
  }
  html += '</div>';
  html += '<div class="uk-note-meta">';
  html += '<span class="uk-note-id">'+esc(t.excelId)+'</span>';
  if(t.timer) html += '<span class="uk-note-timer">'+t.timer+'t</span>';
  html += '<span class="uk-note-status" style="background:'+sc.bg+';color:'+sc.color+'">'+t.status+'</span>';
  html += '</div>';
  html += '</div>';
  return html;
}



function deleteTask(id) {
  tasks = tasks.filter(function(t){ return t.id !== id; });
  scheduleAutoSave();
  render();
}

function addTask(section, sub, undersec) {
  var name = 'Ny post';
  tasks.push({
    id: idCounter++, excelId: '',
    section: section, undersec: undersec||'', sub: sub, name: name,
    selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
  });
  scheduleAutoSave();
  render();
  // Focus the new task's name for immediate editing
  var newId = tasks[tasks.length-1].id;
  setTimeout(function(){ startEditName(newId); }, 50);
}



/* ── Underkapittel ── */
function toggleUndersec(sec, usec) {
  if(!undersecOpen[sec]) undersecOpen[sec]={};
  undersecOpen[sec][usec] = (undersecOpen[sec][usec] === false) ? true : false;
  render();
}

var _pendingUkSec = null;
function addUndersec(sec) {
  _pendingUkSec = sec;
  var existing = [];
  tasks.filter(function(t){return t.section===sec;}).forEach(function(t){
    if(existing.indexOf(t.undersec)<0) existing.push(t.undersec);
  });
  var m = sec.match(/^\d+/);
  var prefix = m ? m[0] : '';
  var n = existing.length + 1;
  var defaultName = prefix ? (prefix + '.' + n) : ('Underkapittel ' + n);
  var inp = document.getElementById('ukmodal-input');
  inp.value = defaultName;
  document.getElementById('ukmodal-title').textContent = 'Nytt underkapittel i \"' + sec + '\"';
  document.getElementById('ukmodal-overlay').style.display = 'flex';
  setTimeout(function(){ inp.focus(); inp.select(); }, 50);
  inp.onkeydown = function(e) {
    if (e.key === 'Enter') ukModalConfirm();
    if (e.key === 'Escape') ukModalCancel();
  };
}

function ukModalConfirm() {
  var name = (document.getElementById('ukmodal-input').value || '').trim();
  var sec = _pendingUkSec;
  if (!name || !sec) { ukModalCancel(); return; }
  // Create complete new block
  Object.entries(SECTIONS_DATA[sec]).forEach(function(e) {
    var sub=e[0], items=e[1];
    items.forEach(function(item) {
      tasks.push({
        id:idCounter++, excelId:item.id,
        section:sec, undersec:name, sub:sub, name:item.name,
        selected:false, frist:'', timer:'', status:'Ikke startet', link:'', comment:''
      });
    });
  });
  if(!undersecOpen[sec]) undersecOpen[sec] = {};
  undersecOpen[sec][name] = true;
  ukModalCancel();
  scheduleAutoSave();
  render();
}

function ukModalCancel() {
  document.getElementById('ukmodal-overlay').style.display = 'none';
  _pendingUkSec = null;
}

function deleteUndersec(sec, usec) {
  // Don't allow deleting the last underkapittel
  var allInSec = [];
  tasks.filter(function(t){return t.section===sec;}).forEach(function(t){
    if(allInSec.indexOf(t.undersec)<0) allInSec.push(t.undersec);
  });
  if(allInSec.length<=1) {
    alert('Kan ikke slette siste underkapittel. Hvert kapittel m\u00e5 ha minst ett.');
    return;
  }
  if(!confirm('Slette "'+usec+'" og alle poster under?')) return;
  tasks = tasks.filter(function(t){ return !(t.section===sec && t.undersec===usec); });
  scheduleAutoSave(); render();
}

function startEditUndersecName(spanEl, sec, oldName) {
  var inp=document.createElement('input');
  inp.type='text'; inp.className='undersec-edit-input'; inp.value=oldName;
  spanEl.parentNode.insertBefore(inp, spanEl);
  spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done) return; done=true;
    var n=inp.value.trim()||oldName; inp.remove(); spanEl.style.display='';
    if(n!==oldName){
      tasks.forEach(function(t){if(t.section===sec&&t.undersec===oldName) t.undersec=n;});
      if(undersecOpen[sec]&&undersecOpen[sec][oldName]!==undefined){
        undersecOpen[sec][n]=undersecOpen[sec][oldName]; delete undersecOpen[sec][oldName];
      }
      scheduleAutoSave(); render();
    }
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

/* ── Edit section / sub names ── */
function startEditSecName(spanEl, currentName) {
  var inp=document.createElement('input');
  inp.type='text'; inp.className='sec-name-input';
  inp.value=currentName; inp.style.color=spanEl.style.color||'';
  spanEl.parentNode.insertBefore(inp, spanEl); spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done)return; done=true;
    var n=inp.value.trim()||currentName; inp.remove(); spanEl.style.display='';
    if(n!==currentName) renameSectionKey(currentName, n);
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

function renameSectionKey(o, n) {
  if(SECTIONS_DATA[o]){SECTIONS_DATA[n]=SECTIONS_DATA[o]; delete SECTIONS_DATA[o];}
  if(sectionOpen[o]!==undefined){sectionOpen[n]=sectionOpen[o]; delete sectionOpen[o];}
  if(undersecOpen[o]!==undefined){undersecOpen[n]=undersecOpen[o]; delete undersecOpen[o];}
  tasks.forEach(function(t){if(t.section===o) t.section=n;});
  scheduleAutoSave(); render();
}

function startEditSubName(spanEl) {
  var s=spanEl.getAttribute('data-sec'), sb=spanEl.getAttribute('data-sub');
  var inp=document.createElement('input');
  inp.type='text'; inp.className='sub-name-input'; inp.value=sb;
  spanEl.parentNode.insertBefore(inp, spanEl); spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done)return; done=true;
    var n=inp.value.trim()||sb; inp.remove(); spanEl.style.display='';
    if(n!==sb) renameSubKey(s, sb, n);
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

function renameSubKey(sec, o, n) {
  if(SECTIONS_DATA[sec]&&SECTIONS_DATA[sec][o]){
    SECTIONS_DATA[sec][n]=SECTIONS_DATA[sec][o]; delete SECTIONS_DATA[sec][o];
  }
  tasks.forEach(function(t){if(t.section===sec&&t.sub===o) t.sub=n;});
  scheduleAutoSave(); render();
}

function handleSecCb(cb) {
  var sec = cb.getAttribute('data-sec');
  tasks.forEach(function(t) {
    if (t.section === sec) t.selected = cb.checked;
  });
  scheduleAutoSave();
  render();
}

function handleSubCb(cb) {
  var sec = cb.getAttribute('data-sec');
  var sub = cb.getAttribute('data-sub');
  tasks.forEach(function(t) {
    if (t.section === sec && t.sub === sub) t.selected = cb.checked;
  });
  scheduleAutoSave();
  render();
}

function handleSubAdd(btn) {
  var sec = btn.getAttribute('data-sec');
  var sub = btn.getAttribute('data-sub');
  var us  = btn.getAttribute('data-undersec') || '';
  addTask(sec, sub, us);
}

function toggleSubSelect(section, sub, checked) {
  tasks.forEach(function(t) {
    if (t.section === section && t.sub === sub) t.selected = checked;
  });
  scheduleAutoSave();
  render();
}

var PIN_KEY='bestillingsliste_pin_v1', pinBuffer='', pinCallback=null, pinMode='verify', pinSetFirst='';
function getPin(){ try{ return localStorage.getItem(PIN_KEY)||null; }catch(e){ return null; } }
function savePin(p){ try{ localStorage.setItem(PIN_KEY,p); }catch(e){} }

function requestLockedEdit(id,field,wrapEl){
  var t=tasks.find(t=>t.id===id); if(!t) return;
  var hasVal=field==='frist'?!!t.frist:!!t.timer;
  if(!hasVal){ openInlineEditor(id,field,wrapEl); return; }
  var stored=getPin();
  if(!stored) openPinModal('set-first',null,id,field,wrapEl);
  else openPinModal('verify',stored,id,field,wrapEl);
}

function openInlineEditor(id,field,wrapEl){
  var t=tasks.find(t=>t.id===id), inp=document.createElement('input');
  inp.type=field==='frist'?'date':'number';
  if(field==='timer'){ inp.min='0'; inp.step='0.5'; inp.placeholder='timer'; }
  inp.value=field==='frist'?(t.frist||''):(t.timer||'');
  inp.style.cssText='width:100%;font-size:12px;padding:5px 7px;border:1.5px solid var(--accent);border-radius:5px;background:var(--surface);color:var(--text);outline:none;font-family:inherit;';
  var disp=wrapEl.querySelector('.locked-display'), lock=wrapEl.querySelector('.lock-icon');
  disp.style.display='none'; if(lock) lock.style.display='none';
  wrapEl.appendChild(inp);
  var committed=false;
  var commit=function(){
    if(committed) return; committed=true;
    var val=inp.value; inp.remove(); disp.style.display=''; if(lock) lock.style.display='';
    if(val!==(field==='frist'?t.frist:String(t.timer))){ change(id,field,val); render(); }
  };
  if(field==='frist'){
    inp.addEventListener('change',commit);
    inp.addEventListener('blur',function(){ setTimeout(function(){ if(!committed) commit(); },200); });
    inp.focus(); try{ inp.showPicker(); }catch(e){}
  } else {
    inp.addEventListener('blur',commit);
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') inp.blur(); });
    inp.focus();
  }
}

function openPinModal(mode,correct,id,field,wrapEl){
  pinBuffer=''; pinMode=mode; pinSetFirst='';
  pinCallback=(id!=null)?function(){ openInlineEditor(id,field,wrapEl); }:function(){};
  window._pinCorrect=correct; updatePinDots();
  document.getElementById('pin-error').textContent='';
  document.getElementById('pin-title').textContent=mode==='set-first'?'Sett ny PIN-kode':'PIN-kode kreves';
  document.getElementById('pin-sub').textContent=mode==='set-first'?'Velg en 4-sifret kode som bare du kjenner.':'Skriv inn PIN for \u00e5 endre frist eller timer.';
  document.getElementById('pin-overlay').classList.add('show');
}

function pinKey(k){
  if(k==='del'){ pinBuffer=pinBuffer.slice(0,-1); updatePinDots(); return; }
  if(pinBuffer.length>=4) return;
  pinBuffer+=k; updatePinDots();
  if(pinBuffer.length===4) setTimeout(processPinEntry,100);
}

function processPinEntry(){
  if(pinMode==='verify'){
    if(pinBuffer===window._pinCorrect){ closePinModal(); if(pinCallback) pinCallback(); }
    else{ showPinError('Feil PIN-kode.'); shakeReset(); }
  } else if(pinMode==='set-first'){
    pinSetFirst=pinBuffer; pinBuffer=''; pinMode='set-confirm'; updatePinDots();
    document.getElementById('pin-title').textContent='Bekreft PIN-kode';
    document.getElementById('pin-sub').textContent='Skriv inn samme kode en gang til.';
  } else if(pinMode==='set-confirm'){
    if(pinBuffer===pinSetFirst){ savePin(pinBuffer); closePinModal(); showToast('PIN satt'); if(pinCallback) pinCallback(); }
    else{ showPinError('Kodene stemmer ikke.'); pinSetFirst=''; pinMode='set-first'; shakeReset(); }
  } else if(pinMode==='change-verify'){
    if(pinBuffer===window._pinCorrect){ pinBuffer=''; pinMode='set-first'; pinSetFirst=''; updatePinDots(); document.getElementById('pin-title').textContent='Sett ny PIN-kode'; document.getElementById('pin-sub').textContent='Velg en ny 4-sifret kode.'; document.getElementById('pin-error').textContent=''; }
    else{ showPinError('Feil PIN-kode.'); shakeReset(); }
  }
}
function shakeReset(){ updatePinDots(true); setTimeout(function(){ pinBuffer=''; updatePinDots(false); document.getElementById('pin-error').textContent=''; },650); }
function updatePinDots(err){ for(var i=0;i<4;i++){ var d=document.getElementById('pd'+i); d.classList.toggle('filled',i<pinBuffer.length&&!err); d.classList.toggle('error',!!err); } }
function showPinError(m){ document.getElementById('pin-error').textContent=m; }
function closePinModal(){ document.getElementById('pin-overlay').classList.remove('show'); pinBuffer=''; }
function pinCancel(){ closePinModal(); pinCallback=null; }

function changePinFlow(){
  var stored=getPin();
  if(!stored){ openPinModal('set-first',null,null,null,null); }
  else{ pinBuffer=''; pinMode='change-verify'; pinSetFirst=''; window._pinCorrect=stored; pinCallback=null; updatePinDots(); document.getElementById('pin-error').textContent=''; document.getElementById('pin-title').textContent='Skriv inn n\u00e5v\u00e6rende PIN'; document.getElementById('pin-sub').textContent='Bekreft n\u00e5v\u00e6rende PIN for \u00e5 sette en ny.'; document.getElementById('pin-overlay').classList.add('show'); }
}

function startEditName(id){
  var stored=getPin();
  if(stored) openPinModal('verify',stored,null,null,null);
  else openPinModal('set-first',null,null,null,null);
  pinCallback=function(){ _doStartEditName(id); };
}
function _doStartEditName(id){
  document.getElementById('namedisplay-'+id).style.display='none';
  var w=document.getElementById('nameedit-'+id); w.style.display='block';
  var i=w.querySelector('textarea'); i.focus(); i.select();
}
function commitEditName(id,val){ var v=val.trim(); if(v) change(id,'name',v); document.getElementById('nameedit-'+id).style.display='none'; var disp=document.getElementById('namedisplay-'+id); disp.style.display=''; var t=tasks.find(t=>t.id===id); var nc=disp.querySelector('.task-name-content'); if(nc) nc.innerHTML=makeName(v||t.name); scheduleAutoSave(); }
function cancelEditName(id){ document.getElementById('nameedit-'+id).style.display='none'; document.getElementById('namedisplay-'+id).style.display=''; }

function exportCSV(){ var sel=tasks.filter(t=>t.selected); if(sel.length===0){ showToast('Velg poster f\u00f8rst!'); return; } var csv='\uFEFF'; csv+='ID;Post;Eier;Ansvar/grensesnitt;Seksjon;Delkapittel;Frist;Timer;Status;Fredagstatus;Lenke;Kommentar\n'; sel.forEach(function(t){ csv+='"'+t.excelId+'";"'+t.name.replace(/\n/g,' ')+'";"'+(t.eier||'')+'";"'+(t.ansvar||'')+'";"'+t.section+'";"'+t.sub+'";"'+t.frist+'";"'+t.timer+'";"'+t.status+'";"'+(t.fredagstatus||'')+'";"'+t.link+'";"'+t.comment+'"\n'; }); var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})); a.download='bestillingsliste_'+new Date().toISOString().split('T')[0]+'.csv'; a.click(); showToast('Eksporterte '+sel.length+' poster'); }


/* ════════ Feriekalender ════════ */
var VAC_COLORS = ['#3a8e6e','#5b6fde','#d97757','#9d6cc5','#c9484e','#c98b4e','#4ca3b8','#a64e8d','#5a7d3e','#6f4ec9'];
var VAC_MONTHS_NO = ['JAN','FEB','MAR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DES'];
var VAC_MONTHS_LONG = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];

function vacColorFor(name) {
  if (!name) return VAC_COLORS[0];
  var h = 0;
  for (var i=0; i<name.length; i++) h = (h*31 + name.charCodeAt(i)) | 0;
  return VAC_COLORS[Math.abs(h) % VAC_COLORS.length];
}

function vacParseDate(s) {
  if (!s) return null;
  var p = s.split('-');
  if (p.length !== 3) return null;
  return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
}
function vacIsoDate(d) {
  var y = d.getFullYear();
  var m = String(d.getMonth()+1).padStart(2,'0');
  var dd = String(d.getDate()).padStart(2,'0');
  return y + '-' + m + '-' + dd;
}
function vacDaysBetween(a, b) {
  var d1 = vacParseDate(a), d2 = vacParseDate(b);
  if (!d1 || !d2) return 0;
  return Math.floor((d2 - d1) / 86400000) + 1;
}
function vacFormatNo(s) {
  var d = vacParseDate(s);
  if (!d) return '';
  return d.getDate() + '. ' + VAC_MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear();
}

function vacAdd() {
  var name = document.getElementById('vac-name').value.trim();
  var from = document.getElementById('vac-from').value;
  var to = document.getElementById('vac-to').value;
  var note = document.getElementById('vac-note').value.trim();
  if (!name) { showToast('Skriv inn navn'); document.getElementById('vac-name').focus(); return; }
  if (!from || !to) { showToast('Velg fra- og til-dato'); return; }
  if (from > to) { showToast('Til-dato må være etter fra-dato'); return; }
  vacations.push({ id: vacIdCounter++, name: name, from: from, to: to, note: note });
  try { localStorage.setItem('vac_last_name', name); } catch(e) {}
  document.getElementById('vac-from').value = '';
  document.getElementById('vac-to').value = '';
  document.getElementById('vac-note').value = '';
  scheduleAutoSave();
  vacRender();
  showToast('Ferie lagt til');
}

function vacChange(id, field, value) {
  var v = vacations.find(function(x){return x.id === id;});
  if (!v) return;
  if ((field === 'from' || field === 'to') && value) {
    var f = field === 'from' ? value : v.from;
    var t = field === 'to' ? value : v.to;
    if (f && t && f > t) { showToast('Til-dato må være etter fra-dato'); vacRender(); return; }
  }
  v[field] = value;
  scheduleAutoSave();
  vacRender();
}

function vacDelete(id) {
  var v = vacations.find(function(x){return x.id === id;});
  if (!v) return;
  if (!confirm('Slette ' + (v.name || 'ferien') + ' (' + vacFormatNo(v.from) + ' – ' + vacFormatNo(v.to) + ')?')) return;
  vacations = vacations.filter(function(x){return x.id !== id;});
  scheduleAutoSave();
  vacRender();
}

function vacShiftStart(days) { vacTimelineOffset += days; vacRender(); }
function vacResetStart() { vacTimelineOffset = -7; vacRender(); }

function vacRenderStats() {
  var el = document.getElementById('vac-stats');
  if (!el) return;
  var today = new Date(); today.setHours(0,0,0,0);
  var todayStr = vacIsoDate(today);
  var active = vacations.filter(function(v){ return v.from && v.to && v.from <= todayStr && v.to >= todayStr; }).length;
  var upcoming = vacations.filter(function(v){ return v.from && v.from > todayStr; }).length;
  var people = {};
  vacations.forEach(function(v){ if(v.name) people[v.name]=1; });
  el.innerHTML = '<span><strong>' + Object.keys(people).length + '</strong> personer</span>'
    + '<span><strong>' + active + '</strong> på ferie nå</span>'
    + '<span><strong>' + upcoming + '</strong> kommende</span>';
}

function vacRenderTimeline() {
  var el = document.getElementById('vac-timeline');
  if (!el) return;
  var today = new Date(); today.setHours(0,0,0,0);
  var start = new Date(today);
  start.setDate(start.getDate() + vacTimelineOffset);
  var totalDays = vacTimelineDays;
  var dayPct = 100 / totalDays;
  var endD = new Date(start);
  endD.setDate(endD.getDate() + totalDays - 1);

  var rangeEl = document.getElementById('vac-tl-range');
  if (rangeEl) rangeEl.textContent = vacFormatNo(vacIsoDate(start)) + ' – ' + vacFormatNo(vacIsoDate(endD));

  // Group entries by person
  var names = [];
  var byName = {};
  vacations.forEach(function(v) {
    var n = v.name || '(uten navn)';
    if (!byName[n]) { byName[n] = []; names.push(n); }
    byName[n].push(v);
  });
  names.sort(function(a,b){ return a.localeCompare(b,'no'); });

  // Month headers
  var monthsHtml = '';
  var cursor = new Date(start);
  while (cursor <= endD) {
    var monthStart = (cursor.getDate() === 1) ? new Date(cursor) : new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    if (monthStart < start) monthStart = new Date(start);
    var monthEnd = new Date(cursor.getFullYear(), cursor.getMonth()+1, 0);
    if (monthEnd > endD) monthEnd = new Date(endD);
    var offsetD = Math.floor((monthStart - start) / 86400000);
    var lenD = Math.floor((monthEnd - monthStart) / 86400000) + 1;
    var label = VAC_MONTHS_NO[monthStart.getMonth()];
    if (monthStart.getMonth() === 0 || offsetD === 0) label += ' ' + monthStart.getFullYear();
    monthsHtml += '<div class="vac-tl-month" style="left:' + (offsetD * dayPct) + '%;width:' + (lenD * dayPct) + '%">' + label + '</div>';
    cursor = new Date(monthEnd);
    cursor.setDate(cursor.getDate() + 1);
  }

  // Weekend shading
  var weekendHtml = '';
  for (var i = 0; i < totalDays; i++) {
    var d = new Date(start);
    d.setDate(d.getDate() + i);
    var dow = d.getDay();
    if (dow === 0 || dow === 6) {
      weekendHtml += '<div class="vac-tl-weekend" style="left:' + (i * dayPct) + '%;width:' + dayPct + '%"></div>';
    }
  }

  // Today line
  var todayOffset = Math.floor((today - start) / 86400000);
  var todayHtml = '';
  if (todayOffset >= 0 && todayOffset < totalDays) {
    var pct = (todayOffset + 0.5) * dayPct;
    todayHtml = '<div class="vac-tl-today" style="left:' + pct + '%"></div>';
  }
  var todayLblHtml = (todayOffset >= 0 && todayOffset < totalDays)
    ? '<div class="vac-tl-today-lbl" style="left:' + ((todayOffset + 0.5) * dayPct) + '%">I dag</div>' : '';

  // Build HTML
  var html = '';
  html += '<div class="vac-tl-name vac-tl-header">Person</div>';
  html += '<div class="vac-tl-month-row">' + monthsHtml + todayLblHtml + '</div>';

  if (names.length === 0) {
    html += '<div class="vac-tl-name" style="color:var(--text3);font-weight:400">–</div>';
    html += '<div class="vac-tl-track">' + weekendHtml + todayHtml
      + '<div class="vac-tl-empty">Ingen ferier registrert ennå – bruk skjemaet over for å legge til</div></div>';
  } else {
    names.forEach(function(n) {
      var color = vacColorFor(n);
      var barsHtml = '';
      byName[n].forEach(function(v) {
        var vStart = vacParseDate(v.from);
        var vEnd = vacParseDate(v.to);
        if (!vStart || !vEnd) return;
        if (vEnd < start || vStart > endD) return;
        var s0 = vStart < start ? start : vStart;
        var e0 = vEnd > endD ? endD : vEnd;
        var leftD = Math.floor((s0 - start) / 86400000);
        var widthD = Math.floor((e0 - s0) / 86400000) + 1;
        var totalLen = vacDaysBetween(v.from, v.to);
        var lbl = v.note ? v.note : (totalLen + 'd');
        var title = n + ': ' + vacFormatNo(v.from) + ' – ' + vacFormatNo(v.to) + ' (' + totalLen + ' dager)' + (v.note ? ' · ' + v.note : '');
        barsHtml += '<div class="vac-tl-bar" style="left:' + (leftD * dayPct) + '%;width:' + (widthD * dayPct) + '%;background:' + color + '"'
          + ' title="' + esc(title) + '" onclick="vacFocusRow(' + v.id + ')">' + esc(lbl) + '</div>';
      });
      html += '<div class="vac-tl-name"><span class="vac-dot" style="background:' + color + '"></span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(n) + '</span></div>';
      html += '<div class="vac-tl-track">' + weekendHtml + todayHtml + barsHtml + '</div>';
    });
  }

  el.className = 'vac-timeline';
  el.innerHTML = html;
}

function vacFocusRow(id) {
  var row = document.getElementById('vac-row-' + id);
  if (!row) return;
  row.scrollIntoView({behavior:'smooth', block:'center'});
  row.style.transition = 'background .3s';
  row.style.background = 'var(--blue-bg)';
  setTimeout(function(){ row.style.background = ''; }, 1500);
}

function vacRenderList() {
  var tbody = document.getElementById('vac-tbody');
  if (!tbody) return;
  if (vacations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="vac-empty">Ingen ferier registrert ennå. Bruk skjemaet over for å legge til.</div></td></tr>';
    return;
  }
  var sorted = vacations.slice().sort(function(a,b){ return (a.from||'').localeCompare(b.from||''); });
  var todayStr = vacIsoDate(new Date());
  var html = '';
  sorted.forEach(function(v) {
    var color = vacColorFor(v.name);
    var days = vacDaysBetween(v.from, v.to);
    var isPast = v.to && v.to < todayStr;
    var rowStyle = isPast ? ' style="opacity:.55"' : '';
    html += '<tr id="vac-row-' + v.id + '"' + rowStyle + '>';
    html += '<td><div class="vac-name-cell"><span class="vac-dot" style="background:' + color + '"></span>'
      + '<input type="text" value="' + esc(v.name||'') + '" placeholder="Navn" onchange="vacChange(' + v.id + ',\'name\',this.value)"></div></td>';
    html += '<td><input type="date" value="' + (v.from||'') + '" onchange="vacChange(' + v.id + ',\'from\',this.value)"></td>';
    html += '<td><input type="date" value="' + (v.to||'') + '" onchange="vacChange(' + v.id + ',\'to\',this.value)"></td>';
    html += '<td class="vac-days">' + (days > 0 ? days + ' dager' : '–') + '</td>';
    html += '<td><input type="text" value="' + esc(v.note||'') + '" placeholder="–" onchange="vacChange(' + v.id + ',\'note\',this.value)"></td>';
    html += '<td><button class="vac-del-btn" onclick="vacDelete(' + v.id + ')" title="Slett">×</button></td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function vacRender() {
  vacRenderStats();
  vacRenderTimeline();
  vacRenderList();
  // Prefill name field with last-used name on this device
  var nameField = document.getElementById('vac-name');
  if (nameField && !nameField.value) {
    try { var last = localStorage.getItem('vac_last_name'); if (last) nameField.value = last; } catch(e) {}
  }
}

var autoSaveTimer;
function scheduleAutoSave(){ clearTimeout(autoSaveTimer); autoSaveTimer=setTimeout(function(){ try{ localStorage.setItem('bestillingsliste_v4',JSON.stringify({tasks:tasks,sectionOpen:sectionOpen,undersecOpen:undersecOpen,SECTIONS_DATA:SECTIONS_DATA,vacations:vacations,vacIdCounter:vacIdCounter,projectLinks:projectLinks,linkIdCounter:linkIdCounter,modelLinks:modelLinks,modelIdCounter:modelIdCounter})); }catch(e){} },1200); }
var _change=change;
window.change=function(id,field,val){ _change(id,field,val); scheduleAutoSave(); };
var _toggleSelect=toggleSelect;
window.toggleSelect=function(id){ _toggleSelect(id); scheduleAutoSave(); };


/* ════════ JSONBin Sync ════════ */
var SP_CFG_KEY         = 'bl_jb_cfg_v1';
var SP_API_KEY_KEY     = 'bl_jb_api_v1';
var SP_API_KEY_TS_KEY  = 'bl_jb_api_ts_v1';
var SP_API_KEY_TTL_MS  = 16 * 60 * 60 * 1000;  // 16 hours
var spCfg              = null;
var spTimer            = null;
var spLastVer          = 0;
var spLastHash         = "";




function spLoadConfig() {
  try {
    spCfg = {
      binId: "",
      apiKey: "",
      interval: 20
    };

    try {
      var saved = JSON.parse(localStorage.getItem(SP_CFG_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        if (saved.binId) spCfg.binId = saved.binId;
        if (saved.interval) spCfg.interval = saved.interval;
      }
      // Try to load API key from localStorage with TTL check
      var savedKey = localStorage.getItem(SP_API_KEY_KEY);
      var savedTs = localStorage.getItem(SP_API_KEY_TS_KEY);
      if (savedKey && savedTs) {
        var now = Date.now();
        var age = now - parseInt(savedTs);
        if (age < SP_API_KEY_TTL_MS) {
          // TTL still valid
          spCfg.apiKey = savedKey;
        } else {
          // TTL expired, clear stored key
          localStorage.removeItem(SP_API_KEY_KEY);
          localStorage.removeItem(SP_API_KEY_TS_KEY);
        }
      }
    } catch(e) {
      // ignore invalid config
    }

    var binEl = document.getElementById('sp-bin-id');
    var apiKeyEl = document.getElementById('sp-api-key');
    var intEl = document.getElementById('sp-interval');

    if (binEl) binEl.value = spCfg.binId;
    if (apiKeyEl) apiKeyEl.value = spCfg.apiKey;
    if (intEl) intEl.value = spCfg.interval;

    if (spCfg.binId && spCfg.apiKey) {
      spSetConnected(true);
      spSetStatus('Koblet til.', 'ok');
      spLastHash = '';
      spPull();
      spStartPolling();
    } else {
      spSetConnected(false);
      spSetStatus('Ikke konfigurert. Fyll inn Bin ID og API Key for å aktivere delt lagring.', '');
    }
  } catch(e) {
    console.error(e);
  }
}





function spConnect() {
  var binId    = (document.getElementById('sp-bin-id').value  || '').trim();
  var apiKey   = (document.getElementById('sp-api-key').value || '').trim();
  spLastHash = '';  // force first pull to merge
  var interval = parseInt(document.getElementById('sp-interval').value) || 20;
  if (!binId) { spSetStatus('Fyll inn Bin ID.', 'err'); return; }
  if (!apiKey) { spSetStatus('Fyll inn JSONBin API Key.', 'err'); return; }
  spCfg = { binId: binId, apiKey: apiKey, interval: interval };
  try { localStorage.setItem(SP_CFG_KEY, JSON.stringify({binId: binId, interval: interval})); } catch(e) {}
  try { localStorage.setItem(SP_API_KEY_KEY, apiKey); localStorage.setItem(SP_API_KEY_TS_KEY, Date.now().toString()); } catch(e) {}
  spSetConnected(true);
  spSetStatus('Kobler til…', '');
  spPull();
  spStartPolling();
}

function spDisconnect() {
  spStopPolling();
  spCfg = null;
  try { localStorage.removeItem(SP_CFG_KEY); } catch(e) {}
  try { localStorage.removeItem(SP_API_KEY_KEY); localStorage.removeItem(SP_API_KEY_TS_KEY); } catch(e) {}
  spSetConnected(false);
  spSetDot('');
  spSetStatus('Frakoblet. Fyll inn ny konfigurasjon for å koble til igjen.', '');
}

function spSetConnected(on) {
  ['sp-push-btn','sp-pull-btn','sp-disc-btn'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = on ? '' : 'none';
  });
  var connectBtn = document.getElementById('sp-connect-btn');
  if (connectBtn) connectBtn.textContent = on ? 'Oppdater' : 'Koble til';
  document.getElementById('sp-label').textContent = on ? 'Delt ✓' : 'Delt lagring';
}


function spStartPolling() {
  spStopPolling();
  if (!spCfg) return;

  // Bruk interval-feltet hvis det finnes, ellers bruk spCfg.interval (default 20)
  var intEl = document.getElementById('sp-interval');
  var sec = parseInt(intEl ? intEl.value : (spCfg.interval || 20), 10);

  // Litt robusthet
  if (!sec || sec < 10) sec = 20;

  spTimer = setInterval(spPull, sec * 1000);
}

function spStopPolling() { if (spTimer) { clearInterval(spTimer); spTimer = null; } }

function spUrl()     { return 'https://api.jsonbin.io/v3/b/' + encodeURIComponent(spCfg.binId); }
function spHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Master-Key': spCfg.apiKey || ''
  };
}

async function spPush() {
  if (!spCfg) return;
  spSetDot('busy');
  try {
    var ts = Date.now();
    var payload = {
      tasks: tasks, sectionOpen: sectionOpen, undersecOpen: undersecOpen,
      SECTIONS_DATA: SECTIONS_DATA, vacations: vacations, vacIdCounter: vacIdCounter,
      projectLinks: projectLinks, linkIdCounter: linkIdCounter,
      modelLinks: modelLinks, modelIdCounter: modelIdCounter,
      ts: ts
    };
    var r = await fetch(spUrl(), {
      method: 'PUT',
      headers: spHeaders(),
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      var errText = await r.text().catch(function(){return '';});
      throw new Error('HTTP ' + r.status + ' ' + errText.substring(0,100));
    }
    var data = await r.json();
    spLastVer = (data.metadata || {}).version || spLastVer + 1;
    // Update hash so next pull doesn't re-merge our own data
    spLastHash = ts + '_' + tasks.length + '_' + vacations.length;
    spSetDot('ok');
    spSetStatus('✓ Lastet opp ' + spTime(), 'ok');
  } catch(e) {
    spSetDot('err');
    spSetStatus('Feil ved opplasting: ' + e.message, 'err');
  }
}

async function spPull() {
  if (!spCfg) return;
  spSetDot('busy');
  try {
    // Add cache-buster to prevent stale responses
    var r = await fetch(spUrl() + '/latest?_=' + Date.now(), {
      headers: spHeaders(),
      cache: 'no-store'
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    var data = await r.json();
    if (!data.record) {
      spSetDot('err');
      spSetStatus('Tom respons fra server', 'err');
      return;
    }
    // Compare by timestamp + content size (more reliable than version)
    var remoteTs = data.record.ts || 0;
    var remoteTaskCount = (data.record.tasks || []).length;
    var remoteVacCount  = (data.record.vacations || []).length;
    var remoteSig = remoteTs + '_' + remoteTaskCount + '_' + remoteVacCount;
    if (remoteSig !== spLastHash) {
      spLastHash = remoteSig;
      spMerge(data.record);
    }
    spSetDot('ok');
    spSetStatus('✓ Synkronisert ' + spTime(), 'ok');
  } catch(e) {
    spSetDot('err');
    spSetStatus('Feil: ' + e.message + '. Sjekk Bin ID og API-nøkkel.', 'err');
  }
}

function spMerge(remote) {
  if (!remote || !remote.tasks) return;

  // Restore section structure first
  if (remote.SECTIONS_DATA) {
    Object.keys(SECTIONS_DATA).forEach(function(k){ delete SECTIONS_DATA[k]; });
    Object.assign(SECTIONS_DATA, remote.SECTIONS_DATA);
  }

  // Replace tasks entirely with remote version (preserves underkapitler exactly as sender has them)
  tasks = remote.tasks.map(function(s) {
    return {
      id: s.id,
      excelId: s.excelId || '',
      section: s.section,
      undersec: s.undersec || '',
      sub: s.sub || '',
      name: s.name || '',
      selected: !!s.selected,
      frist: s.frist || '',
      timer: s.timer || '',
      status: s.status || 'Ikke startet',
      link: s.link || '',
      comment: s.comment || ''
    };
  });

  // Update idCounter so new tasks don't collide
  tasks.forEach(function(t){ if (t.id >= idCounter) idCounter = t.id + 1; });

  // Restore other state
  if (remote.sectionOpen)  Object.assign(sectionOpen, remote.sectionOpen);
  if (remote.undersecOpen) Object.assign(undersecOpen, remote.undersecOpen);
  if (remote.vacations) {
    vacations = remote.vacations;
    vacIdCounter = remote.vacIdCounter || (Math.max.apply(null, [0].concat(vacations.map(function(v){return v.id||0;}))) + 1);
  }

  // Restore document links
  if (remote.projectLinks) {
    projectLinks = remote.projectLinks;
    linkIdCounter = remote.linkIdCounter || (Math.max.apply(null, [0].concat(projectLinks.map(function(l){return l.id||0;}))) + 1);
  }

  // Restore model links
  if (remote.modelLinks) {
    modelLinks = remote.modelLinks;
    modelIdCounter = remote.modelIdCounter || (Math.max.apply(null, [0].concat(modelLinks.map(function(l){return l.id||0;}))) + 1);
  }

  // Persist locally and re-render
  try {
    localStorage.setItem('bestillingsliste_v4', JSON.stringify({
      tasks: tasks, sectionOpen: sectionOpen, undersecOpen: undersecOpen,
      SECTIONS_DATA: SECTIONS_DATA, vacations: vacations, vacIdCounter: vacIdCounter,
      projectLinks: projectLinks, linkIdCounter: linkIdCounter,
      modelLinks: modelLinks, modelIdCounter: modelIdCounter
    }));
  } catch(e) {}
  render();
  renderLinks();
  renderModelLinks();
  if (activeTab === 'ferie') vacRender();
  if (activeTab === 'dashboard') renderDashboard();
  if (activeTab === 'ukeplan') renderUkeplan();
}


function spSetDot(s) { var d=document.getElementById('sp-dot'); if(d) d.className='sp-dot'+(s==='ok'?' ok':s==='busy'?' busy':s==='err'?' err':''); }
function spSetStatus(msg, type) { var el=document.getElementById('sp-status'); if(!el) return; el.textContent=msg; el.className='sp-status'+(type==='ok'?' ok':type==='err'?' err':''); }
function spTime() { return new Date().toLocaleTimeString('no',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); }
function spOpenModal() { document.getElementById('sp-overlay').classList.add('show'); }
function spCloseModal() { document.getElementById('sp-overlay').classList.remove('show'); spStartPolling(); }

// Override scheduleAutoSave to also push to SharePoint when configured
var _origScheduleAutoSave = scheduleAutoSave;
scheduleAutoSave = function() {
  _origScheduleAutoSave();
  if (spCfg) {
    clearTimeout(window._spDebounce);
    window._spDebounce = setTimeout(spPush, 2000);
  }
};
window.scheduleAutoSave = scheduleAutoSave;

// If saved data exists, load it first (skip auto-creating default underkapitler)
var _hasSaved = false;
try { _hasSaved = !!localStorage.getItem('bestillingsliste_v4'); } catch(e) {}


window.addEventListener('DOMContentLoaded', function () {
  initTasks();
  render();
  renderLinks();
  renderModelLinks();
  spLoadConfig();
});






// sørg for at lagring skjer etter endring

document.addEventListener("change", scheduleAutoSave);
document.addEventListener("input", scheduleAutoSave);
document.addEventListener("click", function(e){
    if(e.target.matches("select, input, textarea, button")){
        scheduleAutoSave();
    }
});





var _pn=localStorage.getItem('projectName');
if(_pn){
    var _pnel=document.getElementById('project-name');
    if(_pnel) _pnel.textContent=_pn;
}
``


