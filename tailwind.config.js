/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#F6AD55', // Amber
        'background-light': '#FFFFFF', // Pure White
        'background-dark': '#F8FAFC', // Very Light Gray for contrast sections
        'surface-light': '#FFFFFF',
        'surface-dark': '#EDF2F7', // Light Gray
        'text-light': '#2D3748', // Navy
        'text-dark': '#718096', // Slate for body text
        'text-slate': '#64748B',
        // Remap legacy aurora colors to new palette for safety
        'aurora-charcoal': '#2D3748',
        'aurora-deep': '#1A202C',
        'aurora-sapphire': '#147a7a', // Synced with Primary
        'aurora-azure': '#319795', // Teal-600
        'aurora-success': '#147a7a',
        sapphire: '#147a7a',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #147a7a 0%, #1A9A9A 100%)',
        'gradient-text': 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)', // Default dark text gradient
        'gradient-vivid': 'linear-gradient(135deg, #2563EB 0%, #9333EA 50%, #DB2777 100%)', // Blue-Violet-Pink (Aurora)
        'gradient-soft': 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
        'gradient-twilight': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #147a7a 0%, #2563EB 50%, #9333EA 100%)',
      },
      boxShadow: {
        aurora: '0 1px 3px rgba(0,0,0,0.05)',
        'aurora-lg': '0 4px 6px -1px rgba(0,0,0,0.05)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        glow: '0 0 20px rgba(20, 122, 122, 0.15)', // Teal glow
        flat: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'flat-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
      animation: {
        'fade-in-up': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
