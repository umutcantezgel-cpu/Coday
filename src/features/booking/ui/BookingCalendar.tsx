'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton } from '@/shared/ui/Skeleton';
// Initialize Supabase Client (Frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface BookingCalendarProps {
  className?: string;
  initialServiceType?: string;
}

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const BookingCalendar = ({
  className,
  initialServiceType = 'consultation',
}: BookingCalendarProps) => {
  const t = useTranslations('booking');
  const locale = useLocale();
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate next 14 days
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // Start from tomorrow
    return d;
  });

  // Fetch availability when date is selected
  React.useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      setFetchingSlots(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      try {
        const res = await fetch(
          `${supabaseUrl}/functions/v1/book-appointment?start=${dateStr}&end=${dateStr}`,
          {
            headers: {
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const slots = new Set(data.bookings.map((b: { time_slot: string }) => b.time_slot));
          setBookedSlots(slots as Set<string>);
        }
      } catch (error) {
        console.error('Failed to fetch availability', error);
      } finally {
        setFetchingSlots(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setBookedSlots(new Set()); // Reset while fetching
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    setError(null);

    try {
      // Direct call to Edge Function
      const formattedDate = selectedDate.toISOString().split('T')[0];

      const res = await fetch(`${supabaseUrl}/functions/v1/book-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          ...formData,
          date: formattedDate,
          time_slot: selectedTime,
          service_type: initialServiceType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t('calendar.errors.failed'));
      }

      setSuccess(true);
      setStep(3); // Success step
    } catch (err) {
      setError(err instanceof Error ? err.message : t('calendar.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  if (success) {
    return (
      <div className={`p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center ${className}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
            ✅
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('calendar.success.title')}</h2>
          <p className="text-gray-700">
            {t.rich('calendar.success.message', {
              name: formData.name,
              date: selectedDate?.toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE') || '',
              time: selectedTime || '',
              email: formData.email,
              br: () => <br />,
            })}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="active:scale-[0.97] mt-6 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-primary transition-colors motion-reduce:duration-[0.01ms]"
          >
            {t('calendar.success.new_booking')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 md:p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl ${className}`}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('calendar.step1.title')}</h3>

            {/* Scrollable Dates with Fade Mask */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x">
                {dates.map((date) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`active:scale-[0.97] 
                      flex-shrink-0 w-16 md:w-20 h-20 md:h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all motion-reduce:duration-[0.01ms]
                      border ${isSelected ? 'border-primary bg-primary/10 text-primary scale-105' : 'border-gray-100 hover:border-primary/50 text-gray-500'}
                    `}
                    >
                      <span className="text-sm font-medium">
                        {date.toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE', {
                          weekday: 'short',
                        })}
                      </span>
                      <span className="text-2xl font-bold">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
              {/* Fade Overlay for Scroll Hint */}
              <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
              >
                {fetchingSlots ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full rounded-xl" />
                    ))}
                  </>
                ) : (
                  TIME_SLOTS.map((time) => {
                    const isBooked = bookedSlots.has(time);
                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked}
                        className={`active:scale-[0.97] 
                          py-2 rounded-xl text-sm font-medium transition-all motion-reduce:duration-[0.01ms]
                          ${
                            selectedTime === time
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : isBooked
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                                : 'bg-white border border-gray-100 hover:border-primary/50 text-gray-600'
                          }
                        `}
                      >
                        {time}
                      </button>
                    );
                  })
                )}
              </motion.div>
            )}

            <div className="flex justify-end pt-4">
              {/* Desktop Button */}
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={nextStep}
                className="active:scale-[0.97] hidden md:block px-8 py-3 bg-black text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors motion-reduce:duration-[0.01ms] shadow-lg"
              >
                {t('calendar.step1.next')}
              </button>

              {/* Mobile Sticky Button (Portal) */}
              {isMobile &&
                createPortal(
                  <AnimatePresence>
                    {selectedDate && selectedTime && (
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none"
                      >
                        <button
                          onClick={nextStep}
                          className="active:scale-[0.97] w-full py-4 bg-black text-white rounded-2xl font-bold text-lg shadow-2xl pointer-events-auto flex items-center justify-center gap-2 transition-transform motion-reduce:duration-[0.01ms]"
                        >
                          {t('calendar.step1.next')}
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('calendar.step2.title')}</h3>
              <p className="text-sm text-gray-500">
                {selectedDate?.toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                {selectedTime}
              </p>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('calendar.step2.form.name.placeholder')}
                    <span className="text-red-500 ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder={t('calendar.step2.form.name.placeholder')}
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'booking-error' : undefined}
                    className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors motion-reduce:duration-[0.01ms]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('calendar.step2.form.email.placeholder')}
                    <span className="text-red-500 ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder={t('calendar.step2.form.email.placeholder')}
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'booking-error' : undefined}
                    className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors motion-reduce:duration-[0.01ms]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('calendar.step2.form.phone.placeholder')}
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  placeholder={t('calendar.step2.form.phone.placeholder')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'booking-error' : undefined}
                  className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors motion-reduce:duration-[0.01ms]"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('calendar.step2.form.notes.placeholder')}
                </label>
                <textarea
                  id="booking-notes"
                  placeholder={t('calendar.step2.form.notes.placeholder')}
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'booking-error' : undefined}
                  className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors motion-reduce:duration-[0.01ms]"
                />
              </div>

              {error && (
                <div
                  id="booking-error"
                  role="alert"
                  aria-live="polite"
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {error}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="active:scale-[0.97] px-6 py-2 text-gray-500 hover:text-gray-800 font-medium"
                >
                  {t('calendar.step2.buttons.back')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="active:scale-[0.97] px-8 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors motion-reduce:duration-[0.01ms] disabled:opacity-50 flex items-center gap-2"
                >
                  {loading
                    ? t('calendar.step2.buttons.submitting')
                    : t('calendar.step2.buttons.submit')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingCalendar;
