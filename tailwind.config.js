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
        prime: "#3b82f6",
        theme: "#38bdf8",
      },
      backgroundImage: (theme) => ({
        "gradient-primary": `radial-gradient(
          circle at -12.9% 51.2%,
          rgb(255, 124, 0) 0%,
          rgb(255, 124, 0) 15.9%,
          rgb(255, 163, 77) 15.9%,
          rgb(255, 163, 77) 24.4%,
          rgb(23, 132, 178) 24.5%,
          rgb(46, 94, 171) 66%
        );`,
      }),
    },
  },
  plugins: [
    require("preline/plugin"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
