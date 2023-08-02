/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        pry : "#684574",
        sec : "#F5D150",
        "pry-800" : "#81658B",
        "pry-600" : "#9A85A2",
        "pry-500" : "#A694AC",
        "pry-400" : "#B3A5B7",
        "pry-300" : "#C0B6C4",
        "pry-200" : "#CCC5CE",
      },
    },
    fontFamily: {
      montserrat : ['Montserrat', 'san-serif'],
      nunito : ['Figtree', 'Montserrat'],
      lato : ['Figtree','Montserrat'],
      curve : ['DM Serif Display', 'Montserrat']
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
