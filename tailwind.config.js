/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        10: '10px'
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        'times-new-roman': ['Times New Roman', 'serif']
      },
      colors: {
        blackoil: '#141414'
      }
    }
  },
  plugins: []
}

