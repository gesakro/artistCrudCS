// App.js
import React, { useState, useEffect } from "react";
import ArtistList from "./components/ArtistList";
import ArtistForm from "./components/ArtistForm";
import DeleteArtistByName from "./components/DeleteArtistByName";
import AlbumForm from "./components/AlbumForm";
import SongForm from "./components/SongForm";
import FullAlbumList from "./components/FullAlbumList";
import DeleteAlbum from "./components/DeleteAlbum";
import DeleteSong from "./components/DeleteSong";
import { getArtists } from "./api";

import "./App.css";  // Importa el CSS

const App = () => {
  const [artists, setArtists] = useState([]);

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
        <h1>CRUD de Artistas</h1>
      </header>
      <div className="flex-container">
        <div className="flex-item">
          <ArtistForm refreshArtists={refreshArtists} />
          <ArtistList artists={artists} refreshArtists={refreshArtists} />
          <DeleteArtistByName refreshArtists={refreshArtists} />
        </div>
        <div className="flex-item">
          <AlbumForm />
          <SongForm />
        </div>
      </div>
      <div className="component-section">
        <FullAlbumList />
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <DeleteAlbum />
        </div>
        <div className="flex-item">
          <DeleteSong />
        </div>
      </div>
    </div>
  );
};

export default App;
