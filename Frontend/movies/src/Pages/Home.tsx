import Recomendation from '../components/Recomendation.tsx';
import MovieCard from '../components/MovieCard.tsx';
import SeriesCard from '../components/SerieCard.tsx';
import SideBar from '../components/SideBar.tsx';
// import Header from '../components/Header.tsx';

const Home = () => {

    
     
    return (
        <div className='mb-5'>
            <SideBar />
            {/* <Header /> */}
            <Recomendation />
            
                <main className='mr-16 ml-[4.5rem] flex flex-col gap-4 mt-5'>
                    
                    <MovieCard />
                    <SeriesCard />
                </main>
        </div>
        
    )
}

export default Home