/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        navy2: "#142d52",
        teal: "#0E8A6E",
        teal2: "#0fb88f",
        tealLight: "#e0f5ef",
        amberExt: "#C47D0E",
        amberLight: "#fef4e0",
        redExt: "#C0392B",
        redLight: "#fdf0ef",
        bgLight: "#f8f9fc",
        textMain: "#1a1a2e",
        textSec: "#4a5568"
      }
    },
  },
  plugins: [],
}
