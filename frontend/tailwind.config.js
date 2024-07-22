/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-green': 'rgba(54, 191, 142, 0.1)',
        'custom-green-opaque-clear':'rgb(56 102 86)',
        'custom-black':'rgba(50, 50, 50, 1)',
        'custom-red':'#ff000014',
        'custom-green-hover':'#b1e9d54a',
        'custom-green-hover-opaque-clear':'#54b190'
      },
      borderColor:{
        'custom-border-green': '#29aa7c',
        'custom-border-red': '#ff00003d'
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

