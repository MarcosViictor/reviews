/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        star: '#127369',
        fontColor: 'white'
      },
      width: {
        imagem: '11rem'
      },
      backgroundColor: {
        button: '#127369',
      },
      borderRadius: {
        borderRadius: '0.75rem',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
