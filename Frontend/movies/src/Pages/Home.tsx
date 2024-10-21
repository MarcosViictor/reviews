import Recomendation from '../components/Recomendation.tsx';
import MovieCard from '../components/MovieCard.tsx';
import SeriesCard from '../components/SerieCard.tsx';
import SideBar from '../components/SideBar.tsx';
import Genres from '../components/Genres.tsx';
// import TopRated from '../components/TopRated.tsx';
// import Header from '../components/Header.tsx';

const Home = () => {

    
     
    return (
        <div className='mb-5'>
            <SideBar />
            {/* <Header /> */}
            <Recomendation />
            
                <main className='m-Body flex flex-col gap-4 mt-5'>
                    
                    <MovieCard />
                    <SeriesCard />
                    {/* <TopRated /> */}
                    <Genres />
                </main>
        </div>
        
    )
}

export default Home