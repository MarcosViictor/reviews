import { useEffect, useState } from "react";
import SearchIcon from '../assets/img/search.svg'
import { api } from "../context/api";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Search : React.FC = () => {

    const [searchQuery, setSearchQuery] = useState<string>('')
    const {setSearchResult} = useSearch() //vai ser gerenciado com isso num create Context
    const location = useNavigate()

    
    


        const handleSearch = async ( search: string ) => {
            try {
                const res = await api.get(`search/movie/${search}`);
                setSearchResult(res.data.results);
                console.log(res.data.results)
              
            } catch (err) {
                console.error(err)
            }
        }

        const searchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value)
        }
        

        useEffect(() => {
            const getSearch = () => {
                if (searchQuery) {
                    handleSearch(searchQuery); 
                }
            }

            getSearch()
        }, [searchQuery])

        const redirectToSearch = () => {
            location('/search/movie')
        }


    return(
        <>
            <form className="flex items-center justify-center mx-8 mb-10 mt-8 gap-3 bg-search p-[0.7rem] rounded-full phone:ml-[5rem] phone:my-5">
                    <img className="w-5" src={SearchIcon} alt="Search SVG" />
                    <input onClick={redirectToSearch} className="w-[20rem] bg-transparent outline-none text-white phone:w-[14rem]" 
                        type="text" 
                        placeholder="pesquisar" 
                        onChange={searchChange}
                        value={searchQuery}
                    />
            </form>
        </>
    )
}

export default Search;
