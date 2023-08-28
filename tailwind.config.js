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
        blueColor: "#2a68ff",
        greyIsh: "#f1f4f8",
        cardShadow: "#f7f8f9",
        textColor: "#252b36",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
