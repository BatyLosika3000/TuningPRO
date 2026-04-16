from pydantic import BaseModel
from typing import Optional

class ClientCreate(BaseModel):
    first_name: str  # Имя
    last_name: str   # Фамилия
    phone: str       # Номер
    email: str       # Почта

    class Config:
        from_attributes = True
        
# Данные, которые приходят из формы "ЗАЯВКА"
class OrderCreate(BaseModel):
    name: str
    phone: str
    car_brand: str  # Например, Mercedes-Benz
    comment: Optional[str] = "Заявка с сайта"

class OrderResponse(BaseModel):
    Код_Заказа: int
    Статус: str

    class Config:
        from_attributes = True