import { useContext } from 'react';
import GetContentContext  from '../context/GetContent.tsx'
import { Link } from 'react-router-dom';
import '../assets/styles/container-filmes.css'
import { useGetId } from '../context/IdContext.tsx';
import Loading from './Loading.tsx';
import StarRating from './Rating.tsx';

const SeriesCard = () => {

    
    const context = useContext(GetContentContext)

    if (!context) {
        throw new Error('useContext must be used within a GetSeriesProvider');
      }

    const {rated} = context;

    const {setId} = useGetId();


    const getId = (id:number)  => {
      setId(id)
      console.log(id)
      
    }

     
    return (
        <section>
          <h2 className='text-[1.5rem] text-start mb-4 font-[700] text-white uppercase phone:text-[1.3rem]'>Filmes melhores avaliados</h2>
          {rated.length > 0 ? (
            
          <ul className='container-filmes flex-row-reverse'>
            {rated.map(rated => (
                        <Link to={`/overview-movie/${rated.id}`} key={rated.id}>
                            <li onClick={() => getId(rated.id)} className="movie-card">
                                <figure className='figPoster'>
                                    <img className='imgPoster' src={import.meta.env.VITE_IMG + rated.poster_path} alt={rated.title} />
                                </figure>
                                <div className="nome-filme">
                                    <span>{rated.title}</span>
                                    <div className="estrela">
                                        <StarRating rating={rated.vote_average} />
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))}
          </ul>
        ) : (
          <Loading />
        )}
        </section>
    )
}

export default SeriesCard