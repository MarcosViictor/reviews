import {FaRegStar, FaStar } from "react-icons/fa";
import FavIcon from '../assets/img/fav.svg'
import FavIconLikedfrom from '../assets/img/fav-icon.svg'
import ListIcon from  '../assets/img/list.svg'
import React, { useState } from "react";



const Review = () => {

    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [date, setDate] = useState<string>()
    const [isLiked, setIsLiked] = useState<boolean>(true);

    const handleLike = () => {
        setIsLiked(!isLiked) //muda pra não isLiked ou seja, false
    }



    const send = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(reviewText)
        console.log(rating)
        console.log(date)
        setReviewText('')
        setDate('')

        //função para enviar form
        
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
                    
                />

                <button className="w-full bg-search rounded-borderRadius h-10 mt-3" onClick={send}>
                    Enviar
                </button>

                <div className="flex justify-around pt-5 items-center 2xl:pt-6">

                    <button className="flex flex-col items-center gap-2" onClick={handleLike}>
                        {isLiked ? <img className="w-11" src={FavIcon} /> : <img className="w-11" src={FavIconLikedfrom} />}

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

{/* <div className="">
                <span className="text-[3rem] flex justify-center gap-1 text-gray-400 py-4">
                    
                </span>
               
               <textarea className="w-full" name="" id=""/>
            </div> */}