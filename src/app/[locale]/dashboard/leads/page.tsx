import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import { createAdminClient } from '@/shared/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Owner-only overview: leads, bookings and cookie-free conversion events of
 * the last 28 days. Reachable only with `?token=<DASHBOARD_TOKEN>`; without a
 * matching token the page behaves like a 404.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Lead-Dashboard | Coday',
    description: 'Interne Übersicht über Anfragen, Termine und Conversion-Ereignisse.',
    path: `/${locale}/dashboard/leads`,
    type: 'noindex',
  });
}

interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  project: string | null;
  package_name: string | null;
  form_kind: string | null;
  city_name: string | null;
  source: string | null;
  score: number | null;
  locale: string | null;
}

interface BookingRow {
  created_at: string;
  name: string;
  email: string;
  date: string;
  time_slot: string;
  status: string | null;
}

interface EventRow {
  created_at: string;
  event: string;
  path: string | null;
  session_hash: string | null;
}

const DAYS = 28;
const KPI_EVENTS = ['form_start', 'form_success', 'phone_click', 'whatsapp_click', 'cta_click'];

function fmtDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale === 'en' ? 'en-GB' : 'de-DE', {
    timeZone: 'Europe/Berlin',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface DashboardData {
  leads: LeadRow[];
  bookings: BookingRow[];
  events: EventRow[];
  loadError: string | null;
}

/** Data loading lives outside the component so render stays pure. */
async function loadDashboardData(): Promise<DashboardData> {
  const result: DashboardData = { leads: [], bookings: [], events: [], loadError: null };
  try {
    const supabase = createAdminClient();
    const now = Date.now();
    const since = new Date(now - DAYS * 24 * 60 * 60 * 1000).toISOString();
    const today = new Date(now).toISOString().slice(0, 10);

    const [leadsRes, bookingsRes, eventsRes] = await Promise.all([
      supabase
        .from('leads')
        .select(
          'id,created_at,name,email,phone,project,package_name,form_kind,city_name,source,score,locale'
        )
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('bookings')
        .select('created_at,name,email,date,time_slot,status')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(50),
      supabase
        .from('conversion_events')
        .select('created_at,event,path,session_hash')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(5000),
    ]);

    const firstError = leadsRes.error ?? bookingsRes.error ?? eventsRes.error;
    if (firstError) result.loadError = firstError.message;
    result.leads = (leadsRes.data ?? []) as LeadRow[];
    result.bookings = (bookingsRes.data ?? []) as BookingRow[];
    result.events = (eventsRes.data ?? []) as EventRow[];
  } catch (err) {
    result.loadError = err instanceof Error ? err.message : String(err);
  }
  return result;
}

export default async function LeadsDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token } = await searchParams;

  const expected = process.env.DASHBOARD_TOKEN;
  if (!expected || !token || token !== expected) notFound();

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { leads, bookings, events, loadError } = configured
    ? await loadDashboardData()
    : {
        leads: [] as LeadRow[],
        bookings: [] as BookingRow[],
        events: [] as EventRow[],
        loadError: null,
      };

  // Aggregations
  const totals = new Map<string, { events: number; sessions: Set<string> }>();
  const byDay = new Map<string, Record<string, number>>();
  const byPath = new Map<string, number>();
  for (const e of events) {
    const t = totals.get(e.event) ?? { events: 0, sessions: new Set<string>() };
    t.events += 1;
    if (e.session_hash) t.sessions.add(e.session_hash);
    totals.set(e.event, t);

    const day = e.created_at.slice(0, 10);
    const row = byDay.get(day) ?? {};
    row[e.event] = (row[e.event] ?? 0) + 1;
    byDay.set(day, row);

    if (e.path && KPI_EVENTS.includes(e.event)) {
      byPath.set(e.path, (byPath.get(e.path) ?? 0) + 1);
    }
  }
  const days = Array.from(byDay.keys()).sort().reverse();
  const topPaths = Array.from(byPath.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  const realLeads = leads.filter((l) => l.form_kind !== 'newsletter');

  const kpi = (event: string) => totals.get(event)?.events ?? 0;

  const tiles = [
    { label: `Anfragen (${DAYS} Tage)`, value: realLeads.length },
    { label: 'Anstehende Termine', value: bookings.length },
    { label: 'Formular gestartet', value: kpi('form_start') },
    { label: 'Formular gesendet', value: kpi('form_success') },
    { label: 'Anruf-Klicks', value: kpi('phone_click') },
    { label: 'WhatsApp-Klicks', value: kpi('whatsapp_click') },
  ];

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Intern</p>
          <h1 className="font-display font-bold text-3xl mt-1">Anfragen und Conversion</h1>
          <p className="text-sm text-slate-600 mt-2">
            Letzte {DAYS} Tage. Ereignisse werden ohne Cookies serverseitig gezählt; „Besucher“ ist
            die Zahl unterschiedlicher Tages-Sitzungen.
          </p>
          {!configured && (
            <p className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
              Supabase ist in dieser Umgebung nicht konfiguriert. Es werden keine Daten geladen.
            </p>
          )}
          {loadError && (
            <p className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
              Fehler beim Laden: {loadError}. Wurden die Migrationen `20260903`, `20260905` und
              `20260907` angewendet?
            </p>
          )}
        </header>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="p-4 rounded-2xl bg-white border border-slate-200">
              <p className="text-3xl font-display font-black">{tile.value}</p>
              <p className="text-xs text-slate-500 mt-1">{tile.label}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 overflow-x-auto">
            <h2 className="font-bold mb-3">Ereignisse je Tag</h2>
            <table className="w-full text-sm min-w-[520px]">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2">Tag</th>
                  {KPI_EVENTS.map((e) => (
                    <th key={e} className="py-2">
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.length === 0 && (
                  <tr>
                    <td colSpan={KPI_EVENTS.length + 1} className="py-3 text-slate-500">
                      Noch keine Ereignisse.
                    </td>
                  </tr>
                )}
                {days.map((day) => (
                  <tr key={day} className="border-t border-slate-100">
                    <td className="py-2 font-medium">{day}</td>
                    {KPI_EVENTS.map((e) => (
                      <td key={e} className="py-2">
                        {byDay.get(day)?.[e] ?? 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 overflow-x-auto">
            <h2 className="font-bold mb-3">Seiten mit den meisten Conversion-Signalen</h2>
            <table className="w-full text-sm min-w-[360px]">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2">Pfad</th>
                  <th className="py-2">Signale</th>
                </tr>
              </thead>
              <tbody>
                {topPaths.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-3 text-slate-500">
                      Noch keine Ereignisse.
                    </td>
                  </tr>
                )}
                {topPaths.map(([path, n]) => (
                  <tr key={path} className="border-t border-slate-100">
                    <td className="py-2 font-mono text-xs">{path}</td>
                    <td className="py-2">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="font-bold mt-6 mb-2 text-sm">Summen je Ereignis</h3>
            <ul className="text-sm space-y-1">
              {Array.from(totals.entries())
                .sort((a, b) => b[1].events - a[1].events)
                .map(([event, t]) => (
                  <li key={event} className="flex justify-between border-t border-slate-100 py-1">
                    <span className="font-mono text-xs">{event}</span>
                    <span>
                      {t.events} · {t.sessions.size} Besucher
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-white border border-slate-200 overflow-x-auto">
          <h2 className="font-bold mb-3">Anfragen</h2>
          <table className="w-full text-sm min-w-[820px]">
            <thead className="text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Eingang</th>
                <th className="py-2">Name</th>
                <th className="py-2">Kontakt</th>
                <th className="py-2">Paket / Projekt</th>
                <th className="py-2">Formular</th>
                <th className="py-2">Stadt</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-3 text-slate-500">
                    Keine Anfragen im Zeitraum.
                  </td>
                </tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-slate-100 align-top">
                  <td className="py-2 whitespace-nowrap">{fmtDate(l.created_at, locale)}</td>
                  <td className="py-2 font-medium">{l.name}</td>
                  <td className="py-2">
                    <a href={`mailto:${l.email}`} className="text-blue-700">
                      {l.email}
                    </a>
                    {l.phone && <div className="text-slate-600">{l.phone}</div>}
                  </td>
                  <td className="py-2">{l.package_name || l.project || '—'}</td>
                  <td className="py-2">
                    {l.form_kind || '—'}
                    {l.source && <div className="text-xs text-slate-500">{l.source}</div>}
                  </td>
                  <td className="py-2">{l.city_name || '—'}</td>
                  <td className="py-2">{l.score ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="p-5 rounded-2xl bg-white border border-slate-200 overflow-x-auto">
          <h2 className="font-bold mb-3">Anstehende Termine</h2>
          <table className="w-full text-sm min-w-[520px]">
            <thead className="text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Datum</th>
                <th className="py-2">Uhrzeit</th>
                <th className="py-2">Name</th>
                <th className="py-2">E-Mail</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 text-slate-500">
                    Keine anstehenden Termine.
                  </td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={`${b.date}-${b.time_slot}`} className="border-t border-slate-100">
                  <td className="py-2">{b.date}</td>
                  <td className="py-2">{b.time_slot}</td>
                  <td className="py-2 font-medium">{b.name}</td>
                  <td className="py-2">{b.email}</td>
                  <td className="py-2">{b.status ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
