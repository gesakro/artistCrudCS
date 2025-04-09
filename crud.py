from sqlalchemy.orm import Session
from models import Artist, Album, Song

# Funciones para Artista (ya existentes)
def create_artist(db: Session, data: dict):
    new_artist = Artist(**data)
    db.add(new_artist)
    db.commit()
    db.refresh(new_artist)
    return new_artist

def get_artists(db: Session):
    return db.query(Artist).all()

def get_artist_by_id(db: Session, artist_id: int):
    return db.query(Artist).filter(Artist.id == artist_id).first()

def update_artist(db: Session, artist_id: int, data: dict):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if artist:
        for key, value in data.items():
            setattr(artist, key, value)
        db.commit()
        db.refresh(artist)
    return artist

def delete_artist(db: Session, artist_id: int):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if artist:
        db.delete(artist)
        db.commit()
        return {"message": "Artist deleted successfully"}
    return None

def delete_artist_by_name(db: Session, name: str):
    deleted = db.query(Artist).filter(Artist.name == name).delete(synchronize_session=False)
    db.commit()
    return deleted

# Funciones para Álbumes
def create_album(db: Session, data: dict):
    new_album = Album(**data)
    db.add(new_album)
    db.commit()
    db.refresh(new_album)
    return new_album

def update_album(db: Session, album_id: int, data: dict):
    album = db.query(Album).filter(Album.id == album_id).first()
    if album:
        for key, value in data.items():
            setattr(album, key, value)
        db.commit()
        db.refresh(album)
    return album

def delete_album(db: Session, album_id: int):
    album = db.query(Album).filter(Album.id == album_id).first()
    if album:
        db.delete(album)
        db.commit()
        return {"message": "Album deleted successfully"}
    return None

# Funciones para Canciones
def create_song(db: Session, data: dict):
    new_song = Song(**data)
    db.add(new_song)
    db.commit()
    db.refresh(new_song)
    return new_song

def update_song(db: Session, song_id: int, data: dict):
    song = db.query(Song).filter(Song.id == song_id).first()
    if song:
        for key, value in data.items():
            setattr(song, key, value)
        db.commit()
        db.refresh(song)
    return song

def delete_song(db: Session, song_id: int):
    song = db.query(Song).filter(Song.id == song_id).first()
    if song:
        db.delete(song)
        db.commit()
        return {"message": "Song deleted successfully"}
    return None
