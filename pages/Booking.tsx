import { BookingCalendar } from "@/features/booking";

export default function Booking() {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen">
            <h1 className="text-4xl font-black font-display mb-8 text-center bg-gradient-to-r from-aurora-deep to-aurora-sapphire bg-clip-text text-transparent">
                Starten Sie Ihre Transformation
            </h1>
            <p className="text-center text-aurora-charcoal mb-12 max-w-2xl mx-auto">
                Wählen Sie einen passenden Termin für Ihr unverbindliches Strategiegespräch.
                Keine externen Tools, keine Umwege.
            </p>

            <div className="max-w-4xl mx-auto">
                <BookingCalendar className="shadow-2xl border-aurora-mist/50" />
            </div>
        </div>
    );
}
