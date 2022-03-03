module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        "gray-trans": "rgba(0,0,0,0.3)",
        "gray-trans-hover": "rgba(0,0,0,0.4)",
        gray: {
          900: "#202255",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#3b3d3f",
          100: "#f2f3f5",
        },
      },
      backgroundImage: {
        "default-picture":
          "url('https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6')",
        "profile-pic":
          "url('https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
