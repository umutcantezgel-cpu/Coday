import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-white border-t border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/images/brand/coday-wordmark.svg"
                                alt="Coday"
                                className="h-16 w-auto mb-6"
                            />
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs mb-6 font-medium">
                            Wir töten Ineffizienz. Die letzte Agentur, die du je brauchen wirst.
                        </p>

                        {/* Trust Visual */}
                        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 max-w-xs">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                                <img
                                    src="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp"
                                    alt="Partnerschaft"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white uppercase tracking-wider">Resistance Member</div>
                                <div className="text-[10px] text-gray-400">Kämpfe gegen den Ballast.</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preise</h4>
                        <ul className="space-y-3">
                            <li><NavLink to="/packages" className="text-sm text-gray-300 hover:text-primary transition-colors">Pakete</NavLink></li>
                            <li><NavLink to="/booking" className="text-sm text-gray-300 hover:text-primary transition-colors">Termin buchen</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Wissen</h4>
                        <ul className="space-y-3">
                            <li><NavLink to="/knowledge/academy" className="text-sm text-gray-300 hover:text-primary transition-colors">Academy</NavLink></li>
                            <li><NavLink to="/knowledge/blog" className="text-sm text-gray-300 hover:text-primary transition-colors">Blog</NavLink></li>
                            <li><NavLink to="/knowledge/newsletter" className="text-sm text-gray-300 hover:text-primary transition-colors">Newsletter</NavLink></li>
                            <li><NavLink to="/knowledge/whitepapers" className="text-sm text-gray-300 hover:text-primary transition-colors">Whitepapers</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Karriere</h4>
                        <ul className="space-y-3">
                            <li><NavLink to="/career/jobs" className="text-sm text-gray-300 hover:text-primary transition-colors">Jobs</NavLink></li>
                            <li><NavLink to="/career/culture" className="text-sm text-gray-300 hover:text-primary transition-colors">Kultur</NavLink></li>
                            <li><NavLink to="/career/benefits" className="text-sm text-gray-300 hover:text-primary transition-colors">Benefits</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" className="hover:text-primary transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <div className="text-xs text-gray-500 text-center md:text-right space-x-4">
                        <NavLink to="/legal/agb" className="hover:text-white transition-colors">AGB</NavLink>
                        <NavLink to="/legal/datenschutz" className="hover:text-white transition-colors">Datenschutz</NavLink>
                        <NavLink to="/legal/impressum" className="hover:text-white transition-colors">Impressum</NavLink>
                        <span>© 2026 Coday</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
