import { FaStar, FaRegStar } from "react-icons/fa"

interface UpdateReviewProps {
    handleRating: (star: number) => void;
    updateComment: () => Promise<void>;
    handleReviewChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rating: number;
    date: string | undefined;
    reviewText: string;

}

const UpdateReview: React.FC<UpdateReviewProps> = ({updateComment, handleRating, handleReviewChange, handleDateChange, rating, date, reviewText }) => {
    
    
    return (
        
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <section  className="mr-8 w-[25rem] bg-search  rounded-borderRadius px-6 text-white flex flex-col pt-6 ">
                <div className="flex justify-center items-start ">
                    {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className=" " onClick={() => handleRating(star)}>
                              {star <= rating ? (
                                    <FaStar className="w-12 text-[2.5rem] transition-all ease-in-out hover:text-[2.7rem] " />
                              ) : (
                                    <FaRegStar className="w-12 text-[2.5rem] transition-all ease-in-out hover:text-[2.6rem]" />
                              )}
                            </button>
                          ))}
                </div>
                <div className="p-5 h-full ">
                    <textarea
                         onChange={handleReviewChange}
                         value={reviewText}
                         className="w-full h-[200px] mt-3 bg-search outline-none p-4 rounded-borderRadius 2xl:h-[300px]"
                         placeholder="Escreva sua avaliação:"
                    />
                    <input
                        type="date"
                        className="w-full  bg-search  outline-none p-2 rounded-borderRadius"
                        onChange={handleDateChange}
                        value={date}
                        id="email"
                
                    />
                    <button className="w-full bg-search rounded-borderRadius h-10 mt-3" onClick={updateComment}>
                        Enviar
                    </button>
                
                        </div>
                    </section>
            </div>
    )
}

export default UpdateReview