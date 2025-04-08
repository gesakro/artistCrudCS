import React from 'react';

const ArtistList = ({ artists, refreshArtists, setArtistToEdit }) => {
  return (
    <div>
      <h2>Lista de Artistas</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            {/* Se pueden agregar botones adicionales para editar */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
