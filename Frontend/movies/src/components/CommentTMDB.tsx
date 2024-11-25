// Em CommentTMDB.tsx
import StarRating from '../components/Rating'
interface CommentProps {
    //avatar_path: string | null;
    username: string;
    rating: number | null;
    created_at: string;
    content: string | null;
    modalButtonComment:  () => void;
}

const CommentTMDB: React.FC<CommentProps> = ({  username, rating, created_at, content, modalButtonComment}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px]">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[40rem] max-h-[70%]">
                <h2 className="text-lg font-semibold mb-4 text-center">Comentário</h2>
                <div className="scroll-container rounded-borderRadius flex flex-col gap-3 overflow-y-auto max-h-[400px] mb-4">
                    <div className=" text-white p-3 rounded-borderRadius">
                        <p className="text-[1.1rem]">{username}</p>
                        <div className="flex flex-col">
                            <p className="text-[0.8rem] text-gray-400">Publicado: {new Date(created_at).toLocaleDateString()}</p>
                            <span className="flex pb-4">
                                <StarRating rating={rating || 0} />
                            </span>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3">
                  
                    <button type="button" className="bg-[#3c1818] rounded transition-all text-white px-4 py-2 hover:bg-[#2e1616]" onClick={modalButtonComment}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default CommentTMDB;
