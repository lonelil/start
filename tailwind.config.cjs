/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        main: {
          primary: "black",
          secondary: "black",
          "base-100": "black",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
