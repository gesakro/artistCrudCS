import os
import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Album
from crud import (
    create_artist,
    get_artists,
    get_artist_by_id,
    update_artist,
    delete_artist,
    delete_artist_by_name,
    create_album,
    delete_album,
    create_song,
    delete_song
)
from schemas import (
    ArtistCreate,
    ArtistResponse,
    AlbumCreate,
    AlbumResponse,
    SongCreate,
    SongResponse,
    AlbumFullResponse
)

# Crear todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringe esta lista
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
@app.post("/artists/", response_model=ArtistResponse)
def create_new_artist(data: ArtistCreate, db: Session = Depends(get_db)):
    new_artist = create_artist(db, data.dict())
    return new_artist

@app.get("/artists/", response_model=List[ArtistResponse])
def fetch_all_artists(db: Session = Depends(get_db)):
    artists = get_artists(db)
    return artists

@app.get("/artists/{artist_id}", response_model=ArtistResponse)
def fetch_artist_by_id(artist_id: int, db: Session = Depends(get_db)):
    artist = get_artist_by_id(db, artist_id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist

@app.put("/artists/{artist_id}", response_model=ArtistResponse)
def modify_artist(artist_id: int, data: ArtistCreate, db: Session = Depends(get_db)):
    updated_artist = update_artist(db, artist_id, data.dict())
    if not updated_artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return updated_artist

@app.delete("/artists/{artist_id}")
def remove_artist(artist_id: int, db: Session = Depends(get_db)):
    result = delete_artist(db, artist_id)
    if not result:
        raise HTTPException(status_code=404, detail="Artist not found")
    return result

@app.delete("/artists/name/{name}")
def remove_artist_by_name(name: str, db: Session = Depends(get_db)):
    deleted_count = delete_artist_by_name(db, name)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Artist with that name not found")
    return {"message": f"Deleted {deleted_count} artist(s) with name {name}"}

# ---------------------------
# Endpoints para Álbumes
# ---------------------------
@app.post("/albums/", response_model=AlbumResponse)
def create_new_album(data: AlbumCreate, db: Session = Depends(get_db)):
    album = create_album(db, data.dict())
    return album

@app.get("/artists/{artist_id}/albums", response_model=List[AlbumResponse])
def get_albums_by_artist_endpoint(artist_id: int, db: Session = Depends(get_db)):
    artist = get_artist_by_id(db, artist_id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist.albums

@app.get("/albums/full", response_model=List[AlbumFullResponse])
def get_full_albums(db: Session = Depends(get_db)):
    albums = db.query(Album).all()
    return albums

@app.delete("/albums/{album_id}")
def remove_album(album_id: int, db: Session = Depends(get_db)):
    result = delete_album(db, album_id)
    if not result:
        raise HTTPException(status_code=404, detail="Album not found")
    return result

# ---------------------------
# Endpoints para Canciones
# ---------------------------
@app.post("/songs/", response_model=SongResponse)
def create_new_song(data: SongCreate, db: Session = Depends(get_db)):
    song = create_song(db, data.dict())
    return song

@app.delete("/songs/{song_id}")
def remove_song(song_id: int, db: Session = Depends(get_db)):
    result = delete_song(db, song_id)
    if not result:
        raise HTTPException(status_code=404, detail="Song not found")
    return result

# ---------------------------
# Configuración para el puerto dinámico
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render asigna el puerto automáticamente
    uvicorn.run(app, host="0.0.0.0", port=port)
