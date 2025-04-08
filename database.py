from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de la base de datos (utilizamos SQLite)
DATABASE_URL = "sqlite:///./artists.db"

# Se crea el engine de SQLAlchemy
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Necesario para SQLite
)

# Se crea SessionLocal para obtener sesiones de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base declarativa para la definición de modelos
Base = declarative_base()


