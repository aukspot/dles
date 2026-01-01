/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  corePlugins: {
    preflight: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        colorTextTag: "#223344",
      },
      fontSize: {
        'tiny': '0.625rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
    screens: {
      sm: "23.4375em",
      md: "30em",
      lg: "48em",
      xl: "61.125em",
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
            colorTextSoftest: "HSL(210, 17%, 30%, 35%)",
            colorBackground: "#EDEDED",
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
              colorTextSoftest: "HSL(0, 0%, 95%, 50%)",
              colorBackground: "#212328",
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
