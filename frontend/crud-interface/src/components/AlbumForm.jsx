// AlbumForm.js
import React, { useState, useEffect } from "react";
import { createAlbum, getArtists } from "../api";

const AlbumForm = () => {
  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Cargar la lista de artistas
    const fetchArtists = async () => {
      const artistsData = await getArtists();
      setArtists(artistsData);
    };
    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !artistId) return;
    await createAlbum({ title, artist_id: parseInt(artistId) });
    setTitle("");
    setArtistId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Álbum</h2>
      <input
        type="text"
        placeholder="Título del álbum"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        value={artistId}
        onChange={(e) => setArtistId(e.target.value)}
        required
      >
        <option value="">Seleccione un artista</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
      <button type="submit">Agregar Álbum</button>
    </form>
  );
};

export default AlbumForm;
