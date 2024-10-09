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

const Genres : React.FC = () => {

const genres = [
    { name: 'Action', img: Action },
    { name: 'Animation', img: Animation },
    { name: 'Adventure', img: Adventure },
    { name: 'Comedy', img: Comedy },
    { name: 'Dance', img: Dance },
    { name: 'Drama', img: Drama },
    { name: 'Documentary', img: Documentary },
    { name: 'Fantasy', img: Fantasy },
    { name: 'Sci-Fi', img: SciFi },
    { name: 'Romance', img: Romanace },
    { name: 'Horror', img: Horror },
    { name: 'Suspense', img: Suspense },
  ];

    return(
        <>
            <div className='m-auto'>
                <ul className='grid grid-cols-4 gap-x-16 gap-y-8'>
                   {genres.map((genres, index) => (
                        <li key={index} className='relative cursor-pointer '>
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
