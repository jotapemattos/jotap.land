import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
        sans: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
        serif: ["Instrument Serif", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // Ground — floralwhite paper, with the cream as the raised surface.
        paper: {
          DEFAULT: "#fffaf0",
          raised: "#f3eadf",
          sunken: "#ece0d1",
        },
        // Primary ink. 400–800 are the ink blended up over the paper, so the
        // whole ladder stays warm-neutral instead of going cold grey.
        ink: {
          DEFAULT: "#1a1613",
          900: "#1a1613",
          800: "#3c3834",
          700: "#5a5651",
          600: "#817d76",
          500: "#a39f98",
          400: "#c2bfb9",
        },
        // Secondary. The pure brand tone is for marks and rules; on paper it
        // only clears 2.5:1, so small text uses 600/700 instead.
        accent: {
          DEFAULT: "#34A893",
          50: "#eafaf6",
          100: "#c4f0e6",
          200: "#8fe1d0",
          300: "#5cccb6",
          400: "#34A893",
          500: "#2b8b7a",
          600: "#236f62",
          700: "#1c574d",
          800: "#16443c",
          900: "#0f302b",
        },
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
