import '../assets/styles/cadastro.css'

const Cadastro = () => {
    return (
        <div className="cadastro">
            <div className="conteiner">
                <form>
                    <h1>Cadastre-se</h1>
            
                    <div className="box">
                        <input type="text" placeholder="Nome" required/>
                    </div>
                    <div className="box">
                        <input type="email" placeholder="E-mail"/>
                    </div>
                    <div className="box">
                        <input type="password" placeholder="Senha"/>
                    </div>
                    <div className="box">
                        <input type="password" placeholder="Repita a Senha"/>
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Data Nascimento"/>
                    </div>
                    <p>SELECIONE 5 GÊNEROS PREFERIDOS</p>
                    <nav>
                        <ul>
                            <li>
                                <input type="text" placeholder="+"/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <input type="text" placeholder="+"/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <input type="text" placeholder="+"/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <input type="text" placeholder="+"/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <input type="text" placeholder="+"/>
                            </li>
                        </ul>
                    </nav>
                    <button type="button">Cadastrar</button>
                </form>
            
                </div>
        </div>

    )
}

export default Cadastro