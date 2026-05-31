/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#0d0e0f",
        "on-tertiary-fixed-variant": "#474646",
        "secondary-container": "#ffdb3c",
        "on-surface-variant": "#b9ccb2",
        "on-primary": "#003907",
        "surface-tint": "#00e639",
        "tertiary-fixed": "#e5e2e1",
        "error-container": "#93000a",
        "inverse-surface": "#e3e2e2",
        "on-primary-fixed": "#002203",
        "outline": "#84967e",
        "background": "#060610",
        "secondary-fixed-dim": "#e9c400",
        "primary-fixed-dim": "#00e639",
        "on-tertiary-container": "#626060",
        "primary-fixed": "#72ff70",
        "on-tertiary": "#313030",
        "tertiary": "#fcf8f8",
        "on-primary-fixed-variant": "#00530e",
        "error": "#ffb4ab",
        "surface-bright": "#383939",
        "primary": "#ebffe2",
        "on-tertiary-fixed": "#1c1b1b",
        "secondary": "#fff9ef",
        "surface-container-highest": "#343535",
        "on-secondary-fixed": "#221b00",
        "surface-dim": "#121414",
        "surface": "#121414",
        "on-surface": "#e3e2e2",
        "tertiary-container": "#dfdcdb",
        "on-error": "#690005",
        "tertiary-fixed-dim": "#c9c6c5",
        "surface-variant": "#343535",
        "on-secondary-container": "#725f00",
        "surface-container": "#1f2020",
        "on-error-container": "#ffdad6",
        "on-secondary": "#3a3000",
        "surface-container-low": "#1b1c1c",
        "outline-variant": "#3b4b37",
        "on-secondary-fixed-variant": "#544600",
        "inverse-on-surface": "#303031",
        "surface-container-high": "#292a2a",
        "inverse-primary": "#006e16",
        "primary-container": "#00ff41",
        "secondary-fixed": "#ffe16d",
        "on-primary-container": "#007117",
        "on-background": "#e3e2e2"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "unit": "4px",
        "container-max": "1440px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "gutter": "24px"
      },
      fontFamily: {
        body: ["Geist", "sans-serif"],
        label: ["JetBrains Mono", "monospace"],
        display: ["Inter", "sans-serif"]
      },
      animation: {
        'marquee-slow': 'marquee 45s linear infinite',
        'marquee-fast': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
