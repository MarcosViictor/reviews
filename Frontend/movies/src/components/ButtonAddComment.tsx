import { useParams } from "react-router-dom";
import { useState } from "react";
import SeeComments from "./SeeComments";
import { api } from "../context/api";

const ButtonAddComment : React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [modalCreate, setModalCreate] = useState(!true)
    const [comment, setComment] = useState<string>('')
    const [date, setDate] = useState<string>('')

    const modalButtonCreate = () => {
        setModalCreate((prev) => !prev);
    }

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLDataElement>) => {
        setDate(event.target.value)
    }

    const postComment = async() => {
        try {
            const res = await api.post(`comments/overview/movies/`,
                {
                    id_overview_movie: id,
                    text: comment,
                    date_comment: date
                }
               
            )

            console.log(res)
            setModalCreate(false)
        } catch (err) {
            console.error(err)
        }
    } 


    return(
        <>
            <button onClick={modalButtonCreate} className="bg-[#09405d65] text-white p-4 rounded-borderRadius text-[1rem]"> Comentários</button>
            <button>Ver comentários</button>
            {modalCreate === true &&
                   <SeeComments modalButtonCreate={modalButtonCreate}
                   handleCommentChange={handleCommentChange}
                   postComment={postComment}
                   comment={comment}
                   handleDateChange={handleDateChange}
                   date={date}
                   />
            }
        </>
    )
}

export default ButtonAddComment