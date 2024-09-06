import { useContext } from 'react';
import GetSeriesContext  from '../context/GetSeries.tsx'
const imgSerie = import.meta.env.VITE_IMG
import { FaStar } from 'react-icons/fa';

const SeriesCard = () => {

    
    const context = useContext(GetSeriesContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetSeriesProvider');
      }

    const {series} = context;

     
    return (
        <section>
          <h2 className='text-[2rem] text-center mb-4 font-[700] text-white uppercase'>Top Séries</h2>
          {series.length > 0 ? (
            
          <ul className='flex gap-5 w-[100%] overflow-x-auto'>
            {series.map(serie => (
             
              <li key={serie.id} className='relative mb-3'>
                 <figure className='w-[11rem] '>
                  <img className="w-[500px] rounded-xl" src={imgSerie + serie.poster_path} alt={serie.name} />
                </figure>
                <div className="absolute bottom-0 w-full text-start text-white p-3 rounded-b-xl text-[1rem] " style={{ background: 'linear-gradient(to top, rgba(2, 1, 1.9, 1), transparent)' }}>
                  <span className="font-[500]">{serie.name}</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
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