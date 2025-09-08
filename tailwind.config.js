/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.95)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        scaleIn: "scaleIn 0.3s ease-out forwards",
        scaleOut: "scaleOut 0.3s ease-in forwards",
        fadeInUp: "fadeInUp 0.5s ease-out both",
        fadeOut: "fadeOut 0.5s ease-out both",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".decoration-skip-ink-auto": {
          "text-decoration-skip-ink": "auto",
        },
        ".decoration-skip-ink-none": {
          "text-decoration-skip-ink": "none",
        },
      });
    }),
  ],
};
