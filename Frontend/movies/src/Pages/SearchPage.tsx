import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Genres from "../components/Genres";
import SearchResults from "../components/SearchResults";
import { useSearch } from "../context/searchContext";

const SearchPage : React.FC = () => {

    const {searchResult} = useSearch()

    return (
        <>
            <SideBar />
            <Header />

            <div className="flex flex-col gap-4">
                {searchResult && searchResult.length > 0 ? <SearchResults /> : <Genres />}
            </div>
        </>
    )
}

export default SearchPage;