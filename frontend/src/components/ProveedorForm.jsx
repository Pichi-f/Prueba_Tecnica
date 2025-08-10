import api from "../api/axios";

export default function ProveedorForm({ onCreated }) {
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    await api.post("/proveedores", body);
    e.target.reset();
    onCreated?.();
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 6, marginTop: 12 }}>
      <input name="nombre_empresa" placeholder="Nombre de la empresa" required />
      <input name="contacto" placeholder="Persona de contacto" required />
      <input name="correo" type="email" placeholder="Correo" required />
      <select name="tipo" required>
        <option value="">Tipo de proveedor</option>
        <option>insumos</option>
        <option>transporte</option>
        <option>maquinaria</option>
        <option>otro</option>
      </select>
      <input name="nit_rtu" placeholder="NIT/RTU" required />
      <input name="telefono" placeholder="Teléfono" required />
      <input name="ciudad" placeholder="Ciudad" required />
      <button>Registrar</button>
    </form>
  );
}
