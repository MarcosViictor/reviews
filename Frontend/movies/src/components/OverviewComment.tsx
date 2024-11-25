
import { useParams } from "react-router-dom";
import { api } from "../context/api";
// import { useGetId } from "../context/IdContext";
import { useEffect, useState } from "react";
import { OverviewItem } from "./History";
import StarRatingReview from "./RatingReview";
import axios from "axios";
import { Movie } from "../Types/Movie";
import { useNavigate } from 'react-router-dom';

import Update from '../assets/img/update.svg'
import Delete from '../assets/img/delete.svg'
import PopUpDelete from "./PopUpDelete";
import UpdateReview from "./UpdateReview";
import ButtonAddComment from "./ButtonAddComment";

const OverviewComment : React.FC = () => {

    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [date, setDate] = useState<string>()
    const { id } = useParams<{ id: string }>();
    const [commentOverview, setCommentOverview] = useState<OverviewItem>()
    const [movie, setMovie] = useState<Movie>();
    const [modalDelete, setModalDelete] = useState(!true)
    const [modalUpdade, setModalUpdate] = useState(!true)
    const navigate = useNavigate();

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
                                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'
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
        }, [id, commentOverview]);

        const handleRating = (value: number) => {
            setRating(value);
        };

        const handleReviewChange = (event : React.ChangeEvent<HTMLTextAreaElement> ) => {
            setReviewText(event.target.value)
        }

        const handleDateChange = (event: React.ChangeEvent<HTMLDataElement>) => {
            setDate(event.target.value)
        }

        const updateComment = async () => {
            try {
                const res = await api.put(`movies/overviews/${id}/`, {
                    id: id,
                    tmdb_id_input: id,
                    overview_text_movie: reviewText,
                    date_overview: date,
                    stars: rating,
                });
        
                console.log('Resposta da API:', res);
                setModalUpdate(false)
        
            } catch (err: any) {
                console.error('Erro ao editar a avaliação:', err.response?.data || err.message || err);
            }
        };


    const deleteComment = async () => {
        
        try {
            const res = await api.delete(`movies/overviews/${id}/`);
            console.log(res)
            navigate(-1); // Volta para a página anterior
            
        } catch (err) {
            console.error('Não foi possível excluir a avaliação: ' + err)
        }
    }

    const modalButtonDelete = () => {
        setModalDelete((prev) => !prev);
    }

    const modalButtonUpdate = () => {
        setModalUpdate((prev) => !prev);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col gap-5">
        <section className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto flex flex-row gap-6 items-start w-[38rem] phone:w-full phone:max-w-[18rem] phone:ml-[6rem] phone:max-h-[55rem]">
            {movie && (
                <div className="flex-shrink-0 flex gap-5 ">
                    <img
                        className="w-36 h-52 rounded-lg shadow-md object-cover phone:w-20 phone:h-28"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div className="flex flex-col relative w-[25.1rem] phone:w-full">
                        <h3 className="text-2xl font-bold text-white mb-1">{movie.title}</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-400">
                                {new Date(commentOverview?.date_overview || 'Data não disponível').toLocaleDateString()}
                            </p>
                            <div className="flex items-center mb-3 text-white">
                                <StarRatingReview rating={commentOverview?.stars ?? 0} />
                            </div>
                            <p className="text-gray-200 w-full max-w-sm break-words overflow-hidden phone:w-36 phone:pb-[1.5rem]">
                                {commentOverview?.overview_text_movie}
                            </p>
                        </div>
                        <div>
                            <figure className="absolute bottom-0 right-0 flex gap-4 bg-slate-900 px-2 py-1 rounded-[9px]">
                                <button>
                                    <img onClick={() => modalButtonUpdate()} className="w-6  cursor-pointer transition-all hover:w-[25px]"
                                        src={Update} alt=""
                                    />
                                </button>
                                <button onClick={() => modalButtonDelete()}>
                                    <img className="w-6  cursor-pointer transition-all hover:w-[25px]"
                                        src={Delete} alt=""
                                    />
                                </button>
                            </figure>
                        </div>
                    </div>
                </div>
            )}
            
        </section>
        {modalUpdade === true && 
            <UpdateReview 
                handleRating={handleRating} 
                handleReviewChange={handleReviewChange}
                handleDateChange={handleDateChange}
                updateComment={updateComment}
                rating={rating}
                reviewText={reviewText}
                date={date}


            />
        }
        {modalDelete === true && 
            <PopUpDelete 
                modalButtonDelete={modalButtonDelete} 
                deleteComment={deleteComment}
            />}

            <ButtonAddComment />
    </div>


        )
};  

export default OverviewComment;