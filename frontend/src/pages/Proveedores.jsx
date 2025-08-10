import { useEffect, useState } from "react";
import api from "../api/axios";
import ProveedorForm from "../components/ProveedorForm";

export default function Proveedores() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [editRow, setEditRow] = useState(null);

  const load = async () => {
    const params = new URLSearchParams();
    if (nombre) params.append("nombre", nombre);
    if (tipo) params.append("tipo", tipo);
    const { data } = await api.get(`/proveedores?${params.toString()}`);
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Marcar eliminado?")) return;
    await api.delete(`/proveedores/${id}`);
    load();
  };

  const startEdit = (row) => setEditRow(row);
  const cancelEdit = () => setEditRow(null);

  const saveEdit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    await api.put(`/proveedores/${editRow.id}`, body);
    setEditRow(null);
    load();
  };

  return (
    <>
      <section style={{ marginBottom: 16 }}>
        <h3>Buscar</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
          <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option>insumos</option><option>transporte</option>
            <option>maquinaria</option><option>otro</option>
          </select>
          <button onClick={load}>Filtrar</button>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Registrar proveedor</h3>
        <ProveedorForm onCreated={load} />
      </section>

      <section>
        <h3>Listado</h3>
        <table border="1" cellPadding="6" style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <th>ID</th><th>Empresa</th><th>Contacto</th><th>Correo</th>
              <th>Tipo</th><th>NIT</th><th>Teléfono</th><th>Ciudad</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.nombre_empresa}</td>
                <td>{x.contacto}</td>
                <td>{x.correo}</td>
                <td>{x.tipo}</td>
                <td>{x.nit_rtu}</td>
                <td>{x.telefono}</td>
                <td>{x.ciudad}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button onClick={()=>startEdit(x)}>Editar</button>{" "}
                  <button onClick={()=>eliminar(x.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan="9" style={{ textAlign:"center" }}>Sin resultados</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Editor simple */}
      {editRow && (
        <section style={{ marginTop: 16, padding: 12, border: "1px solid #ddd" }}>
          <h3>Editar proveedor #{editRow.id}</h3>
          <form onSubmit={saveEdit} style={{ display:"grid", gap:6 }}>
            <input name="nombre_empresa" defaultValue={editRow.nombre_empresa} />
            <input name="contacto" defaultValue={editRow.contacto} />
            <input name="correo" type="email" defaultValue={editRow.correo} />
            <select name="tipo" defaultValue={editRow.tipo}>
              <option>insumos</option><option>transporte</option>
              <option>maquinaria</option><option>otro</option>
            </select>
            <input name="nit_rtu" defaultValue={editRow.nit_rtu} />
            <input name="telefono" defaultValue={editRow.telefono} />
            <input name="ciudad" defaultValue={editRow.ciudad} />
            <div style={{ display:"flex", gap:8 }}>
              <button>Guardar</button>
              <button type="button" onClick={cancelEdit}>Cancelar</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
