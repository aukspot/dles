/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        colorTextTag: "#223344",
      },
    },
    screens: {
      sm: "375px",
      md: "480px",
      lg: "768px",
      xl: "978px",
    },
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        extend: {
          colors: {
            colorText: "#223344",
            colorTextSoft: "#445566",
            colorTextSofter: "#556677",
            colorTextSoftest: "HSL(210, 17%, 40%, 35%)",
            colorBackground: "#EFEFEF",
            colorLink: "#0003C2",
            colorLinkHover: "#075b2d",
            colorLinkActive: "#2300ba",
            colorNeutral: "#999999",
            colorNeutralSoft: "#CDCDCD",
            colorNeutralSofter: "#DFDFDF",
            colorNeutralContrasted: "purple",
            colorCardA: "#D9D9D9",
            colorCardB: "#E7E7E7",
            colorCardC: "#F3F3F3",
            colorError: "#AF2020",
            colorSuccess: "green",
            colorHighlight: "#5f4d00",
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
              colorTextSofter: "#C2C2C2",
              colorTextSoftest: "HSL(0, 0%, 95%, 25%)",
              colorBackground: "#313338",
              colorLink: "#99CCFF",
              colorLinkHover: "#c2ffc3",
              colorLinkActive: "#aacdf4",
              colorNeutral: "#999999",
              colorNeutralSoft: "#595d66",
              colorNeutralSofter: "#43454C",
              colorNeutralContrasted: "purple",
              colorCardA: "#2C2E33",
              colorCardB: "#212226",
              colorCardC: "#1B1D1F",
              colorError: "#FF9999",
              colorSuccess: "green",
              colorHighlight: "#E2DEA3",
            },
          },
        },
      ],
    }),
  ],
}
