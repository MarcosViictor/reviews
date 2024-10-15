import GetContentContext from "../context/GetContent"
import { useParams, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
const imgFilme = import.meta.env.VITE_IMG;
import { MdDateRange } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import Review from "./Review";
import StarRating from "./Rating";
import axios from "axios"; 
import Loading from "./Loading";

const OverviewContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const context = useContext(GetContentContext);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [content, setContent] = useState<any>(null); // Estado para armazenar o conteúdo selecionado
  const [error, setError] = useState<string | null>(null); // Estado de erro

  if (!context) {
    throw new Error('useContext must be used within a GetContentProvider');
  }

  const { movies, series } = context;

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const isMovie = pathname.includes('/overview-movie');
        const isSeries = pathname.includes('/overview-serie');

        // Primeiro tenta encontrar o conteúdo no estado do contexto
        let selectedContent = isMovie
          ? movies.find((movie) => movie.id === Number(id))
          : isSeries
          ? series.find((serie) => serie.id === Number(id))
          : null;

        // Se não encontrar, faz a requisição para a API do TMDB
        if (!selectedContent) {
          const endpoint = isMovie 
            ? `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`
            : `https://api.themoviedb.org/3/tv/${id}?language=pt-BR`;

          const res = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ`, 
            },
          });

          selectedContent = res.data;
        }

        setContent(selectedContent);
      } catch (err) {
        setError('Erro ao carregar o conteúdo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, movies, series, pathname]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!content) {
    return <p>{pathname.includes('/overview-movie') ? "Filme" : "Série"} não encontrado(a)</p>;
  }

  return (
    <section className="m-Body flex justify-center">
      <figure className="w-full pb-2 rounded-br-borderRadius">
        <div className="relative gap-4 m-auto">
          <img
            className="w-[68%] rounded-borderRadius object-cover filter blur-[2px]"
            src={content.backdrop_path ? imgFilme + content.backdrop_path : <Loading />}
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
