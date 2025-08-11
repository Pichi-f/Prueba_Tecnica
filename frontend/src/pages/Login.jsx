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
      const { data } = await api.post("/login_json", { email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch {
      alert("Credenciales inválidas");
    } finally { setL(false); }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <form onSubmit={submit} className="card bg-base-100 w-full max-w-sm shadow-md">
        <div className="card-body">
          <h2 className="card-title">Iniciar sesión</h2>
          <label className="form-control">
            <span className="label-text">Email</span>
            <input className="input input-bordered" value={email} onChange={(e)=>setE(e.target.value)} />
          </label>
          <label className="form-control">
            <span className="label-text">Contraseña</span>
            <input type="password" className="input input-bordered" value={password} onChange={(e)=>setP(e.target.value)} />
          </label>
          <button className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
