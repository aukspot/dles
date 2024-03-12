/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "480px",
        lg: "768px",
        xl: "960px",
      },
    },
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        extend: {
          colors: {
            colorText: "#223344",
            colorTextSoft: "#556677",
            colorBackground: "#EFEFEF",
            colorLink: "#3B82F6",
            colorLinkHover: "#60A5FA",
            colorLinkActive: "#2563EB",
            colorNeutral: "#999999",
            colorNeutralSoft: "#CDCDCD",
            colorNeutralSofter: "#DFDFDF",
            colorNeutralContrasted: "purple",
            colorCard: "#E5E5E5",
            colorError: "#AF2020",
          },
        },
      },
      themes: [
        {
          name: "dark",
          extend: {
            colors: {
              colorText: "#F2F2F2",
              colorTextSoft: "#D2D2D2",
              colorBackground: "#313338",
              colorLink: "#BFDBFE",
              colorLinkHover: "#DBEAFE",
              colorLinkActive: "#93C5FD",
              colorNeutral: "#999999",
              colorNeutralSoft: "#595d66",
              colorNeutralSofter: "#43454c",
              colorNeutralContrasted: "purple",
              colorCard: "#212226",
              colorError: "#FF9999",
            },
          },
        },
      ],
    }),
  ],
}
