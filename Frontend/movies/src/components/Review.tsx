import { FaRegStar, FaStar } from "react-icons/fa";
import FavIcon from '../assets/img/fav.svg';
import FavIconLiked from '../assets/img/fav-icon.svg';
import ListIcon from '../assets/img/list.svg';
import React, { useState } from "react";
import Notification from "./Notification";
import { api } from "../context/api";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Review: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false); // Estado para controle da notificação
    const tamanho: number = 255;
    const { id } = useParams<{ id: string }>();
    const textoRestante = tamanho - reviewText.length;
    const token = Cookies.get('token');

    const postReview = async () => {
        try {
            const res = await api.post(
                'movies/overviews/',
                {
                    tmdb_id_input: id,
                    overview_text_movie: reviewText,
                    date_overview: date,
                    stars: rating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                } 
            );
            console.log(res.data);
            setReviewText('');
            setDate('');
            setFeedbackMessage('Avaliação enviada com sucesso!');
            setShowNotification(true); // Exibe a notificação ao enviar a avaliação
        } catch (err) {
            console.error(err);
            setFeedbackMessage('Erro ao enviar a avaliação.');
            setShowNotification(true); // Exibe a notificação de erro
        }
    };

    const toggleFavorite = async () => {
        try {
            const newIsLiked = !isLiked;
            await api.post('movies/favorite/', {
                tmdb_id: id,
                favorite: newIsLiked
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } );
            setIsLiked(newIsLiked);
        } catch (err) {
            console.error('Não foi possível curtir o filme: ' + err);
        }
    };

    const handleRatingChange = (value: number) => setRating(value);
    const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(event.target.value);
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value);

    return (
        <section className="pt-5">
            <div className="flex justify-center items-start">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star} 
                        onClick={() => handleRatingChange(star)} 
                        className="transition-all ease-in-out text-[2.5rem] hover:text-[2.7rem]"
                    >
                        {star <= rating ? <FaStar /> : <FaRegStar />}
                    </button>
                ))}
            </div>

            <div className="p-5">
                <textarea
                    onChange={handleReviewTextChange}
                    value={reviewText}
                    placeholder="Escreva sua avaliação:"
                    className="w-full min-h-[130px] computer:h-[270px] mt-3 bg-search outline-none p-4 rounded-borderRadius resize-none overflow-y-hidden"
                    maxLength={tamanho}
                />
                <p className="text-end text-[0.8rem] text-[#c7c7c7]">{textoRestante} caracteres restantes</p>
                <input
                    type="date"
                    onChange={handleDateChange}
                    value={date}
                    className="w-full bg-search outline-none p-2 rounded-borderRadius mt-3"
                />

                <button onClick={postReview} className="w-full bg-search rounded-borderRadius h-10 mt-3">
                    Enviar Avaliação
                </button>

                <div className="flex justify-around pt-5 items-center">
                    <button onClick={toggleFavorite} className="flex flex-col items-center gap-2">
                        <img className="w-11" src={isLiked ? FavIconLiked : FavIcon} alt="Favoritar" />
                        <span>Favoritar</span>
                    </button>
                    <button className="flex flex-col items-center gap-2">
                        <img className="w-12" src={ListIcon} alt="Adicionar à Lista" />
                        <span>Adicionar à Lista</span>
                    </button>
                </div>
            </div>

            {showNotification && (
                <Notification 
                    message={feedbackMessage} 
                    type={feedbackMessage.includes('Erro') ? 'error' : 'success'} 
                    duration={5000} 
                />
            )}
        </section>
    );
};

export default Review;
