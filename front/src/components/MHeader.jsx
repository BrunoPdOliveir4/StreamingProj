import { useNavigate } from "react-router-dom"
import { CategoryLine } from "./CategoryLine";

function MHeader(){
    const navigate = useNavigate();
    
    return (
        <div id="headerbg">
            <header>
                <img src="./src/assets/Logoext.png" alt="Logo" onClick={() =>{navigate('/home')}}/>
                
                <div>
                    <h1 style={{ color: 'white', fontSize: '1.5rem',padding: '0 1em' }}>O melhor Streaming de Animes da América Latina!</h1>
                </div>
                <button onClick={()=>{navigate('/')}}>Logout</button>
            </header>
            <CategoryLine/>
        </div>
    )
}

export default MHeader;