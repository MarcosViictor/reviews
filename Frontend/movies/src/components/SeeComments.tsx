import { useEffect, useState } from "react";
import { api } from "../context/api";
import { useParams } from "react-router-dom";


interface PropsComments{
    handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    modalButtonCreate: () => void;
    postComment: () => Promise<void>;
    handleDateChange: (event: React.ChangeEvent<HTMLDataElement>) => void;
    comment: string
    date: string
}

interface Comment {
    text: string;
    date_comment: string;
    id_overview_movie: number

}


const SeeComments : React.FC<PropsComments> = ({handleCommentChange, modalButtonCreate, postComment, comment, handleDateChange, date}) => {

    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([])
    const [modalComment, setModalComment] = useState(!true)

    const modalButtonComment = () => {
        setModalComment((prev) => !prev);
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await api.get(`comments/overview/movies/${id}`);
                setComments(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err)
            }
        }

        getComments()
    }, [])
   
    return (
        <>
            <div>
            

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[40rem]  max-h-[70%]">
                        <h2 className="text-lg font-semibold mb-4 text-center">Comentários</h2>
                        <div className="scroll-container rounded-borderRadius flex flex-col gap-3 overflow-y-auto max-h-[400px] mb-4 //md:max-h-[300px]">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div className="bg-gray-900 text-white p-3 rounded-borderRadius" key={comment.text}>
                                        <p className="text-[1.1rem]">Nome</p>
                                        <div className="flex flex-col">
                                            <p className="text-[0.8rem] text-gray-400">{new Date(comment.date_comment).toLocaleDateString()}</p>
        
                                            <p className="w-full max-w-sm break-words overflow-hidden">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white py-3">Nenhum comentário disponível.</p>
                            )}
                           
                        </div>

                        <div className="flex justify-center gap-3">
                                <button onClick={modalButtonComment} className="bg-[#09405d65] text-white  px-4 py-2 rounded-borderRadius text-[0.9rem] w-[10rem] transition-all hover:bg-[#09405d37]">Add comentário</button>
                                <button type="button" onClick={modalButtonCreate} className="bg-[#3c1818] rounded-borderRadius transition-all text-white px-4 py-2 hover:bg-[#2e1616]">
                                 Fechar
                                </button>
                            </div>
                    {modalComment === true &&
                        <div className="fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-50 backdrop-blur-sm">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[30rem]">
                                <h2 className="text-lg font-semibold mb-4 text-center">Fazer comentário</h2>
                                <div>
                                    <textarea onChange={handleCommentChange} value={comment} className="w-full h-[12rem] rounded-borderRadius p-3 bg-gray-900 text-white outline-none"></textarea>
                                    <div className="flex justify-center space-x-4">
                                    <input
                                        type="date"
                                        className="w-full p-2 bg-gray-900  outline-none text-white  rounded-borderRadius"
                                        onChange={handleDateChange}
                                        value={date}
                                        id="email"
                                
                                    />
                                </div >
                                    <div className="flex justify-center gap-3">
                                        <button type="submit" onClick={postComment} className="bg-[#0e442b]  transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#0c3120]">
                                            Enviar
                                        </button>
                                        <button type="button" onClick={modalButtonComment} className="bg-[#3c1818]  transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#2e1616]">
                                            Cancelar
                                        </button>
                                    </div>
                                
                                </div>
                                                        </div>
                            </div>
                    }
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default SeeComments