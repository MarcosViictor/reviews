
import { useEffect, useState } from "react";
import { api } from "../context/api";
import axios from "axios";
import StarRating from "./Rating";


const History : React.FC = () => {

    const [overview, setOverview] = useState<any[]>([]);
    const [movieDetails, setMovieDetails] = useState<any[]>([]);
    const imgFilme = import.meta.env.VITE_IMG;

    useEffect(() => {
        const GetOverview = async () => {
            try {
                const res = await api.get('movies/overviews/');
                setOverview(res.data); // Set overview data
                console.log(res.data);

                // Agora faz a requisição para o TMDb usando os IDs dos filmes
                res.data.forEach(async (item: any) => {
                    const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${item.id_movie}?language=pt-BR`, 
                        {
                            headers : {
                               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'}
                          });
                    setMovieDetails((prev) => [...prev, movieRes.data]);  // Armazena os detalhes do filme
                });
            } catch (err) {
                console.log(err);
            }
        };

        GetOverview();
    }, []);


    return (
        <div className="flex flex-col gap-5">
            {overview.map((item, index) => (
                    <div key={index} className="text-white border gap-8 flex flex-col ml-[8rem] mr-[4.5rem] rounded-borderRadius">
                        {movieDetails.find((movie) => movie.id === item.id_movie) && (
                            <div className="flex items-start gap-4 ">
                                <div>
                                    <img className="w-32 rounded-borderRadius" 
                                        src={imgFilme + movieDetails.find((movie) => movie.id === item.id_movie).poster_path } alt="" />
                                </div>
                                <div className="flex flex-col pt-6">
                                    <p>{movieDetails.find((movie) => movie.id === item.id_movie).title}</p>
                                    <div className="flex">
                                        <StarRating rating={item.stars}/>
                                    </div>
                                    <p>{item.overview_text_movie}</p>
                                </div>
                            </div>
                        )}
                       
                
                    </div>
        ))}
    </div>
    )

}

export default History;