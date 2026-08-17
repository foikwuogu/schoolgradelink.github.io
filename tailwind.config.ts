import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sglink: {
          green: "#71AC1D",
          greenTint1: "#BBE266",
          greenTint2: "#9DC13A",
          greenShade: "#357308",
          blue: "#004685",
          blueTint1: "#A0CEF7",
          blueTint2: "#6FA2CF",
          blueShade: "#002D55",
          darkBlue: "#002B51",
          gray: "#323636",
          light: "#868686",
          offwhite: "#F5F5F5",
          gold: "#FFAE1B"
        },
        sglinkDark: "#002D55",
        sglinkBlue: "#004685",
        sglinkGray: "#323636",
        sglinkLight: "#868686",
        sglinkOffwhite: "#F5F5F5"
      }
    }
  },
  plugins: []
};

export default config;
