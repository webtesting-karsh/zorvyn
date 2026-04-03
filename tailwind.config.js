/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        card: "#111827",
        accent: "#6366F1",
        success: "#22C55E",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class', // Allow manual toggle if needed, or stick to default dark
}
