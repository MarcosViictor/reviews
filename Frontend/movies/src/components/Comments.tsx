import { useContext, useState } from "react";
import GetContentContext from "../context/GetContent";
import User from '../assets/img/person-icon.svg';
import StarRating from '../components/Rating';
import CommentTMDB from "./CommentTMDB";

const Comments: React.FC = () => {
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3); // Número inicial de comentários visíveis
    const context = useContext(GetContentContext);

    const modalButtonComment = (id: string | null) => {
        setActiveCommentId(id);
    };

    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
    }

    const { reviews } = context;

    // Função para exibir mais comentários
    const showMoreComments = () => {
        setVisibleCount((prevCount) => prevCount + 3); // Aumenta a quantidade visível em 3, por exemplo
    };

    return (
        <>
            <section className="mb-6">
                <h3 className="text-[1.8rem] ml-32 mt-6 text-white font-bold">Avaliações dos usuários: </h3>
                {reviews.length > 0 ? (
                    <div className="mx-32 grid grid-cols-3 gap-6 mt-4 text-white">
                        {reviews.slice(0, visibleCount).map((review) => (
                            <div key={review.id} className="flex flex-col items-start bg-comments rounded-borderRadius p-2 cursor-pointer transition-all hover:bg-commentsHover">
                                {review.author_details.avatar_path ? (
                                    <div className="flex pb-2" onClick={() => modalButtonComment(review.id)}>
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
                                    <div className="flex pb-2" onClick={() => modalButtonComment(review.id)}>
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
                                <li className="max-h-48 px-2 list-none">
                                    <p className="multiline-truncated min-w-[350px]">{review.content}</p>
                                </li>
                                {activeCommentId === review.id && (
                                    <CommentTMDB
                                        username={review.author_details.username}
                                        rating={review.author_details.rating}
                                        created_at={review.created_at}
                                        content={review.content}
                                        modalButtonComment={() => modalButtonComment(null)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white text-[1.5rem]">Não há avaliações disponíveis</p>
                )}

                {/* Exibe o botão "Ver mais" apenas se houver mais comentários a serem mostrados */}
                {visibleCount < reviews.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={showMoreComments}
                            className="bg-comments text-white px-3 py-2 transition-all rounded-borderRadius hover:underline hover:bg-commentsHover"
                        >
                            Ver mais
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default Comments;
