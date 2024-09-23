import { useContext } from 'react';
import GetMoviesContext  from '../context/GetMovies.tsx'
const imgFilme = import.meta.env.VITE_IMG;
import { FaStar } from 'react-icons/fa';

import '../assets/styles/container-filmes.css'

const MovieCard : React.FC = () => {

    const context = useContext(GetMoviesContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetMoviesProvider');
      }

    const {movies} = context

     
    return (
        <section>
           <h2 className='text-[2rem] text-center mb-4 font-[700] text-white uppercase'>Top Filmes</h2>

        {movies.length > 0 ? (
        <ul className='container-filmes'>
          {movies.map(movie => (
            <li key={movie.id}>
              <figure className='figPoster'>
                  <img className='imgPoster' src={imgFilme + movie.poster_path} alt={movie.title} />
                </figure>
                <div className="nome-filme">
                  <span>{movie.title}</span>
                  <div className="estrela">
                    <FaStar className='text-star'/>
                    {movie.vote_average}
                  </div>
                </div>
           
              </li>
          ))}
        </ul>

      ) : (
        <p>Carregando...</p>
      )}
        </section>
    )
}

export default MovieCard