/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0369a1", // Kurumsal mavi
          light: "#0ea5e9",
          dark: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
};
