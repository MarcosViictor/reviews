import { useContext } from "react";
import GetContentContext from "../context/GetContent";
import User from '../assets/img/person-icon.svg'
import StarRating from '../components/Rating'

const Comments : React.FC = () => {

    const  context  = useContext(GetContentContext)


    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {reviews} = context

    return (
        <>
            <section >
                <h3 className="text-[2.2rem] ml-32 mt-6 text-white font-bold">Avaliações dos usuários: </h3>
                        {reviews.length > 0 ? (<div className="mx-32 grid grid-cols-3 gap-6 mt-4 text-white">
                            {reviews.map((review) => (
                                <div key={review.id} className="flex flex-col items-start bg-comments rounded-borderRadius p-2 cursor-pointer transition-all hover:bg-commentsHover">
                                    {review.author_details.avatar_path ? (
                                        <div className="flex pb-2">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                                                className="rounded-full w-16 h-16 mx-4"
                                            />
                                                <div className="flex flex-col">
                                                    <p>{review.author_details.username}</p>
                                                    <span className="flex">
                                                        <StarRating rating={review.author_details.rating || 0} />
                            
                                                    </span>
                                                    <p className="text-[0.8rem] text-gray-400">Publicado: {new Date(review.created_at).toLocaleDateString()}</p>
                                                </div>
                                        </div>
                                        ) : (
                                        <div className="flex pb-2">
                                            <img
                                                src={User}
                                                alt="Default avatar"
                                                className="rounded-full w-16 h-16 mx-4 bg-slate-700"
                                            />
                                             <div className="flex flex-col">
                                                    <p>{review.author_details.username}</p>
                                                    <span className="flex">
                                                        <StarRating rating={review.author_details.rating || 0} />
                            
                                                    </span>
                                                    <p className="text-[0.8rem] text-gray-400">Publicado: {new Date(review.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    )}
                                    <li className=" max-h-48 px-2 list-none">
                            
                                        <p className="multiline-truncated  min-w-[350px] ">{review.content}</p>
                            
                            
                                    </li>
                                </div>
                            ))}
                        </div> 
                        )
                        : (
                            <p className="text-center  text-white text-[1.5rem]">Não há avaliações disponíveis</p>
                        )}
        </section>
        </>
    )
}

export default Comments


