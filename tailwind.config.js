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
            colorTextSoft: "#556677",
            colorTextSofter: "#667788",
            colorBackground: "#EFEFEF",
            colorLink: "#3B82F6",
            colorLinkHover: "#60A5FA",
            colorLinkActive: "#2563EB",
            colorNeutral: "#999999",
            colorNeutralSoft: "#CDCDCD",
            colorNeutralSofter: "#DFDFDF",
            colorNeutralContrasted: "purple",
            colorCardA: "#E9E9E9",
            colorCardB: "#D9D9D9",
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
              colorBackground: "#313338",
              colorLink: "#BFDBFE",
              colorLinkHover: "#DBEAFE",
              colorLinkActive: "#93C5FD",
              colorNeutral: "#999999",
              colorNeutralSoft: "#595d66",
              colorNeutralSofter: "#43454C",
              colorNeutralContrasted: "purple",
              colorCardA: "#2C2E33",
              colorCardB: "#212226",
              colorError: "#FF9999",
              colorSuccess: "green",
              colorHighlight: "#E2DEA3",
            },
          },
        },
      ],
    }),
  ],
};
