/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#5B67F1',
        aqua: '#38A3A5',
        coral: '#EF6A67',
      },
      fontFamily: {
        display: ['Spline Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
