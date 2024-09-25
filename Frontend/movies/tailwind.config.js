/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        star: '#127369',
        fontColor: 'white',
        barra: '#7B7B79',
        selected: '#136157'
      },
      width: {
        imagem: '11rem',
        poster: '75vw'
      },
      height: {
        poster: '100%'
      },
      margin: {
        Body: '0 4rem 0 4.5rem '
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
        sideBar: '#191815',
        background: '#051119',
        search: 'rgba(76, 89, 88, 0.5)',
        
      },
      backgroundImage: {
        gradient: 'linear-gradient(to bottom, rgba(0,20, 0, 20), transparent)'
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
