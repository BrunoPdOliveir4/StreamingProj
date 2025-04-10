import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CampoCadastro = () => {
    const navigate = useNavigate();
    const [disagreded, setDisagreded] = useState(true);
    return(
        <div className="cadastro">
            <div className="campoCadastro">
                <h2 style={{color: '#ccc', margin: 0}}>Cadastro de Usuário</h2>
                    <p>Email
                        <input type="text" placeholder='Digite seu Email'></input>
                    </p>
                    <p>Senha
                        <input type="password" placeholder="Insira sua senha"></input>
                    </p>
                    <p>Repetir senha 
                        <input type="password" placeholder="Repita sua senha"></input>
                    </p>
                    <p>
                        <label><input type="checkBox" onClick={(it)=>{
                            setDisagreded(!it.target.checked);
                        }}></input>Aceito os <a>TERMOS DE USO</a></label>
                    </p>
                    <button id="cadastro" disabled={disagreded}>Cadastrar</button>
                    <p><a onClick={() => {navigate('/login')}}>Fazer login</a></p>
            </div>
        </div>
    )
}