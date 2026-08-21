import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from database.db_config import get_db_connection

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    username: str
    password: str

@router.post("/register")
def register(user: RegisterRequest):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 1. Kiểm tra tài khoản đã tồn tại
        sql_check = """
            SELECT id
            FROM users
            WHERE username = %s OR email = %s
        """
        cursor.execute(sql_check, (user.username, user.email))

        if cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Tên đăng nhập hoặc Email đã được sử dụng!"
            )

        # 2. Hash password
        hashed_password = pwd_context.hash(user.password)

        # 3. Thêm user
        sql_insert = """
            INSERT INTO users
            (full_name, username, email, password)
            VALUES (%s, %s, %s, %s)
        """

        cursor.execute(
            sql_insert,
            (
                user.full_name,
                user.username,
                user.email,
                hashed_password
            )
        )

        conn.commit()

        return {
            "status": "success",
            "message": "Đăng ký thành công!"
        }

    except HTTPException:
        raise

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"Lỗi đăng ký: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()
class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(user: LoginRequest):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Tìm tài khoản
        sql = """
            SELECT id, full_name, username, email, password
            FROM users
            WHERE username = %s
        """

        cursor.execute(sql, (user.username,))
        db_user = cursor.fetchone()

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Tên đăng nhập hoặc mật khẩu không đúng!"
            )

        # PyMySQL mặc định trả về tuple
        user_id, full_name, username, email, hashed_password = db_user

        # Kiểm tra mật khẩu
        if not pwd_context.verify(user.password, hashed_password):
            raise HTTPException(
                status_code=401,
                detail="Tên đăng nhập hoặc mật khẩu không đúng!"
            )

        return {
            "status": "success",
            "message": "Đăng nhập thành công!",
            "user": {
                "id": user_id,
                "full_name": full_name,
                "username": username,
                "email": email
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=f"Lỗi đăng nhập: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()