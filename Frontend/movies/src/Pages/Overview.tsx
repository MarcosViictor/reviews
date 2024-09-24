import Header from "../components/Header"
import GetContentContext from "../context/GetContent"
import { useParams } from "react-router-dom"
import { useContext } from "react"

const Overview : React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const context = useContext(GetContentContext)

    if (!context) {

        throw new Error('useContext must be used within a GetContentProvider');
      }

    const {movies, series} = context

    const isMovie = location.pathname.includes('/overview-movie');
    const isSeries = location.pathname.includes('/overview-serie');
    
  
    let content = isMovie 
    ? movies.find(movie => movie.id === Number(id)) 
    : isSeries 
    ? series.find(serie => serie.id === Number(id)) 
    : null;


    if (!content) {
      return <p>{isMovie ? "Filme" : isSeries ? "Série" : "Conteúdo"} não encontrado(a)</p>;
    }


    return (
        <section>
            <Header />
            <h1>{content.title || content.name }</h1>
           

        </section>
    )
}

export default Overview