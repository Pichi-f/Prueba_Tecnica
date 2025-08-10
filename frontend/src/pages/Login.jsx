import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [loading, setL] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setL(true);
    try {
      // usamos tu endpoint JSON del backend
      const { data } = await api.post("/login_json", { email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch {
      alert("Credenciales inválidas");
    } finally {
      setL(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto" }}>
      <h3>Iniciar sesión</h3>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Email" value={email} onChange={(e)=>setE(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e)=>setP(e.target.value)} />
        <button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
    </div>
  );
}
