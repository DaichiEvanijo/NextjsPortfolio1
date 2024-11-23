import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ['w-[50%]'],
  theme: {
    extend: {
      animation:{
        "fromAbove":"fromAbove 2s ease-in-out forwards",
        "fromBelow":"fromBelow 1s ease-in-out forwards",
        "fromLeft":"fromLeft 1s ease-in-out forwards",
        "fromRight":"fromRight 1s ease-in-out forwards",
      },
      keyframes:{
        "fromAbove":{
          from:{opacity:"0%",transform:"translateY(-15vh)"},
          to:{opacity:"100%", transform:"translateY(0)"}
        },
        "fromBelow":{
          from:{opacity:"0%",transform:"translateY(15vh)"},
          to:{opacity:"100%", transform:"translateY(0)"}
        },
        "fromLeft":{
          from:{opacity:"0%",transform:"translateX(-15vh)"},
          to:{opacity:"100%", transform:"translateY(0)"}
        },
        "fromRight":{
          from:{opacity:"0%",transform:"translateX(15vh)"},
          to:{opacity:"100%", transform:"translateY(0)"}
        },
      }
    },
  },
  plugins: [],
};
export default config;
