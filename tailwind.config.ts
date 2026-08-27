import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta extraída do mockup: rosa/pink, dourado, creme e verde
        brand: {
          pink: "#EC1E79",
          "pink-light": "#FBD9E7",
          "pink-soft": "#FCE7F0",
          gold: "#F2A93D",
          "gold-light": "#FCEBCB",
          cream: "#FDF6EA",
          "cream-dark": "#F7ECD8",
          plum: "#3D1E2B",
          green: "#5FAE7A",
          "green-light": "#DCEFE2",
          lilac: "#C9A6D6",
          "lilac-light": "#F0E4F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(61, 30, 43, 0.18)",
        button: "0 8px 20px -6px rgba(236, 30, 121, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
