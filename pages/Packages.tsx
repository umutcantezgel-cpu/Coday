import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CountUp from '../components/shared/ui/CountUp';
import GradientText from '../components/shared/ui/GradientText';
import BlurText from '../components/shared/ui/BlurText';
import { useCalculatorStore } from '../features/calculator/model/store';

interface Package {
    id: string;
    name: string;
    tagline: string;
    setupPrice: number;
    originalPrice?: number;
    monthlyPrice: number;
    popular?: boolean;
    features: string[];
    notIncluded?: string[];
    cta: string;
}

const packages: Package[] = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Perfekt für den Start',
        setupPrice: 939,
        originalPrice: 1250,
        monthlyPrice: 49,
        features: [
            '3-5 Unterseiten',
            'Professionelle Landing Page',
            'Responsive Design',
            'Basis SEO-Optimierung',
            'SSL-Zertifikat',
            '3 Revisionsrunden',
            'Google Analytics Setup',
            '30 Tage Support'
        ],
        notIncluded: [
            'CMS-System',
            'E-Commerce',
            'Individuelle Funktionen'
        ],
        cta: 'Starter wählen'
    },
    {
        id: 'professional',
        name: 'Professional',
        tagline: 'Unser Bestseller',
        setupPrice: 1619,
        originalPrice: 2150,
        monthlyPrice: 99,
        popular: true,
        features: [
            '7-10 Unterseiten',
            'Content Management System',
            'Erweiterte SEO-Strategie',
            'Performance-Optimierung',
            'Blog-Integration',
            'Kontaktformulare',
            '5 Revisionsrunden',
            'Hosting inklusive',
            'Support optional buchbar'
        ],
        notIncluded: [
            'E-Commerce Features',
            'Custom App Development'
        ],
        cta: 'Professional wählen'
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'Volle Power',
        setupPrice: 2219,
        originalPrice: 2950,
        monthlyPrice: 199,
        features: [
            'Unbegrenzte Seiten',
            'Custom Web Application',
            'E-Commerce Integration',
            'API-Entwicklung',
            'Premium SEO & Marketing',
            'A/B Testing Setup',
            'Dedizierter Ansprechpartner',
            'SLA-Garantie (Optional)',
            '24/7 Support (Optional)'
        ],
        cta: 'Enterprise anfragen'
    }
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

const PackageCard: React.FC<{ pkg: Package; onSelect: () => void }> = ({ pkg, onSelect }) => {
    return (
        <div className={`relative bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${pkg.popular
            ? 'border-primary shadow-xl scale-105 z-10'
            : 'border-gray-200 hover:border-primary/50'
            }`}>
            {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                        Beliebteste Wahl
                    </span>
                </div>
            )}

            <div className={`p-8 ${pkg.popular ? 'pt-10' : ''}`}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h3 className="font-display font-bold text-2xl text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-gray-500 text-sm">{pkg.tagline}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                    <div className="mb-2">
                        <span className="text-sm text-gray-500">Einrichtung</span>
                    </div>
                    {pkg.originalPrice && (
                        <div className="text-gray-400 line-through font-bold text-lg">
                            {formatPrice(pkg.originalPrice)}
                        </div>
                    )}
                    <div className="font-display font-black text-4xl text-gray-900 mb-4">
                        <CountUp from={0} to={pkg.setupPrice} duration={2} separator="." />€
                    </div>
                    {/* Monthly price removed - maintenance is optional now */}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                            <span className="material-symbols-outlined text-emerald-500 text-lg mr-3 mt-0.5">check_circle</span>
                            <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                    ))}
                    {pkg.notIncluded?.map((feature, idx) => (
                        <div key={idx} className="flex items-start opacity-50">
                            <span className="material-symbols-outlined text-gray-300 text-lg mr-3 mt-0.5">cancel</span>
                            <span className="text-gray-400 text-sm line-through">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button
                    onClick={onSelect}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 ${pkg.popular
                        ? 'bg-primary text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-primary hover:text-white'
                        }`}
                >
                    {pkg.cta}
                    <span className="material-symbols-outlined text-sm ml-2 align-middle">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

const Packages: React.FC = () => {
    const selectPackage = useCalculatorStore(state => state.selectPackage);
    const navigate = useNavigate();

    const handleSelect = (pkgId: string) => {
        selectPackage(pkgId);
        navigate('/calculator');
    };

    return (
        <div className="bg-aurora-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Transparente Preise
                    </span>
                    <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6">
                        Drei Pakete. <GradientText colors={['#1A9A9A', '#D69E2E', '#1A9A9A']} animationSpeed={8} showBorder={false} className="inline-block">Null Überraschungen.</GradientText>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Wählen Sie das Paket, das zu Ihren Zielen passt. Alle Preise sind Festpreise – keine versteckten Kosten.
                    </p>
                </div>

                {/* Package Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20 items-start">
                    {packages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            onSelect={() => handleSelect(pkg.id)}
                        />
                    ))}
                </div>

                {/* Comparison Section */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-display font-bold text-2xl text-gray-900 text-center">
                            Paket-Vergleich
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="p-4 text-left text-sm font-semibold text-gray-500">Feature</th>
                                    <th className="p-4 text-center text-sm font-bold text-gray-900">Starter</th>
                                    <th className="p-4 text-center text-sm font-bold text-primary bg-primary/5">Professional</th>
                                    <th className="p-4 text-center text-sm font-bold text-gray-900">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Seiten', '3-5', '7-10', 'Unbegrenzt'],
                                    ['CMS', '—', '✓', '✓'],
                                    ['SEO', 'Basis', 'Erweitert', 'Premium'],
                                    ['Support/Wartung', '30 Tage', 'Optional', 'Optional'],
                                    ['E-Commerce', '—', '—', '✓'],
                                    ['Custom Development', '—', '—', '✓'],
                                    ['Revisionen', '3', '5', 'Unbegrenzt'],
                                ].map(([feature, starter, pro, enterprise], idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="p-4 text-sm font-medium text-gray-700">{feature}</td>
                                        <td className="p-4 text-center text-sm text-gray-600">{starter}</td>
                                        <td className="p-4 text-center text-sm text-gray-900 bg-primary/5 font-medium">{pro}</td>
                                        <td className="p-4 text-center text-sm text-gray-600">{enterprise}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                            Noch unsicher?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Vereinbaren Sie ein kostenloses Beratungsgespräch.
                        </p>
                        <NavLink
                            to="/booking"
                            className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                        >
                            Termin buchen
                            <span className="material-symbols-outlined ml-2">calendar_month</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
