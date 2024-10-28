
import { useParams } from "react-router-dom";
import { api } from "../context/api";
// import { useGetId } from "../context/IdContext";
import { useEffect, useState } from "react";
import { OverviewItem } from "./History";
import StarRating from "./Rating";
import axios from "axios";
import { Movie } from "../Types/Movie";

const OverviewComment : React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [commentOverview, setCommentOverview] = useState<OverviewItem>()
    const [movie, setMovie] = useState<Movie>();

useEffect(() => {
    const getComments = async () => {
        try {
            // Busca o comentário específico pelo ID
            const res = await api.get(`movies/overviews/${id}/`);
            setCommentOverview(res.data);

            // Verifica se existe um `tmdb_id` para buscar os detalhes do filme
            if (res.data.tmdb_id) {
                const movieRes = await axios.get(
                    `https://api.themoviedb.org/3/movie/${res.data.tmdb_id}?language=pt-BR`,
                    {
                        headers: {
                            Authorization: 'Bearer SEU_TOKEN_AQUI'
                        }
                    }
                );
                setMovie(movieRes.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    getComments();
}, [id]);

return (
    <div>
        <section className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto flex flex-row gap-6">
    {movie && (
        <div>
            <div className="flex-shrink-0">
                <img
                    className="w-48 h-auto rounded-lg shadow-md"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>
                
                
                <div className="flex flex-col justify-between">
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                <p className="text-sm text-gray-400">{commentOverview?.date_overview}</p>
                <div className="flex items-center mb-4">
                    <StarRating rating={commentOverview?.stars ?? 0} />
                </div>
                <p className="text-gray-200 text-justify">
                    {commentOverview?.overview_text_movie}
                </p>
            </div>
                </div>
        </div>
    )}
</section>


        
    </div>
    )
};  

export default OverviewComment;