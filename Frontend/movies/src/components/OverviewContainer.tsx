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

import { genreMapping } from "./genreMapping";

const OverviewContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const context = useContext(GetContentContext);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [content, setContent] = useState<any>(null); // Estado para armazenar o conteúdo selecionado
  const [error, setError] = useState<string | null>(null); // Estado de erro

  const getGenreNames = (genreIds: number[] = []) => {
    return genreIds
        .map((id) => genreMapping[id])
        .filter((name) => name !== undefined)
        .join(' | ');
};

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
    <section className="grid grid-cols-3 gap-6 ml-20 mr-10 pt-9">

      <div className="col-span-2">
        <figure className="w-full rounded-br-borderRadius relative">
          <img
            className="w-full h-full rounded-borderRadius object-cover filter blur-sm"
            src={content.backdrop_path ? imgFilme + content.backdrop_path : <Loading />}
            alt={content.title || content.name || 'Conteúdo sem título'}
          />
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 text-white p-6 rounded-borderRadius backdrop-blur-sm">
              <div className="w-[80%] flex gap-6 items-center p-6 bg-black/50 rounded-lg shadow-lg">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold">{content.title || content.name || 'Título não disponível'}</h3>
                  <div className="flex gap-5 items-center text-lg mt-4">
                    <span className="flex items-center gap-1">
                      <StarRating rating={content.vote_average || 0} />
                      {content.vote_average || '0'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdDateRange />
                      {new Date(content.release_date || content.first_air_date || 'Data não disponível').toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <TfiStatsUp />
                      {content.popularity || 'Popularidade não disponível'}
                    </span>
                  </div>
                  <div className="mt-2 p-2 rounded ">
                   <p className="text-[1.2rem] ">{getGenreNames(content.genre_ids)}</p>
                  </div>
                  <p className="rounded-lg p-4  border-2 border-slate-500 ">{content.overview || 'Descrição não disponível'}</p>
                </div>
                <img
                  className="w-[30%] rounded-lg shadow-lg"
                  src={content.poster_path ? imgFilme + content.poster_path : '/path/to/placeholder.jpg'}
                  alt={content.title || 'Sem imagem'}
                />
            </div>
          </div>
        </figure>
      </div>

      {/* Componente de Review */}
      <div className="col-span-1 bg-gray-900/80 p-6 rounded-lg shadow-lg text-white">
        <Review />
      </div>
    </section>

  );
};

export default OverviewContainer;
