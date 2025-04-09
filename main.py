import os
import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Artist, Album, Song
from crud import (
    create_artist,
    get_artists,
    get_artist_by_id,
    update_artist,
    delete_artist,
    delete_artist_by_name,
    create_album,
    update_album,
    delete_album,
    create_song,
    update_song,
    delete_song
)
from schemas import (
    ArtistCreate,
    ArtistResponse,
    AlbumCreate,
    AlbumResponse,
    AlbumFullResponse,
    AlbumUpdate,          # Schema para actualizar álbumes
    SongCreate,
    SongResponse,
    SongUpdate            # Schema para actualizar canciones
)

# Crear todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Música",
    description="API para gestionar artistas, álbumes y canciones.",
    version="1.0.0"
)

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringe esta lista de dominios permitidos.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia: obtener sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------
# Endpoints para Artistas
# ---------------------------
@app.post("/artists/", response_model=ArtistResponse,
          tags=["Artistas"],
          summary="Crear artista",
          description="Crea un nuevo artista en la base de datos.")
def create_new_artist(data: ArtistCreate, db: Session = Depends(get_db)):
    new_artist = create_artist(db, data.dict())
    return new_artist

@app.get("/artists/", response_model=List[ArtistResponse],
         tags=["Artistas"],
         summary="Listar artistas",
         description="Obtiene la lista de todos los artistas.")
def fetch_all_artists(db: Session = Depends(get_db)):
    artists = get_artists(db)
    return artists

@app.get("/artists/{artist_id}", response_model=ArtistResponse,
         tags=["Artistas"],
         summary="Obtener artista",
         description="Obtiene los datos de un artista por su ID.")
def fetch_artist_by_id(artist_id: int, db: Session = Depends(get_db)):
    artist = get_artist_by_id(db, artist_id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artista no encontrado")
    return artist

@app.put("/artists/{artist_id}", response_model=ArtistResponse,
         tags=["Artistas"],
         summary="Actualizar artista",
         description="Actualiza la información de un artista existente.")
def modify_artist(artist_id: int, data: ArtistCreate, db: Session = Depends(get_db)):
    updated_artist = update_artist(db, artist_id, data.dict())
    if not updated_artist:
        raise HTTPException(status_code=404, detail="Artista no encontrado")
    return updated_artist

@app.delete("/artists/{artist_id}",
            tags=["Artistas"],
            summary="Eliminar artista",
            description="Elimina un artista por su ID.")
def remove_artist(artist_id: int, db: Session = Depends(get_db)):
    result = delete_artist(db, artist_id)
    if not result:
        raise HTTPException(status_code=404, detail="Artista no encontrado")
    return result

@app.delete("/artists/name/{name}",
            tags=["Artistas"],
            summary="Eliminar artista por nombre",
            description="Elimina los artistas que coincidan con el nombre dado.")
def remove_artist_by_name(name: str, db: Session = Depends(get_db)):
    deleted_count = delete_artist_by_name(db, name)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Artista con ese nombre no encontrado")
    return {"message": f"Se eliminaron {deleted_count} artista(s) con nombre {name}"}

# ---------------------------
# Endpoints para Álbumes
# ---------------------------
@app.post("/albums/", response_model=AlbumResponse,
          tags=["Álbumes"],
          summary="Crear álbum",
          description="Crea un nuevo álbum en la base de datos.")
def create_new_album(data: AlbumCreate, db: Session = Depends(get_db)):
    album = create_album(db, data.dict())
    return album

@app.put("/albums/{album_id}", response_model=AlbumResponse,
         tags=["Álbumes"],
         summary="Actualizar álbum",
         description="Actualiza el título de un álbum existente.")
def modify_album(album_id: int, data: AlbumUpdate, db: Session = Depends(get_db)):
    album = update_album(db, album_id, data.dict(exclude_unset=True))
    if not album:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return album

@app.get("/artists/{artist_id}/albums", response_model=List[AlbumResponse],
         tags=["Álbumes"],
         summary="Obtener álbumes por artista",
         description="Devuelve la lista de álbumes de un artista específico.")
def get_albums_by_artist_endpoint(artist_id: int, db: Session = Depends(get_db)):
    artist = get_artist_by_id(db, artist_id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artista no encontrado")
    return artist.albums

@app.get("/albums/full", response_model=List[AlbumFullResponse],
         tags=["Álbumes"],
         summary="Listado completo de álbumes",
         description="Devuelve el listado completo de álbumes con la información de su artista y canciones.")
def get_full_albums(db: Session = Depends(get_db)):
    albums = db.query(Album).all()
    return albums

@app.delete("/albums/{album_id}",
            tags=["Álbumes"],
            summary="Eliminar álbum",
            description="Elimina un álbum por su ID.")
def remove_album(album_id: int, db: Session = Depends(get_db)):
    result = delete_album(db, album_id)
    if not result:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return result

# ---------------------------
# Endpoints para Canciones
# ---------------------------
@app.post("/songs/", response_model=SongResponse,
          tags=["Canciones"],
          summary="Crear canción",
          description="Crea una nueva canción en la base de datos.")
def create_new_song(data: SongCreate, db: Session = Depends(get_db)):
    song = create_song(db, data.dict())
    return song

@app.put("/songs/{song_id}", response_model=SongResponse,
         tags=["Canciones"],
         summary="Actualizar canción",
         description="Actualiza el título de una canción existente.")
def modify_song(song_id: int, data: SongUpdate, db: Session = Depends(get_db)):
    song = update_song(db, song_id, data.dict(exclude_unset=True))
    if not song:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return song

@app.delete("/songs/{song_id}",
            tags=["Canciones"],
            summary="Eliminar canción",
            description="Elimina una canción por su ID.")
def remove_song(song_id: int, db: Session = Depends(get_db)):
    result = delete_song(db, song_id)
    if not result:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return result

# ---------------------------
# Configuración para el puerto dinámico
# ---------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render asigna el puerto automáticamente
    uvicorn.run(app, host="0.0.0.0", port=port)
