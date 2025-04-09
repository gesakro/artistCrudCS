import React, { useState, useEffect } from 'react';
import { getFullAlbums } from '../api';

const FullAlbumList = ({ onSelectAlbum, onSelectSong }) => {
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
        <div
          key={album.id}
          style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <h3>
            {album.title} (Artista: {album.artist.name})
          </h3>
          <p>
            <strong>Canciones:</strong>{' '}
            {album.songs && album.songs.length > 0
              ? album.songs.map((song) => song.title).join(', ')
              : 'No hay canciones'}
          </p>
          {/* Botón para editar el álbum */}
          {onSelectAlbum && (
            <button
              onClick={() => onSelectAlbum(album.id)}
              style={{
                backgroundColor: '#27ae60',
                color: '#fff',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#1e8449')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#27ae60')
              }
            >
              Editar Álbum
            </button>
          )}
          {/* Botones de editar cada canción */}
          {onSelectSong && album.songs && album.songs.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              {album.songs.map((song) => (
                <div key={song.id} style={{ marginBottom: '5px' }}>
                  <span>{song.title}</span>
                  <button
                    onClick={() => onSelectSong(song.id)}
                    style={{
                      backgroundColor: '#e67e22',
                      color: '#fff',
                      padding: '3px 8px',
                      marginLeft: '10px',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = '#d35400')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = '#e67e22')
                    }
                  >
                    Editar Canción
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FullAlbumList;
