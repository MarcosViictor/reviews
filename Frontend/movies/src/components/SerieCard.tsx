import { useContext } from 'react';
import GetContentContext  from '../context/GetContent.tsx'
const imgSerie = import.meta.env.VITE_IMG
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

    const {series} = context;

    const {setId} = useGetId();


    const getId = (id:number)  => {
      setId(id)
      console.log(id)
      
    }

     
    return (
        <section>
          <h2>Top Séries</h2>
          {series.length > 0 ? (
            
          <ul className='container-filmes'>
            {series.map(serie => (
              <Link to={`/overview-serie/${serie.id}`} key={serie.id}>
              <li onClick={() => getId(serie.id)}>
                 <figure className='figPoster'>
                  <img className='imgPoster' src={imgSerie + serie.poster_path} alt={serie.name} />
                </figure>
                <div className="nome-filme">
                  <span>{serie.name}</span>
                  <div className="estrela">
                   <StarRating rating={serie.vote_average}/>
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