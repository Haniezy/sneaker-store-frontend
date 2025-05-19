/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./loding.html",
    "./welcome.html",
    "./slider.html",
    "./login.html",
    "./signup.html",
    "./home.html",
    "./cart.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
     
     
            fontFamily:{
              inter: ["Inter", ...defaultTheme.fontFamily.sans],

            },
            
      
    },
  },
  plugins: [],
}