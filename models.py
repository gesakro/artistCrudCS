# models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Artist(Base):
    __tablename__ = 'artists'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    albums = relationship("Album", back_populates="artist")  # Relación con álbumes

class Album(Base):
    __tablename__ = 'albums'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    artist = relationship("Artist", back_populates="albums")
    # Agregamos cascade para que se eliminen todas las canciones asociadas
    songs = relationship("Song", back_populates="album", cascade="all, delete, delete-orphan")

class Song(Base):
    __tablename__ = 'songs'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    album_id = Column(Integer, ForeignKey('albums.id'))
    album = relationship("Album", back_populates="songs")
