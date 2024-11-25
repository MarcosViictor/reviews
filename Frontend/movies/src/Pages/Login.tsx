import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../context/auth";
import Notification from "../components/Notification";
import Cookies from 'js-cookie'

const Login = () => {
    
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showNotification, setShowNotification] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const navigate = useNavigate()

    const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await auth.post('/token/', {
                username: name,
                password: password
            })
            setName('')
            setPassword('')
            saveTokenToCookie(res.data.access)
            // console.log(res.data.refresh)
            setFeedbackMessage('Usuário logado com sucesso!');
            setShowNotification(true);
            navigate('/')

        } catch (err) {
            console.error('Erro ao logar o usuário: ' + err)
            setFeedbackMessage('Erro ao logar usuário.');
            setShowNotification(true);
        }
    }

    const saveTokenToCookie = (token: string): void => {
        Cookies.set('token', token, { expires: 1 }); // Expires em 7 dias
    };


    return (
        <div className="cadastro">
            <div className="conteiner">
                <form onSubmit={LoginUser}>

                        <h1>Login</h1>
                        <div className="box">
                        <label htmlFor="name" 
                            className='text-white'>Nome:
                        </label>
                        <input 
                            id='name' 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome" required
                        />
                    </div>
                    
                    <div className="box">
                        <label htmlFor="password" className='text-white'>Senha:</label>
                        <input 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder="Digite sua senha"
                        />

                        <div className='forget'>
                            <p className='f'>
                                Não tem uma conta?<span className='hover:underline'> <Link to={'/cadastro'}> Crie agora!</Link></span>
                            </p>
                        </div>
    
                    </div>
                        
                        
                        <button className="image-button">
                           Entrar
                        </button>
                        
                </form>
            </div>

                {showNotification && (
                    <Notification 
                        message={feedbackMessage} 
                        type={feedbackMessage.includes('Erro') ? 'error' : 'success'} 
                        duration={5000} 
                    />
                )}
        </div>
    )

}

export default Login