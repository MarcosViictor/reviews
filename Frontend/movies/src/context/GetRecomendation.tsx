import { createContext, useEffect, useState } from "react";
import { api } from "./api";
import { Movie } from "../Types/Movie";

interface MoviesContextType {
  recomendation: Movie[];
  setRecomendation: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const GetRecomendationContext = createContext<MoviesContextType | undefined>(undefined);


export const GetRecomendationProvider = ({ children }: { children: React.ReactNode })  => {

    const [recomendation, setRecomendation] = useState<Movie[]>([]);
    
    useEffect(() => {

        const getMovies = async () : Promise<void>  => {
            await api.get('/movie/top_rated')
            .then(res => {
              console.log(res)
              setRecomendation(res.data.results)
            })
            .catch(err => {
              console.error(err)
            })
          }

          getMovies()
      
        
    }, [])

    return (
        <GetRecomendationContext.Provider  value={{ recomendation, setRecomendation }}>
            {children}
        </GetRecomendationContext.Provider>
    )
}

export default GetRecomendationContext