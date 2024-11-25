
import FavIcon from '../assets/img/fav-icon.svg'
import { Link } from "react-router-dom";
import '../assets/styles/container-filmes.css'
import { api } from "../context/api";
import { useState, useEffect } from "react";
import { Movie } from "../Types/Movie";
import axios from "axios";

const Favs : React.FC = () => {

    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [movieDetails, setMovieDetails] = useState<Movie[]>([]);

    useEffect(() => {
        const getFavs = async () => {
            try {
                const res = await api.get('movies/favorites/')
                setFavorites(res.data);
                console.log(favorites)

                const movieDetails = await Promise.all(
                    res.data.map(async (item: { tmdb_id: string }) => {
                        const movieRes = await axios.get(
                            `https://api.themoviedb.org/3/movie/${item.tmdb_id}?language=pt-BR`,
                            {
                                headers: {
                                    Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'
                                }
                            }
                        );
                        return movieRes.data;
                    })
                );

                setMovieDetails(movieDetails);
            } catch (err) {
                console.error('Erro ao acessar os favoritos: ' + err)
            }
        } 

        getFavs()
    }, [])

    


    return (

            <div >
            {movieDetails.length > 0 ? (
                        <ul className='container-filmes container-filmes-search flex flex-wrap justify-center px-[10rem]'>
                            {movieDetails.map((movie) => (
                                <Link to={`/overview-movie/${movie.id}`} key={movie.id}>
                                    <li>
                                        <figure className="figPoster">
                                            <img
                                                className="imgPoster"
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                                alt={movie.title}
                                            />
                                        </figure>
                                        <figure className="absolute top-0 w-full flex justify-end p-[0.8rem] z-30 bg-gradient">
                                            <img src={FavIcon} alt="Ícone de favorito" />
                                        </figure>
                                        <div className="nome-filme">
                                            <span>{movie.title}</span>
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