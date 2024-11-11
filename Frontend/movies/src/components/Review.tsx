import {FaRegStar, FaStar } from "react-icons/fa";
import FavIcon from '../assets/img/fav.svg'
import FavIconLikedfrom from '../assets/img/fav-icon.svg'
import ListIcon from  '../assets/img/list.svg'
import React, { useState} from "react";
import { api } from "../context/api";
import { useParams } from "react-router-dom";



const Review = () => {

    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [date, setDate] = useState<string>()
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    
        const PostReview = async () => {
            try {
                const res = await api.post('movies/overviews/', 
                {
                    tmdb_id_input: id,
                    overview_text_movie: reviewText,
                    date_overview: date,
                    stars: rating
                });

                console.log(res.data);
                setReviewText('')

             
            } catch (err) {
                console.error(err)
            };
        }

    const FavAction = async(like: boolean) => {
        try {
            const res = await api.post('movies/favorite/', {
                tmdb_id : id,
                favorite: like
            })
            console.log(res)
           
        } catch (err) {
            console.error('Não foi possível curtir o filme' + err)
        }
    }

    const handleLike = () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        FavAction(newIsLiked);
    }

    const handleRating = (value: number) => {
        setRating(value);
    };

    const handleReviewChange = (event : React.ChangeEvent<HTMLTextAreaElement> ) => {
        setReviewText(event.target.value)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLDataElement>) => {
        setDate(event.target.value)
    }

    return (
        <section  className="//absolute //right-0 //w-[30%] mr-8 bg-search min-h-[77%]  rounded-borderRadius px-6 text-white flex flex-col pt-6 2xl:min-h-[620px]">
            <div className="flex justify-center items-start ">
                {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className=" " onClick={() => handleRating(star)}>
                          {star <= rating ? (
                                <FaStar className="w-12 text-[2.5rem] transition-all ease-in-out hover:text-[2.7rem] " /> 
                          ) : (
                                <FaRegStar className="w-12 text-[2.5rem] transition-all ease-in-out hover:text-[2.6rem]" />
                          )}
                        </button>
                      ))}
            </div>

            <div className="p-5 h-full ">
                <textarea
                     onChange={handleReviewChange}  
                     value={reviewText}  
                     className="w-full h-[200px] mt-3 bg-search outline-none p-4 rounded-borderRadius 2xl:h-[300px]" 
                     placeholder="Escreva sua avaliação:" 
                />
                <input 
                    type="date" 
                    className="w-full  bg-search  outline-none p-2 rounded-borderRadius" 
                    onChange={handleDateChange}
                    value={date}
                    id="email"
                    
                />

                <button className="w-full bg-search rounded-borderRadius h-10 mt-3" onClick={PostReview}>
                    Enviar
                </button>

                <div className="flex justify-around pt-5 items-center 2xl:pt-6">

                    <button className="flex flex-col items-center gap-2" onClick={handleLike}>
                        {isLiked ? <img className="w-11" src={FavIconLikedfrom} /> :  <img className="w-11" src={FavIcon} /> }

                        <span>Favoritar</span>
                        
                    </button>
                    <button className="flex flex-col items-center gap-2">
                        <img className="w-12 mb-[-10px]" src={ListIcon} />

                        <span>Adicionar à Lista</span>
                    </button>
            </div>
            </div>

            
            
        </section>
    )

}

export default Review;
