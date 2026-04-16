from sqlalchemy import Column, BigInteger, String, Numeric, Date, DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship
import datetime
from database import Base

# 1. АВТОМОБИЛЬ
class Automobile(Base):
    __tablename__ = "Автомобиль"
    Код_Авто = Column(BigInteger, primary_key=True, index=True)
    Марка = Column(String(50), nullable=False)
    Модель = Column(String(50), nullable=False)
    Год_Выпуска = Column(Date)

# 2. УСЛУГА
# models.py
class Service(Base):
    __tablename__ = "Услуга"
    Код_Услуги = Column(BigInteger, primary_key=True, index=True)
    Категория = Column(String(100))
    Подкатегория = Column(String(100)) # Добавляем это поле
    Название_Услуги = Column(String(100))
    Описание = Column(Text)
    Базовая_Цена = Column(Numeric(10, 2))
    Превью = Column(String(254))

# 3. ЗАПЧАСТЬ
class Part(Base):
    __tablename__ = "Запчасть"

    Код_Запчасти = Column(BigInteger, primary_key=True, index=True)
    Название = Column(String(255), nullable=False)
    Артикул = Column(String(100), unique=True)
    Описание = Column(Text)
    Цена = Column(Numeric(10, 2))
    Остаток = Column(Integer, default=0)
    Категория = Column(String(100))
    Фото = Column(String(255))
    Совместимые_модели = Column(Text)
    Бренд = Column(String(100))

# 4. КЛИЕНТ
class Client(Base):
    __tablename__ = "Клиент"
    Код_Клиента = Column(BigInteger, primary_key=True, index=True)
    Имя = Column(String(100))
    Фамилия = Column(String(100))
    Номер = Column(String(32))
    Почта = Column(String(254))
    Дата_Регистрации = Column(Date, default=datetime.date.today)

# 5. ЗАКАЗ
class Order(Base):
    __tablename__ = "Заказ"
    Код_Заказа = Column(BigInteger, primary_key=True, index=True)
    Код_Клиента = Column(BigInteger, ForeignKey("Клиент.Код_Клиента"))
    Код_Авто = Column(BigInteger, ForeignKey("Автомобиль.Код_Авто"))
    Дата_Заказа = Column(DateTime, default=datetime.datetime.utcnow)
    Статус = Column(String(20))
    Итоговая_Сумма = Column(Numeric(10, 2))
    Комментарий = Column(Text)

# 6. ЗАКАЗ_УСЛУГА (Промежуточная)
class OrderService(Base):
    __tablename__ = "Заказ_Услуга"
    Код_Услуги_В_Заказе = Column(BigInteger, primary_key=True)
    Код_Заказа = Column(BigInteger, ForeignKey("Заказ.Код_Заказа"))
    Код_Услуги = Column(BigInteger, ForeignKey("Услуга.Код_Услуги"))
    Количество = Column(Integer, default=1)
    Цена_На_Момент_Заказа = Column(Numeric(10, 2))
    Название_На_Момент_Заказа = Column(String(100))

# 7. ЗАПЧАСТЬ_ЗАКАЗ (Промежуточная)
class OrderPart(Base):
    __tablename__ = "Запчасть_Заказ"
    Код_Запчасти_В_Заказе = Column(BigInteger, primary_key=True)
    Код_Заказа = Column(BigInteger, ForeignKey("Заказ.Код_Заказа"))
    Код_Запчасти = Column(BigInteger, ForeignKey("Запчасть.Код_Запчасти"))
    Количество = Column(Integer, default=1)
    Цена_На_Момент_Заказа = Column(Numeric(10, 2))

# 8. ПОРТФОЛИО
class Project(Base):
    __tablename__ = "Портфолио"
    Код_Проекта = Column(BigInteger, primary_key=True)
    Код_Заказа = Column(BigInteger, ForeignKey("Заказ.Код_Заказа"))
    Название = Column(String(254))
    Описание = Column(Text)
    Дата_Завершения = Column(Date)

# 9. МЕДИА
class ProjectMedia(Base):
    __tablename__ = "Медиа"
    Код_Медиа = Column(BigInteger, primary_key=True)
    Код_Проекта = Column(BigInteger, ForeignKey("Портфолио.Код_Проекта"))
    Тип = Column(String(15))
    Путь_Файла = Column(String(254))

# 10. ОТЗЫВ (Новая таблица)
class Review(Base):
    __tablename__ = "Отзыв"
    Код_Отзыва = Column(BigInteger, primary_key=True, index=True)
    Код_Клиента = Column(BigInteger, ForeignKey("Клиент.Код_Клиента"))
    Код_Заказа = Column(BigInteger, ForeignKey("Заказ.Код_Заказа"), nullable=True)
    Рейтинг = Column(Numeric(2, 1))
    Текст_Отзыва = Column(Text, nullable=False)
    Дата_Публикации = Column(DateTime, default=datetime.datetime.utcnow)
    Имя_Пользователя = Column(String(100))
    Модель_Авто = Column(String(100))