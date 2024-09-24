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

  
}

const GetContentContext = createContext<ContentContextType | undefined>(undefined);


export const GetContentProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [recomendation, setRecomendation] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
    

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

          const getSeries = async () : Promise<void>  => {
            await api.get('/trending/tv/day')
            .then(res => {
              console.log(res)
              setSeries(res.data.results)
            })
            .catch(err => {
              console.error(err)
            })
          }

          const GetRecomendation = async () : Promise<void>  => {
            await api.get('/movie/top_rated')
            .then(res => {
              console.log(res)
              setRecomendation(res.data.results)
            })
            .catch(err => {
              console.error(err)
            })
          }

          const getFavorites = async () : Promise<void>  => {
            await api.get('/movie/popular') //redefinir rota
            .then(res => {
              console.log(res)
              setFavorites(res.data.results)
            })
            .catch(err => {
              console.error(err)
            })
          }

          GetRecomendation()

          getFavorites()

          getSeries()

          getMovies()
      
        
    }, [])

    return (
        <GetContentContext.Provider  value={{ movies, setMovies, series, setSeries, recomendation, setRecomendation, favorites, setFavorites }}>
            {children}
        </GetContentContext.Provider>
    )
}

export default GetContentContext

