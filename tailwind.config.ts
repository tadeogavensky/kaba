import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "376px",
      },
      fontFamily: {
        body: ["Poppins", "sans"],
        heading: ["Montserrat", "sans"],
      },
      rotate: {
        "13": "13deg",
      },
      colors: {
        primary: {
          DEFAULT: "#005DFF",
        },
        secondary: {
          DEFAULT: "#00A88F",
        },
        accent: {
          DEFAULT: "#FFC107",
        },
        neutral: {
          white: "#FFFFFF",
          lightGray: "#F5F5F5",
        },
        complementary: {
          DEFAULT: "#FF5722",
        },
        optional: {
          earthyBrown: "#8D6E63",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
