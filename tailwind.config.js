/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          DEFAULT: "#0d0d0d",
          elevated: "#121212",
          frame: "#161616",
          active: "#202020",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          medium: "rgba(255, 255, 255, 0.16)",
          bright: "rgba(255, 255, 255, 0.3)",
        },
        text: {
          primary: "#ffffff",
          secondary: "#888888",
          tertiary: "#555555",
        }
      },
      fontFamily: {
        display: ["'Syne'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.03em",
        widest: "0.2em",
      },
      animation: {
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
