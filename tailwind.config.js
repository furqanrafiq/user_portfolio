/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        heading: "30px", // Define a generic heading size (adjust as needed)
      },
      backgroundColor:{
        primary: "#F4EDE9",
        secondary:'#FBF9F7'
      }
    },
  },
  plugins: [],
};
