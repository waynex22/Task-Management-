/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {color : {
      primary: '#03D3FC',
    }},
  },
  plugins: [],
}

