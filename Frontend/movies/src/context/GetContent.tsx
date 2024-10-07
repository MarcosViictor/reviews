import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./api";
import { Movie } from "../Types/Movie";

interface ContentContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  series: Movie[];
  setSeries: React.Dispatch<React.SetStateAction<Movie[]>>;
  recomendation: Movie[];
  setRecomendation: React.Dispatch<React.SetStateAction<Movie[]>>;
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
  rated: Movie[];
  setTopRated: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const GetContentContext = createContext<ContentContextType | undefined>(undefined);

export const GetContentProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [recomendation, setRecomendation] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [rated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      try {
        const res = await api.get('movies/popular/');
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    const getSeries = async (): Promise<void> => {
      try {
        const res = await api.get('series/popular');
        setSeries(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    const getRecomendation = async (): Promise<void> => {
      try {
        const res = await api.get('discovery/movie/');
        setRecomendation(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    const getFavorites = async (): Promise<void> => {
      try {
        const res = await api.get('movies/list/');
        setFavorites(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    const getTopRated = async (): Promise<void> => {
      try {
        const res = await api.get('discovery/movie/');
        setTopRated(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    getRecomendation();
    getTopRated();
    getFavorites();
    getSeries();
    getMovies();
  }, []);

  return (
    <GetContentContext.Provider
      value={{
        movies,
        setMovies,
        series,
        setSeries,
        recomendation,
        setRecomendation,
        favorites,
        setFavorites,
        rated,
        setTopRated,
      }}
    >
      {children}
    </GetContentContext.Provider>
  );
};

export default GetContentContext;
