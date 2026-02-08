/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0a0a0f',
                'dark-card': '#13131a',
                'dark-text': '#e4e4e7',
                'brand': {
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                },
                'accent-teal': '#2dd4bf',
            },
            borderRadius: {
                'bento': '1.5rem',
                'bento-sm': '1rem',
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
                'glow': '0 0 20px rgba(139, 92, 246, 0.15)',
            },
            spacing: {
                'bento': '1.5rem',
            },
        },
    },
    plugins: [],
}
