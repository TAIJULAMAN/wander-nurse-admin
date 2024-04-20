/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utilities/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      mbd: "480px",
      sm: "640px",
      md: "768px",
      tbd: "834px",
      mmd: "980px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        inter: "'Inter', sans-serif",
      },
      colors: {
        whiteBg: "var(--white-bg)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        default: "var(--default)",
        darkGray: "var(--dark-gray)",
        sidebar: "var(--sidebar)",
        darkSidebar: "var(--darkSidebar)",
        sidebarMenu: "var(--sidebar-menu)",
        sidebarMenuBg: withOpacity("--sidebar-menu-bg"),
        accent: "var(--accent)",
        teal: "var(--teal)",
        borderColor: "var(--border)",
        borderTopColor: "var(--border-top)",
        inputError: "var(--input-error)",
        secondaryButton: "var(--secondary-button)",
        selectedOptionBg: "var(--selected-option-bg)",
        accentInvert: "var(--accent-invert)",
        modalBg: "var(--modal-bg)",
        warning: "var(--warning)",
        tabBg: "var(--tab-bg)",
        listItemBorder: "var(--list-item-border)",
        listItemHoverBorder: "var(--list-item-hover-border)",
        listItemHoverBg: "var(--list-item-hover-bg)",
        linkText: "var(--link-text)",
        hoverText: "var(--hover-text)",
        yellow: "var(--yellow)",
        amber: "var(--amber)",
        helperText: "var(--helper-text)",
        disableInputPlaceholder: "var(--disable-input-placeholder)",
      },
      padding: {
        13: "52px",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant, addUtilities }) {
      addVariant("odd-grid-cols-2", "&:nth-child(4n-1)");
      addVariant("even-grid-cols-2", "&:nth-child(4n)");
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".border-top": {
          borderTopWidth: "0.1em",
          // borderTopColor: "#353b3e",
        },
        ".border-bottom": {
          borderBottomWidth: "0.1em",
          borderBottomColor: "var(--border-bottom)",
        },
        ".imageContainer": {
          position: "unset !important",
        },
        ".image": {
          objectFit: "contain",
          width: "100% !important",
          height: "unset !important",
          position: "relative !important",
        },
        ".head-preview": {
          position: "relative",
        },
        ".text-on-image": {
          position: "absolute",
          width: "400px",
          top: "15%",
        },
        ".thumb::-webkit-slider-thumb": {
          backgroundColor: "#f1f5f7",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 0 1px 1px #ced4da",
          cursor: "pointer",
          height: "18px",
          width: "18px",
          marginTop: "4px",
          pointerEvents: "all",
          position: "relative",
        },
        ".thumb::-moz-range-thumb": {
          backgroundColor: "#f1f5f7",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 0 1px 1px #ced4da",
          cursor: "pointer",
          height: "18px",
          width: "1px",
          marginTop: "4px",
          pointerEvents: "all",
          position: "relative",
        },
        ".thumb, .thumb::-webkit-slider-thumb": {
          "-webkit-appearance": "none",
          "-webkit-tap-highlight-color": "transparent",
        },
        ".arrow-hide": {
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      });
    }),
  ],
};
