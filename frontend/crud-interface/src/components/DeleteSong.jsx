// DeleteSong.js
import React, { useState, useEffect } from "react";
import { getFullAlbums, deleteSong } from "../api";

const DeleteSong = () => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const data = await getFullAlbums();
      setAlbums(data);
    } catch (error) {
      console.error("Error al obtener álbumes:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSongDelete = async (songId) => {
    try {
      await deleteSong(songId);
      alert("Canción eliminada exitosamente");
      fetchAlbums(); // Refresca la lista de álbumes con canciones actualizadas
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
      alert("Error al eliminar la canción");
    }
  };

  return (
    <div>
      <h2>Eliminar Canciones</h2>
      {albums.length === 0 ? (
        <p>No hay álbumes o canciones disponibles.</p>
      ) : (
        albums.map((album) => (
          <div key={album.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>
              {album.title} (Artista: {album.artist ? album.artist.name : "Desconocido"})
            </h3>
            {album.songs && album.songs.length > 0 ? (
              <ul>
                {album.songs.map((song) => (
                  <li key={song.id}>
                    {song.title}{" "}
                    <button onClick={() => handleSongDelete(song.id)}>Eliminar Canción</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay canciones en este álbum.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DeleteSong;
