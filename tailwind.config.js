import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints based on device width
        sm: "300px", // Small devices (e.g., phones)
        md: "768px", // Medium devices (e.g., tablets)
        lg: "1024px", // Large devices (e.g., laptops)
        xl: "1280px", // Extra large devices (e.g., desktops)
        "2xl": "1536px", // Extra large desktops
      },
    },
  },
  plugins: [mtConfig],
};
