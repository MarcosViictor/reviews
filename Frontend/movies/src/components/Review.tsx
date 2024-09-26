import {FaRegStar } from "react-icons/fa";



const Review = () => {
    return (
        <section className="absolute right-0 w-[30%] mr-8 bg-search h-[77%] rounded-borderRadius px-6 text-white flex flex-col pt-7">
            <div className="flex justify-center items-start">
                    <button>
                        <FaRegStar className="w-20 text-[2.5rem]" />
                    </button>
                    <button>
                        <FaRegStar className="w-20 text-[2.5rem]" />
                    </button>
                    <button>
                        <FaRegStar className="w-20 text-[2.5rem]" />
                    </button>
                    <button>
                        <FaRegStar className="w-20 text-[2.5rem]" />
                    </button>
                    <button>
                        <FaRegStar className="w-20 text-[2.5rem]" />
                    </button>
            </div>

            <div className="p-5 h-full">
                <h3 className="text-[1.3rem]">Escreva sua avaliação:</h3>
                <textarea className="w-full h-[60%] mt-3 bg-search max-h-[60%] outline-none p-4 rounded-borderRadius"/>
            </div>
            
        </section>
    )
}

export default Review;

{/* <div className="">
                <span className="text-[3rem] flex justify-center gap-1 text-gray-400 py-4">
                    
                </span>
               
               <textarea className="w-full" name="" id=""/>
            </div> */}