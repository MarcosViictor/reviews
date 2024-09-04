import { useContext } from 'react';
import GetMoviesContext  from '../context/GetMovies.tsx'

const MovieCard = () => {

    const context = useContext(GetMoviesContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetMoviesProvider');
      }

    const {movies} = context

     
    return (
        <>
        {movies.length > 0 ? (
        <ul className='flex gap-2 '>
          {movies.map(movie => (
            <li key={movie.id}>
                <p>{movie.id}</p>
              {movie.title}
              {/* <p>{movie.overview}</p> */}
              {/* <img src={movie.poster_path} alt={movie.title} /> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem filmes disponíveis.</p>
      )}
        </>
    )
}

export default MovieCard