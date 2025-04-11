import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './PopUp.css';

export const CampoCadastro = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleCadastro = async () => {
    if (!email || !senha || !senhaConfirmada) {
      return setPopup({ message: "Preencha todos os campos!", type: "error" });
    }

    if (senha !== senhaConfirmada) {
      return setPopup({ message: "As senhas não coincidem.", type: "error" });
    }

    try {
      await axios.post("http://localhost:3000/user/", { email, password: senha });
      setPopup({ message: "Cadastro realizado com sucesso!", type: "success" });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const message = err?.response?.data?.message || "Erro ao cadastrar.";
      setPopup({ message, type: "error" });
    }
  };

  return (
    <div className="cadastro">
      <div className="campoCadastro">
        <h2 style={{ color: "#ccc", margin: 0 }}>Cadastro de Usuário</h2>

        <p>Email
          <input type="text" placeholder="Digite seu Email" value={email} onChange={e => setEmail(e.target.value)} />
        </p>

        <p>Senha
          <input type="password" placeholder="Insira sua senha" value={senha} onChange={e => setSenha(e.target.value)} />
        </p>

        <p>Repetir senha
          <input type="password" placeholder="Repita sua senha" value={senhaConfirmada} onChange={e => setSenhaConfirmada(e.target.value)} />
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setTermosAceitos(e.target.checked)}
            />
            Aceito os <a href="#">TERMOS DE USO</a>
          </label>
        </p>

        <button id="cadastro" disabled={!termosAceitos} onClick={handleCadastro}>
          Cadastrar
        </button>

        <p>
          <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            Fazer login
          </a>
        </p>
      </div>

      {popup && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};
