import GetContentContext from "../context/GetContent";
import { useContext } from "react";
const imgFilme = import.meta.env.VITE_IMG;
import { Link, useParams } from "react-router-dom";
import '../assets/styles/container-filmes.css'


const ByGenreComponent : React.FC = () => {

    const context = useContext(GetContentContext)

    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {genreMovies} = context

     const { id } = useParams<{ id: string }>();


    return (

            <div >
            {genreMovies.length > 0 ? (
                <ul className='container-filmes flex flex-wrap justify-center px-[10rem] '>
                {genreMovies.map(movie => (
                    
                    <Link to={`/genre/${id}/overview-movie/${movie.id}`} key={movie.id}>
                    <li key={movie.id}>
                        
                        <figure className="figPoster">
                            <img className="imgPoster" src={imgFilme + movie.poster_path} alt={movie.title} />
                        </figure>
                        <div className="nome-filme">
                            <span>{movie.title || movie.name}</span>
        
                        </div>
                
                    </li>
                    </Link>
                ))}
                </ul>

                ) : (
                <p>Carregando...</p>
            )}
            </div>
    
    )
}

export default ByGenreComponent;