/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-text-dark": "rgb(249, 249, 249)",
        "primary-bg-dark": "#313338",
      },
    },
  },
  plugins: [],
}
