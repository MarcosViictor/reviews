import { useContext } from 'react';
import GetContentContext  from '../context/GetContent.tsx'
const imgFilme = import.meta.env.VITE_IMG;
import { useGetId } from '../context/IdContext.tsx';
import { Link } from 'react-router-dom';
import '../assets/styles/container-filmes.css'
import StarRating from './Rating.tsx';
import Loading from './Loading.tsx';

const TopRated : React.FC = () => {

 
    const  context  = useContext(GetContentContext)
    // const {movies} = context
    // const id = localStorage.getItem('id')

    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {rated} = context

    const {setId} = useGetId();

    const getId = (id:number)  => {
      setId(id)
      console.log(id)
      
    }
 
    return (
        <section>
           <h2 className='text-[1.5rem] text-start mb-4 font-[700] text-white uppercase'>Lançados recentemente</h2>

        {rated.length > 0 ? (
        <ul className='container-filmes'>
          {rated.map(rated => (
             <Link to={`/overview-movie/${rated.id}`} key={rated.id}>
            <li onClick={() => getId(rated.id)}>
             
              <figure className='figPoster'>
                  <img className='imgPoster' src={imgFilme + rated.poster_path} alt={rated.title} />
              </figure>
                <div className="nome-filme">
                  <span>{rated.title}</span>
                  <div className="estrela">
                    <StarRating rating={rated.vote_average}/>
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

export default TopRated