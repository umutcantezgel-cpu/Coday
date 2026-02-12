import React from 'react';
import { IconSetPreview } from '@/shared/ui/IconSetPreview';

import {
  ArrowRight as PhArrowRight,
  List as PhList,
  X as PhX,
  Check as PhCheck,
  MagnifyingGlass as PhSearch,
  User as PhUser,
  Globe as PhGlobe,
  Lightning as PhZap,
  Shield as PhShield,
  RocketLaunch as PhRocket,
  ShoppingCart as PhShoppingCart,
  Envelope as PhEnvelope,
  Phone as PhPhone,
  Calendar as PhCalendar,
  Star as PhStar,
} from '@phosphor-icons/react';
import {
  RiArrowRightLine,
  RiMenuLine,
  RiCloseLine,
  RiCheckLine,
  RiSearchLine,
  RiUserLine,
  RiGlobalLine,
  RiThunderstormsLine,
  RiShieldLine,
  RiRocketLine,
  RiShoppingCartLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiStarLine,
} from '@remixicon/react';

const IconPreview = () => {
  const phosphorIcons = [
    { name: 'ArrowRight', icon: PhArrowRight },
    { name: 'List', icon: PhList },
    { name: 'X', icon: PhX },
    { name: 'Check', icon: PhCheck },
    { name: 'MagnifyingGlass', icon: PhSearch },
    { name: 'User', icon: PhUser },
    { name: 'Globe', icon: PhGlobe },
    { name: 'Lightning', icon: PhZap },
    { name: 'Shield', icon: PhShield },
    { name: 'RocketLaunch', icon: PhRocket },
    { name: 'ShoppingCart', icon: PhShoppingCart },
    { name: 'Envelope', icon: PhEnvelope },
    { name: 'Phone', icon: PhPhone },
    { name: 'Calendar', icon: PhCalendar },
    { name: 'Star', icon: PhStar },
  ];

  const remixIcons = [
    { name: 'ArrowRight', icon: RiArrowRightLine },
    { name: 'Menu', icon: RiMenuLine },
    { name: 'Close', icon: RiCloseLine },
    { name: 'Check', icon: RiCheckLine },
    { name: 'Search', icon: RiSearchLine },
    { name: 'User', icon: RiUserLine },
    { name: 'Global', icon: RiGlobalLine },
    { name: 'Flash', icon: RiThunderstormsLine },
    { name: 'Shield', icon: RiShieldLine },
    { name: 'Rocket', icon: RiRocketLine },
    { name: 'ShoppingCart', icon: RiShoppingCartLine },
    { name: 'Mail', icon: RiMailLine },
    { name: 'Phone', icon: RiPhoneLine },
    { name: 'Calendar', icon: RiCalendarLine },
    { name: 'Star', icon: RiStarLine },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-12 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Iconography Selection</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Compare the three premium icon sets below to determine the best fit for the "Anti-AI"
            aesthetic. Look for sharpness, stroke weight consistency, and visual impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <IconSetPreview
            title="Phosphor (Agua)"
            description="Sharp, tech-focused, highly consistent. 6 weights available. (Recommended)"
            icons={phosphorIcons}
          />
          <IconSetPreview
            title="Remix (Geometric)"
            description="Neutral, system-style, very extensive. Often used in dashboard UIs."
            icons={remixIcons}
          />
        </div>
      </div>
    </div>
  );
};

export default IconPreview;
