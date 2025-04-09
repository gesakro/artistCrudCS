import React, { useState } from 'react';
import { updateAlbum } from '../api';

const EditAlbum = ({ albumId, currentTitle, onSave }) => {
  const [title, setTitle] = useState(currentTitle);

  const handleSave = async () => {
    try {
      await updateAlbum(albumId, { title });
      alert("Álbum editado correctamente");
      onSave();
    } catch (error) {
      console.error("Error al editar el álbum:", error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Editar Álbum</h3>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nuevo nombre del álbum"
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default EditAlbum;
