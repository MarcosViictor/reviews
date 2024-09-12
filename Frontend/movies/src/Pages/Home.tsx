import Recomendation from '../components/Recomendation.tsx';
import MovieCard from '../components/MovieCard.tsx';
import SeriesCard from '../components/SerieCard.tsx';

const Home = () => {

    
     
    return (
        <div className='mb-5'>
            <Recomendation />
                <main className='mx-16 flex flex-col gap-4 mt-5'>
                
                    <MovieCard />
                    <SeriesCard />
                </main>
        </div>
        
    )
}

export default Home