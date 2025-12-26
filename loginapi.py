from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5177"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



USERS = {
    "test@test.com": {
        "password": "1234",
        "name": "Teddy"
    }
}

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

@app.post("/login")
def login(data: LoginRequest):
    user = USERS.get(data.email)

    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = str(uuid.uuid4())

    return {
        "token": token,
        "user": {
            "email": data.email,
            "name": user["name"]
        }
    }
