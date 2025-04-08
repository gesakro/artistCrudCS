// SongForm.js
import React, { useState, useEffect } from "react";
import { createSong, getArtists, getAlbumsByArtist } from "../api";

const SongForm = () => {
  const [title, setTitle] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Cargar la lista de artistas al montar el componente
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsData = await getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error al obtener artistas:", error);
      }
    };
    fetchArtists();
  }, []);

  // Cuando el artista seleccionado cambia, cargar los álbumes asociados
  useEffect(() => {
    if (selectedArtist) {
      const fetchAlbums = async () => {
        try {
          // Convertir el valor a número para asegurar la correcta formación de la URL
          const albumsData = await getAlbumsByArtist(Number(selectedArtist));
          setAlbums(albumsData);
        } catch (error) {
          console.error("Error al obtener álbumes:", error);
        }
      };
      fetchAlbums();
    } else {
      setAlbums([]);
      setSelectedAlbum(""); // Reinicia el álbum si el artista cambia
    }
  }, [selectedArtist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Asegurarse de que se hayan seleccionado todos los valores requeridos
    if (!title || !selectedArtist || !selectedAlbum) return;
    try {
      await createSong({ title, album_id: parseInt(selectedAlbum) });
      alert("Canción agregada exitosamente");
      // Reiniciar campos luego de la creación
      setTitle("");
      setSelectedArtist("");
      setSelectedAlbum("");
      setAlbums([]);
    } catch (error) {
      console.error("Error al agregar la canción:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Canción</h2>
      {/* Campo para el nombre de la canción */}
      <div>
        <label>
          Nombre de la canción: 
          <input
            type="text"
            placeholder="Nombre de la canción"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      {/* Desplegable para seleccionar el artista */}
      <div>
        <label>
          Seleccione un artista: 
          <select
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            required
          >
            <option value="">--Seleccione un artista--</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Desplegable para seleccionar el álbum, se muestra solo si ya se seleccionó un artista */}
      {selectedArtist && (
        <div>
          <label>
            Seleccione un álbum: 
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              required
            >
              <option value="">--Seleccione un álbum--</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <button type="submit">Agregar Canción</button>
    </form>
  );
};

export default SongForm;
