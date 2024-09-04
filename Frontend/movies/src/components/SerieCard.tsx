import { useContext } from 'react';
import GetSeriesContext  from '../context/GetSeries.tsx'

const SeriesCard = () => {

    const context = useContext(GetSeriesContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetSeriesProvider');
      }

    const {series} = context;

     
    return (
        <>
        {series.length > 0 ? (
        <ul className='flex gap-2 '>
          {series.map(serie => (
            <li key={serie.id}>
                <p>{serie.id}</p>
              {serie.name}
              {/* <p>{movie.overview}</p> */}
              {/* <img src={movie.poster_path} alt={movie.title} /> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem séries disponíveis.</p>
      )}
        </>
    )
}

export default SeriesCard