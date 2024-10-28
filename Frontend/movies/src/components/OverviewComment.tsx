
import { useParams } from "react-router-dom";
import { api } from "../context/api";
import { useGetId } from "../context/IdContext";
import { useEffect } from "react";

const OverviewComment : React.FC = () => {

    const { id } = useParams<{ id: string }>();

    
    
    useEffect(() => {
        getComments()
    }, []);

    const getComments = async () => {
        try {
            const res = await api.get(`movies/overviews/${id}/`)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <section>
              
            </section>
        
        </>
    )
};  

export default OverviewComment;