/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf9',
          100: '#ccfbe8',
          200: '#9cf6d5',
          300: '#5ee9bc',
          400: '#2bd39e',
          500: '#10b784',
          600: '#07936a',
          700: '#087456',
          800: '#0a5c46',
          900: '#0a4b3b',
        },
        coral: {
          50: '#fff5f3',
          100: '#ffe8e4',
          200: '#ffd5cd',
          300: '#ffb5a6',
          400: '#ff8269',
          500: '#f95738',
          600: '#e53e1f',
          700: '#c12e14',
          800: '#9d2815',
          900: '#7f2617',
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
};
