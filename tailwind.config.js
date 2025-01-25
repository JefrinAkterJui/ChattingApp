/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily:{

      'poppins':[ "Poppins", "serif"],
      'bannerfont':[  "Great Vibes", "serif"]
    },
    extend: {},
    container:{
      center:true
    },
    backgroundImage:{
      'userbg':"url('/src/assets/Images/userBanner.png')"
    }
  },
  plugins: [],
}