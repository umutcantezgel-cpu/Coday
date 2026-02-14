#!/bin/bash
set -e
SRC="Bilder Webseite"
DST="public/assets/images"

# Create directory structure
mkdir -p "$DST/industries/gastronomie"
mkdir -p "$DST/industries/handwerk"
mkdir -p "$DST/industries/healthcare"
mkdir -p "$DST/industries/real-estate"
mkdir -p "$DST/industries/retail"
mkdir -p "$DST/industries/finance"
mkdir -p "$DST/industries/education"
mkdir -p "$DST/industries/beauty"
mkdir -p "$DST/industries/pets"
mkdir -p "$DST/industries/logistics"
mkdir -p "$DST/industries/creative"
mkdir -p "$DST/industries/tech"
mkdir -p "$DST/industries/coaching"
mkdir -p "$DST/industries/garden"
mkdir -p "$DST/industries/pool"
mkdir -p "$DST/industries/cleaning"
mkdir -p "$DST/industries/dance"
mkdir -p "$DST/services/web-design"
mkdir -p "$DST/services/marketing"
mkdir -p "$DST/services/seo"
mkdir -p "$DST/services/consulting"
mkdir -p "$DST/services/app-design"
mkdir -p "$DST/services/video-content"
mkdir -p "$DST/services/email-marketing"
mkdir -p "$DST/services/social-media"
mkdir -p "$DST/general/office"
mkdir -p "$DST/general/team"
mkdir -p "$DST/general/illustrations"
mkdir -p "$DST/general/portraits"
mkdir -p "$DST/general/mockups"
mkdir -p "$DST/general/reviews"
mkdir -p "$DST/general/local-business"
mkdir -p "$DST/general/process"

echo "Moving images..."

# ── GASTRONOMIE ──
mv "$SRC/gastronom-schuerze-willkommen-restaurant-eingang-menuetafel-terrasse-gaeste.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true
mv "$SRC/branche-gasthaus-pension-gastwirt-begruessung-blumenkasten-gemuelich.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true
mv "$SRC/branche-kochkurs-kueche-kochtechnik-schueler-gemuese-demonstration.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true
mv "$SRC/portrait-koch-kochmuetze-tuerkise-schuerze-kueche-gastronomie.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true
mv "$SRC/mockup-website-restaurant-gasthaus-menu-standort-karte-responsive.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true
mv "$SRC/mockup-website-restaurant-speisekarte-vorspeisen-hauptgerichte-desserts-responsive.jpeg" "$DST/industries/gastronomie/" 2>/dev/null || true

# ── HANDWERK ──
for f in "$SRC"/handwerker-arbeitskleidung-werkzeug-einsatz-*.jpeg; do mv "$f" "$DST/industries/handwerk/" 2>/dev/null || true; done
for f in "$SRC"/handwerker-illustration-beruf-generisch-*.jpeg; do mv "$f" "$DST/industries/handwerk/" 2>/dev/null || true; done
for f in "$SRC"/handwerker-kundenservice-vor-ort-*.jpeg; do mv "$f" "$DST/industries/handwerk/" 2>/dev/null || true; done
mv "$SRC/handwerker-schraubenschluessel-smartphone-5-sterne-rating-50-bewertungskarten-hexagon.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/portrait-handwerker-helm-warnweste-baustelle-vertrauen-hexagon.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/portrait-elektriker-blaue-arbeitskleidung-blitz-logo-werkzeugwand.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/portrait-klempner-installateur-tuerkises-hemd-werkzeugguertel-sanitaer.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/elektriker-warnweste-messgeraet-sicherungskasten-offen-digitaldisplay-wellenform.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/maler-latzhose-leiter-farbroller-wand-tuerkis-farbeimer-pinsel-abdeckfolie.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/dachdecker-hausdach-sicherheitsgurt-tablet-analytics-diagramme-stadtsilhouette.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/tischler-schreinerei-werkstatt-holzbearbeitung-saege-hobel.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/branche-fliesenleger-badezimmer-fliesen-wasserwaage-laser-handwerker.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/branche-geruestbau-baustelle-bauarbeiter-schutzhelm-kran-hoehenarbeit.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/branche-glaserei-fenstermontage-saugnapf-firmentransporter-handwerker.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/branche-schweisser-service-werkstatt-funken-stahltraeger-schutzmaske.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/branche-steinmetz-bildhauer-saeulenkapitell-werkstatt-meissel.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/klimatechniker-kniet-dach-tablet-diagnoseapp-klimaanlage-geoeffnet-stadtsilhouette.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/kfz-mechaniker-computer-dashboard-analytics-auto-hebebuehne-werkzeugwand-schraubenschluessel.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/techniker-waschmaschine-reparatur-tablet-schraubenschluessel-frontblende-werkzeugkoffer.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/mockup-website-autowerkstatt-leistungen-inspektion-reifen-oel-tuev-bewertungen.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/hexagon-collage-zimmermann-hammer-elektriker-kabel-bauarbeiter-helm-koch-brot-buero-laptop.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true
mv "$SRC/hausgeraete-service-reparatur-elektrogeraet-kundendienst.jpeg" "$DST/industries/handwerk/" 2>/dev/null || true

