import { useContext } from 'react';
import GetContentContext  from '../context/GetContent.tsx'
const imgFilme = import.meta.env.VITE_IMG;
import { FaStar } from 'react-icons/fa';
import { useGetId } from '../context/IdContext.tsx';
import { Link } from 'react-router-dom';
import '../assets/styles/container-filmes.css'

const MovieCard : React.FC = () => {

    const {setId} = useGetId();
    const  context  = useContext(GetContentContext)
    // const {movies} = context
    // const id = localStorage.getItem('id')

    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {movies} = context

    const getId = (id:number)  => {
      setId(id)
      console.log(id)
      
    }
 
    return (
        <section>
           <h2 className='text-[2rem] text-center mb-4 font-[700] text-white uppercase'>Top Filmes</h2>

        {movies.length > 0 ? (
        <ul className='container-filmes'>
          {movies.map(movie => (
             <Link to={`/overview-movie/${movie.id}`} key={movie.id}>
            <li onClick={() => getId(movie.id)}>
             
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
            </Link>
          ))}
        </ul>

      ) : (
        <p>Carregando...</p>
      )}
        </section>
    )
}

export default MovieCard