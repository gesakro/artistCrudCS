# schemas.py
from pydantic import BaseModel
from typing import List, Optional

# Esquemas para Canción
class SongBase(BaseModel):
    title: str

class SongCreate(SongBase):
    album_id: int

class SongResponse(SongBase):
    id: int
    album_id: int

    class Config:
        orm_mode = True

# Esquemas para Álbum
class AlbumBase(BaseModel):
    title: str

class AlbumCreate(AlbumBase):
    artist_id: int

# Esta versión básica se puede seguir usando donde no necesitemos incluir artistas y canciones
class AlbumResponse(AlbumBase):
    id: int
    artist_id: int

    class Config:
        orm_mode = True

# Nuevo esquema: versión breve del artista para incluir en un álbum
class ArtistBrief(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

# Esquema para Artista
class ArtistCreate(BaseModel):
    name: str

class ArtistResponse(BaseModel):
    id: int
    name: str
    albums: Optional[List[AlbumResponse]] = []  # Usado en otros endpoints

    class Config:
        orm_mode = True

# Nuevo esquema: Álbum completo con artista y canciones
class AlbumFullResponse(AlbumBase):
    id: int
    artist: ArtistBrief
    songs: Optional[List[SongResponse]] = []

    class Config:
        orm_mode = True
