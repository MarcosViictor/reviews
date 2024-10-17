import { useSearch } from "../context/searchContext"
import { Link } from "react-router-dom";
import Loading from "./Loading";
 

const searchResults : React.FC = () => {

    const imgFilme = import.meta.env.VITE_IMG;

    const {searchResult} = useSearch() 

    return (

            <div >
                {searchResult.length > 0 ? (
                    <ul className='container-filmes flex flex-wrap justify-center px-[10rem]'>
                    {searchResult.map(movie => (
                        
                        <Link to={`/overview-movie/${movie.id}`} key={movie.id}>
                        <li key={movie.id} className="animate-fadeIn transition-all duration-50">
                            
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
                    <Loading />
                )}
            </div>
    
    )
}

export default searchResults