import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#C68A2E",
        gold: "#C67B2E",
        cream: "#4B3F8C",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
