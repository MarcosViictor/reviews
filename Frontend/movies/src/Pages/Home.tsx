
import MovieCard from '../components/MovieCard.tsx';
import SeriesCard from '../components/SerieCard.tsx';

const Home = () => {
     
    return (
        <main className='mx-16 flex flex-col gap-4'>
            <MovieCard />
            <SeriesCard />
        </main>
    )
}

export default Home