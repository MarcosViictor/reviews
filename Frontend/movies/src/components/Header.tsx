import Search from "./Search";

const Header : React.FC = () => {
    return (
        <>
            <div className="flex justify-between items-center mx-[6rem]" >
                <h3>Favoritos</h3>
                <Search />
                <span>Imagem</span>
            </div>
        </>
    )
}

export default Header;