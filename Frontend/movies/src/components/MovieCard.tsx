import { useContext } from 'react';
import GetMoviesContext  from '../context/GetMovies.tsx'
const imgFilme = import.meta.env.VITE_IMG;
import { FaStar } from 'react-icons/fa';

const MovieCard = () => {

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
        <ul className='flex gap-5 w-[100%] overflow-x-auto '>
          {movies.map(movie => (
            <li key={movie.id} className='relative'>
              <figure className='w-[11rem] '>
                  <img className="w-[500px] rounded-xl" src={imgFilme + movie.poster_path} alt={movie.title} />
                </figure>
                <div className="absolute bottom-0 w-full text-start text-white p-3 rounded-b-xl text-[1rem] " style={{ background: 'linear-gradient(to top, rgba(2, 1, 1.9, 1), transparent)' }}>
                  <span className="font-[500]">{movie.title}</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    {movie.vote_average}
                  </div>
                </div>
           
              </li>
          ))}
        </ul>
      ) : (
        <p>Sem filmes disponíveis.</p>
      )}
        </section>
    )
}

export default MovieCard