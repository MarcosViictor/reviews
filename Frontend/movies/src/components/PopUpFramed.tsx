import { BiTrophy } from "react-icons/bi";

interface FramedProps {
    points: number;
    modalButton: () => void;
}



const PopUpFramed : React.FC<FramedProps> = ({points, modalButton}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-slate-900 p-7 rounded-lg shadow-lg text-center max-w-sm w-full text-white">
                <h1>Suas chances acabaram :(</h1>
                <p>Sua pontuação:</p>
                <div className="flex items-center justify-center gap-2 text-[1.8rem]">
                    
                    <p>{points}</p>

                    <span className="">
                        <BiTrophy />
                    </span>
                </div>
                <button onClick={modalButton} className="bg-[#980909] px-4 py-1 mt-3 rounded transition-all hover:bg-[#98090974]">Fechar</button>
            </div>
        </div>
    )
};

export default PopUpFramed;