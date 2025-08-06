from fastapi import FastAPI
from database import Base, engine
from auth import router as auth_router
from routers.proveedor import router as proveedor_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(proveedor_router, prefix="/proveedores")
