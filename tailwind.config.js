/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
    darkMode: "class",

  theme: {
    extend: {
      colors: {
        primaryDark: "#1A2B4C",
        primaryMedium: "#2C3E6B",
        growth: "#00B894",
        growthLight: "#55E6C1",
        softGray: "#F5F6FA",
        pureWhite: "#FFFFFF"
      }
    },
  },
  plugins: [],
}