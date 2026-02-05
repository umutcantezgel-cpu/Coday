import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Frontend)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface BookingCalendarProps {
    className?: string;
    initialServiceType?: string;
}

const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const BookingCalendar = ({ className, initialServiceType = 'consultation' }: BookingCalendarProps) => {
    const [step, setStep] = useState<number>(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Generate next 14 days
    const today = new Date();
    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i + 1); // Start from tomorrow
        return d;
    });

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
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
                    'Authorization': `Bearer ${supabaseKey}`
                },
                body: JSON.stringify({
                    ...formData,
                    date: formattedDate,
                    time_slot: selectedTime,
                    service_type: initialServiceType
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Buchung fehlgeschlagen');
            }

            setSuccess(true);
            setStep(3); // Success step
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (success) {
        return (
            <div className={`p-8 bg-aurora-white rounded-2xl border border-aurora-mist text-center ${className}`}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                        ✅
                    </div>
                    <h3 className="text-2xl font-bold text-aurora-deep">Buchung Bestätigt!</h3>
                    <p className="text-aurora-charcoal">
                        Vielen Dank, {formData.name}.<br />
                        Wir haben Ihren Termin für den {selectedDate?.toLocaleDateString('de-DE')} um {selectedTime} reserviert.
                        Eine Bestätigung wurde an {formData.email} gesendet.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-aurora-deep text-white rounded-full hover:bg-aurora-sapphire transition-colors"
                    >
                        Neue Buchung
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl ${className}`}>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-aurora-deep mb-4">Wähle einen Termin</h3>

                        {/* Scrollable Dates */}
                        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                            {dates.map((date) => {
                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                return (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => handleDateSelect(date)}
                                        className={`
                      flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all
                      border ${isSelected ? 'border-primary bg-primary/10 text-primary scale-105' : 'border-gray-100 hover:border-primary/50 text-gray-500'}
                    `}
                                    >
                                        <span className="text-sm font-medium">{date.toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                                        <span className="text-2xl font-bold">{date.getDate()}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-3 gap-3"
                            >
                                {TIME_SLOTS.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`
                      py-2 rounded-xl text-sm font-medium transition-all
                      ${selectedTime === time
                                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                : 'bg-white border border-gray-100 hover:border-primary/50 text-gray-600'}
                    `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        <div className="flex justify-end pt-4">
                            <button
                                disabled={!selectedDate || !selectedTime}
                                onClick={nextStep}
                                className="px-6 py-2 bg-black text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                            >
                                Weiter
                            </button>
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
                            <h3 className="text-xl font-bold text-aurora-deep">Deine Daten</h3>
                            <p className="text-sm text-gray-500">
                                {selectedDate?.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })} um {selectedTime}
                            </p>
                        </div>

                        <form onSubmit={handleBook} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors"
                                />
                            </div>
                            <input
                                type="tel"
                                placeholder="Telefon (optional)"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors"
                            />
                            <textarea
                                placeholder="Notiz (optional)"
                                rows={3}
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-3 rounded-xl bg-white border border-gray-100 focus:border-primary outline-none transition-colors"
                            />

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-2 text-gray-500 hover:text-gray-800 font-medium"
                                >
                                    Zurück
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? 'Buche...' : 'Termin Bestätigen'}
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
