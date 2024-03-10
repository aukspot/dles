/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          text: "#223344",
          bg: "#ddeeff",
        },
        dark: {
          text: "	#f9f9f9",
          bg: "#313338",
        },
      },
    },
  },
  plugins: [],
}
