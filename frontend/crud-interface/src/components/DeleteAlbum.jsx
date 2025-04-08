// DeleteAlbum.js
import React, { useEffect, useState } from "react";
import { getFullAlbums, deleteAlbum } from "../api";

const DeleteAlbum = () => {
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

  const handleDelete = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      alert("Álbum eliminado exitosamente");
      fetchAlbums(); // refresca la lista luego de eliminar
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
      alert("Error al eliminar el álbum");
    }
  };

  return (
    <div>
      <h2>Eliminar Álbumes</h2>
      {albums.length === 0 ? (
        <p>No hay álbumes disponibles.</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.title} (Artista: {album.artist ? album.artist.name : "Desconocido"})
              <button onClick={() => handleDelete(album.id)}>Eliminar Álbum</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteAlbum;
