const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "0px",
      tb: "640px",
      dk: "1280px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}