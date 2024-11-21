import axios from "axios";
import { Movie } from "../Types/Movie";
import { api } from "../context/api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import StarRating from "./Rating";
import { LuDices } from "react-icons/lu";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { Link } from "react-router-dom";


const SugestionRandom : React.FC = () => {

    const [movie, setMovie] = useState<Movie | null>(null)
    const [id, setId] = useState<number| null >(null)

    const getRandomMovies = async () => {
        try{
            const response = await api.get(`/discovery/movie`);
            const movies = response.data.results;

            const randomIndex = Math.floor(Math.random() * movies.length);
            const selectedMovieId = movies[randomIndex].id; 

            await searchMovieById(selectedMovieId)
            setId(selectedMovieId)
        } catch (err) {
            console.error('Erro ao escolher filme aleatório: '+ err)
        }
       
    }

    


    useEffect(() => {
         getRandomMovies()
    }, [])

    const searchMovieById = async ( id: number ) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ`, 
                      }
                }
            )
            setMovie(res.data)
        } catch (err) {
            console.error("Erro ao encontrar o filme" + err)
        }
    }


    

    return (
        <>
         {movie ? (
            <div className="justify-center flex items-center">
                <div  className="bg-slate-800 px-6 pt-4 pb-6 mt-24 rounded-borderRadius text-white flex flex-col gap-3">
                 <span className="flex gap-2 text-[1.3rem] items-center bg-slate-700 px-2 rounded-borderRadius">
                     <LuDices />
                        <h1 className="">RANDOM MOVIE</h1>
                 </span>
                    <div className="flex gap-4">
                        <Link to={`/overview-movie/${id}`}>
                            <figure className="flex justify-center">
                                <img
                                    className=" shadow-container w-[300px] rounded-borderRadius flex justify-center transition-all hover:w-[305px]"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </figure>
                        </Link>
                        
                        <div className="">
                            <h1 className="pt-3 text-[1.4rem]">{movie.title}</h1>
                            <span className="flex text-[1.3rem]">
                                <StarRating rating={movie.vote_average}/>
                            </span>
                            <p className=" max-w-sm break-words overflow-ellipsis  pt-3">{movie.overview}</p>
                            <span className="justify-center flex pt-3">
                                <button onClick={getRandomMovies} className="bg-slate-600 px-5 py-2 text-[2rem] rounded-borderRadius transition-all hover:bg-slate-700">
                                <GiPerspectiveDiceSixFacesRandom />
                                </button>
                            </span>
                        </div>
                    
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center pt-[15%]">
                <Loading />
            </div>
        )}
            
        </>
    )
}

export default SugestionRandom;