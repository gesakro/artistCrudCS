import React, { useState } from 'react';
import { updateArtist } from '../api';

const EditArtist = ({ artistId, currentName, onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSave = async () => {
    try {
      await updateArtist(artistId, { name });
      alert("Artista editado correctamente");
      onSave();
    } catch (error) {
      console.error("Error al editar el artista:", error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Editar Artista</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default EditArtist;
