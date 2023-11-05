import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");
const { colors } = require("tailwindcss/colors");
const { nextui } = require("@nextui-org/react");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1369",
      },
    },
    extend: {
      fontfamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...colors,
        "light-gold": "#f5bc51",
        "dark-gold": "#533519",
        success: "green",
      },
    },
  },
  plugins: [nextui()],
};

export default config;
