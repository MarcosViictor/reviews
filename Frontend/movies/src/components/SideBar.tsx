import Logo from "../assets/img/logo-oculos.svg"
import Home from "../assets/img/home.svg"
import Recentes from "../assets/img/recentes.svg"
import Favoritos from "../assets/img/fav.svg"
import Historico from "../assets/img/historico.svg"
import Profile from '../assets/img/person-icon.svg'
import Search from '../assets/img/search.svg'
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components';

const AsideStyle = styled.aside< {active: boolean} >`
        position: fixed;
        width: ${({ active }) => (active ? '4rem' : '17rem')};
        background-color: #191815;
        z-index: 30;
        height: 100vh;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        transition: all 0.2s ease-in-out
    `;

    const FigureContainer = styled.figure < {active: boolean} >`
        border-bottom: 2px solid  #7b7b79;
        margin-left: ${({ active }) => (active ? '0.6rem' : '2rem')}
        margin-bottom: 2.75rem;
        margin: 0 1rem 0 0.8rem;
    `

    const Img = styled.img <{active :boolean}>`
        margin: auto;
        padding-top: 1.75rem;
        margin-bottom: 2rem;

        width: ${({ active }) => (active ? '2rem' : '3.5rem')};
        transition: all 0.2s ease-in-out

    `

    const Ul = styled.ul <{active : boolean}>`
        display: flex;
        // width: 100%;
        flex-direction: column;
        margin-left: ${({ active }) => (active ? '28%' : '3rem')};
        margin-right: ${({ active }) => (active ? '0' : '3rem')};
        margin-top: 2rem;
        text-align: start;
        font-size: 1.25rem;
        color: white;
        gap: 1.75rem;
        transition: all 0.2s ease-in-out

    `

    const Span = styled.span <{active : boolean}>`
        opacity: ${({ active }) => (active ? '0' : '1')};
        visibility: ${({ active }) => (active ? 'hidden' : 'visible')};
        transition: opacity 0.3s ease, visibility 0.3s ease-in-out;
    `

    const Transparent = styled.div <{active : boolean}>`
        width: ${({ active }) => (active ? '0' : '99vw')};
        height: ${({ active }) => (active ? '0' : '100vh')};
        position: fixed;
        // display:  ${({ active }) => (active ? 'none' : 'block')}
        z-index: 40;
        backdrop-filter: ${({ active }) => (active ? '0' : 'blur(3px)')} ;
        -webkit-backdrop-filter:${({ active }) => (active ? '0' : 'blur(3px)')};
        transition: all 0.3s ease-in-out;
    
    `

const SideBar: React.FC = () => {

    

    const [isActive, setIsActive] = useState(true)

    const toggleActive = () => {
        setIsActive(false);
    }

    const toggleInactive = () => {
        setIsActive(true);
    }



    return(
        <Transparent active={isActive}>
            <AsideStyle active={isActive} onMouseEnter={toggleActive} onMouseLeave={toggleInactive}>
                <FigureContainer active={isActive}>
                    <Img active={isActive} src={Logo} alt="" />
                </FigureContainer>
               <Ul active={isActive}>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Home} alt="SVG Home" />
                        <Span active={isActive} >
                            <Link to="/">Home</Link>
                        </Span>
                    </li>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Search} alt="SVG Search" />
                        <Span active={isActive} >
                            <Link to="/search/movie">Pesquisar</Link>
                        </Span>
                    </li>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Recentes} alt="SVG Recentes" />
                        <Span active={isActive} > 
                            <Link to='/lists'>Listas</Link>
                        </Span>
                       
                    </li>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Favoritos} alt="SVG Favoritos" />
                        <Span active={isActive} >
                        <Link to="/favorites">Favoritos</Link>
                        </Span>
                    </li>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Historico} alt="SVG Historico" />
                        <Span active={isActive} >Histórico</Span>
                    </li>
                    <li className="flex gap-6 items-center cursor-pointer transition-all hover:text-[1.4rem] //hover:font-[500] "> 
                        <img src={Profile} alt="SVG Perfil" />
                        <Span active={isActive} >Perfil</Span>
                    </li>
               </Ul>
            </AsideStyle>
        </Transparent>
    )
}

export default SideBar