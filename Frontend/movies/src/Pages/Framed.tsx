import SideBar from "../components/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../Types/Movie";
import styled from 'styled-components';
import PopUpFramed from "../components/PopUpFramed";

const Input = styled.input < {active: string} >`
    border: 2px solid
    ${({ active }) =>
      active === 'green' ? 'green' : active === 'red' ? 'red' : 'white'};
    transition: all 0.5s ease-in-out;
`

const Framed : React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [guess, setGuess] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<string>('white');
    const [indexImage, setIndexImage] = useState(5)
    const [points, setPoints] = useState<number>(0)
    const [isEnd, setIsEnd] = useState<boolean>(!true);

    const modalButton = () => {
      setIsEnd((prev) => !prev);
      setIndexImage(5)
      setPoints(0)
      setCurrentMovieIndex(currentMovieIndex + 1);
  }

    const getMovieImages = async (movieId: number) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/images`,
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'
                }
            }
        );
        return response.data.backdrops.slice(0, 6);
    };

    const inputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setGuess(e.target.value)
  }
    
      
    const getRandomMovies = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR`,
              {
                  headers : {
                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyODY3NzA4OC40NTc4NzUsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88BdLmUfZA85VLGhusWnsTu7xrh0POaqFoX5P9QQUBQ'}
              }
            
        );

        const movies = response.data.results;
        const randomMovies : Movie[] = [];
    
        while (randomMovies.length < 10) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const movie = movies[randomIndex];
    
            // Garantir que não adiciona filmes repetidos
            if (!randomMovies.some((m) => m.id === movie.id)) {
                randomMovies.push(movie);
            }
        }
    
        return randomMovies;
      
        // Pegue os 10 filmes mais populares
    };

    useEffect(() => {
        const getMovies = async () => {
          const movies = await getRandomMovies();
          const moviesWithImages = await Promise.all(
            movies.map(async (movie : Movie) => {
              const images = await getMovieImages(movie.id);
              return { ...movie, images };
            })
          );
          setMovies(moviesWithImages.filter((movie) => movie.images.length >= 6));
        };
    
        getMovies();
        console.log(guess)
    }, []);

   

   

    const handleGuess = () => {
      if (guess.toLowerCase() === movies[currentMovieIndex].title.toLowerCase()) {
        setIsCorrect('green'); // Define a cor para verde se acertar
        setPoints((prevPoints) => prevPoints + indexImage); // Adiciona os pontos atuais ao total

        // Reinicia os estados para o próximo filme sem alterar as chances restantes
        setCurrentMovieIndex(currentMovieIndex + 1);
        setCurrentImageIndex(0);
        setTimeout(() => setIsCorrect('white'), 1000); // Reseta a cor após 1 segundo
    } else if (indexImage === 0){
        setIsEnd(true)
        console.log('acabou')
    } else {

      if (currentImageIndex < 5) { // Se ainda houver imagens disponíveis
            setCurrentImageIndex(currentImageIndex + 1); // Mostra a próxima imagem
            setIndexImage(indexImage - 1); // Diminui as chances
            setIsCorrect('red'); 
            setTimeout(() => setIsCorrect('white'), 1000); 
        } else {
            setIsCorrect('red'); // Define a cor para vermelho após esgotar as chances
            setCurrentMovieIndex(currentMovieIndex + 1); // Passa para o próximo filme
            setCurrentImageIndex(0); // Reinicia o índice de imagem
            setIndexImage(5); // Reinicia as chances para o próximo filme
        }
    }
        setGuess("");
    };

    if (!movies.length) return <p>Carregando...</p>;

    const currentMovie = movies[currentMovieIndex];
    const currentImage = currentMovie.images[currentImageIndex];
      

    return (
      <>
          <SideBar />
      
        <section className="flex justify-center items-center h-full">
          <div className="flex justify-center items-center flex-col mt-20 bg-gray-800 w-[30%] px-6 pb-7 rounded-borderRadius">
                <h1 className="text-white pt-3 text-[1.7rem]">Framed</h1>
                <p className="text-[#cdcdcd] text-[0.9rem]">Adivinhe o filme pela imagem</p>
                <p className="pb-5 text-white">Pontuação: {points}</p>
               
            <img
              src={`https://image.tmdb.org/t/p/w500${currentImage.file_path}`}
              alt="Imagem do filme"
              className="rounded-borderRadius"
            />
            <p className="text-white pt-2">Tentativas restantes: {indexImage}</p>
            <Input active={isCorrect}
              type="text"
              value={guess}
              onChange={inputChange}
              placeholder="Adivinhe o filme..."
              className="w-full my-5 p-2 outline-none rounded-borderRadius bg-search text-white"
            />
            <button onClick={handleGuess} className="bg-[#5b5d719f] py-2 px-4 rounded-borderRadius transition-all text-white hover:bg-[#5b5d714b]">Enviar</button>
          
              
              </div>
        </section>
        {isEnd === true && 
                          <PopUpFramed 
                            points={points}
                            modalButton={modalButton}
                          />
        }
        </>
    )
}

export default Framed;