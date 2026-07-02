import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,tsx,mdx}",
    "./lib/**/*.{js,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
      }
    }
  },
  plugins: []
};

export default config;