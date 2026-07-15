import React from 'react';
import { m } from 'motion/react';
import { CalendarBlank, User, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { useRtl } from '@/shared/hooks/useRtl';

export const AppointmentFlow = () => {
  const { isRtl } = useRtl();

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute start-8 top-0 bottom-0 w-px bg-primary/20"></div>

      <div className="space-y-8 relative">
        {/* Step 1 */}
        <m.div
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex gap-6 items-start"
        >
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary z-10 relative border border-gray-100">
            <User size={24} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
            <p className="font-bold text-lg mb-1">Patient wählt Anliegen</p>
            <p className="text-gray-500 text-sm">
              Automatisches Triage-System filtert Dringlichkeit.
            </p>
          </div>
        </m.div>

        {/* Step 2 */}
        <m.div
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-6 items-start"
        >
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary z-10 relative border border-gray-100">
            <CalendarBlank size={24} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
            <p className="font-bold text-lg mb-1">Terminfindung</p>
            <p className="text-gray-500 text-sm">Echtzeit-Abgleich mit Ihrem Praxis-Kalender.</p>
          </div>
        </m.div>

        {/* Step 3 */}
        <m.div
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 items-start"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center z-10 relative">
            <ShieldCheck size={28} />
          </div>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex-1">
            <p className="font-bold text-lg mb-1 text-primary">Bestätigt & DSGVO-Konform</p>
            <p className="text-primary/70 text-sm">Patient erhält Erinnerungen per SMS/Mail.</p>
          </div>
        </m.div>
      </div>
    </div>
  );
};
