import GetFavsContext from "../context/GetFavs";
import { useContext } from "react";
const imgFilme = import.meta.env.VITE_IMG;
import FavIcon from '../assets/img/fav-icon.svg'

import '../assets/styles/container-filmes.css'


const Favs : React.FC = () => {

    const context = useContext(GetFavsContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetFavsProvider');
      }

    const {movies} = context


    return (

            <div >
            {movies.length > 0 ? (
                <ul className='container-filmes flex flex-wrap justify-center'>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <figure className="figPoster">
                            <img className="imgPoster" src={imgFilme + movie.poster_path} alt={movie.title} />
                        </figure>
                        <figure className="absolute top-0 w-full flex justify-end p-[0.8rem] z-30 bg-gradient">
                            <img src={FavIcon} alt="" />
                        </figure>
                        <div className="nome-filme">
                            <span>{movie.title}</span>
        
                        </div>
                
                    </li>
                ))}
                </ul>

                ) : (
                <p>Carregando...</p>
            )}
            </div>
    
    )
}

export default Favs;