import React, { useState, useEffect } from "react";
import ArtistList from "./components/ArtistList";
import ArtistForm from "./components/ArtistForm";
import DeleteArtistByName from "./components/DeleteArtistByName";
import AlbumForm from "./components/AlbumForm";
import SongForm from "./components/SongForm";
import FullAlbumList from "./components/FullAlbumList";
import DeleteAlbum from "./components/DeleteAlbum";
import DeleteSong from "./components/DeleteSong";
import EditArtist from "./components/EditArtist";
import EditAlbum from "./components/EditAlbum";
import EditSong from "./components/EditSong";
import { getArtists } from "./api";

import "./App.css";  // Importa el CSS

const App = () => {
  // Estado para la lista de artistas
  const [artists, setArtists] = useState([]);
  // Estado para el ID del artista seleccionado (para editar artista)
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  // Estado para el ID del álbum seleccionado (para editar álbum)
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  // Estado para el ID de la canción seleccionada (para editar canción)
  const [selectedSongId, setSelectedSongId] = useState(null);

  // Función para refrescar la lista de artistas desde el backend
  const refreshArtists = async () => {
    const data = await getArtists();
    setArtists(data);
  };

  useEffect(() => {
    refreshArtists();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>CRUD de Artistas, Álbumes y Canciones</h1>
      </header>

      {/* Sección de CREACIÓN */}
      <section className="creation-section">
        <h2>Creación</h2>
        <div className="flex-container">
          <div className="flex-item">
            <ArtistForm refreshArtists={refreshArtists} />
          </div>
          <div className="flex-item">
            <AlbumForm />
          </div>
          <div className="flex-item">
            <SongForm />
          </div>
        </div>
      </section>

      {/* Sección de EDICIÓN */}
      <section className="editing-section">
        <h2>Edición</h2>
        <div className="flex-container">
          {/* Columna para editar artistas */}
          <div className="flex-item">
            <ArtistList 
              artists={artists} 
              refreshArtists={refreshArtists}
              onSelectArtist={(id) => {
                setSelectedArtistId(id);
                // Limpiamos la selección de álbum y canción cuando se selecciona un nuevo artista
                setSelectedAlbumId(null);
                setSelectedSongId(null);
              }} 
            />
            {selectedArtistId && (
              <EditArtist 
                artistId={selectedArtistId} 
                currentName="Nombre actual" 
                onSave={() => {
                  refreshArtists();
                  setSelectedArtistId(null);
                }} 
              />
            )}
          </div>

          {/* Columna para editar álbum y canción */}
          <div className="flex-item">
            <FullAlbumList 
              onSelectAlbum={(id) => setSelectedAlbumId(id)}
              onSelectSong={(id) => setSelectedSongId(id)}
            />
            {selectedAlbumId && (
              <EditAlbum 
                albumId={selectedAlbumId} 
                currentTitle="Título actual"
                onSave={() => {
                  // Aquí implementarías refresco de álbumes o alguna acción
                  setSelectedAlbumId(null);
                }} 
              />
            )}
            {selectedSongId && (
              <EditSong 
                songId={selectedSongId} 
                currentTitle="Título actual" 
                onSave={() => {
                  setSelectedSongId(null);
                }} 
              />
            )}
          </div>
        </div>
      </section>

      {/* Sección de ELIMINACIÓN */}
      <section className="deletion-section">
        <h2>Eliminación</h2>
        <div className="flex-container">
          <div className="flex-item">
            <DeleteArtistByName refreshArtists={refreshArtists} />
          </div>
          <div className="flex-item">
            <DeleteAlbum />
          </div>
          <div className="flex-item">
            <DeleteSong />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
