import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';

const AnnouncementBar: React.FC = () => {
    return (
        <div className="bg-primary text-white relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                    <span className="flex items-center">
                        <Icon name="celebration" className="text-lg mr-2" />
                        Grand Opening: 25% Rabatt auf alle Projekte!
                    </span>
                    <NavLink
                        to="/packages"
                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-xs font-bold transition-colors"
                    >
                        Angebot sichern &rarr;
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
