from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Admin(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))

class Proveedor(Base):
    __tablename__ = "proveedor"
    id = Column(Integer, primary_key=True, index=True)
    nombre_empresa = Column(String(100))
    contacto = Column(String(100))
    correo = Column(String(100))
    tipo = Column(String(50))
    nit_rtu = Column(String(20))
    telefono = Column(String(20))
    ciudad = Column(String(50))
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    estado = Column(Integer, default=1)  
    eliminado_en = Column(DateTime, nullable=True)
