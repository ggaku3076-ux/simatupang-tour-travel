/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0d0e',
          card: '#121619',
          emerald: '#10b981',
          accent: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
