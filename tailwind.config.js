/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#1A9A9A", // Teal
                secondary: "#2D3748", // Navy
                accent: "#F6AD55", // Amber
                "background-light": "#FFFFFF", // Pure White
                "background-dark": "#F8FAFC", // Very Light Gray for contrast sections
                "surface-light": "#FFFFFF",
                "surface-dark": "#EDF2F7", // Light Gray
                "text-light": "#2D3748", // Navy
                "text-dark": "#718096", // Slate for body text
                "text-slate": "#64748B",
                // Remap legacy aurora colors to new palette for safety
                "aurora-charcoal": "#2D3748",
                "aurora-deep": "#1A202C",
                "aurora-sapphire": "#1A9A9A",
                "aurora-azure": "#319795", // Teal-600
                "aurora-success": "#1A9A9A",
                sapphire: "#1A9A9A",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-ocean': 'none',
                'gradient-text': 'none',
                'gradient-vivid': 'none',
                'gradient-soft': 'none',
                'gradient-twilight': 'none',
                'gradient-aurora': 'none',
            },
            boxShadow: {
                'aurora': '0 1px 3px rgba(0,0,0,0.05)', // Remap to flat
                'aurora-lg': '0 4px 6px -1px rgba(0,0,0,0.05)', // Remap to flat
                'glass': 'none',
                'glow': 'none',
                'flat': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'flat-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            },
            animation: {
                'fade-in-up': 'fadeIn 0.6s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
