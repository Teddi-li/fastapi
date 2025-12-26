
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  email: string;
  name?: string;
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Login failed");
    }

    return data; // { token, user }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      setUser(data.user);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function logout() {
    setUser(null);
    setToken("");
  }
  if (token) {
    return (
      <div className="logintable">
        <h1>Welcome, {user?.email}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    );
}

return (
      <div className="logintable">
        <h1>Login</h1>
        <div className="login-form">
          
            <div className="input-wrapper">
              <label className="Emaillabel">Email</label>
              <input className="Emailbox" type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label className="passwordlabel">Password</label>
              <input className="passwordbox" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" id="btn" onClick={handleSubmit}>Submit</button>
            <div className="register">
              <Link to="/register" className="register1">Register</Link>
              <a className="register2" href="#">Forgot Password?</a>
            </div>
      </div>
      </div>
  );
  // 
}