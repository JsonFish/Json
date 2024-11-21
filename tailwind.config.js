/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 导航栏Btn hover 背景颜色
        btnHover: "var(--header-btn-hover-bgc)",
        // 登录弹窗背景颜色
        dialog: "var(--login-dialog-background-color)",
        // dialog: "#09090b",
        // 页脚背景颜色
        footer: "var(--footer-background-color)",
        // 导航栏文字颜色
        menu: "var(--menu-text-color)",
        // 导航栏文字激活颜色
        menuActive: "var(--menu-text-active-color)",
      },
      width: {
        75: "75rem",
        65: "65rem",
      },
    },
  },
  plugins: [],
};
