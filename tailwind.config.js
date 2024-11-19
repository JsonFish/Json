/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btnHover: "var(--header-btn-hover-bgc)",
        dialog: "var(--login-dialog-background-color)",
        footer: "var(--footer-background-color)",
      },
      width: {
        75: "75rem",
        65: "65rem",
      },
    },
  },
  plugins: [],
};
