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
            colorLink: "#3B82F6",
            colorLinkHover: "#0022BB",
            colorLinkActive: "#2563EB",
            colorNeutral: "#999999",
            colorNeutralSoft: "#CDCDCD",
            colorNeutralSofter: "#DFDFDF",
            colorNeutralContrasted: "purple",
            colorCardA: "#E7E7E7",
            colorCardB: "#D9D9D9",
            colorCardC: "#D0D0D0",
            colorError: "#AF2020",
            colorSuccess: "green",
            colorHighlight: "#F4EE97",
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
              colorLinkHover: "#66AAFF",
              colorLinkActive: "#93C5FD",
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
