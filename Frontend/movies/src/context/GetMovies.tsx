import { createContext, useEffect, useState } from "react";
import { api } from "./api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;

}

interface MoviesContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const GetMoviesContext = createContext<MoviesContextType | undefined>(undefined);


export const GetMoviesProvider = ({ children }: { children: React.ReactNode })  => {

    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {

        const getMovies = async () : Promise<void>  => {
            await api.get('/movie/popular')
            .then(res => {
              console.log(res)
              setMovies(res.data.results)
            })
            .catch(err => {
              console.error(err)
            })
          }

          getMovies()
      
        
    }, [])

    return (
        <GetMoviesContext.Provider  value={{ movies, setMovies }}>
            {children}
        </GetMoviesContext.Provider>
    )
}

export default GetMoviesContext
