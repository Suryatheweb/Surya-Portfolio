/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jp-bg': '#f7f5f0',
        'jp-text': '#2b2b2b',
        'jp-accent': '#c93b2b',
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
}