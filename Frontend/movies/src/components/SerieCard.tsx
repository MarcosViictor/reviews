import { useContext } from 'react';
import GetSeriesContext  from '../context/GetSeries.tsx'
const imgSerie = import.meta.env.VITE_IMG
import { FaStar } from 'react-icons/fa';

import '../assets/styles/container-filmes.css'

const SeriesCard = () => {

    
    const context = useContext(GetSeriesContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetSeriesProvider');
      }

    const {series} = context;

     
    return (
        <section>
          <h2>Top Séries</h2>
          {series.length > 0 ? (
            
          <ul className='container-filmes'>
            {series.map(serie => (
             
              <li key={serie.id}>
                 <figure className='figPoster'>
                  <img className='imgPoster' src={imgSerie + serie.poster_path} alt={serie.name} />
                </figure>
                <div className="nome-filme">
                  <span>{serie.name}</span>
                  <div className="estrela">
                    <FaStar className='text-star'/>
                    {serie.vote_average}
                  </div>
                </div>
           
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem séries disponíveis.</p>
        )}
        </section>
    )
}

export default SeriesCard