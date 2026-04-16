from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel # Добавлено
from datetime import datetime # Добавлено

from database import SessionLocal, engine, get_db
import models, schemas

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Tuning Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Схема для отзывов
class ReviewCreate(BaseModel):
    name: str
    car: str
    text: str
    rating: float
    user_id: int

# --- ЭНДПОИНТЫ ОТЗЫВОВ ---

@app.get("/api/reviews")
def get_reviews(db: Session = Depends(get_db)):
    reviews = db.query(models.Review).all()
    # Маппинг полей базы на поля фронтенда
    return [
        {
            "id": r.Код_Отзыва,
            "name": r.Имя_Пользователя,
            "text": r.Текст_Отзыва,
            "rating": r.Рейтинг,
            "car": r.Модель_Авто,
            "date": r.Дата_Публикации
        } for r in reviews
    ]

@app.post("/api/reviews")
def create_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    try:
        # Создаем запись, сопоставляя поля Pydantic-схемы с колонками модели SQLAlchemy
        new_review = models.Review(
            Код_Клиента=review_data.user_id,      # ID из localStorage
            Имя_Пользователя=review_data.name,    # Имя из формы
            Модель_Авто=review_data.car,          # Авто из формы
            Текст_Отзыва=review_data.text,        # Текст
            Рейтинг=review_data.rating,           # Звезды
            # Код_Заказа можно оставить None, если отзыв пишется не по конкретному заказу
        )
        
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return new_review
    except Exception as e:
        db.rollback()
        print(f"Error: {e}") # Для отладки
        raise HTTPException(status_code=500, detail="Ошибка при сохранении отзыва")

# --- ОСТАЛЬНЫЕ ЭНДПОИНТЫ (Заказы, Регистрация) ---

@app.post("/api/orders", response_model=schemas.OrderResponse)
def create_tuning_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    try:
        new_client = models.Client(Имя=order_data.name, Номер=order_data.phone)
        db.add(new_client)
        db.flush()

        new_car = models.Automobile(Марка=order_data.car_brand, Модель="Не указана")
        db.add(new_car)
        db.flush()

        new_order = models.Order(
            Код_Клиента=new_client.Код_Клиента,
            Код_Авто=new_car.Код_Авто,
            Статус="Новый",
            Комментарий=order_data.comment
        )
        db.add(new_order)
        db.commit() 
        db.refresh(new_order)
        return new_order
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка базы данных")

@app.post("/api/register")
def register_client(client_data: schemas.ClientCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(models.Client).filter(models.Client.Номер == client_data.phone).first()
        if existing:
            raise HTTPException(status_code=400, detail="Клиент с таким номером уже есть")

        new_client = models.Client(
            Имя=client_data.first_name,
            Фамилия=client_data.last_name,
            Номер=client_data.phone,
            Почта=client_data.email
        )
        db.add(new_client)
        db.commit()
        db.refresh(new_client)
        return {"status": "success", "id": new_client.Код_Клиента}
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка при создании профиля")
    
@app.get("/api/parts/{brand}")
def get_parts(brand: str, db: Session = Depends(get_db)):
    # Ищем, игнорируя регистр и лишние пробелы
    search_brand = brand.strip().lower()
    items = db.query(models.Part).filter(
        func.lower(models.Part.Категория) == search_brand
    ).all()
    
    return [
        {
            "id": p.Код_Запчасти,
            "name": p.Название,
            "price": float(p.Цена) if p.Цена else 0,
            "image": p.Фото,
            "article": p.Артикул
        } for p in items
    ]

@app.get("/api/services")
def get_services(db: Session = Depends(get_db)):
    return db.query(models.Service).all()

    # Добавь в main.py
@app.get("/api/parts/search")
def search_parts(query: str, db: Session = Depends(get_db)):
    # Поиск по названию запчасти (регистронезависимый)
    # models.Part — это твой класс из models.py
    results = db.query(models.Part).filter(
        models.Part.Название.ilike(f"%{query}%")
    ).limit(10).all()
    
    return [
        {
            "id": p.Код_Запчасти,
            "name": p.Название,
            "brand": p.Категория, # В твоей модели Категория используется как бренд (BMW и т.д.)
            "price": float(p.Цена) if p.Цена else 0
        } for p in results
    ]

@app.get("/")
def read_root():
    return {"message": "Tuning Studio API is running"}