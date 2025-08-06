from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Admin
from schemas.auth import LoginRequest, TokenResponse
from utils.jwt import create_access_token
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from utils.jwt import verify_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(Admin).filter(Admin.email == request.email).first()
    if not user or not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    token = create_access_token({"sub": user.email})
    return {"access_token": token}

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

if __name__ == "__main__":
    # Ejecutar con: python auth.py
    from database import SessionLocal
    db = SessionLocal()
    from models import Admin

    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    email = "admin@admin.com"
    password = "admin123"
    hashed_password = pwd_context.hash(password)

    user = Admin(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.close()
    print("Usuario creado exitosamente.")
