// FullAlbumList.js
import React, { useState, useEffect } from 'react';
import { getFullAlbums } from '../api';

const FullAlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getFullAlbums();
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h2>Listado Completo de Álbumes</h2>
      {albums.map((album) => (
        <div key={album.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{album.title} (Artista: {album.artist.name})</h3>
          <p>
            <strong>Canciones:</strong> {album.songs && album.songs.length > 0 ? album.songs.map(song => song.title).join(', ') : 'No hay canciones'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FullAlbumList;
