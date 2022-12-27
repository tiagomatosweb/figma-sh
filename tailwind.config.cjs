/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E3E5E8',
          300: '#D2D5DA',
          400: '#9DA3AE',
          500: '#6C727F',
          600: '#4F545E',
          700: '#3D4148',
          800: '#25272C',
          900: '#17191C',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
