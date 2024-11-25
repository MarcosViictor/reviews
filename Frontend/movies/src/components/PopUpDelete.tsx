interface PopUpDeleteProps {
    modalButtonDelete: () => void;
    deleteComment:  () => Promise<void>;
}

const PopUpDelete: React.FC<PopUpDeleteProps> = ( { modalButtonDelete, deleteComment } ) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-slate-900 p-7 rounded-lg shadow-lg text-center max-w-sm w-full phone:w-[15rem] phone:ml-5">
            <p className="text-lg font-semibold mb-4 text-white phone:text-[1rem]">Tem certeza que deseja apagar o comentário?</p>
            <div className="flex justify-center space-x-4">
                <button onClick={deleteComment} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sim</button>
                <button onClick={modalButtonDelete} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Não</button>
            </div>
        </div>
    </div>
    

    )
}

export default PopUpDelete