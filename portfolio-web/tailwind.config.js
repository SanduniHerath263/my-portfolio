/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0F1F',
        sky: '#AEE4FF',
        blueA: '#00B4DB',
        blueB: '#0083B0',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
