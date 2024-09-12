import { useContext } from 'react';
import GetRecomendationContext  from '../context/GetRecomendation.tsx'
const imgFilme = import.meta.env.VITE_IMG;
// import { FaStar } from 'react-icons/fa';

const Recomendation = () => {

    const context = useContext(GetRecomendationContext)

    if (!context) {
        // Aqui você pode lançar um erro, retornar null, ou renderizar algum fallback
        throw new Error('useContext must be used within a GetMoviesProvider');
      }

    const {recomendation} = context;
    
    return (
        <section className='p-2'> 
        {/* diminuir aqui o height*/}
        <figure className='grid grid-flow-col w-[screen] pb-2 overflow-x-scroll gap-[2rem] rounded-br-borderRadius'>
           {recomendation.map(recomendation => (
                    
                    <div key={recomendation.id} className='relative w-[50vw] gap-4'>
                        <img
                            className='w-[50vw]  rounded-borderRadius object-cover filter blur-[3px]'
                            src={imgFilme + recomendation.backdrop_path}
                            alt={recomendation.title}
                        />
                        <div className='absolute inset-0 flex flex-row-reverse justify-end items-center p-10 text-white gap-4'>
                            <span>
                                <h3 className='text-[2rem] pb-1 font-bold'>{recomendation.title}</h3>
                                <button className='border-2 p-1 rounded-[7px] ease-in-out duration-300 hover:bg-gray-500 '>Saiba mais</button>
                            </span>
                            <img className='w-[15rem] rounded-borderRadius ' src={imgFilme + recomendation.poster_path} alt="" />
                            
                        </div>
                    </div>
           
    ))}
         </figure>
        </section>
    )
}

export default Recomendation;