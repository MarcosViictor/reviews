import { api } from "../context/api";
import { useEffect, useState } from "react";
import CreateOrEditList from "./CreateOrEditList";


const CreateList = () => {

    const [modalCreate, setModalCreate] = useState(!true)
    const [nameList, setNameList] = useState<string>('')

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameList(event.target.value);
    }

    const modalButtonCreate = () => {
        setModalCreate((prev) => !prev);
    }

    const postList = async () => {
        try {
            const res = await api.get('watchlists/',
              
            )
            console.log(res)
            setModalCreate(false)
        } catch (err) {
            console.error('Erro ao criar lista:' + err) 
        }
    }

    useEffect(() => {
        postList()
    }, [])


    return(
        <section>
            <div className="flex justify-center items-center">
                <button onClick={modalButtonCreate} className="bg-teal-900 text-white p-4 rounded-borderRadius">
                    Criar lista
                </button>
                {modalCreate === true &&
                    <CreateOrEditList nameList={nameList} handleNameChange={handleNameChange} modalButtonCreate={modalButtonCreate} postList={postList}/>
                }
            </div>

            

        </section>
    )
}

export default CreateList;