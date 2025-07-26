/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
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
