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
        blackoil: '#141414',
        layout: '#222438',
        container: '#191b2d',
        header: '#433878',
        ghostWhite: '#F3F4F6',
        lightGhostWhite: '#e6e7eb',
        basicLime: '#b0e633',
        basicIndigo: '#4338ca',
        lightIndigo: '#6366f1',
        darkIndigo: '#3730a3',
        hoverIndigo: '#4338ca',
        subModal: '#27273e'
      }
    }
  },
  plugins: []
}
