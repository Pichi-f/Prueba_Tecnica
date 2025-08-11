import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Plus } from "lucide-react";

export default function ProveedorNuevo() {
  const navigate = useNavigate();

  const crear = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));
    await toast.promise(api.post("/proveedores", body), {
      loading: "Creando proveedor...",
      success: "Proveedor creado",
      error: "No se pudo crear",
    });
    navigate("/"); // vuelve al listado
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Nuevo proveedor</h1>
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Volver
        </button>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <form onSubmit={crear} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label-text">Nombre de la empresa</span>
              <input className="input input-bordered" name="nombre_empresa" required />
            </label>
            <label className="form-control">
              <span className="label-text">Persona de contacto</span>
              <input className="input input-bordered" name="contacto" required />
            </label>
            <label className="form-control">
              <span className="label-text">Correo</span>
              <input className="input input-bordered" type="email" name="correo" required />
            </label>
            <label className="form-control">
              <span className="label-text">Tipo de proveedor</span>
              <select className="select select-bordered" name="tipo" required>
                <option value="">Selecciona...</option>
                <option>insumos</option><option>transporte</option>
                <option>maquinaria</option><option>otro</option>
              </select>
            </label>
            <label className="form-control">
              <span className="label-text">NIT / RTU</span>
              <input className="input input-bordered" name="nit_rtu" required />
            </label>
            <label className="form-control">
              <span className="label-text">Teléfono</span>
              <input className="input input-bordered" name="telefono" required />
            </label>
            <label className="form-control md:col-span-2">
              <span className="label-text">Ciudad</span>
              <input className="input input-bordered" name="ciudad" required />
            </label>
            <div className="md:col-span-2">
              <button className="btn btn-primary">
                <Plus size={16} /> Crear proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
