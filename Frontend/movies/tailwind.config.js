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
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
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
      screens: {
        '2xl': '1745px',  // Nome personalizado, ex: 2xl
      },
      gap: {
        poster: '100px'
      },
      borderWidth: {
        genreName: '1px solid white'
      },
      gridTemplateColumns: {
        20: 'repeat(20, 2fr, 2fr)', // Define 20 colunas de tamanho igual
      },
      backgroundColor: {
        button: '#127369',
        sideBar: '#191815',
        background: '#051119',
        search: 'rgba(76, 89, 88, 0.5)',
        comments: 'rgba(233, 166, 166, 0.05)'
        
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