# ── HEALTHCARE ──
mv "$SRC/portrait-aerztin-dr-med-stethoskop-klemmbrett-hexagon-medizin.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/apothekerin-weisser-kittel-kundenberatung-rezept-bildschirm-medikamentenregale.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/apothekerin-zeigt-tablet-digitalrezept-kunde-apothekenkreuz-beratung.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/branche-optiker-augenarzt-phoropter-brillenregal-sehtafel-vision-care.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/branche-psychotherapie-coaching-therapeut-gespraech-sessel-pflanze.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/branche-erste-hilfe-kurs-cpr-training-puppe-koffer-schulung.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/mockup-website-arztpraxis-aerzte-team-terminbuchung-online-buchen.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true
mv "$SRC/mockup-website-zahnarztpraxis-terminbuchung-prophylaxe-implantate-bleaching.jpeg" "$DST/industries/healthcare/" 2>/dev/null || true

# ── REAL ESTATE ──
mv "$SRC/branche-immobilien-maklerin-wohnungsbesichtigung-moebliert-modern.jpeg" "$DST/industries/real-estate/" 2>/dev/null || true
mv "$SRC/portrait-immobilienmaklerin-halstuch-wohnungen-zuhause-hexagon.jpeg" "$DST/industries/real-estate/" 2>/dev/null || true
mv "$SRC/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.jpeg" "$DST/industries/real-estate/" 2>/dev/null || true

# ── RETAIL ──
mv "$SRC/einzelhandel-geschaeft-verkauf-laden-kunde-service.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/buchhandlung-innenraum-buecher-regale-leseecke-gemutlich.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/kunde-buchhandlung-holzregale-staff-picks-schild-sessel-teppich-pflanzen.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/geschenkeladen-sortiment-verpackungen-dekoration-einzelhandel.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/verkaeuferin-geschenkboutique-zauberhafte-geschenke-bunte-boxen-regale-kasse.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/branche-elektronikgeschaeft-tablet-smartphone-smart-home-beratung.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/branche-sportgeschaeft-beratung-schuhe-baelle-rucksack-sale.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/branche-juwelier-schmuck-ring-uhren-ketten-exklusiv-beratung.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/kleinunternehmen-ladengeschaeft-regional-service.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/lokales-geschaeft-inhaber-schaufenster-laden.jpeg" "$DST/industries/retail/" 2>/dev/null || true
mv "$SRC/baecker-schuerze-schaufenster-local-crumb-brot-broetchen-muffins-holzregale.jpeg" "$DST/industries/retail/" 2>/dev/null || true

# ── BEAUTY ──
mv "$SRC/friseur-haarschnitt-kundin-schere-kamm-spiegel-friseurstuhl-pflegeprodukte.jpeg" "$DST/industries/beauty/" 2>/dev/null || true
mv "$SRC/portrait-kosmetikerin-friseurin-dunkelblauer-kittel-spiegel-salon.jpeg" "$DST/industries/beauty/" 2>/dev/null || true
mv "$SRC/mockup-app-friseur-buchungssystem-schritt-fuer-schritt-service-stylist-kalender.jpeg" "$DST/industries/beauty/" 2>/dev/null || true
mv "$SRC/mockup-app-friseur-terminbuchung-stylisten-preise-service-auswahl.jpeg" "$DST/industries/beauty/" 2>/dev/null || true
mv "$SRC/mockup-app-terminbuchung-friseur-servicemenu-smartphone-haarschnitt-styling.jpeg" "$DST/industries/beauty/" 2>/dev/null || true
mv "$SRC/hundesalon-tierpflege-grooming-hund-pflege-salon.jpeg" "$DST/industries/beauty/" 2>/dev/null || true

