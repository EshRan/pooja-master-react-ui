/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        spiritual: {
          DEFAULT: '#FF9933', // Saffron/Orange
          dark: '#CC7A00',
          light: '#FFB366',
        },
        maroon: {
          DEFAULT: '#800000',
          light: '#A00000',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#DAA520',
        },
        cream: {
          DEFAULT: '#FFF8F0',
        },
        brown: {
          DEFAULT: '#4A3B2A',
          muted: '#8D7F71',
        },
      },
    },
  },
  plugins: [],
}