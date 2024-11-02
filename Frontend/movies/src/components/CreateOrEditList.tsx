
interface PropsList{
    nameList: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    modalButtonCreate: () => void;
    postList: () => Promise<void>;
}

const CreateOrEditList : React.FC<PropsList> = ({handleNameChange, nameList, modalButtonCreate, postList}) => {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-[#0a2120] p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-center">Criar Lista</h2>
                    <input
                        type="text"
                        value={nameList}
                        onChange={handleNameChange}
                        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2"
                        placeholder="Nome da lista"
                    />
                    <div className="flex justify-center space-x-4">
                        <button onClick={postList} type="submit" className="bg-[#0e442b] transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#0c3120]">
                            Criar
                        </button>
                        <button type="button" onClick={modalButtonCreate} className="bg-[#3c1818]  transition-all text-white px-4 py-2 mt-3 rounded hover:bg-[#2e1616]">
                            Cancelar
                        </button>
                      
                    </div>
                </div>
            </div>
        </div>
    )
   
}   

export default CreateOrEditList