# ── FINANCE ──
mv "$SRC/finanzberater-buero-beratung-dokumente-kunde.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/finanzberatung-gespraech-planung-investition.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/branche-finanzberatung-budget-plan-schuldenabbau-diagramm-beratung.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/branche-anlageplanung-berater-portfolio-wachstum-diagramm-hexagon.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/buchhalterin-schreibtisch-taschenrechner-finanzdiagramme-aktenordner-analyse.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/steuerberaterin-buero-dokumente-statistiken-ordner-kalkulation.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/branche-lohnbuchhaltung-gehaltsabrechnung-computer-kalender-buero.jpeg" "$DST/industries/finance/" 2>/dev/null || true
mv "$SRC/mockup-website-steuerkanzlei-team-timeline-werte-vertrauen-kompetenz.jpeg" "$DST/industries/finance/" 2>/dev/null || true

# ── EDUCATION ──
mv "$SRC/branche-fruehbildung-kindergarten-erzieherin-vorlesen-spielzeug-bunt.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/branche-coding-bootcamp-programmierung-lehrer-laptop-schueler-code.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/branche-kunstunterricht-malstudio-staffelei-pinsel-farben-kind.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/branche-reitunterricht-reiterin-pferd-trainerin-reitstall-natur.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/branche-fahrschule-anmeldung-preise-basis-intensiv-ferienkurs-theorie-app.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/mockup-website-fahrschule-anmeldung-preise-basis-intensiv-ferienkurs-theorie-app.jpeg" "$DST/industries/education/" 2>/dev/null || true
mv "$SRC/portrait-lehrerin-tuerkise-strickjacke-klassenzimmer-tafel-bildung.jpeg" "$DST/industries/education/" 2>/dev/null || true

# ── PETS ──
mv "$SRC/branche-pet-sitting-hundebetreuung-gassi-service-park-drei-hunde.jpeg" "$DST/industries/pets/" 2>/dev/null || true
mv "$SRC/branche-tierfotografie-studio-hund-fotograf-studiobeleuchtung-monitor.jpeg" "$DST/industries/pets/" 2>/dev/null || true
mv "$SRC/mockup-app-tierarzt-notdienst-24h-mobil-anfahrt-checkliste.jpeg" "$DST/industries/pets/" 2>/dev/null || true

# ── LOGISTICS ──
mv "$SRC/branche-b2b-logistik-containerhafen-gabelstapler-tablet-arbeiter.jpeg" "$DST/industries/logistics/" 2>/dev/null || true
mv "$SRC/branche-lagerlogistik-hochregal-gabelstapler-tablet-foerderband.jpeg" "$DST/industries/logistics/" 2>/dev/null || true
mv "$SRC/branche-paketlieferung-kurier-haustuer-lieferwagen-uebergabe.jpeg" "$DST/industries/logistics/" 2>/dev/null || true
mv "$SRC/branche-flughafen-transfer-shuttle-bus-terminal-gepaeck-fahrer.jpeg" "$DST/industries/logistics/" 2>/dev/null || true

# ── CREATIVE ──
mv "$SRC/branche-grafikdesigner-computer-logo-design-farbpalette-kreativ.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/fotograf-kamera-stativ-softbox-studiobeleuchtung-tuerkis-hintergrund-reflektor.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/fotostudio-equipment-beleuchtung-hintergrund-professionell.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/branche-videoproduktion-interview-filmteam-kamera-beleuchtung.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/branche-podcast-produktion-mikrofone-analytics-zwei-personen-studio.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/mockup-website-fotograf-lichtblick-portfolio-hochzeit-ueber-mich.jpeg" "$DST/industries/creative/" 2>/dev/null || true
mv "$SRC/mockup-website-fotograf-portfolio-hochzeit-portrait-business-event-galerie.jpeg" "$DST/industries/creative/" 2>/dev/null || true

