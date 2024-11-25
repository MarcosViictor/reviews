import { Link } from 'react-router-dom'
import '../assets/styles/cadastro.css'
import { useState } from 'react'
import { auth } from '../context/auth';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showNotification, setShowNotification] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const navigate = useNavigate()

    const CreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await auth.post('/register/', {
                username: name,
                email: email,
                password: password
            })
            setEmail('')
            setName('')
            setPassword('')
            console.log(res)
            setFeedbackMessage('Usuário criado com sucesso!');
            setShowNotification(true);
            navigate('/login')

        } catch (err) {
            console.error('Erro ao cadastrar usuário: ' + err)
            setFeedbackMessage('Erro ao criar usuário.');
            setShowNotification(true);
        }
    }

    



    return (
        <div className="cadastro">
            <div className="conteiner">
                <form onSubmit={CreateUser}>
                    <h1>Cadastre-se</h1>

                   
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
                        <label htmlFor="email" className='text-white'>E-mail:</label>
                        <input 
                            id='email' 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
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
                                Já tem uma conta? <span className='hover:underline'> <Link to={'/login'}> Faça o Login!</Link></span>
                            </p>
                        </div>
    
                    </div>

                    
                    <button type="submit">Cadastrar</button>
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

export default Cadastro