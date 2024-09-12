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
        imagem: '11rem',
        poster: '75vw'
      },
      height: {
        poster: '100%'
      },
      gap: {
        poster: '100px'
      },
      borderWidth: {
        
      },
      gridTemplateColumns: {
        20: 'repeat(20, 2fr, 2fr)', // Define 20 colunas de tamanho igual
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
