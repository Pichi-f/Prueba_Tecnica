import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="flex-1 font-semibold">Panel de Proveedores</div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button className="btn btn-ghost" onClick={logout}>Salir</button>
          </div>
        </div>
      </div>
      <main className="container max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
