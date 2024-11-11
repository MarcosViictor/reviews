import { useEffect } from "react";
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


const SeeComments : React.FC<PropsComments> = ({handleCommentChange, modalButtonCreate, postComment, comment, handleDateChange, date}) => {

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await api.get(`comments/overview/movies/`)
                console.log(res)
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
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <div>
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
                            </div>
                                <div className="flex justify-center gap-3">
                                    <button type="submit" onClick={postComment} className="bg-[#0e442b]  transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#0c3120]">
                                        Enviar
                                    </button>
                                    <button type="button" onClick={modalButtonCreate} className="bg-[#3c1818]  transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#2e1616]">
                                        Cancelar
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeeComments