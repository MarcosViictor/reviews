import { useEffect, useState } from "react";
import { api } from "../context/api";
import axios from "axios";
import StarRating from "./Rating";
import { Movie } from "../Types/Movie";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface OverviewItem {
    tmdb_id: number;
    date_overview: string;
    overview_text_movie: string;
    stars: number;
}

const History: React.FC = () => {
    const [overview, setOverview] = useState<OverviewItem[]>([]);
    const [movieDetails, setMovieDetails] = useState<Movie[]>([]);
    const imgFilme = import.meta.env.VITE_IMG;

    const reviewsByDate = overview.reduce<{ [date: string]: OverviewItem[] }>((acc, item) => {
        const dateKey = format(new Date(item.date_overview), 'MMMM yyyy', {locale: ptBR}); 
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});

    useEffect(() => {
        const GetOverview = async () => {
            try {
                const res = await api.get('movies/overviews/');
                setOverview(res.data); // Set overview data
                console.log(res.data);

                res.data.forEach(async (item: OverviewItem) => {
                    const movieRes = await axios.get(
                        `https://api.themoviedb.org/3/movie/${item.tmdb_id}?language=pt-BR`, 
                        {
                            headers: {
                                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'
                            }
                        }
                    );
                    setMovieDetails((prev) => [...prev, movieRes.data]);
                });
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        };

        GetOverview();
    }, []);

    return (
        <div className="flex flex-col mx-52">
            {Object.entries(reviewsByDate).map(([monthYear, reviews]) => (
                <div key={monthYear} className="date-group">
                    <h3 className="text-xl font-bold text-white ml-[8rem] mt-6 border-l-4 w-[13rem] text-start p-2">{monthYear.toLocaleUpperCase()}</h3>

                    {reviews.map((item, index) => {
                        const movie = movieDetails.find((movie) => movie.id === item.tmdb_id);
                        const formattedDate = format(new Date(item.date_overview), 'dd/MM/yyyy', { locale: ptBR }); 

                        return (
                            <div key={index} className="text-white gap-8 border-b flex flex-col ml-[8rem] mr-[4.5rem]">
                                {movie && (
                                    <div className="flex items-start gap-5 cursor-pointer transition-all py-5 hover:bg-comments">
                                        <div>
                                            <img
                                                className="w-32 rounded-borderRadius"
                                                src={imgFilme + movie.poster_path || '/path/to/placeholder.jpg'}
                                                alt={movie.title || 'Imagem indisponível'}
                                            />
                                        </div>
                                        <div className="flex flex-col pt-6">
                                            <p className="text-[1.3rem] font-semibold">
                                                {movie.title || 'Título não disponível'}
                                            </p>
                                            <p className="text-sm text-gray-400">{formattedDate}</p> {/* Data completa */}
                                            <div className="flex text-[1.3rem]">
                                                <StarRating rating={item.stars} />
                                            </div>
                                            <p className="teste pt-4">{item.overview_text_movie}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default History;
