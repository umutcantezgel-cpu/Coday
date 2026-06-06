'use client';

import React, { useState } from 'react';
import { m } from 'motion/react';
import {
  Check,
  ShieldCheck,
  Lightning,
  Crosshair,
  Wrench,
  ArrowRight,
  ChartLineUp,
} from '@phosphor-icons/react';

export default function AngebotHandwerker() {
  const [ticketSize, setTicketSize] = useState(5000);
  const [lostInquiries, setLostInquiries] = useState(3);

  const lostRevenue = ticketSize * lostInquiries;
  const roiMonths = Math.ceil(3699 / (ticketSize > 0 ? ticketSize : 1));

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-slate-50 min-h-dvh font-sans selection:bg-teal-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <m.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full text-navy font-mono text-sm font-bold tracking-widest mb-8 border border-navy/10">
              <span
                className="w-2 h-2 rounded-full bg-teal-500 animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              EXKLUSIV FÜR DIE MEISTER-GRUPPE
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-navy uppercase leading-[1.05] tracking-tighter mb-8">
              Von Meister <br />
              <span className="text-gold">zu Meister.</span>
            </h1>
            <p className="text-2xl text-slate-600 leading-relaxed max-w-2xl mb-12">
              Wir haben zusammen die Meisterschule gerockt. Wer am Werkzeug spart, zahlt doppelt.
              Eure Website ist euer bester{' '}
              <strong className="text-teal-600">digitaler Geselle</strong> – macht 24/7 Akquise und
              wird nie krank.
            </p>
            <div className="flex gap-4">
              <a
                href="#roi-calculator"
                className="bg-navy text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-indigo transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-2 shadow-lg shadow-navy/20"
              >
                Zum ROI-Rechner <ChartLineUp weight="bold" aria-hidden="true" />
              </a>
              <a
                href="#pakete"
                className="bg-white text-navy border-2 border-slate-200 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:border-navy transition-colors motion-reduce:duration-[0.01ms]"
              >
                Direkt zu den Preisen
              </a>
            </div>
          </m.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.923L0 86.6025V51.9615L30 34.641L60 51.9615V86.6025L30 103.923ZM30 101.923L58 85.6025V52.9615L30 36.641L2 52.9615V85.6025L30 101.923ZM30 51.9615L0 34.641V0L30 -17.3205L60 0V34.641L30 51.9615ZM30 49.9615L58 33.641V1.0385L30 -15.3205L2 1.0385V33.641L30 49.9615Z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Die harte Wahrheit
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </m.div>

          <div className="grid md:grid-cols-2 gap-8">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-indigo/50 p-10 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <div className="font-mono text-7xl font-bold text-white/20 mb-4">70%</div>
              <h3 className="text-2xl font-bold mb-4 uppercase">suchen am Handy</h3>
              <p className="text-slate-300 text-lg mb-8">
                Über 70% der Bauherren und Endkunden suchen heute am Smartphone nach dem passenden
                Handwerker.
              </p>

              <div className="font-mono text-6xl font-bold text-white/20 mb-4">0,05s</div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Entscheiden alles</h3>
              <p className="text-slate-300 text-lg">
                Ist die Seite langsam? Lädt das Bild vom Badumbau nicht sofort? Der Kunde ist beim
                Konkurrenten. Das kostet direkt bares Geld.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-teal-900/20 p-10 rounded-2xl border border-teal-500/30 relative shadow-[0_0_50px_rgba(44,165,160,0.15)]"
            >
              <Lightning
                className="w-16 h-16 text-teal-400 mb-6"
                weight="duotone"
                aria-hidden="true"
              />
              <h3 className="text-3xl font-bold mb-6 text-teal-400 uppercase">
                Speed ins Fundament gegossen
              </h3>
              <p className="text-slate-300 text-xl leading-relaxed mb-8">
                Wir bauen bei Coday den Speed fest ins Fundament ein und kleben ihn nicht später als
                Pflaster drüber.
              </p>
              <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                <p className="text-slate-300 text-lg">
                  <strong className="text-white flex items-center gap-2 mb-2">
                    <Crosshair className="text-gold" aria-hidden="true" /> SEO wie ein
                    Scharfschütze:
                  </strong>
                  Wir wollen lieber 10 echte Käufer in eurer Stadt, als 1.000 wahllose Klicks von
                  Leuten, die nur rumschnüffeln.
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR - 10X FEATURE */}
      <section id="roi-calculator" className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-bold tracking-widest text-sm mb-4 border border-teal-200 uppercase">
                10X Feature
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy mb-4">
                Der Schmerz-Rechner
              </h2>
              <p className="text-xl text-slate-500">
                Rechne live aus, wie viel Geld du verbrennst, weil Kunden beim Konkurrenten anrufen.
              </p>
            </m.div>

            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/50">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="mb-8">
                    <label
                      htmlFor="ticket-size"
                      className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4"
                    >
                      Ø Gewinn pro Auftrag (Netto)
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <input
                        id="ticket-size"
                        type="range"
                        min="500"
                        max="20000"
                        step="500"
                        value={ticketSize}
                        onChange={(e) => setTicketSize(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                      <span className="font-mono font-bold text-2xl text-navy w-32 text-right">
                        {ticketSize} €
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lost-inquiries"
                      className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4"
                    >
                      Entgangene Aufträge pro Monat
                      <span className="block text-xs text-slate-400 normal-case mt-1">
                        (Kunden, die wegen schlechter Sichtbarkeit zur Konkurrenz gehen)
                      </span>
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <input
                        id="lost-inquiries"
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={lostInquiries}
                        onChange={(e) => setLostInquiries(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                      <span className="font-mono font-bold text-2xl text-navy w-32 text-right">
                        {lostInquiries}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">
                    Entgangener Gewinn pro Monat
                  </p>
                  <p className="text-5xl font-black text-red-500 font-mono mb-8">
                    {lostRevenue.toLocaleString('de-DE')} €
                  </p>

                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-slate-600 font-semibold mb-2">
                      ROI-Check (Flaggschiff-Paket 3.699 €):
                    </p>
                    <p className="text-navy text-lg">
                      Das Paket macht sich bereits durch{' '}
                      <strong className="text-teal-600 font-black">
                        {roiMonths} erfolgreiche(n) Auftrag
                      </strong>{' '}
                      komplett von selbst bezahlt. Alles danach ist reiner Profit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="pakete" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-navy mb-6">
              Die Ausbau-Stufen
            </h2>
            <div className="w-24 h-1 bg-navy mx-auto" />
          </m.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* PAKET 1 */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-xl transition-shadow motion-reduce:duration-[0.01ms]"
            >
              <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">
                Stufe 1
              </h3>
              <h4 className="text-3xl font-bold mb-4 text-navy">Digitales Fundament</h4>
              <p className="text-slate-600 mb-8 min-h-[80px]">
                Für den sauberen, professionellen Start. Eure digitale Visitenkarte, die technisch
                einwandfrei steht.
              </p>
              <div className="font-mono text-4xl font-black text-navy mb-1">1.499 €</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest mb-8">
                Einmalig / Netto
              </div>

              <ul className="space-y-4">
                {[
                  '5 Basis-Seiten (Start, Leistungen, Über uns, Kontakt, Legal)',
                  'Extrem schnelles Laden',
                  'Mobile-First Design',
                  'SEO-Basiskonfiguration',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="text-teal-500 mt-1 flex-shrink-0"
                      weight="bold"
                      aria-hidden="true"
                    />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* PAKET 3 - FLAGGSCHIFF (Center) */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-gold rounded-3xl p-10 shadow-2xl relative z-10 scale-105"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg">
                Flaggschiff
              </div>
              <h3 className="text-sm font-bold text-gold tracking-widest uppercase mb-2 mt-4">
                Das Meisterstück
              </h3>
              <h4 className="text-4xl font-black mb-4 text-navy uppercase tracking-tighter">
                Lokale Dominanz
              </h4>
              <p className="text-slate-600 mb-8 min-h-[80px] font-medium">
                Absolute Dominanz bei Google. Wenn jemand im Umkreis von 50km sucht – ihr seid
                überall da.
              </p>
              <div className="font-mono text-6xl font-black text-navy mb-1">3.699 €</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest mb-8">
                Einmalig / Netto
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Über 200 Seiten Gesamtumfang',
                  '>100 spezifische lokale SEO-Seiten',
                  'Branchen-spezifisches Copywriting',
                  'Maximale Konkurrenz-Verdrängung',
                  'Vollautomatischer Recruiting-Funnel',
                  'Premium UI/UX Design System',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="text-gold mt-1 flex-shrink-0"
                      weight="bold"
                      aria-hidden="true"
                    />
                    <span className="text-slate-800 font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="block text-center w-full bg-gold text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gold-bright transition-colors motion-reduce:duration-[0.01ms] shadow-lg shadow-gold/20"
              >
                Meisterstück anfragen
              </a>
            </m.div>

            {/* PAKET 2 */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-navy border border-indigo rounded-3xl p-10 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23ffffff\' fill-opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-50" />
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">
                  Stufe 2
                </h3>
                <h4 className="text-3xl font-bold mb-4 text-white">Wachstums-Maschine</h4>
                <p className="text-slate-300 mb-8 min-h-[80px]">
                  Für Handwerker, die wachsen und gezielt Fachkräfte oder hochpreisige Aufträge
                  anziehen wollen.
                </p>
                <div className="font-mono text-4xl font-black text-white mb-1">2.499 €</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest mb-8">
                  Einmalig / Netto
                </div>

                <ul className="space-y-4">
                  {[
                    'Bis zu 20 Leistungs-Seiten',
                    'Sauberer Recruiting-Bereich für Azubis',
                    'Erweiterte SEO-Basis (Regional)',
                    'Premium Kontakt-Formulare',
                    'Bewertungs-Integration',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className="text-teal-400 mt-1 flex-shrink-0"
                        weight="bold"
                        aria-hidden="true"
                      />
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* HAUSMEISTER */}
      <section className="py-24 bg-white border-y border-slate-200 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <div className="w-full aspect-square max-w-md mx-auto bg-slate-50 border border-teal-200/50 rounded-[40px] flex items-center justify-center relative shadow-2xl">
                <div className="absolute inset-0 bg-teal-50 rounded-[40px] -rotate-3 transition-transform motion-reduce:duration-[0.01ms] hover:rotate-0" />
                <div className="relative z-10 w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-teal-100">
                  <ShieldCheck
                    className="w-16 h-16 text-teal-500"
                    weight="duotone"
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute -right-4 top-20 bg-white border border-teal-100 px-6 py-3 rounded-xl shadow-lg font-mono text-sm text-teal-600 font-bold">
                  99.9% UPTIME
                </div>
                <div className="absolute -left-4 bottom-20 bg-white border border-slate-200 px-6 py-3 rounded-xl shadow-lg font-mono text-sm text-slate-600 font-bold flex items-center gap-2">
                  <Wrench className="text-slate-400" aria-hidden="true" /> WARTUNG AKTIV
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-navy mb-6">
                Der "Digitale <span className="text-teal-500">Hausmeister</span>"
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Keine versteckten Kosten. Keine Knebelverträge. Wenn das Haus steht, muss es
                gepflegt werden, damit es nicht verfällt. Ihr kümmert euch um die Baustelle, ich um
                den Server.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl border-l-4 border-l-teal-500 mb-8">
                <div className="font-mono text-5xl font-black text-navy mb-2">
                  89 € <span className="text-xl text-slate-400 font-sans uppercase">/ Monat</span>
                </div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                  Feste Pauschale (Hosting, Wartung, Updates)
                </div>
              </div>
              <p className="text-lg font-bold text-navy">
                Einfach neue Baustellen-Fotos per WhatsApp schicken, ich baue sie ein. Fertig.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* CTA & MEISTER-BONUS */}
      <section
        id="kontakt"
        className="py-32 bg-navy text-white text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'103.923\' viewBox=\'0 0 60 103.923\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 103.923L0 86.6025V51.9615L30 34.641L60 51.9615V86.6025L30 103.923ZM30 101.923L58 85.6025V52.9615L30 36.641L2 52.9615V85.6025L30 101.923ZM30 51.9615L0 34.641V0L30 -17.3205L60 0V34.641L30 51.9615ZM30 49.9615L58 33.641V1.0385L30 -15.3205L2 1.0385V33.641L30 49.9615Z\' fill=\'%23ffffff\' fill-opacity=\'0.03\'/%3E%3C/svg%3E')]"
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 relative z-10">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block bg-gold/10 border border-gold/30 rounded-2xl p-8 mb-16 backdrop-blur-sm">
              <h3 className="text-gold font-bold uppercase tracking-widest mb-2">
                Der Meister-Bonus
              </h3>
              <p className="text-lg text-slate-300 mb-4">
                Wer aus unserer WhatsApp-Gruppe eine Seite bucht, bekommt nach 6 Monaten ein
                Performance- & Strategie-Audit kostenlos.
              </p>
              <div className="font-mono text-gold text-xl font-bold">
                WERT: 450 € (Für euch: 0 €)
              </div>
            </div>

            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
              Lass uns quatschen.
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Kein Druck, kein Verkaufsgelaber. Wir schauen uns an, was ihr vorhabt, und ich sage
              euch ehrlich, ob es sich für euch rechnet.
            </p>

            <a
              href="https://wa.me/4915100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 bg-teal-500 text-white px-10 py-6 rounded-2xl font-bold uppercase tracking-widest text-xl hover:bg-teal-400 transition-colors motion-reduce:duration-[0.01ms] shadow-[0_0_40px_rgba(44,165,160,0.4)] hover:shadow-[0_0_60px_rgba(44,165,160,0.6)]"
            >
              Schreib mir in WhatsApp <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </m.div>
        </div>
      </section>
    </div>
  );
}
