import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Pencil, Trash2, Filter, Plus } from "lucide-react";
import SkeletonTable from "../components/SkeletonTable";
import EditProveedorModal from "../components/EditProveedorModal";

const badgeClass = (t) =>
  ({ insumos: "badge-info", transporte: "badge-warning", maquinaria: "badge-success" }[t] || "badge-ghost");

const Badge = ({ children }) => <span className={`badge ${badgeClass(children)}`}>{children}</span>;

export default function Proveedores() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const load = async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (nombre) p.append("nombre", nombre);
      if (tipo) p.append("tipo", tipo);
      p.append("page", page);
      p.append("page_size", pageSize);
      const { data } = await api.get(`/proveedores?${p.toString()}`);
      setItems(data);
    } catch {
      toast.error("No se pudo cargar el listado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page]);

  const buscar = () => { setPage(1); load(); };
  const limpiarFiltros = () => { setNombre(""); setTipo(""); setPage(1); load(); };

  const eliminar = async (id) => {
    await toast.promise(api.delete(`/proveedores/${id}`), {
      loading: "Eliminando...",
      success: "Proveedor marcado como eliminado",
      error: "No se pudo eliminar",
    });
    load();
  };

  const abrirEdicion = (prov) => setEdit(prov);
  const guardarEdicion = async (formData) => {
    await toast.promise(api.put(`/proveedores/${edit.id}`, formData), {
      loading: "Guardando...",
      success: "Proveedor actualizado",
      error: "No se pudo actualizar",
    });
    setEdit(null);
    load();
  };

  const hayPrev = page > 1;
  const haySig = items.length === pageSize;

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between">
            <h3 className="card-title flex items-center gap-2">
              <Filter size={18} /> Buscar
            </h3>
            <div className="text-xs opacity-60 hidden sm:block">
              Filtra por nombre y tipo
            </div>
          </div>

          <div className="join w-full">
            <input
              className="input input-bordered join-item w-full"
              placeholder="Nombre de empresa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <select
              className="select select-bordered join-item max-w-[190px]"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Todos</option>
              <option>insumos</option>
              <option>transporte</option>
              <option>maquinaria</option>
              <option>otro</option>
            </select>
            <button className="btn btn-primary join-item" onClick={buscar}>Filtrar</button>
            <button className="btn btn-ghost join-item" onClick={limpiarFiltros}>Limpiar</button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Proveedores</h3>
            <Link to="/proveedores/nuevo" className="btn btn-primary">
              <Plus size={16} /> Nuevo proveedor
            </Link>
          </div>

          {loading ? (
            <SkeletonTable cols={8} rows={6} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra table-sm">
                  <thead className="bg-base-200">
                    <tr>
                      {/* Se quitó la columna ID */}
                      <th className="px-4">Empresa</th>
                      <th className="px-4">Contacto</th>
                      <th className="px-4">Correo</th>
                      <th className="px-4">Tipo</th>
                      <th className="px-4">NIT</th>
                      <th className="px-4">Teléfono</th>
                      <th className="px-4">Ciudad</th>
                      <th className="px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((x) => (
                      <tr key={x.id} className="hover">
                        {/* Se quitó la celda ID */}
                        <td className="px-4 font-medium">{x.nombre_empresa}</td>
                        <td className="px-4">{x.contacto}</td>
                        <td className="px-4 truncate max-w-[220px]">{x.correo}</td>
                        <td className="px-4"><Badge>{x.tipo}</Badge></td>
                        <td className="px-4 font-mono text-xs">{x.nit_rtu}</td>
                        <td className="px-4">{x.telefono}</td>
                        <td className="px-4">{x.ciudad}</td>
                        <td className="px-4">
                          <div className="flex justify-center gap-1">
                            <div className="tooltip" data-tip="Editar">
                              <button
                                className="btn btn-circle btn-ghost btn-xs"
                                onClick={() => abrirEdicion(x)}
                              >
                                <Pencil size={16} />
                              </button>
                            </div>
                            <div className="tooltip" data-tip="Eliminar">
                              <button
                                className="btn btn-circle btn-ghost btn-xs"
                                onClick={() => setToDelete({ id: x.id, nombre: x.nombre_empresa })}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center text-base-content/60 py-10">
                          <div className="text-lg font-medium">No hay proveedores</div>
                          <div>Empieza creando el primero</div>
                          <Link to="/proveedores/nuevo" className="btn btn-primary btn-sm mt-3">
                            <Plus size={16} /> Nuevo proveedor
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="btn btn-outline btn-sm"
                  disabled={!hayPrev}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Anterior
                </button>
                <span className="text-sm opacity-70">Página {page}</span>
                <button
                  className="btn btn-outline btn-sm"
                  disabled={!haySig}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL EDICIÓN */}
      <EditProveedorModal
        open={!!edit}
        data={edit}
        onClose={() => setEdit(null)}
        onSave={guardarEdicion}
      />

      {/* MODAL CONFIRMAR BORRADO */}
      {toDelete && (
        <div className="modal modal-open modal-middle">
          <div className="modal-box">
            <h3 className="font-semibold text-lg">Confirmar eliminación</h3>
            <p className="py-2">
              ¿Seguro que deseas eliminar (soft delete) al proveedor{" "}
              <span className="font-medium">{toDelete.nombre}</span>?
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setToDelete(null)}>Cancelar</button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  await eliminar(toDelete.id);
                  setToDelete(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setToDelete(null)} />
        </div>
      )}
    </div>
  );
}
