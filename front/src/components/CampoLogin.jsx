import { useState } from "react";
import "./CampoLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup.jsx";

export const CampoLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      return setPopup({ message: "Preencha todos os campos!", type: "error" });
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: username,
        password: password,
      });

      // Sucesso no login
      setPopup({ message: "Login realizado com sucesso!", type: "success" });

      // Simula tempo para exibir popup antes de redirecionar
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Erro ao realizar login.";
      setPopup({ message, type: "error" });
    }
  };

  return (
    <div className="login">
      <div className="campoLogin">
        <p>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <div>
          <label>
            <p>Ainda não tem conta?</p>
            <a href="/cadastro">Registre-se aqui!</a>
          </label>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
};
