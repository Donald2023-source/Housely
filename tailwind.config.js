/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        primary: "#7F56D9",
      },
      fontFamily: {
        inter: ["Inter"],
        "inter-semibold": ["Inter-SemiBold"],
        "inter-bold": ["Inter-Bold"],
        sans: ["OpenSans_400Regular"],
      },
    },
  },

  plugins: [],
};
