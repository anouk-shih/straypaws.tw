import type { Config } from "tailwindcss";

export const colors = {
  ...require("tailwindcss/colors"),
  neutral: "#E6E6FA",
  primary: "#1A237E",
  visual: "#4DB6AC",
  body: "#757575",
  notice: "#FFF9C4",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors,
  },
  plugins: [],
};
export default config;
