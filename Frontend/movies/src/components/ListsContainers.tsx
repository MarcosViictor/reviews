import { api } from "../context/api";
import { useEffect, useState } from "react";
import ListIndividual from "./ListIndividual";
import { Movie } from "../Types/Movie";

interface MovieList {
    id: number;
    movies: Movie[];
    name: string;
}

const ListsContainer: React.FC = () => {
    const [movieList, setMovieList] = useState<MovieList[]>([]);
    const [openList, setOpenList] = useState(false);
    const [selectedList, setSelectedList] = useState<MovieList | null>(null);

    const modalList = (list: MovieList) => {
        setSelectedList(list); 
        setOpenList(true);      
    };

    useEffect(() => {
        const getMovieList = async () => {
            try {
                const res = await api.get('watchlists/');
                console.log(res);
                setMovieList(res.data);
            } catch (err) {
                console.error('Erro ao carregar as listas: ' + err);
            }
        };

        getMovieList();
    }, []);

    return (
        <section className="mx-24 text-white grid grid-cols-6 gap-6">
            {movieList.map((list) => (
                <div
                    onClick={() => modalList(list)}
                    className="bg-comments p-5 rounded-borderRadius mt-4 border-2 cursor-pointer transition-all hover:bg-commentsHover"
                    key={list.id}
                >
                    <p>{list.name}</p>
                </div>
            ))}

            {openList && selectedList && (
                <ListIndividual
                    list={selectedList}
                />
            )}
        </section>
    );
};

export default ListsContainer;