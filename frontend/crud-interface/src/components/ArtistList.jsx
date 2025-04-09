import React from 'react';

const ArtistList = ({ artists, refreshArtists, onSelectArtist }) => {
  return (
    <div>
      <h2>Lista de Artistas</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            {/* Botón para seleccionar el artista que se quiere editar */}
            <button onClick={() => onSelectArtist(artist.id)}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
