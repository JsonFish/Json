/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        switchBgc: "rgba(0, 0, 0, 0.2)",
      }
    },
  },
  plugins: [],
}

