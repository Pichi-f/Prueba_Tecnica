import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: 12 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Panel de Proveedores</h2>
        <button onClick={logout}>Salir</button>
      </header>
      <Outlet />
    </div>
  );
}
