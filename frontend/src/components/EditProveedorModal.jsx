// src/components/EditProveedorModal.jsx
import { useEffect, useState } from "react";

export default function EditProveedorModal({ open, data, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre_empresa: "",
    contacto: "",
    correo: "",
    tipo: "",
    nit_rtu: "",
    telefono: "",
    ciudad: "",
  });

  // para animación simple (fade + scale)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open && data) {
      setForm({
        nombre_empresa: data.nombre_empresa || "",
        contacto: data.contacto || "",
        correo: data.correo || "",
        tipo: data.tipo || "",
        nit_rtu: data.nit_rtu || "",
        telefono: data.telefono || "",
        ciudad: data.ciudad || "",
      });
      // arranca animación
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [open, data]);

  // Cerrar con ESC + bloquear scroll del body
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose]);

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={[
            // tarjeta 100% blanca, con buen contraste en cualquier tema
            "w-full max-w-3xl rounded-2xl bg-white dark:bg-white text-neutral-900",
            "shadow-[0_10px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/10",
            "transition-all duration-150",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
        >

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5">
          <div>
            <h3 className="text-lg font-semibold">Editar proveedor </h3>
            <p className="text-sm opacity-70">
              Actualiza solo los campos necesarios y guarda los cambios.
            </p>
          </div>
          <button
            className="btn btn-sm btn-ghost"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pt-4 pb-2">
          <div className="divider my-2" />
        </div>

        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6"
        >
          <label className="form-control">
            <span className="label-text">Nombre de la empresa</span>
            <input
              className="input input-bordered"
              name="nombre_empresa"
              value={form.nombre_empresa}
              onChange={change}
              required
              autoFocus
            />
          </label>

          <label className="form-control">
            <span className="label-text">Persona de contacto</span>
            <input
              className="input input-bordered"
              name="contacto"
              value={form.contacto}
              onChange={change}
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text">Correo</span>
            <input
              className="input input-bordered"
              type="email"
              name="correo"
              value={form.correo}
              onChange={change}
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text">Tipo</span>
            <select
              className="select select-bordered"
              name="tipo"
              value={form.tipo}
              onChange={change}
              required
            >
              <option value="">Selecciona…</option>
              <option>insumos</option>
              <option>transporte</option>
              <option>maquinaria</option>
              <option>otro</option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text">NIT / RTU</span>
            <input
              className="input input-bordered"
              name="nit_rtu"
              value={form.nit_rtu}
              onChange={change}
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text">Teléfono</span>
            <input
              className="input input-bordered"
              name="telefono"
              value={form.telefono}
              onChange={change}
              required
            />
          </label>

          <label className="form-control md:col-span-2">
            <span className="label-text">Ciudad</span>
            <input
              className="input input-bordered"
              name="ciudad"
              value={form.ciudad}
              onChange={change}
              required
            />
          </label>

          {/* Actions */}
          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
