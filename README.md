# Prueba Técnica – Desarrollador Junior

## 🛠 Stack utilizado
- **Frontend:** React (Vite), Axios, React Router
- **Backend:** Python 3, FastAPI, Uvicorn
- **Base de datos:** MySQL + SQLAlchemy (PyMySQL)
- **Autenticación:** JWT (python-jose), contraseñas con Bcrypt (passlib)

---

## 🔑 Usuario y contraseña de prueba
- **Usuario:** `admin@admin.com`
- **Contraseña:** `admin123`

> Si no existe en la BD, más abajo hay un script para crearlo.

---

## 🚀 Instrucciones para correr el proyecto

### 1) Levantar MySQL en contenedor (Docker)
> Si ya tienes MySQL local, puedes saltar a “2) Configurar .env”.

```bash
# Levanta MySQL 8 en un contenedor
docker run -d --name mysql_prueba_junior -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=prueba_junior -p 3306:3306 mysql:8.0
```

**Conexión local (host):** `localhost:3306`  
**DB:** `prueba_junior`  

---

### 2) Configurar variables de entorno (backend)
Crea un archivo **`backend/.env`** con:

```
DATABASE_URL=mysql+pymysql://root:admin@localhost:3306/prueba_junior
SECRET_KEY=clave_super_secreta
```

---

### 3) Levantar el backend (FastAPI)
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
# API Docs: http://127.0.0.1:8000/docs
```

---

### 4) Crear usuario administrador (si no existe)
Crea un archivo python dentro de la carpeta `backend`, agrega el codigó de abajo y ejecuta en la carpeta `backend`:

```bash
from passlib.context import CryptContext
from database import SessionLocal, Base, engine
from models import Admin

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Crear tablas (por si es la primera vez)
Base.metadata.create_all(bind=engine)

db = SessionLocal()
email, plain = "admin@admin.com", "admin123"
adm = db.query(Admin).filter_by(email=email).first()
if not adm:
    db.add(Admin(email=email, hashed_password=pwd.hash(plain)))
    db.commit()
    print("✔ Admin creado:", email)
else:
    print("Admin ya existe:", email)
db.close()
```

---

### 5) Levantar el frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

> El frontend guarda el token en `localStorage` y lo envía como `Authorization: Bearer <token>`.

---

## 📌 Notas rápidas
- Loguéate en el front con: **admin@admin.com / admin123**.
- Endpoints clave en la API:
  - `POST /login_json` → devuelve `{ access_token, token_type }`.
  - `GET /proveedores` (filtros: `nombre`, `tipo`, `page`, `page_size`).
  - `POST /proveedores`, `PUT /proveedores/{id}`, `DELETE /proveedores/{id}` (**soft delete**).
---
