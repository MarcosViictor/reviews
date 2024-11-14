import { useEffect, useState } from "react";
import { api } from "../context/api";
import axios from "axios";
import StarRating from "./Rating";
import { Movie } from "../Types/Movie";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useGetId } from "../context/IdContext";
import { Link } from "react-router-dom";

export interface OverviewItem {
    tmdb_id: number;
    date_overview: string;
    overview_text_movie: string;
    stars: number;
    id  : number;
}

const History: React.FC = () => {
    const [overview, setOverview] = useState<OverviewItem[]>([]);
    const [movieDetails, setMovieDetails] = useState<Movie[]>([]);
    const imgFilme = import.meta.env.VITE_IMG;
    const { setIdComment } = useGetId();

    // Ordena a lista de avaliações por data (mais recente primeiro)
    const sortedOverview = [...overview].sort((a, b) => new Date(b.date_overview).getTime() - new Date(a.date_overview).getTime());

    const reviewsByDate = sortedOverview.reduce<{ [date: string]: OverviewItem[] }>((acc, item) => {
        const dateKey = format(new Date(item.date_overview), 'MMMM yyyy', { locale: ptBR });
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});

    const getIdComment = (id: number) => {
        setIdComment(id);
        console.log(id);
    };

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
            {overview.length === 0 ? (
                <div className="flex justify-center items-center h-full mt-[21%]">
                    <p className="text-white text-xl font-semibold">Você ainda não fez uma avaliação :(</p>
                </div>
            ) : (
                Object.entries(reviewsByDate).map(([monthYear, reviews]) => (
                    <div key={monthYear} className="date-group">
                        <h3 className="text-xl font-bold text-white ml-[8rem] mt-6 border-l-4 w-[13rem] text-start p-2">
                            {monthYear.toLocaleUpperCase()}
                        </h3>

                        {reviews.map((item, index) => {
                            const movie = movieDetails.find((movie) => movie.id === item.tmdb_id);
                            const formattedDate = format(new Date(item.date_overview), 'dd/MM/yyyy', { locale: ptBR });

                            return (
                                <Link to={`/comments/${item.id}`} onClick={() => getIdComment(item.id)} key={index}>
                                    <div className="text-white gap-8 border-b flex flex-col ml-[8rem] mr-[4.5rem]">
                                        {movie && (
                                            <div className="flex items-start gap-5 cursor-pointer transition-all p-5 hover:bg-comments">
                                                <div>
                                                    <img
                                                        className="w-20 rounded-borderRadius"
                                                        src={imgFilme + movie.poster_path || '/path/to/placeholder.jpg'}
                                                        alt={movie.title || 'Imagem indisponível'}
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <p className="text-[1.3rem] font-semibold">
                                                        {movie.title || 'Título não disponível'}
                                                    </p>
                                                    <p className="text-sm text-gray-400">{formattedDate}</p>
                                                    <div className="flex text-[1.3rem]">
                                                        <StarRating rating={item.stars} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))
            )}
        </div>
    );
};

export default History;
