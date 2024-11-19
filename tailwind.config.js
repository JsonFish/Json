/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        switchBgc: "#28272a",
        dialogBgc: "var(--login-dialog-background-color)",
        footerBgc: "var(--footer-background-color)",
      },
      width: {
        75: "75rem",
      },
    },
  },
  plugins: [],
};
