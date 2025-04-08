import React, { useState } from 'react';
import { createArtist } from '../api';

const ArtistForm = ({ refreshArtists }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArtist({ name });
    setName('');
    refreshArtists();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Artista</h2>
      <input
        type="text"
        placeholder="Nombre del artista"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Agregar Artista</button>
    </form>
  );
};

export default ArtistForm;
