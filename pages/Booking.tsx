import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

type BookingType = 'video' | 'meeting' | 'phone';
type TimeSlot = { time: string; available: boolean };

interface BookingTypeOption {
    id: BookingType;
    icon: string;
    title: string;
    description: string;
    duration: string;
    color: string;
}

const bookingTypes: BookingTypeOption[] = [
    {
        id: 'video',
        icon: 'videocam',
        title: 'Video Call',
        description: 'Bequem per Google Meet oder Zoom',
        duration: '30 oder 60 Min.',
        color: 'primary'
    },
    {
        id: 'meeting',
        icon: 'groups',
        title: 'Persönliches Treffen',
        description: 'Face-to-face Beratung vor Ort',
        duration: '60 Min.',
        color: 'secondary'
    },
    {
        id: 'phone',
        icon: 'call',
        title: 'Telefonat',
        description: 'Schnelles Discovery-Gespräch',
        duration: '15 oder 30 Min.',
        color: 'emerald'
    }
];

const generateTimeSlots = (): TimeSlot[] => [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: false }
];

const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        // Skip weekends
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            dates.push(date);
        }
    }
    return dates.slice(0, 10);
};

const Booking: React.FC = () => {
    const [selectedType, setSelectedType] = useState<BookingType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    const availableDates = generateDates();
    const timeSlots = generateTimeSlots();

    const handleTypeSelect = (type: BookingType) => {
        setSelectedType(type);
        setStep(2);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setStep(3);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep(4);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    const getContactUrl = () => {
        const type = selectedType || 'video';
        const date = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
        const time = selectedTime || '';
        return `/contact?booking=${type}&date=${date}&time=${time}`;
    };

    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero */}
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Termin vereinbaren
                    </span>
                    <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6">
                        Lassen Sie uns <span className="text-gradient">sprechen.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Wählen Sie Ihre bevorzugte Art des Gesprächs und buchen Sie direkt einen Termin.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4].map((s) => (
                            <React.Fragment key={s}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {step > s ? (
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    ) : s}
                                </div>
                                {s < 4 && (
                                    <div className={`w-12 h-1 rounded-full transition-all duration-300 ${step > s ? 'bg-primary' : 'bg-gray-200'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step 1: Select Type */}
                {step >= 1 && (
                    <div className={`mb-12 transition-all duration-500 ${step === 1 ? 'opacity-100' : 'opacity-60'}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                            Gesprächsart wählen
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {bookingTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleTypeSelect(type.id)}
                                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-left ${selectedType === type.id
                                            ? 'border-primary bg-primary/5 shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${selectedType === type.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
                                        }`}>
                                        <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{type.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{type.description}</p>
                                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        {type.duration}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Date */}
                {step >= 2 && selectedType && (
                    <div className={`mb-12 transition-all duration-500 ${step === 2 ? 'opacity-100' : 'opacity-60'}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                            Datum wählen
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {availableDates.map((date) => (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => handleDateSelect(date)}
                                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${selectedDate?.toDateString() === date.toDateString()
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {formatDate(date)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Select Time */}
                {step >= 3 && selectedDate && (
                    <div className={`mb-12 transition-all duration-500 ${step === 3 ? 'opacity-100' : 'opacity-60'}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                            Uhrzeit wählen
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.time}
                                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                                    disabled={!slot.available}
                                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${!slot.available
                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                                            : selectedTime === slot.time
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {slot.time} Uhr
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step >= 4 && selectedTime && (
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </span>
                            Ihre Auswahl
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Gesprächsart</div>
                                <div className="font-bold text-gray-900 flex items-center">
                                    <span className="material-symbols-outlined text-primary mr-2">
                                        {bookingTypes.find(t => t.id === selectedType)?.icon}
                                    </span>
                                    {bookingTypes.find(t => t.id === selectedType)?.title}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Datum</div>
                                <div className="font-bold text-gray-900 flex items-center">
                                    <span className="material-symbols-outlined text-primary mr-2">calendar_month</span>
                                    {selectedDate && formatDate(selectedDate)}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Uhrzeit</div>
                                <div className="font-bold text-gray-900 flex items-center">
                                    <span className="material-symbols-outlined text-primary mr-2">schedule</span>
                                    {selectedTime} Uhr
                                </div>
                            </div>
                        </div>

                        <NavLink
                            to={getContactUrl()}
                            className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-xl bg-primary hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl uppercase tracking-wide"
                        >
                            Termin bestätigen
                            <span className="material-symbols-outlined ml-2">arrow_forward</span>
                        </NavLink>
                    </div>
                )}

                {/* Reset Button */}
                {step > 1 && (
                    <div className="text-center">
                        <button
                            onClick={() => {
                                setSelectedType(null);
                                setSelectedDate(null);
                                setSelectedTime(null);
                                setStep(1);
                            }}
                            className="text-gray-500 hover:text-primary transition-colors font-medium"
                        >
                            <span className="material-symbols-outlined text-sm mr-1 align-middle">refresh</span>
                            Auswahl zurücksetzen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
