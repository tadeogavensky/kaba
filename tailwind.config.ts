import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans"],
        heading: ["Montserrat", "sans"],
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
