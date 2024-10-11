import Action from '../assets/img/action.svg'
import Animation from '../assets/img/animation.svg'
import Adventure from '../assets/img/adventure.svg'
import Comedy from '../assets/img/adventure.svg'
import Dance from '../assets/img/dance.svg'
import Drama from '../assets/img/drama.svg'
import Documentary from '../assets/img/documentary.svg'
import Fantasy from '../assets/img/fantasy.svg'
import SciFi from '../assets/img/sci-fi.svg'
import Romanace from '../assets/img/romance.svg'
import Horror from '../assets/img/horror.svg'
import Suspense from '../assets/img/suspense.svg'
import { useGetId } from '../context/IdContext'
import { useNavigate } from 'react-router-dom'

const Genres : React.FC = () => {

const genres = [
    { name: 'Action', img: Action, id: 28 },
    { name: 'Animation', img: Animation, id: 16 },
    { name: 'Adventure', img: Adventure, id: 12},
    { name: 'Comedy', img: Comedy, id: 35},
    { name: 'Dance', img: Dance, id: 10402 },
    { name: 'Drama', img: Drama, id: 18 },
    { name: 'Documentary', img: Documentary, id: 99 },
    { name: 'Fantasy', img: Fantasy, id: 14 },
    { name: 'Sci-Fi', img: SciFi, id: 878 },
    { name: 'Romance', img: Romanace, id: 10749 },
    { name: 'Horror', img: Horror, id: 27 },
    { name: 'Suspense', img: Suspense, id: 53 },
  ];

  const {setIdGenre} = useGetId();
  const navigate = useNavigate()

  

  const getGenreId = (id: number) => {
    setIdGenre(id)
    navigate(`/genre/${id}`);
    // localStorage.setItem('Genre', JSON.stringify(genre))
    console.log(id)
  }



    return(
        <>
            <div className='m-auto'>
                <ul className='grid grid-cols-4 gap-x-16 gap-y-8'>
                   {genres.map((genres, index) => (

                            <li key={index} className='relative cursor-pointer ' onClick={() => getGenreId(genres.id)}>
                                <img src={genres.img} alt="" />
                                <span className='absolute inset-0 flex justify-center items-center text-[1.5rem] font-[200] text-white'>{genres.name}</span>
                            </li>

                    ))}
                        
                   
                </ul>
            </div>

        </>
    )
}

export default Genres;
