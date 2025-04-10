import { useNavigate } from "react-router-dom";

function Header(){
    
    const navigate = useNavigate();
    return (
        <div id="headerbg">
            <header>
                <img src="./src/assets/Logoext.png" alt="Logo"/>
                <div>
                    <h1 style={{ color: 'white', fontSize: '1.5rem',padding: '0 1em' }}>O melhor Streaming de Animes da América Latina!</h1>
                </div>
                    <button onClick={() =>{navigate('/login')}}>Entrar</button>
                
            </header>
        </div>
    )
}

export default Header;