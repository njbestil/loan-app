const flowbite = require("flowbite-react/tailwind");
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          50:  '#f1f3ff',
          100: '#d7dafe',
          200: '#b3b9fd',
          300: '#8d96fa',
          400: '#686df4',
          500: '#4748ec',
          600: '#2f30db',
          700: '#170acb', // Your custom base
          800: '#1208a5',
          900: '#0c057e',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

