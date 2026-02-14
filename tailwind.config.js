/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

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
        sapphire: '#147a7a',
      },
      zIndex: {
        negative: '-1',
        elevated: '10',
        sticky: '50',
        overlay: '100',
        modal: '200',
        popover: '300',
        max: '9999',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #147a7a 0%, #1A9A9A 100%)',
        'gradient-text': 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)', // Default dark text gradient
        'gradient-soft': 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
        'gradient-twilight': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        glow: '0 0 20px rgba(20, 122, 122, 0.15)', // Teal glow
        flat: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'flat-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
      animation: {
        'fade-in-up': 'fadeIn 0.6s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
