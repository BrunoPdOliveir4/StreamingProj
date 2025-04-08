import { useState } from "react";
import "./CampoLogin.css";
import { useNavigate } from "react-router-dom";

export const CampoLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
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
            type="text"
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
          <button onClick={() => {navigate('/home')}}>Entrar</button>
        </div>
      </div>
    </div>
  );
}