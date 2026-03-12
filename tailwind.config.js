/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f9ee',
          100: '#d9f0d4',
          200: '#b5e0ab',
          300: '#86ca7b',
          400: '#5aaf4e',
          500: '#3a9230',
          600: '#2d7a27',
          700: '#255f20',
          800: '#1f4c1c',
          900: '#1a4019',
          950: '#0c2309',
        },
        earth: {
          50:  '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d9b5',
          300: '#e8be84',
          400: '#dc9f52',
          500: '#d48530',
          600: '#c66d25',
          700: '#a55520',
          800: '#854422',
          900: '#6c391f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