# ── TECH ──
mv "$SRC/it-beratung-computer-support-bildschirm-technik.jpeg" "$DST/industries/tech/" 2>/dev/null || true
mv "$SRC/it-techniker-ausweis-dual-monitor-erklaert-kundin-laptop-serverrack-netzwerkkabel.jpeg" "$DST/industries/tech/" 2>/dev/null || true
mv "$SRC/branche-cloud-services-serverracks-it-techniker-skalierbar-hexagon.jpeg" "$DST/industries/tech/" 2>/dev/null || true
mv "$SRC/branche-cybersecurity-bedrohungserkennung-security-center-weltkarte-malware.jpeg" "$DST/industries/tech/" 2>/dev/null || true
mv "$SRC/portrait-it-support-headset-laptop-hexagon-netzwerklinien.jpeg" "$DST/industries/tech/" 2>/dev/null || true
mv "$SRC/mockup-website-it-loesungen-cloud-cybersecurity-managed-it-kundenlogos.jpeg" "$DST/industries/tech/" 2>/dev/null || true

# ── GARDEN ──
mv "$SRC/gaertner-rasenmaeher-einfamilienhaus-firmentransporter-blattlogo-heckenschere-laubblaeser.jpeg" "$DST/industries/garden/" 2>/dev/null || true
mv "$SRC/gartenservice-mitarbeiter-pflanzen-outdoor-professionell.jpeg" "$DST/industries/garden/" 2>/dev/null || true
mv "$SRC/landschaftsgaertner-gruenpflege-garten-hecke-rasen-arbeitskleidung.jpeg" "$DST/industries/garden/" 2>/dev/null || true
mv "$SRC/branche-gartenzentrum-gewaechshaus-beratung-topfpflanzen-gruen.jpeg" "$DST/industries/garden/" 2>/dev/null || true
mv "$SRC/blumenladen-floristin-werkstatt-vasen-pflanzen-schaufenster.jpeg" "$DST/industries/garden/" 2>/dev/null || true
mv "$SRC/florist-bindet-blumenstrauss-rosen-tulpen-geschenkpapier-topfpflanzen-laden.jpeg" "$DST/industries/garden/" 2>/dev/null || true

# ── POOL ──
mv "$SRC/pool-reinigung-service-outdoor-technik.jpeg" "$DST/industries/pool/" 2>/dev/null || true
mv "$SRC/poolservice-wasserqualitaet-pruefung-schwimmbad-wartung.jpeg" "$DST/industries/pool/" 2>/dev/null || true
mv "$SRC/pooltechniker-kniet-beckenrand-wassertest-teststreifen-testkit-modernes-haus-garten.jpeg" "$DST/industries/pool/" 2>/dev/null || true

# ── CLEANING ──
mv "$SRC/reinigungskraft-gebaeudereinigung-professionell-sauberkeit-service.jpeg" "$DST/industries/cleaning/" 2>/dev/null || true
mv "$SRC/mockup-website-reinigungsservice-preise-pakete-basis-intensiv-premium-rechner.jpeg" "$DST/industries/cleaning/" 2>/dev/null || true

# ── DANCE ──
mv "$SRC/tanzschule-kurs-bewegung-studio-training.jpeg" "$DST/industries/dance/" 2>/dev/null || true
mv "$SRC/tanzstudio-ballettunterricht-taenzer-spiegel-stange.jpeg" "$DST/industries/dance/" 2>/dev/null || true

# ── COACHING ──
mv "$SRC/branche-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.jpeg" "$DST/industries/coaching/" 2>/dev/null || true
mv "$SRC/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.jpeg" "$DST/industries/coaching/" 2>/dev/null || true

# ── LAW ──
mkdir -p "$DST/industries/law"
mv "$SRC/portrait-rechtsanwalt-anzug-richterhammer-zertifikate-kanzlei.jpeg" "$DST/industries/law/" 2>/dev/null || true
mv "$SRC/mockup-website-anwaltskanzlei-kompetenzen-unternehmensrecht-familienrecht-team.jpeg" "$DST/industries/law/" 2>/dev/null || true
mv "$SRC/mockup-website-anwaltskanzlei-kontakt-formular-standort-berlin-faq.jpeg" "$DST/industries/law/" 2>/dev/null || true

