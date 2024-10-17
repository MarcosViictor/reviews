//TEM QUE VIM FILME E SERIE (MESMA TABELA)

import Favs from "../components/Favs";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Favoritos : React.FC = () => {
    return(
        <section>
            <SideBar />
            {/* <Header /> */}
            <Favs/>

        </section>
    )
}

export default Favoritos;