from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ProveedorBase(BaseModel):
    nombre_empresa: str = Field(..., max_length=100)
    contacto: str = Field(..., max_length=100)
    correo: EmailStr
    tipo: str = Field(..., max_length=50)  
    nit_rtu: str = Field(..., max_length=20)
    telefono: str = Field(..., max_length=20)
    ciudad: str = Field(..., max_length=50)

class ProveedorCreate(ProveedorBase):
    pass

class ProveedorUpdate(BaseModel):
    nombre_empresa: Optional[str] = None
    contacto: Optional[str] = None
    correo: Optional[EmailStr] = None
    tipo: Optional[str] = None
    nit_rtu: Optional[str] = None
    telefono: Optional[str] = None
    ciudad: Optional[str] = None

class ProveedorOut(ProveedorBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