# ── ARCHITECTURE ──
mkdir -p "$DST/industries/architecture"
mv "$SRC/architekt-cad-grundriss-monitor-3d-drucker-gebaeudemodell-stadtpanorama.jpeg" "$DST/industries/architecture/" 2>/dev/null || true
mv "$SRC/branche-architekturstudio-cad-grundriss-3d-drucker-stadtsilhouette-hexagon.jpeg" "$DST/industries/architecture/" 2>/dev/null || true
mv "$SRC/portrait-architekt-bauleiter-helm-bauplaene-kran-hexagon.jpeg" "$DST/industries/architecture/" 2>/dev/null || true

# ═══════════════════════════════════════════
# SERVICES
# ═══════════════════════════════════════════

# ── WEB DESIGN ──
mv "$SRC/website-builder-drag-drop-baukasten-elemente-webdesign.jpeg" "$DST/services/web-design/" 2>/dev/null || true
mv "$SRC/branche-app-design-wireframe-ui-tablet-stylus-kreativ.jpeg" "$DST/services/app-design/" 2>/dev/null || true

# ── MARKETING ──
for f in "$SRC"/marketing-strategie-planung-konzept-*.jpeg; do mv "$f" "$DST/services/marketing/" 2>/dev/null || true; done
mv "$SRC/branche-b2b-marketing-arbeitsplatz-laptop-pinnwand-notizen-kmu.jpeg" "$DST/services/marketing/" 2>/dev/null || true
mv "$SRC/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.jpeg" "$DST/services/marketing/" 2>/dev/null || true
mv "$SRC/digital-transformation-zeitung-zu-smartphone-social-media-werbung-evolution.jpeg" "$DST/services/marketing/" 2>/dev/null || true
mv "$SRC/online-praesenz-digitale-sichtbarkeit-internet-marketing.jpeg" "$DST/services/marketing/" 2>/dev/null || true

# ── SOCIAL MEDIA ──
mv "$SRC/branche-social-media-management-kalender-analytics-facebook-instagram-linkedin.jpeg" "$DST/services/social-media/" 2>/dev/null || true
mv "$SRC/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.jpeg" "$DST/services/social-media/" 2>/dev/null || true

# ── EMAIL MARKETING ──
mv "$SRC/email-marketing-kampagne-newsletter-zielgruppe-versand.jpeg" "$DST/services/email-marketing/" 2>/dev/null || true

# ── SEO ──
mv "$SRC/SEO__Jenseits_der_Checkliste.mp4" "$DST/services/seo/" 2>/dev/null || true

# ── VIDEO CONTENT ──
mv "$SRC/video-content-streaming-plattform-play-button-multimedia.jpeg" "$DST/services/video-content/" 2>/dev/null || true

# ═══════════════════════════════════════════
# GENERAL
# ═══════════════════════════════════════════

# ── OFFICE ──
for f in "$SRC"/buero-arbeitsplatz-modern-schreibtisch-*.jpeg; do mv "$f" "$DST/general/office/" 2>/dev/null || true; done
mv "$SRC/datenanalyse-business-intelligence-reporting-statistiken-auswertung.jpeg" "$DST/general/office/" 2>/dev/null || true

# ── TEAM ──
mv "$SRC/business-meeting-besprechung-team-konferenz.jpeg" "$DST/general/team/" 2>/dev/null || true
mv "$SRC/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.jpeg" "$DST/general/team/" 2>/dev/null || true
mv "$SRC/branche-team-meeting-buero-laptop-analytics-dokumente-stadtsilhouette.jpeg" "$DST/general/team/" 2>/dev/null || true
mv "$SRC/branche-unternehmensanalyse-2024-praesentation-team-meeting-diagramme.jpeg" "$DST/general/team/" 2>/dev/null || true
mv "$SRC/team-buero-high-five-erfolg-feiern-banner-konfetti-ziel-erreicht-medaillen-wachstum.jpeg" "$DST/general/team/" 2>/dev/null || true

