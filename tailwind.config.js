/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',  //For custom media queries to work like min-[375px]:text-2xl in navbar
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

