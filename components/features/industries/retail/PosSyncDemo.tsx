import React, { useState, useEffect } from 'react';

const PosSyncDemo: React.FC = () => {
    // Shows stock syncing between Offline and Online
    const [stock, setStock] = useState(12);
    const [lastSale, setLastSale] = useState<'offline' | 'online' | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (stock > 0) {
                const type = Math.random() > 0.5 ? 'offline' : 'online';
                setLastSale(type);
                setStock(prev => Math.max(0, prev - 1));
                setTimeout(() => setLastSale(null), 1000);
            } else {
                setStock(12); // Restock
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [stock]);

    return (
        <div className="py-12 text-center">
            <h3 className="font-display font-bold text-2xl text-secondary mb-12">Real-Time Inventar Sync</h3>

            <div className="flex justify-center gap-12 md:gap-24 relative max-w-2xl mx-auto">
                {/* Offline Store */}
                <div className={`transition-all duration-300 ${lastSale === 'offline' ? 'scale-110' : ''}`}>
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 relative">
                        <span className="material-symbols-outlined text-4xl text-gray-400">store</span>
                        {lastSale === 'offline' && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">Sold!</div>
                        )}
                    </div>
                    <div className="font-bold text-slate-700">Laden Hamburg</div>
                </div>

                {/* Central Database */}
                <div className="flex flex-col items-center justify-center relative">
                    <div className="w-32 h-32 bg-secondary rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-xl z-10">
                        <span className="text-xs uppercase opacity-70 mb-1">Stock</span>
                        <span className="text-4xl font-black">{stock}</span>
                    </div>
                    {/* Connecting Wires */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                </div>

                {/* Online Store */}
                <div className={`transition-all duration-300 ${lastSale === 'online' ? 'scale-110' : ''}`}>
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 relative">
                        <span className="material-symbols-outlined text-4xl text-gray-400">shopping_cart</span>
                        {lastSale === 'online' && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">Order!</div>
                        )}
                    </div>
                    <div className="font-bold text-slate-700">Online Shop</div>
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-400">
                Verhindert Überverkäufe. Spart händischen Abgleich.
            </div>
        </div>
    );
};

export default PosSyncDemo;