# ── ILLUSTRATIONS ──
for f in "$SRC"/dienstleistung-service-illustration-*.jpeg; do mv "$f" "$DST/general/illustrations/" 2>/dev/null || true; done

# ── PORTRAITS ──
mv "$SRC/portrait-bueroleiterin-tuerkiser-blazer-grossraumbuero-stadtsilhouette.jpeg" "$DST/general/portraits/" 2>/dev/null || true
mv "$SRC/portrait-geschaeftsfrau-dunkelblauer-blazer-tuerkise-bluse-hexagon.jpeg" "$DST/general/portraits/" 2>/dev/null || true
mv "$SRC/portrait-geschaeftsfrau-verschraenkte-arme-tuerkis-grau-minimalistisch-flat-design.jpeg" "$DST/general/portraits/" 2>/dev/null || true
mv "$SRC/portrait-geschaeftsmann-senior-grauer-anzug-tuerkise-krawatte-minimalistisch.jpeg" "$DST/general/portraits/" 2>/dev/null || true
mv "$SRC/portrait-geschaeftsmann-tuerkiser-blazer-digitale-loesungen-kmu-minimalistisch.jpeg" "$DST/general/portraits/" 2>/dev/null || true
mv "$SRC/portrait-marketing-managerin-nexus-diagramme-buero-pflanze.jpeg" "$DST/general/portraits/" 2>/dev/null || true

# ── MOCKUPS ──
mv "$SRC/mockup-website-b2b-loesungen-responsive-laptop-smartphone-prozessoptimierung.jpeg" "$DST/general/mockups/" 2>/dev/null || true
mv "$SRC/mockup-website-lokaldienste-haus-illustration-kontaktformular-partner.jpeg" "$DST/general/mockups/" 2>/dev/null || true
mv "$SRC/mockup-app-kalenderansicht-datum-auswaehlen-smartphone-oktober.jpeg" "$DST/general/mockups/" 2>/dev/null || true

# ── REVIEWS ──
mv "$SRC/drei-kunden-daumen-hoch-5-sterne-sprechblasen-bewertungen-zufrieden.jpeg" "$DST/general/reviews/" 2>/dev/null || true
mv "$SRC/mann-bewertungskarte-smartphone-location-pin-4-5-sterne-haekchen-verifiziert.jpeg" "$DST/general/reviews/" 2>/dev/null || true
mv "$SRC/online-bewertungen-sterne-feedback-reputation.jpeg" "$DST/general/reviews/" 2>/dev/null || true
mv "$SRC/kundenfeedback-team-sterne-rezensionen-positiv.jpeg" "$DST/general/reviews/" 2>/dev/null || true

# ── LOCAL BUSINESS ──
mv "$SRC/altstadt-lokale-geschaefte-standort-regional-suche.jpeg" "$DST/general/local-business/" 2>/dev/null || true
mv "$SRC/geschaeftsfrau-smartphone-karte-location-pin-ihr-lokales-unternehmen-handwerker-kmu.jpeg" "$DST/general/local-business/" 2>/dev/null || true

# ── PROCESS ──
mv "$SRC/geschaeftsmann-anzug-workflow-schritt-1-2-3-kreise-verbunden-haekchen-fertig.jpeg" "$DST/general/process/" 2>/dev/null || true
mv "$SRC/geschaeftsmann-laptop-analytics-overview-balkendiagramm-kreisdiagramm-kennzahlen-performance.jpeg" "$DST/general/process/" 2>/dev/null || true
mv "$SRC/tablet-kalender-monatsansicht-tag-12-zeitslots-book-now-button-drei-personen.jpeg" "$DST/general/process/" 2>/dev/null || true

# ── CONSULTING ──
mv "$SRC/kundenberatung-gespraech-meeting-service-professionell.jpeg" "$DST/services/consulting/" 2>/dev/null || true

# Move remaining uncategorized images to general/illustrations
for f in "$SRC"/*.jpeg; do
  mv "$f" "$DST/general/illustrations/" 2>/dev/null || true
done

echo "Done! Counting files..."
find "$DST" -name "*.jpeg" -o -name "*.mp4" | wc -l
echo "images organized successfully."
