import { FaStar, FaRegStar } from 'react-icons/fa';

export interface Props {
    rating: number;
}

const StarRating = (props: Props) => {
    const numStars = Math.round(props.rating / 2);

    const fullStars = [];
    const emptyStars = [];

    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            fullStars.push(i)
        } else {
            emptyStars.push(i)
        }
    }

   return(
    <>
        {fullStars.map(index => 
            <FaStar  className='text-star' key={index}/>
        )}
        {emptyStars.map(index => 
            <FaRegStar key={index} />
        )}
    </>
   )

}

export default StarRating

