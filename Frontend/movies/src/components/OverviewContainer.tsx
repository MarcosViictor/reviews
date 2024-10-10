import GetContentContext from "../context/GetContent"
import { useParams } from "react-router-dom"
import { useContext } from "react"
const imgFilme = import.meta.env.VITE_IMG;
import { MdDateRange } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import Review from "./Review";
import StarRating from "./Rating";
const OverviewContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(GetContentContext);

  if (!context) {
    throw new Error('useContext must be used within a GetContentProvider');
  }

  const { movies, series } = context;

  const isMovie = location.pathname.includes('/overview-movie');
  const isSeries = location.pathname.includes('/overview-serie');

  let content = isMovie
    ? movies.find((movie) => movie.id === Number(id))
    : isSeries
    ? series.find((serie) => serie.id === Number(id))
    : null;

  if (!content) {
    return <p>{isMovie ? "Filme" : isSeries ? "Série" : "Conteúdo"} não encontrado(a)</p>;
  }

  return (
    <section className="m-Body flex justify-center">
      <figure className="w-full pb-2 rounded-br-borderRadius">
        <div className="relative gap-4 m-auto">
          <img
            className="w-[68%] rounded-borderRadius object-cover filter blur-[2px]"
            src={content.backdrop_path ? imgFilme + content.backdrop_path : '/path/to/placeholder.jpg'}
            alt={content.title || content.name || 'Conteúdo sem título'}
          />
          <div className="absolute inset-0 flex flex-row-reverse justify-end items-center p-10 text-white gap-4">
            <span className="w-[40%] p-3 rounded-borderRadius bg-search flex flex-col">
              <h3 className="text-[2rem] font-bold">{content.title || content.name || 'Título não disponível'}</h3>
              <div className="flex gap-1 flex-col">
                <div className="flex gap-5 items-center">
                  <span className="flex gap-1 items-center">
                    <StarRating rating={content.vote_average || 0} />
                  </span>
                  <span className="flex gap-1 items-center">
                    <MdDateRange />
                    {content.release_date || content.first_air_date || 'Data não disponível'}
                  </span>
                  <span className="flex gap-1 items-center">
                    <TfiStatsUp />
                    {content.popularity || 'Popularidade não disponível'}
                  </span>
                </div>
                <p className="w-full">{content.overview || 'Descrição não disponível'}</p>
              </div>
            </span>
            <img
              className="w-[23%] rounded-borderRadius"
              src={content.poster_path ? imgFilme + content.poster_path : '/path/to/placeholder.jpg'}
              alt={content.title || 'Sem imagem'}
            />
          </div>
        </div>
      </figure>

      <Review />
    </section>
  );
};

export default OverviewContainer;
