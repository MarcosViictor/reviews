import { createContext, useEffect, useState } from "react";
import { api } from "./api";
import { Series } from "../Types/Series";

interface SeriesContextType {
  series: Series[];
  setSeries: React.Dispatch<React.SetStateAction<Series[]>>;
}

const GetSeriesContext = createContext<SeriesContextType | undefined>(undefined);


export const GetSeriesProvider = ({ children }: { children: React.ReactNode })  => {

    const [series, setSeries] = useState<Series[]>([]);
    
    useEffect(() => {

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

          getSeries()
      
        
    }, [])

    return (
        <GetSeriesContext.Provider  value={{ series, setSeries }}>
            {children}
        </GetSeriesContext.Provider>
    )
}

export default GetSeriesContext

