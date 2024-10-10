const Header : React.FC = () => {
    return (
        <>
            <div className="flex justify-between items-center mx-[6rem]" >
                <h3>Favoritos</h3>
                <form className="flex items-center justify-center mx-8 mb-10 mt-8 gap-3 bg-search p-[0.7rem] rounded-full">
                    <img className="w-6" src="https://img.icons8.com/?size=50&id=59878&format=png&color=ffffff" alt="" />
                    <input className="w-[20rem] bg-transparent outline-none text-white" type="text" placeholder="pesquisar" />
                </form>
                <span>Imagem</span>
            </div>
        </>
    )
}

export default Header;