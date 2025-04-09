import React, { useState } from 'react';
import { updateSong } from '../api';

const EditSong = ({ songId, currentTitle, onSave }) => {
  const [title, setTitle] = useState(currentTitle);

  const handleSave = async () => {
    try {
      await updateSong(songId, { title });
      alert("Canción editada correctamente");
      onSave(); // Actualiza la lista o cierra el formulario
    } catch (error) {
      console.error("Error al editar la canción:", error);
    }
  };

  return (
    <div>
      <h3>Editar Canción</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default EditSong;
