import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./api";
import { Movie } from "../Types/Movie";
import {Review} from "../Types/Reviews"
import { useGetId } from "./IdContext";

import axios from "axios";

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
  genreMovies: Movie[];
  setGenreMovies:  React.Dispatch<React.SetStateAction<Movie[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>
}

const GetContentContext = createContext<ContentContextType | undefined>(undefined);

export const GetContentProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [recomendation, setRecomendation] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [rated, setTopRated] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const {idGenre} = useGetId()
  const {id} = useGetId()


  useEffect(() => {


    

    const getMovies = async (): Promise<void> => {
      try {
        const res = await api.get('movies/popular/');
        setMovies(res.data.results);

        const getReviews = async() : Promise<void> => {
          try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
              {
                headers : {
                   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'}
              });
            setReviews(res.data.results);
            console.log(res.data.results)
          } catch (err) {
            console.error(err)
          }
        }
  
        getReviews()

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

    const getGenreMovie = async (): Promise<void> => {
      try {

        if (!idGenre) {
          console.error('ID do gênero não foi definido');
          return;
        }
        
        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${idGenre}&language=pt-BR`, {
          headers : {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'}
        });
        setGenreMovies(res.data.results);
        console.log(res)
      } catch (err) {
        console.error(err);
      }
    }

    getRecomendation();
    getTopRated();
    getFavorites();
    getSeries();
    getMovies();
    getGenreMovie();
    // getReviews();

  }, [idGenre, id]);

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
        genreMovies,
        setGenreMovies,
        reviews,
        setReviews
      }}
    >
      {children}
    </GetContentContext.Provider>
  );
};

export default GetContentContext;
