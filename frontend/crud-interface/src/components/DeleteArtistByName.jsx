import React, { useState } from 'react';
import { deleteArtistByName } from '../api';

const DeleteArtistByName = ({ refreshArtists }) => {
  const [artistName, setArtistName] = useState('');

  const handleDelete = async () => {
    if (!artistName) return;
    await deleteArtistByName(artistName);
    setArtistName('');
    refreshArtists();
  };

  return (
    <div>
      <h2>Eliminar Artista por Nombre</h2>
      <input
        type="text"
        placeholder="Nombre del artista"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default DeleteArtistByName;
