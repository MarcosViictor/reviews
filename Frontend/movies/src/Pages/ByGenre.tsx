import ByGenreComponent from "../components/ByGenreComponent";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const ByGenre : React.FC = () => {
    return (
        <>
            <SideBar />
            {/* <Header /> */}
           <ByGenreComponent />
        </>
    )
}

export default ByGenre;