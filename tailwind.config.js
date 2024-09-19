/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#19376D",
        "primaryBackground": "#0B2447",
      },
      fontFamily: {
        "Montserrat": "'Montserrat'"
      }
    },
  },
  plugins: [],
}

