import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ValuesDeck: React.FC = () => {
    const [index, setIndex] = useState(0);

    const values = [
        {
            title: "Extreme Ownership",
            desc: "Keine Ausreden. Wir übernehmen volle Verantwortung für das Ergebnis. Wenn etwas schiefgeht, fixen wir es. Punkt.",
            color: "bg-blue-600"
        },
        {
            title: "Radical Truth",
            desc: "Wir sagen, was Sache ist. Auch wenn es weh tut. Ehrliches Feedback ist der einzige Weg zu Exzellenz.",
            color: "bg-purple-600"
        },
        {
            title: "Deep Work",
            desc: "Kein Multitasking. Keine ständigen Meetings. Wir blocken Zeit für tiefe, konzentrierte Arbeit.",
            color: "bg-emerald-600"
        },
        {
            title: "Speed wins",
            desc: "Perfektion ist der Feind von Fertig. Wir shippen schnell und iterieren basierend auf echten Daten.",
            color: "bg-orange-600"
        }
    ];

    const nextCard = () => {
        setIndex((prev) => (prev + 1) % values.length);
    };

    return (
        <div className="relative h-[400px] w-full max-w-md mx-auto perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full bg-white/5 rounded-3xl blur-3xl transform scale-110"></div>
            </div>

            <div className="relative w-full h-full cursor-pointer" onClick={nextCard}>
                <AnimatePresence initial={false}>
                    {values.map((val, idx) => {
                        // Only render current and next couple of cards
                        const diff = (idx - index + values.length) % values.length;
                        if (diff > 2) return null;

                        return (
                            <motion.div
                                key={val.title}
                                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                animate={{
                                    scale: 1 - diff * 0.05,
                                    y: diff * 20,
                                    zIndex: 10 - diff,
                                    opacity: 1 - diff * 0.2
                                }}
                                exit={{ x: -300, opacity: 0, rotate: -20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`absolute inset-0 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl border border-white/10 ${val.color}`}
                                style={{ transformOrigin: "bottom center" }}
                            >
                                <h3 className="font-display font-black text-3xl text-white mb-4 uppercase tracking-tighter">{val.title}</h3>
                                <p className="text-white/80 font-medium leading-relaxed">{val.desc}</p>

                                <div className="absolute bottom-8 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    Tap for next
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ValuesDeck;
