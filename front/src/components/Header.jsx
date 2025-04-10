import { useNavigate } from "react-router-dom";

function Header(){
    
    const navigate = useNavigate();
    return (
        <div id="headerbg">
            <header>
                <img src="./src/assets/Logoext.png" alt="Logo"/>
                
                <div>
                    <button id="login" onClick={() =>{navigate('/login')}}>Entrar</button>
                    <button id="signin" onClick={() => navigate('/cadastro')}>Registrar</button>
                </div>
            </header>
        </div>
    )
}

export default Header;