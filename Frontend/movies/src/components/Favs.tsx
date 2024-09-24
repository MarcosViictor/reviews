import GetContentContext from "../context/GetContent";
import { useContext } from "react";
const imgFilme = import.meta.env.VITE_IMG;
import FavIcon from '../assets/img/fav-icon.svg'
import { Link } from "react-router-dom";
import '../assets/styles/container-filmes.css'


const Favs : React.FC = () => {

    const context = useContext(GetContentContext)

    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {favorites} = context


    return (

            <div >
            {favorites.length > 0 ? (
                <ul className='container-filmes flex flex-wrap justify-center'>
                {favorites.map(favorite => (
                    
                    <Link to={`/overview-movie/${favorite.id}`} key={favorite.id}>
                    <li>
                        
                        <figure className="figPoster">
                            <img className="imgPoster" src={imgFilme + favorite.poster_path} alt={favorite.title} />
                        </figure>
                        <figure className="absolute top-0 w-full flex justify-end p-[0.8rem] z-30 bg-gradient">
                            <img src={FavIcon} alt="" />
                        </figure>
                        <div className="nome-filme">
                            <span>{favorite.title || favorite.name}</span>
        
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

export default Favs;