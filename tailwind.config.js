/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          text: "#223344",
          bg: "#efefef",
        },
        dark: {
          text: "#f9f9f9",
          bg: "#313338",
        },
      },
      screens: {
        sm: "375px",
        md: "480px",
        lg: "768px",
        xl: "960px",
      },
    },
  },
  plugins: [],
}
