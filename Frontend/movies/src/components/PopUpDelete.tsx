interface PopUpDeleteProps {
    modalButton: () => void;
    deleteComment:  () => Promise<void>;
}

const PopUpDelete: React.FC<PopUpDeleteProps> = ( { modalButton, deleteComment } ) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-slate-900 p-7 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="text-lg font-semibold mb-4 text-white">Tem certeza que deseja apagar o comentário?</p>
            <div className="flex justify-center space-x-4">
                <button onClick={deleteComment} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sim</button>
                <button onClick={modalButton} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Não</button>
            </div>
        </div>
    </div>
    

    )
}

export default PopUpDelete