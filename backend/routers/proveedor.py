from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import datetime

from database import SessionLocal
from models import Proveedor
from schemas.proveedor import ProveedorCreate, ProveedorUpdate, ProveedorOut
from auth import get_current_user  # protege las rutas

router = APIRouter(prefix="/proveedores", tags=["proveedores"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=ProveedorOut, status_code=201)
def crear_proveedor(
    body: ProveedorCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    nuevo = Proveedor(
        nombre_empresa=body.nombre_empresa,
        contacto=body.contacto,
        correo=body.correo,
        tipo=body.tipo,
        nit_rtu=body.nit_rtu,
        telefono=body.telefono,
        ciudad=body.ciudad,
        fecha_creacion=datetime.utcnow(),
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("", response_model=List[ProveedorOut])
def listar_proveedores(
    nombre: Optional[str] = Query(None, description="Filtro por nombre de empresa (contiene)"),
    tipo: Optional[str] = Query(None, description="Filtro por tipo (insumos, transporte, maquinaria, otro)"),
    incluir_inactivos: bool = Query(False, description="Incluir proveedores inactivos"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    q = db.query(Proveedor)

    if not incluir_inactivos:
        q = q.filter(Proveedor.estado == 1) 
    if nombre:
        q = q.filter(Proveedor.nombre_empresa.ilike(f"%{nombre}%"))
    if tipo:
        q = q.filter(Proveedor.tipo == tipo)

    q = q.order_by(Proveedor.fecha_creacion.desc())

    # paginación simple
    offset = (page - 1) * page_size
    items = q.offset(offset).limit(page_size).all()
    return items

@router.get("/{proveedor_id}", response_model=ProveedorOut)
def obtener_proveedor(
    proveedor_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.query(Proveedor).get(proveedor_id)
    if not p or p.estado == 0:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return p

@router.put("/{proveedor_id}", response_model=ProveedorOut)
def actualizar_proveedor(
    proveedor_id: int,
    body: ProveedorUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.get(Proveedor, proveedor_id)
    if not p or p.estado == 0:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")

    data = body.model_dump(exclude_unset=True)  # <<-- aquí el cambio
    for k, v in data.items():
        setattr(p, k, v)

    db.commit()
    db.refresh(p)
    return p


@router.delete("/{proveedor_id}", status_code=204)
def eliminar_proveedor(
    proveedor_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.query(Proveedor).get(proveedor_id)
    if not p or p.estado == 0:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    p.estado = 0
    p.eliminado_en = datetime.utcnow()
    db.commit()
    return
