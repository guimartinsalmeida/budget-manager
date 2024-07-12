/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-red': 'rgba(193, 28, 36, 0.176)',
        'custom-black':'rgba(50, 50, 50, 1)',
      },
      padding:{
        'p-custom': '3px 7px 0px 7px'
      },
      screens: {
        'xl2': '1063px',
      },
    },
  },
  plugins: [],
}

