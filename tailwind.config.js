/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Outfit: ["Outfit", "sans-serif"],
      Youngserif: ["YoungSerif", "serif"],
    },
    fontWeight: {
      YoungSerifRegular: 400,
      OutfitRegular: 400,
      OutfitSemiBold: 600,
      OutfitBold: 700,
    },
    colors: {
      Nutmeg: "hsl(14, 45%, 36%)",
      DarkRaspberry: "hsl(332, 51%, 32%)",
      White: "hsl(0, 0%, 100%)",
      RoseWhite: "hsl(330, 100%, 98%)",
      Eggshell: "hsl(30, 54%, 90%)",
      LightGrey: "hsl(30, 18%, 87%)",
      WengeBrown: "hsl(30, 10%, 34%)",
      DarkCharcoal: "hsl(24, 5%, 18%)",
      Cream: "hsl(29, 53%, 90%)",
      Red: "hsl(0, 100%, 50%)",
      Green: "hsl(120, 100%, 50%)",
    },
    maxWidth: {
      desktop: "46rem",
    },
  },
  plugins: [],
};
