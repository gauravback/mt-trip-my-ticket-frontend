/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "",
  theme: {
    extend: {
      colors: {
        prime: "#07162d",
        theme: "#d32f2f",
      },
    },
  },
  plugins: [require("preline/plugin"), require("@tailwindcss/typography")],
};
