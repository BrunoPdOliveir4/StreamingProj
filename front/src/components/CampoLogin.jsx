import { useState } from "react";


export const CampoLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div>
      <label htmlFor="Email">Email:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="Password">Password:</label>
      <input
        type="text"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}