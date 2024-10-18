import { useContext } from "react";
import GetContentContext from "../context/GetContent";

const Comments : React.FC = () => {

    const  context  = useContext(GetContentContext)


    if (!context) {
        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {reviews} = context

    return (
        <>
            <p>
                {reviews.map(review => (
                    <li>
                        {review.author}
                        {review.id}
                    </li>
                ))}
            </p>
        </>
    )
}

export default Comments


